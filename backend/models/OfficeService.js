module.exports = (sequelize, DataTypes) => {
    const OfficeService = sequelize.define('OfficeService', {}, {
        indexes: [
            {
            unique: true,
            fields: ['officeId', 'serviceId']
            }
        ],
        timestamps: false
    });

    return OfficeService;
};

