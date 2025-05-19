module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define('Schedule', {
        start: DataTypes.DATE,
        end: DataTypes.DATE,
    });

    Schedule.associate = (models) => {
        Schedule.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        Schedule.hasOne(models.Appointment, { foreignKey: 'scheduleId', onDelete: 'CASCADE', as: 'appointment' });
    };

    return Schedule;
};
