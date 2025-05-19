const { Office, Service, User } = require('../models');

exports.index = async (req, res) => {
    try {
        const offices = await Office.findAll({
            include: {
                model: Service,
                as: 'services',
                through: { attributes: [] }
            }
        });
        res.json(offices);
    } catch (err) {
        console.error('Error fetching offices with services:', err);
        res.status(500).json({ error: 'Failed to retrieve offices with services' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const offices = await Office.findOne({
            where: { id: req.params.id },
            include: {
                model: User,
                as: 'users',
                through: { attributes: [] },
                attributes: ['id', 'name']
            },
        });
        res.json(offices);
    } catch (err) {
        console.error('Error fetching offices with services:', err);
        res.status(500).json({ error: 'Failed to retrieve offices with services and dentists' });
    }
};
