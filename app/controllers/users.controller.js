const db = require("../models");
const User = db.user;
const Session = db.session;
const Op = db.Sequelize.Op;
const internetAvailable = require("internet-available");
const request = require('request');

const cookieJar = request.jar();

// Retrieve one user from the database.
exports.findOne = async (req, res) => {
    const sess  = req.params.id;


    internetAvailable({
        timeout: 3000,
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
                 console.log(cookieJar);
                 //TODO what when sess request fails and retruns:
                 // {"error":true,"error_text":"unbekanntes SESS-Cookie"}
                 const resUser = await handleResponse(dataJson, sess).then( resUser => {
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
    let user = await User.findOne({where: {nickname: data.nickname}});
    if(user == null) {
            //TODO export information per lanparty
            //TODO implement seat -> in db table platz_nr
            user = await User.create( { nickname: data.nickname, lanportUserId: data.id, registered: data.party.angemeldet,
                payed: data.party.bezahlt, seat: null, level: data.level} );
            const session = await Session.create({ sess: sess, userId: user.id});

        return user;
    } else {
        //TODO creat a way to remove expired sessions
        //TODO creat seatings for lanparty
        user.nickname = data.nickname;
        user.registered = data.party.angemeldet;
        user.payed = data.party.bezahlt;
        user.seat = null;
        user.level = data.level;

        await user.save().then( () => {});
        return user;
    }
}

