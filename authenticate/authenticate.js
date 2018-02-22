const jwt = require('jsonwebtoken');
const creds = require('./creds.json');

function getUrlParams(search) {
    let hashes = search.slice(search.indexOf('?') + 1).split('&')
    let params = {}
    hashes.map(hash => {
        let [key, val] = hash.split('=')
        params[key] = decodeURIComponent(val)
    })

    return params
}

function main(args) {
  console.log("before promise");
    return new Promise((resolve, reject) => {
        console.log("after promise" + args.toString());
        var str = JSON.stringify(args, null, 2);
        console.log("after promise" + str);
        console.log("log log log log ");
        var params = getUrlParams(args.__ow_body)
        console.log("params: " + JSON.stringify(params, null, 2));
        if(!params.username || !params.password) reject({body:{message:'Invalid auth. No credentials supplied'}});
        // hard coded auth
        if(params.username !== 'admin' || params.password !== 'letmein') reject({body:{message:'Invalid auth.'}});

        let token = jwt.sign(params.username, creds.secret);

        var response = {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        token:token
                    };
                    resolve(response);
    });

}

exports.main = main;
