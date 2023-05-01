const router = require('express').Router();
let User = require('../model/user.model.js')
router.route('/').get((req, res) => {
    console.log("GET USERS");
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    console.log("ADD USER");
    const accesstoken = req.body.username;
    const refreshtoken = req.body.refreshtoken;
    const newUser = new User({ accesstoken, refreshtoken });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router