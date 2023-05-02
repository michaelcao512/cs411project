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
    const accesstoken = req.body.accesstoken || null;
    const refreshtoken = req.body.refreshtoken || null;
    const newUser = new User({ accesstoken, refreshtoken });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id/update').patch((req, res) => {
    console.log("UPDATE USER");
    User.findById(req.params.id)
        .then(user => {
            if (!user){
                console.log("USER NOT FOUND");
                return res.status(404).json('Error: User not found')
            }
            user.accesstoken = req.body.accesstoken || user.accesstoken;
            user.refreshtoken = req.body.refreshtoken || user.refreshtoken;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id/delete').delete((req, res) => {
    console.log("DELETE USER");
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                console.log("USER NOT FOUND");
                return res.status(404).json('Error: User not found');
            }
            User.findByIdAndDelete(req.params.id)
                .then(() => res.json('User deleted.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/deleteAll').delete((req, res) => {
    console.log("DELETE ALL USERS");
    User.deleteMany({})
        .then(() => res.json('All users deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router