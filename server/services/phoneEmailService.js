const https = require('https');

exports.verifyToken = (user_json_url) => {
    return new Promise((resolve, reject) => {
        if (!user_json_url) {
            return reject(new Error('Missing user_json_url'));
        }

        https.get(user_json_url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    // Expected format directly from the URL response:
                    // { 
                    //   "user_country_code": "+91", 
                    //   "user_phone_number": "9876543210", 
                    //   ... 
                    // }
                    resolve(parsed);
                } catch (e) {
                    reject(e);
                }
            });

        }).on('error', (err) => {
            reject(err);
        });
    });
};
