const User = require('../models/User');

// Get all users
const getUsers = async function (req, res) {
    try {
        // Find all Users.
        const userData = await User.find();
        // If no user exists in our database, return error 404.
        if (!userData) {
            res.status(404).json({ message: "No users found in the database!" });
        }
        // Otherwise, return the user data.
        res.status(200).json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

// Get a single User by _id, along with its populated thought and friend data
const getSingleUser = async function (req, res) {
    try {
        // Find single user based on ID of the route paramater. 
        const userData = await User.findById({
            _id: req.params.userId
        });
        // If no such user exists, return a 404 error.
        if (!userData) {
            res.status(404).json({ message: "No users found in the database!" });
        }
        // Retrieve single user and populate Thought and Friend data
        let selectedUser = userData
            .select('-__v')
            .populate('thoughts')
            .populate('friends');

        // Error handling. Something went wrong with population.
        if (!selectedUser) {
            res.status(404).json({ message: "Error in populating selected user data!" });
        }
        // Otherwise, return the selected user
        res.status(200).json(selectedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
}