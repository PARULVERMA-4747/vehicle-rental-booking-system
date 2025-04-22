module.exports = {
    async up(queryInterface, Sequelize) {
        // Insert vehicle types with wheels count
        const vehicleTypes = await queryInterface.bulkInsert(
            "VehicleTypes", [
                { name: "Hatchback", wheels: 4, createdAt: new Date(), updatedAt: new Date() },
                { name: "SUV", wheels: 4, createdAt: new Date(), updatedAt: new Date() },
                { name: "Sedan", wheels: 4, createdAt: new Date(), updatedAt: new Date() },
                { name: "Cruiser Bike", wheels: 2, createdAt: new Date(), updatedAt: new Date() }
            ], { returning: true }
        );

        // Insert vehicles associated with each type
        await queryInterface.bulkInsert("Vehicles", [
            { name: "Swift", vehicleTypeId: vehicleTypes[0].id, createdAt: new Date(), updatedAt: new Date() },
            { name: "Creta", vehicleTypeId: vehicleTypes[1].id, createdAt: new Date(), updatedAt: new Date() },
            { name: "Honda City", vehicleTypeId: vehicleTypes[2].id, createdAt: new Date(), updatedAt: new Date() },
            { name: "Royal Enfield", vehicleTypeId: vehicleTypes[3].id, createdAt: new Date(), updatedAt: new Date() }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Vehicles", null, {});
        await queryInterface.bulkDelete("VehicleTypes", null, {});
    }
};