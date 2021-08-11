const db = require("../models");
const User = db.user;
const Session = db.session;
const Op = db.Sequelize.Op;
const internetAvailable = require("internet-available");
const request = require('request');
const {config} = require('../../app')

const cookieJar = request.jar();

// Retrieve one user from the database.
exports.findOne = async (req, res) => {
    const sess  = req.params.id;
    console.log(sess)
    if(config === 'dev') {
        console.log('running user in dev mode')
        const devSess = await Session.findOne( {where: {sess: sess}});
        if (devSess) {
            const devUser = await User.findOne( {where: {id: devSess.userId}});
            if (devUser) {
                res.send(devUser);
            }
        } else {
            res.status(401).send('no sess for user found');
        }
    } else {
        console.log('running user in prod mode')
        internetAvailable({
            timeout: 500,
            retries: 5
        }).then( () => {
            console.log("Internet");
            // TODO check when key does not exist, what happens with the request
            // TODO check if the api_key remains always the same or if it can change
            request.post({
                    url:'https://lanport.ch/api/sess',
                    jar: cookieJar,
                    form: {
                        sess: sess,
                        api_key: 'fghe456uz',
                        send: 'sess_check'
                    }
                },
                async function(err,httpResponse,body){
                    dataJson = JSON.parse(body);
                    console.log(dataJson);
                    console.log(cookieJar);
                    //TODO what when sess request fails and retruns:
                    // {"error":true,"error_text":"unbekanntes SESS-Cookie"}
                    const resUser = await handleResponse(dataJson, sess).then( resUser => {
                        console.log(resUser);
                        res.send(resUser);
                    });

                });
        }).
        catch( async () => {
            console.log("no Internet")
            const dbSess = await Session.findOne( {where: {sess: sess}});
            const dbUser = await User.findOne( {where: {id: dbSess.userId}});
            if (dbUser) {
                res.send(dbUser);
            } else {
                res.status(401).send({
                    message: "Some error occurred while retrieving users."
                });
            }
        })
    }
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

handleResponse = async function (data, sess) {
    let user = await User.findOne({where: {nickname: data.nickname}});
    if (user === null) {
            //TODO export information per lanparty
            //TODO implement seat -> in db table platz_nr
            user = await User.create( {
                nickname: data.nickname,
                lanportUserId: data.id,
                registered: data.party !== null ? data.party.angemeldet : false,
                payed: data.party !== null ? data.party.bezahlt : false,
                seat: null,
                level: data.level
            } );
        const session = await Session.create({ sess: sess, userId: user.id});

        return user;
    } else {
        let session = await Session.findOne( {where: {sess: sess, userId: user.id}});
        if (session == null) {
            session = await Session.create({ sess: sess, userId: user.id});
        }
        //TODO creat a way to remove expired sessions
        //TODO creat seatings for lanparty
        user.nickname = data.nickname;
        user.registered = data.party !== null ? data.party.angemeldet : false;
        user.payed = data.party !== null ? data.party.bezahlt : false;
        user.seat = '';
        user.level = data.level;

        await user.save().then( () => {});
        return user;
    }
}

