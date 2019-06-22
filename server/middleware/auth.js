const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
    if (req.headers.cookie) {
        //create with cookie
    } else {
        models.Sessions
        .create()
        .then((data) => {
            var id = data.insertId;
            return models.Sessions.get({id})
        })
        .then((sessionId) => {
            console.log('THIS IS REQ ',req);
            req.session = sessionId;

            // fill out req.session.userId
            
        })
        .then()
        .catch( (err) => {
            console.log('error in making session');
        })

    }
    next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

