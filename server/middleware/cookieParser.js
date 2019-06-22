const parseCookies = (req, res, next) => {
    let cookieObj = {}
    if (req.headers.cookie) {
        var allCookies = req.headers.cookie.split('; ');
        allCookies.forEach(cookie => {
            var cookieKey = cookie.split('=')[0];
            var cookieValue = cookie.split('=')[1];
            cookieObj[cookieKey] = cookieValue;
        })
    }
    req.cookies = cookieObj;
    next();

};

module.exports = parseCookies;

//cookies in header 