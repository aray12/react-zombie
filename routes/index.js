/**
 * Created by alexanderray on 6/23/15.
 */

var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'React Zombie' });
});

module.exports = router;
