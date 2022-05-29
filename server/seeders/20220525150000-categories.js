'use strict'

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('Categories', [
            {
                id: 1,
                name: 'Estate',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: 'Vehicles',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                name: 'Electronics',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                name: 'Garden',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                name: 'Jobs',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },
}
