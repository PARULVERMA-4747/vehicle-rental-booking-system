module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Bookings', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            vehicleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Vehicles',
                    key: 'id'
                },
                allowNull: false
            },
            bookingDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            customerName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Bookings');
    }
};