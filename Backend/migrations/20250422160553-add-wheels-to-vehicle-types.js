module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('VehicleTypes', 'wheels', {
            type: Sequelize.INTEGER,
            allowNull: false, // Modify as needed, depending on whether it's required
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('VehicleTypes', 'wheels');
    }
};