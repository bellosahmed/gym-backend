// import files
const Membership = require('../models/membership');
const User = require('../models/user');

// Create membership plan only admin
const createMember = async (req, res) => {
    try {
        const { name, price, summary } = req.body;
        const userId = req.user.id
        if (!name || !price || !summary) {
            return res.status(400).json({ message: 'Please fill all fields' }); // will only create if the fields are complete
        }

        let membership = await Membership.findOne({ _id: req.params.id }); // find membership by id

        if (membership) {
            return res.status(400).json({ message: 'Membership Already created' }) // if it is already created
        }

        const newMembership = new Membership({ name, price, summary });

        await newMembership.save(); // save in the database


        // will return as the output
        res.status(201).json({
            name: newMembership.name,
            price: newMembership.price,
            summary: newMembership.summary
        });
    } catch (error) {
        // if there is error
        res.status(500).json({ message: error.message });
        console.log('Error in create membership plan', error.message);
    }
};

// Get Memberplan 
const getMembership = async (req, res) => {
    try {
        const membershipPlans = await Membership.find(); // to get all membership plans
        res.status(200).json(membershipPlans); // will return as the output
    } catch (error) {
        // if there is error
        res.status(500).json({ message: error.message })
        console.log('Error in get membership plan', error.message)
    }
};

// Update Membership Plan
const updateMembership = async (req, res) => {
    const { name, price, summary } = req.body;
    const membershipId = req.params.id;
    try {
        let membership = await Membership.findById(membershipId) // find by membership id
        if (!membership) {
            return res.status(400).json({ message: 'No Plan found' }); // if no membership plan has beem created
        }

        // to edit the following
        membership.name = name || membership.name;
        membership.price = price || membership.price;
        membership.summary = summary || membership.summary;

        membership = await membership.save(); // to save in the database
        res.status(200).json({ message: 'Plan Updated', membership }) // to get the edited plan 

    } catch (error) {
        // if there is error
        res.status(500).json({ message: error.message });
        console.log('Error in Update Membership Plan', error.message)
    }
};

// Delete Membership Plan
const deleteMembership = async (req, res) => {
    try {
        const membership = await Membership.findById(req.params.id); // find by id
        if (!membership) {
            return res.status(401).json({ message: 'Membership does not exist' }); // if no plan has been created
        }

        await Membership.findByIdAndDelete(req.params.id); // will find the id and delete it

        res.status(200).json({ message: "Your memberplan has been removed" }); // when plan has been delete

    } catch (error) {
        // if there is error
        res.status(500).json({ message: error.message });
        console.log('Error in Delete Membership Plan', error.message)
    }
};

// Get Memberplan by Id
const getidmembership = async (req, res) => {
    try {
        const membership = await Membership.findById(req.params.id); // find by id
        if (!membership) {
            return res.status(404).json(' Plan does not exist'); // if plan did not exist
        }
        res.status(200).json({ membership }); // will get the plan by id
    } catch (error) {
        // if there is error
        console.error('Error in membership plan get id', error);
        res.status(500).json({ message: error.message });
    }
};

// Purchase Membership Plan


// Get monthly income for membership


// Once membership is done dont forget to implement a countdown time that will impact the user


// Admin can get users membership and see the countdown


// to export files
module.exports = { createMember, updateMembership, getMembership, deleteMembership, getidmembership };