const jwt = require('jsonwebtoken');
const creds = require('./creds.json');

function main(args) {
  console.log("before promise");
    return new Promise((resolve, reject) => {
        console.log("after promise" + args.toString());
        if(!args.username || !args.password) reject({message:'Invalid auth'});
        // hard coded auth
        if(args.username !== 'admin' || args.password !== 'letmein') reject({message:'Invalid auth'});

        let token = jwt.sign(args.username, creds.secret);
        resolve({
            token:token
        });

    });

}

exports.main = main;
