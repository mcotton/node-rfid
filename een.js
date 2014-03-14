var request = require('request'),
    cookie_jar = request.jar(),
    host = 'https://api.eagleeyenetworks.com';

// make the cookie jar available outside this module
exports.cookie_jar = cookie_jar;

exports.login = function(opts, success, failure) {
    request.post({
        url: host + '/g/aaa/authenticate',
        jar: cookie_jar,
        json: true,
        body: {
            'username': opts.username,
            'password': opts.password,
            'realm': opts.realm || 'eagleeyenetworks'
        }
        }, function(err, res, body) {
            if (err) { console.log(err,res,body); }
            if (!err && res.statusCode == 200) {
                request.post({
                    url: host + '/g/aaa/authorize',
                    jar: cookie_jar,
                    json: true,
                    body: { token: res.body.token }
                    }, function(err, res, body) {
                            if (err) { throw new Error('Authorize error') }
                            if (!err && res.statusCode == 200) {
                                // call success callback with user object
                                if ( typeof success === 'function') success(res.body);
                        }
                })
            } else {
                // call failure callback with status code
                if ( typeof failure === 'function') failure(res.statusCode);
            }
        }
    )
}

// /asset/asset/image.jpeg?c=10074f79;t=20140313234639.472;q=high;a=all
exports.getImage = function(opts, success, failure) {
    var img_url = [   host,
                    '/asset/asset/image.jpeg?c=', opts.c,
                    ';t=', opts.ts || 'now',
                    ';q=', opts.q || 'high',
                    ';a=', opts.a || 'all'
                    ].join('')
    console.log('Requesting image: ' + img_url)
    return  request.get({
                    url: img_url,
                    jar: cookie_jar
                },
                function (err, res, body) {
                    if (err) { return err }
                    if (!err && res.statusCode == 200) {}
                    return res
                }
            )

}


exports.getPrevImage = function(opts, success, failure) {
    var img_url = [   host,
                    '/asset/prev/image.jpeg?c=', opts.c,
                    ';t=', opts.ts || 'now',
                    ';q=', opts.q || 'high',
                    ';a=', opts.a || 'all'
                    ].join('')
    console.log('Requesting previous image: ' + img_url)
    return  request.get({
                    url: img_url,
                    jar: cookie_jar
                },
                function (err, res, body) {
                    if (err) { return err }
                    if (!err && res.statusCode == 200) {}
                    return res
                }
            )

}

exports.getNextImage = function(opts, success, failure) {
    var img_url = [   host,
                    '/asset/next/image.jpeg?c=', opts.c,
                    ';t=', opts.ts || 'now',
                    ';q=', opts.q || 'high',
                    ';a=', opts.a || 'all'
                    ].join('')
    console.log('Requesting next image: ' + img_url)
    return  request.get({
                    url: img_url,
                    jar: cookie_jar
                },
                function (err, res, body) {
                    if (err) { return err }
                    if (!err && res.statusCode == 200) {}
                    return res
                }
            )

}

exports.getAfterImage = function(opts, success, failure) {
var img_url = [   host,
                '/asset/after/image.jpeg?c=', opts.c,
                ';t=', opts.ts || 'now',
                ';q=', opts.q || 'high',
                ';a=', opts.a || 'all'
                ].join('')
console.log('Requesting after image: ' + img_url)
return  request.get({
                url: img_url,
                jar: cookie_jar
            },
            function (err, res, body) {
                if (err) { return err }
                if (!err && res.statusCode == 200) {}
                return res
            }
        )
}

exports.getImageList = function(opts, success, failure) {

}

exports.getDeviceList = function(opts, success, failure) {

}

exports.startPolling = function(opts, success, failure) {

}

exports.continuePolling = function(opts, success, failure) {

}
