const { Sequelize } = require('sequelize');

const { Schedule, Appointment } = require('../models');

exports.getSchedules = async (req, res) => {
    try {
        const { inclusive, allowedScheduleIds } = req.query;

        const options = {
            where: {
                userId: req.params.id,
            },
            attributes: ['id', 'start'],
            include: [
                {
                    model: Appointment,
                    as: 'appointment',
                    required: false,
                },
            ],
        };

        const scheduleIdsArray = allowedScheduleIds 
            ? allowedScheduleIds.split(',').map(id => Number(id)).filter(Boolean) 
            : [];

        if (inclusive !== 'true') {
            options.having = Sequelize.literal('`appointment`.`id` IS NULL');
        }

        if (inclusive === 'true' && scheduleIdsArray.length > 0) {
            options.having = Sequelize.literal(
                `\`appointment\`.\`id\` IS NULL OR \`Schedule\`.\`id\` IN (${scheduleIdsArray.join(',')})`
            );
        }

        const schedules = await Schedule.findAll(options);

        res.json(schedules);
    } catch (err) {
        console.error('Error fetching user schedules:', err);
        res.status(500).json({ error: 'Failed to retrieve user schedules' });
    }
};
