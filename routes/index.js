
/*
 * GET home page.
 */


exports.index = function(req, res){
  res.render('index', {});
};


exports.img = function(req, future_response) {
    een.getImage({'c': req.params['c'], 'ts': req.params['ts'] || 'now' })
        .pipe(future_response);
}

exports.next_img = function(req, future_response) {
    een.getNextImage({'c': req.params['c'], 'ts': req.params['ts'] || 'now' })
        .pipe(future_response);

}

exports.after_img = function(req, future_response) {
    een.getAfterImage({'c': req.params['c'], 'ts': req.params['ts'] || 'now' })
        .pipe(future_response);

}

exports.prev_img = function(req, future_response) {
    een.getPrevImage({'c': req.params['c'], 'ts': req.params['ts'] || 'now' })
        .pipe(future_response);

}

exports.video = function(req, future_response) {
    een.getVideo({'c': req.params['c'], 'ts': req.params['ts'] || 'now' })
        .pipe(future_response);
}
