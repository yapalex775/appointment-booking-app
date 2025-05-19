module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
        reason: DataTypes.STRING,
        cancelledAt: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        scopes: {
            isActive(active = true) {
                return {
                where: {
                    cancelledAt: active ? null : {
                        [sequelize.Sequelize.Op.not]: null,
                    }
                }
                };
            }
        }
    });
    
    Appointment.associate = (models) => {
        Appointment.belongsTo(models.Schedule, { foreignKey: 'scheduleId', as: 'schedule' });
        Appointment.belongsTo(models.User, { foreignKey: 'userId' });

        Appointment.includes = {
            schedule: {
                model: models.Schedule,
                as: 'schedule',
                include: [
                    {
                        model: models.User,
                        as: 'user',
                        attributes: ['id', 'name', 'email'],
                        include: [
                            {
                                model: models.Office,
                                attributes: ['id', 'name', 'address'],
                                through: { attributes: [] },
                                include: [
                                    {
                                        model: models.Service,
                                        as: 'services',
                                        attributes: ['id', 'name'],
                                        through: { attributes: [] },
                                    },
                                ],
                                as: 'offices',
                            },
                        ],
                    },
                ],
            },
        };
    };

    return Appointment;
};
