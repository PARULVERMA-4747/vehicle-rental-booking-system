// models/vehicle.js

module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define('Vehicle', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        vehicleTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    Vehicle.associate = (models) => {
        Vehicle.belongsTo(models.VehicleType, { foreignKey: 'vehicleTypeId', as: 'vehicleType' });
    };

    return Vehicle;
};