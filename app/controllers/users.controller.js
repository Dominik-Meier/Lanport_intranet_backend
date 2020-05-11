const db = require("../models");
const User = db.user;
const Session = db.session;
const Op = db.Sequelize.Op;
const internetAvailable = require("internet-available");
const request = require('request');

// Retrieve one user from the database.
exports.findOne = async (req, res) => {
    const sess  = req.params.id;

    internetAvailable({
        timeout: 3000,
        retries: 5
    }).then( () => {
        console.log("Internet");
        request.post({
                url:'https://lanport.ch/api/sess',
                form: {
                    sess: sess,
                    api_key: 'fghe456uz',
                    send: 'sess_check'
                }
            },
             function(err,httpResponse,body){
                 dataJson = JSON.parse(body);
                 const resUser = handleResponse(dataJson, sess);
                 res.send(resUser);
            });
    }).
    catch( async () => {
        console.log("no Internet")
        const dbSess = await Session.findOne( {where: {sess: sess}});
        const dbUser = await User.findOne( {where: {id: dbSess.userId}});
        if (dbUser) {
            res.send(dbUser);
        } else {
            res.status(500).send({
                message: "Some error occurred while retrieving users."
            });
        }
    })

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
    console.log(data.nickname);
    let user = await User.findOne({where: {nickname: data.nickname}});
    if(user == null) {
        console.log('user not found, insert new user');
            user = await User.create( { nickname: data.nickname, level: data.level} );
            console.log(user);
            const session = await Session.create({ sess: sess, userId: user.id});
            console.log(session);
            // TODO creat new seating for the correct lanparty

    } else {
        //TODO creat a way to remove expired sessions
        console.log('user found, update user and session');
        let modified = false;
        if (user.nickname != data.nickname) {
            user.nickname = data.nickname;
            modified = true;
        }
        if (user.level != data.level) {
            user.level = data.level;
            modified = true;
        }
        if (modified) {
            user.save();
        }
        const dbSess = await Session.findOne( { where: {userId: user.id, sess: sess}});
        if (dbSess == null) {
            await Session.create( { sess: sess, userId: user.id});
        }
        //TODO creat seatings for lanparty
    }
    return user;
}

