const Membership = require('../models/membership');

// Create membership plan
const createMember = async (req, res) => {
    try {
        const { name, price, summary } = req.body;
        if (!name || !price || !summary) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        let membership = await Membership.findOne({ _id: req.params.id });

        if (membership) {
            return res.status(400).json({ message: 'Membership Already created' })
        }

        const newMembership = new Membership({ name, price, summary });

        await newMembership.save();

        res.status(201).json({
            name: newMembership.name,
            price: newMembership.price,
            summary: newMembership.summary
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in create membership plan', error.message);
    }
};

// Get Memberplan 
const getMembership = async (req, res) => {
    try {
        const membershipPlans = await Membership.find();
        res.status(200).json(membershipPlans);
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log('Error in get membership plan', error.message)
    }
};

// Update Membership Plan
const updateMembership = async (req, res) => {
    const { name, price, summary } = req.body;
    const membershipId = req.params.id;
    try {
        let membership = await Membership.findById(membershipId)
        if (!membership) {
            return res.status(400).json({ message: 'No Plan found' });
        }

        membership.name = name || membership.name;
        membership.price = price || membership.price;
        membership.summary = summary || membership.summary;

        membership = await membership.save();
        res.status(200).json({ message: 'Plan Updated', membership })

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in Update Membership Plan', error.message)
    }
};

// Delete Membership Plan
const deleteMembership = async (req, res) => {
    try {
        const membership = await Membership.findById(req.params.id);
        if (!membership) {
            return res.status(401).json({ message: 'Membership does not exist' });
        }

        await Membership.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Your memberplan has been removed" });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('Error in Delete Membership Plan', error.message)
    }
};

// Get Memberplan by Id
const getidmembership = async (req, res) => {
    try {
        const membership = await Membership.findById(req.params.id);
        if (!membership) {
            return res.status(404).json(' Plan does not exist');
        }
        res.status(200).json({ membership });
    } catch (error) {
        console.error('Error in membership plan get id', error);
        res.status(500).json({ message: error.message });
    }
};

// Purchase Membership Plan


// Get monthly income for membership



module.exports = { createMember, updateMembership, getMembership, deleteMembership, getidmembership };