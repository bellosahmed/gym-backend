const Gymstore = require('../models/gymstore');

// Get gym item by id
const getidgymstore = async (req, res) => {
    try {
        const gymstore = await Gymstore.findById(req.params.id);
        if (!gymstore) {
            return res.status(404).json({ message: 'Item does not exist' });
        }
        res.status(200).json({ gymstore });
    } catch (error) {
        console.error('Error in gym store get id', error);
        res.status(500).json({ message: error.message });
    }
};

// Get Store items user and admin
const getgymstore = async (req, res) => {
    try {
        const Gymstores = await Gymstore.find();
        res.status(200).json(Gymstores);
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log('Error in get gym stores', error.message)
    }
};

// Create Store items only admin
const creategymstore = async (req, res) => {
    try {
        const { name, price, summary, description } = req.body;
        if (!name || !price || !summary || !description) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        let gymstore = await Gymstore.findOne({ _id: req.params.id });

        if (gymstore) {
            return res.status(400).json({ message: 'Item Already created' })
        }

        const newGymstore = new Gymstore({ name, price, summary, description });

        await newGymstore.save();

        res.status(201).json({
            name: newGymstore.name,
            price: newGymstore.price,
            summary: newGymstore.summary,
            description: newGymstore.description
        });

    } catch (error) {
        console.error('Error in gym store:', error);
        res.status(500).json({ message: error.message });
    }
};

// Edit or update items  only admin
const updategymstore = async (req, res) => {
    const { name, price, summary, description } = req.body;
    const gymstoreId = req.params.id;
    try {
        let gymstore = await Gymstore.findById(gymstoreId);
        if (!gymstore) {
            return res.status(400).json({ message: 'No item found' });
        }

        gymstore.name = name || gymstore.name;
        gymstore.price = price || gymstore.price;
        gymstore.summary = summary || gymstore.summary;
        gymstore.description = description || gymstore.description;

        gymstore = await gymstore.save();
        res.status(200).json({ message: "Item Updated", gymstore });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in Update Gym store item', error.message)
    }
};

// Delete items only admin
const deletegymstore = async (req, res) => {
    try {
        const gymstore = await Gymstore.findById(req.params.id);
        if (!gymstore) {
            return res.status(401).json({ message: 'Store Item does not exist' });
        }
        await Gymstore.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Your item has been removed" });


    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in Delete Gym Store Item', error.message)
    }
};

// Purchase items user 


// Get monthly income in gymstores


// Admin can get users membership

module.exports = { creategymstore, getgymstore, deletegymstore, updategymstore, getidgymstore };