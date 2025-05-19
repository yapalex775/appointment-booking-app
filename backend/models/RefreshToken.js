module.exports = (sequelize, DataTypes) => {
    const RefreshToken = sequelize.define('RefreshToken', {
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });
    
    RefreshToken.associate = (models) => {
        RefreshToken.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return RefreshToken;
};
