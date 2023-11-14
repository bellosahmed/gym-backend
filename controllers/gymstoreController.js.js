// import files
const Gymstore = require('../models/gymstore');
const User = require('../models/user');

// Get gym item by id
const getidgymstore = async (req, res) => {
    try {
        const gymstore = await Gymstore.findById(req.params.id); // find by id
        if (!gymstore) {
            return res.status(404).json({ message: 'Item does not exist' }); // when item is not created
        }
        res.status(200).json({ gymstore }); // will find item by id
    } catch (error) {
        // if there is error
        console.error('Error in gym store get id', error);
        res.status(500).json({ message: error.message });
    }
};

// Get Store items user and admin
const getgymstore = async (req, res) => {
    try {
        const Gymstores = await Gymstore.find(); // to find all items
        res.status(200).json(Gymstores); // will get all items in the store
    } catch (error) {
        // if there is error
        res.status(500).json({ message: error.message })
        console.log('Error in get gym stores', error.message)
    }
};

// Create Store items only admin
const creategymstore = async (req, res) => {
    try {
        const { name, price, summary, description } = req.body;
        const userId = req.user.id;
        if (!name || !price || !summary || !description) {
            return res.status(400).json({ message: 'Please fill all fields' }); // you must fill the fields
        }

        let gymstore = await Gymstore.findOne({ _id: req.params.id }); // find by id

        if (gymstore) {
            return res.status(400).json({ message: 'Item Already created' }) // when item has been created
        }

        const newGymstore = new Gymstore({ name, price, summary, description }); // to create new item

        await newGymstore.save(); // save in the database

        // to create the following
        res.status(201).json({
            name: newGymstore.name,
            price: newGymstore.price,
            summary: newGymstore.summary,
            description: newGymstore.description
        });

    } catch (error) {
        // if there is error
        console.error('Error in gym store:', error);
        res.status(500).json({ message: error.message });
    }
};

// Edit or update items  only admin
const updategymstore = async (req, res) => {
    const { name, price, summary, description } = req.body;
    const gymstoreId = req.params.id;
    try {
        let gymstore = await Gymstore.findById(gymstoreId); // find by id
        if (!gymstore) {
            return res.status(400).json({ message: 'No item found' }); // if there is no item
        }

        // to edit the following
        gymstore.name = name || gymstore.name;
        gymstore.price = price || gymstore.price;
        gymstore.summary = summary || gymstore.summary;
        gymstore.description = description || gymstore.description;

        gymstore = await gymstore.save(); // save in the database
        res.status(200).json({ message: "Item Updated", gymstore }); // will return the update item

    } catch (error) {
        // if there is error
        res.status(500).json({ message: error.message });
        console.log('Error in Update Gym store item', error.message)
    }
};

// Delete items only admin
const deletegymstore = async (req, res) => {
    try {
        const gymstore = await Gymstore.findById(req.params.id); // find by id
        if (!gymstore) {
            return res.status(401).json({ message: 'Store Item does not exist' }); // if there is no item
        }
        await Gymstore.findByIdAndDelete(req.params.id); // will find by id and delete

        res.status(200).json({ message: "Your item has been removed" }); // when it is deleted


    } catch (error) {
        // if there is error
        res.status(500).json({ message: error.message });
        console.log('Error in Delete Gym Store Item', error.message)
    }
};

// Purchase items user 


// Get monthly income in gymstores


// Admin can get users membership


// to export files
module.exports = { creategymstore, getgymstore, deletegymstore, updategymstore, getidgymstore };