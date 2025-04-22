// models/vehicleType.js

module.exports = (sequelize, DataTypes) => {
    const VehicleType = sequelize.define('VehicleType', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        wheels: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    VehicleType.associate = (models) => {
        VehicleType.hasMany(models.Vehicle, { foreignKey: 'vehicleTypeId', as: 'vehicles' });
    };

    return VehicleType;
};