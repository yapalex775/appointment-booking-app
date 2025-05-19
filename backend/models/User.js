module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
    });
    
    User.associate = (models) => {
        User.hasMany(models.Schedule, { foreignKey: 'userId', onDelete: 'CASCADE' });
        User.hasMany(models.Appointment, { foreignKey: 'userId', onDelete: 'CASCADE' });
    
        User.belongsToMany(models.Office, {
            through: models.UserOffice,
            foreignKey: 'userId',
            otherKey: 'officeId',
            as: 'offices'
        });
    };

    return User;
};
