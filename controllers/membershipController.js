const Membership = require('../models/membership');

const createMember = async (req, res) => {
    try {
        const { name, price, summary } = req.body;
        if (!name || !price || !summary) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        let membership = await Membership.findOne({ name });

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

module.exports = { createMember }