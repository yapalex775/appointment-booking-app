module.exports = (sequelize, DataTypes) => {
    const Office = sequelize.define('Office', {
        name: DataTypes.STRING,
        address: DataTypes.STRING
    });
    
    Office.associate = (models) => {
        Office.belongsToMany(models.Service, {
            through: models.OfficeService,
            timestamps: false,
            foreignKey: 'officeId',
            otherKey: 'serviceId',
            as: 'services'
        });
    
        Office.belongsToMany(models.User, {
            through: models.UserOffice,
            foreignKey: 'officeId',
            otherKey: 'userId',
            as: 'users'
        });
    };

    return Office;
};
