const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
    if (!req.cookies.shortlyid) {    // //if cookies doesnt exist
                                        //if no coookie angy cookie monster
        //make a session every time, then check if cookie
        models.Sessions
        .create()
        .then((data) => {
            var id = data.insertId;
            return models.Sessions.get({id})
        })
        .then((session) => {
            req.session = session;
            res.cookie('shortlyid', req.session.hash);
            next();
        })
        .catch( (err) => {
            console.log('error in making session without cookie');
        })
    } else {
        //at this point we have a cookie 
        //extract hash from shortly prop
        var hash = req.cookies.shortlyid
        models.Sessions
            .get({hash})
            .then((sessionData) => {
                if (sessionData) {
                    req.session = sessionData;
                    var id = req.session.userId;
                    if (id) {
                        models.Users.get({id})
                        .then((userData) => {
                            req.session.user = {username: userData.username};
                            next();
                        })
                        .catch((err) => {
                            console.log('error getting userdata')
                        })
                    } else {
                        // if no id
                        next()
                    }
                } else {
                    models.Sessions
                    .create()
                    .then((data) => {
                        var id = data.insertId;
                        return models.Sessions.get({id});
                    })
                    .then((sessionData) => {
                        res.cookie('shortlyid', sessionData.hash);
                        next();
                    })
                }
            })
            .catch((err) => {
                console.log('error in making session with cookie');
            });            
            

    }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

