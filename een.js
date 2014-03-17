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

exports.getVideo = function(opts, success, failure) {
    var src_url = [   host,
                    '/asset/play/video.mp4?c=', opts.c,
                    ';T=', opts.ts || 'now',
                    ';e=', opts.e || 'event',
                    ';q=', opts.a || 'low'
                    ].join('')
    console.log('Requesting video: ' + src_url)
    return  request.get({
                    url: src_url,
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

exports.DtoS = function(epoch_time) {
    var yy, mm, dd, hr, mn, sc, ms, timecode, jstime;
        jstime = new Date(epoch_time);
        yy = jstime.getUTCFullYear();
        mm = this._padTo2Digits(1 + jstime.getUTCMonth());
        dd = this._padTo2Digits(jstime.getUTCDate());
        hr = this._padTo2Digits(jstime.getUTCHours());
        mn = this._padTo2Digits(jstime.getUTCMinutes());
        sc = this._padTo2Digits(jstime.getUTCSeconds());
        ms = jstime.getUTCMilliseconds();
        if (ms < 10) {
            ms = '00' + ms;
        } else if (ms < 100) {
            ms = '0' + ms;
        }
        timecode = yy + mm + dd + hr + mn + sc + '.' + ms;
        return timecode;
}

exports._padTo2Digits = function(num) {
    return (((num < 10) ? '0' : '') + num);
}

exports.StoD = function (timecode) {
    if(timecode) {
        var yy, mm, dd, hr, mn, sc, ms, jstime;
        yy = parseInt(timecode.substring(0, 4), 10);
        mm = parseInt(timecode.substring(4, 6), 10);
        dd = parseInt(timecode.substring(6, 8), 10);
        hr = parseInt(timecode.substring(8, 10), 10);
        mn = parseInt(timecode.substring(10, 12), 10);
        sc = parseInt(timecode.substring(12, 14), 10);
        ms = parseInt(timecode.substring(15), 10);
        jstime = new Date(Date.UTC(yy, mm - 1, dd, hr, mn, sc, ms));
        return jstime.valueOf();
    }
}
