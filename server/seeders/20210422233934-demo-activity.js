'use strict';

const Destination = require('../models').Destination;

module.exports = {
    up: async(queryInterface, Sequelize) => {
        const destinations = await Destination.findAll();
        return queryInterface.bulkInsert('Activities', [{
            name: 'Machu Picchu by Car (2 días)',
            image: 'no-image.jpg',
            url: 'https://www.denomades.com/cusco/machu-picchu-by-car-id743',
            usdPrice: 100,
            clpPrice: 50,
            description: 'Nuestro tour para mochileros Machu Picchu by Car es el más económico para visitar Machu Picchu desde Cusco. Incluye transporte, alojamiento y tour guiado.',
            startDate: '2021-04-28',
            endDate: '2021-05-02',
            offerDay: 3,
            discountRate: 10,
            inOffer: 1,
            status: 1,
            destinationId: destinations[0].id,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Activities', null, {});
    }
};