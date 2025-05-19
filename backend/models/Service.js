module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
        name: DataTypes.STRING
    });
    
    Service.associate = (models) => {
        Service.belongsToMany(models.Office, {
            through: models.OfficeService,
            timestamps: false,
            foreignKey: 'serviceId',
            otherKey: 'officeId',
            as: 'offices'
        });
    };

    return Service;
};
