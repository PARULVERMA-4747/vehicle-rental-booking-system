module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
        vehicleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        vehicleTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        wheels: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        customerName: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {});

    Booking.associate = function(models) {
        Booking.belongsTo(models.Vehicle, {
            foreignKey: 'vehicleId',
            as: 'vehicle'
        });
    };

    return Booking;
};