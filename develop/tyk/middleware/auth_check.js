// middleware/auth_check.js
module.exports = function (request, session, spec) {
    console.log("Middleware chạy");
    console.log("JWT claims:", session.jwt_claims);

    // Xóa token gốc để backend không thấy JWT
    delete request.headers["Authorization"];
    delete request.headers["authorization"];

    // Forward các claim xuống dưới header dạng X-CLAIMNAME
    const jwtClaims = session.jwt_claims || {};
    for (const key in jwtClaims) {
        if (Object.prototype.hasOwnProperty.call(jwtClaims, key)) {
            const headerName = "X-" + key.replace(/_/g, "-");
            request.headers[headerName] = String(jwtClaims[key]);
            console.log(`Forward claim: ${key} -> ${headerName}: ${jwtClaims[key]}`);
        }
    }

    return request;
};
