/**
 * Created by alexanderray on 6/23/15.
 */

var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'React Zombie' });
});

router.post('/auth', function(req, res) {
    var secret = 'super secret key';
    var profile = {
        userID: 1234,
        username: req.body.username
    };

    var token = jwt.sign(profile, secret, {expiresInMinutes: 60 * 5});

    res.json({token: token, profile: profile});
});

module.exports = router;
