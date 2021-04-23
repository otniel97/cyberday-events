'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Destinations', [{
            name: 'Cusco, Perú',
            image: 'no-image.jpg',
            url: 'https://www.denomades.com/cusco',
            status: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Destinations', null, {});
    }
};