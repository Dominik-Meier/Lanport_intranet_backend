const db = require("../models");
const User = db.user;
const Session = db.session;
const request = require('request');
const rp = require('request-promise');
const internetAvailable = require("internet-available");
const {logger} = require('../../app')
const jwt = require('jsonwebtoken')


module.exports = {
    handleGetUserDevMode: handleGetUserDevMode,
    handleGetUserBySess: handleGetUserBySess,
    handleRefreshToken: handleRefreshToken
}

async function handleGetUserDevMode(sess) {
    logger.info('Get User in dev mode')
    const devSess = await Session.findOne( {where: {sess: sess}});
    if (devSess) {
        const user =  await User.findOne( {where: {id: devSess.userId}});
        await createAndSaveJwtTokens(user);
        return user;
    } else {
        throw 'User with sess not found';
    }
}

async function handleGetUserBySess(sess) {
    if (sess){
        return await internetAvailable({
            timeout: 500,
            retries: 5
        })
            .then( async () => {
                const remoteUser = await handleRemoteUser(sess);
                await createAndSaveJwtTokens(remoteUser);
                return remoteUser;
            })
            .catch( async (err) => {
                return await handleLocalUser(sess);
            })
    } else {
        throw 'sess is not available';
    }

}

async function handleRemoteUser(sess, callback) {
    const cookieJar = request.jar();
    let user = null;
    const options = {
        method: 'POST',
        jar: cookieJar,
        uri: 'https://lanport.ch/api/sess',
        form: { sess: sess, api_key: 'fghe456uz', send: 'sess_check' }
    };
    user = await rp(options)
        .then(body => {return handleResponse(JSON.parse(body), sess)})
        .catch(err =>  { logger.error(err); throw 'Error during getting User from lanport.ch! Error: '.concat(err);})
    return user;
}

async function handleLocalUser(sess) {
    const dbSess = await Session.findOne( {where: {sess: sess}});
    const dbUser = await User.findOne( {where: {id: dbSess.userId}});
    if (dbUser) {
        return dbUser;
    } else {
        throw 'Some error occurred while retrieving users.'
    }
}

async function handleResponse(data, sess) {
    let user = await User.findOne({where: {nickname: data.nickname}});
    if (user === null) {
        //TODO export information per lanparty
        user = await User.create({
            nickname: data.nickname,
            lanportUserId: data.id,
            registered: data.party !== null ? data.party.angemeldet : false,
            payed: data.party !== null ? data.party.bezahlt : false,
            seat: data.party.platz_nr !== null ? data.party.platz_nr : '',
            level: data.level
        });
        const session = await Session.create({sess: sess, userId: user.id});
        return user;
    } else {
        let session = await Session.findOne({where: {sess: sess, userId: user.id}});
        if (session === null) {
            await Session.create({sess: sess, userId: user.id});
        }
        //TODO creat a way to remove expired sessions
        user.nickname = data.nickname;
        user.registered = data.party !== null ? data.party.angemeldet : false;
        user.payed = data.party !== null ? data.party.bezahlt : false;
        user.seat = data.party.platz_nr !== null ? data.party.platz_nr : '';
        user.level = data.level;

        await user.save();
        return user;
    }
}

async function createAndSaveJwtTokens(user) {
    user.token = jwt.sign({user_id: user.id, nickname: user.nickname, seat: user.seat, level: user.level},
        process.env.JWT_SECRET, {expiresIn: "5min", issuer: "backend.intranet.lanport.ch"});
    user.refreshToken = jwt.sign({user_id: user.id, nickname: user.nickname, seat: user.seat, level: user.level, type: "refresh"},
        process.env.JWT_SECRET, {expiresIn: "30d", issuer: "backend.intranet.lanport.ch"});
    user.save();
}

async function handleRefreshToken(refreshToken) {
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findOne({where: {id: decodedRefreshToken.user_id}});
    if (!user) throw 'Access forbidden.';
    if (user.refreshToken !== refreshToken) throw 'Refresh token not valid!';
    await createAndSaveJwtTokens(user);
    return user;
}