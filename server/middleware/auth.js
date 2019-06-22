const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
    if (true) { //req.cookies.shortlyid //if cookies doesnt exist
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
        .then(() => {
            // models.Sessions.go
            //check if session assigned to user
            //assign username and userid prop to session obj
            // next();
        })
        .catch( (err) => {
            console.log('error in making session');
        })
    } else {

    }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

