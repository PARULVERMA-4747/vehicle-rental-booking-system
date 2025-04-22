module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('VehicleTypes', 'wheels', {
            type: Sequelize.INTEGER,
            allowNull: true, // Allow NULL temporarily
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('VehicleTypes', 'wheels');
    }
};