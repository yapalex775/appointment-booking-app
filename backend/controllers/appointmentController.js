const { Appointment, Schedule } = require('../models');

exports.index = async (req, res) => {
    try {
        const { userId } = req.user;

        const appointments = await Appointment.findAll({
            where: { userId },
            include: [Appointment.includes.schedule],
            order: [[{ model: Schedule, as: 'schedule' }, 'start', 'DESC']],
        });

        res.json(appointments);
    } catch (err) {
        console.error('Error fetching user appointments:', err);
        res.status(500).json({ message: 'Failed to fetch appointments' });
    }
};

exports.make = async (req, res) => {
    try {
        const { userId } = req.user;
        const { scheduleId, reason } = req.body;
        const appointment = await Appointment.create({ userId, scheduleId, reason });

        const populatedAppointment = await Appointment.findByPk(appointment.id, {
            include: [Appointment.includes.schedule],
        });

        res.status(201).json({ message: 'Appointment created successfully', appointment: populatedAppointment });
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.update = async (req, res) => {
    try {
        const appointment = req.resource;
    
        if (req.body.cancel) {
            appointment.cancelledAt = new Date();
        } else {
            appointment.cancelledAt = null;
        }

        if (req.body.reason) {
            appointment.reason = req.body.reason;
        }

        appointment.scheduleId = req.body.scheduleId;

        await appointment.save();

        const updatedAppointment = await Appointment.findByPk(appointment.id, {
            include: [Appointment.includes.schedule],
        });

        let message = 'Appointment rescheduled successfully';

        if (req.body.cancel) {
            message = 'Appointment cancelled successfully';
        }
    
        res.status(200).json({ message, appointment: updatedAppointment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
