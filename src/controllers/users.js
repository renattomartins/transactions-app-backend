const User = require('../models/User');

exports.buildLocation = (req, resourceId) =>
    `${req.protocol}://${req.get('host')}/users/${resourceId}`; // @todo Reverse to private function

exports.createUser = (req, res, next) => {
    const email = req.body.email;
    const pass = req.body.password;
    const user = new User(email, pass);
    user.store();
    res.set('Location', this.buildLocation(req, user.getId()));
    res.status(201).json(user.toJson());
};