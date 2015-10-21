var async = require('async'),
    keystone = require('keystone');

exports = module.exports = {

    check: function(req, res, next) {
        res.status(200).send({
            'compatible_binary': true,
            'update_available': false,
            'update': {
                'uuid': "2.0.1",
                'url': "/kandao/www.zip"
            }
        });
    }
}
