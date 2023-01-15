const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = require('../models/user.model');

module.exports = {
  getAllUsers: async (req, res) => {
    const usersList = await UserSchema.find().select('-password');

    if (!usersList) return res.status(404).json({ message: 'not found' });

    return res.status(200).send(usersList);
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await UserSchema.findOne({ email });
    if (!user) return res.status(404).json({ message: 'no such user exists' });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(401).json({ message: 'credentials do not match' });

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

    return res.status(200).json({ message: 'successfully logged in', token });
  },
  register: async (req, res) => {
    const { displayName, email, password } = req.body;

    const emailExist = await UserSchema.findOne({ email });
    if (emailExist) return res.status(409).json({ message: 'user already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserSchema({
      displayName,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(200).json({ message: 'successfully registered' });
  },
};
