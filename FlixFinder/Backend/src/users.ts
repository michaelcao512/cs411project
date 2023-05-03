const router = require('express').Router();
let User = require('../model/user.model.jts/index.js')

router.route('/').get((req, res) => {
    console.log("GET USERS");
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    console.log("ADD USER");
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Empty request body' });
      }
    const newUser = new User(req.body);
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id/update').patch((req, res) => {
    console.log("UPDATE USER");
    const filter = { _id: req.params.id };
    const update = { $set: req.body };
    User.updateOne(filter, update)
      .then(result => {
        if (result.modifiedCount === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ message: 'User updated' });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

  router.route('/:id/delete').delete((req, res) => {
    console.log("DELETE USER");
    const filter = { _id: req.params.id };
    User.deleteOne(filter)
      .then(result => {
        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ message: 'User deleted' });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

router.route('/deleteAll').delete((req, res) => {
    console.log("DELETE ALL USERS");
    User.deleteMany({})
        .then(() => res.json('All users deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id/addgenre').patch((req, res) => {
    console.log("ADD GENRE TO USER");
    const filter = { _id: req.params.id };
    const update = { $push: { genres: req.body.genre } };
    User.updateOne(filter, update)
      .then(result => {
        if (result.modifiedCount === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ message: 'Genre added to user' });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id/deletegenre').patch((req, res) => {
    console.log("DELETE GENRE FROM USER");
    const filter = { _id: req.params.id };
    const update = { $pull: { genres: req.body.genre } };
    User.updateOne(filter, update)
      .then(result => {
        if (result.modifiedCount === 0) {
          return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ message: 'Genre deleted from user' });
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router