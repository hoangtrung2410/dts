var fs = require('fs');
var jwt = require('jsonwebtoken');

var publicKey = fs.readFileSync('/opt/tyk-gateway/certs/public.pem', 'utf8');

module.exports = function(request, session, spec) {
    var authHeader = request.Headers["Authorization"];
    if (authHeader && authHeader.length > 0) {
        var token = authHeader[0].split(' ')[1]; // bỏ "Bearer"
        console.log("JWT token received:", token);

        try {
            var decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
            console.log("JWT payload:", decoded);
        } catch (err) {
            console.error("JWT validation error:", err.message);
        }
    } else {
        console.log("No Authorization header found");
    }

    return request;
};
