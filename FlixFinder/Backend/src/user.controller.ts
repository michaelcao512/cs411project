import User from "./user.model";
import { Request, Response } from "express";

const getUsers = (req: Request, res: Response) => {
  console.log("GET USERS");
  User.find()
      .then(users => res.json(users))
      .catch( (err: Error) => res.status(400).json('Error: ' + err));
};

const addUser = (req: Request, res: Response) => {
  console.log("ADD USER");
  if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ message: 'Empty request body' });
    }
  const newUser = new User(req.body);
  newUser.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err))
};

const updateUser = (req: Request, res: Response) => {
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
};

const deleteUser = (req: Request, res: Response) => {
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
};

const deleteAllUsers = (req: Request, res: Response) => {
  console.log("DELETE ALL USERS");
  User.deleteMany({})
      .then(() => res.json('All users deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
};

const addGenreToUser = (req: Request, res: Response) => {
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
};

const deleteGenreFromUser = (req: Request, res: Response) => {
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
};

export { getUsers, addUser, updateUser, deleteUser, deleteAllUsers, addGenreToUser, deleteGenreFromUser };