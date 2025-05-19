module.exports = (sequelize, DataTypes) => {
    const UserOffice = sequelize.define('UserOffice', {}, {
        indexes: [
            {
            unique: true,
            fields: ['userId', 'officeId']
            }
        ],
        timestamps: false
    });

    return UserOffice;
};
