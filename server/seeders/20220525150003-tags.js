'use strict'

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('Tags', [
            {
                id: 1,
                name: 'auto',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: 'phone',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                name: 'apartment',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                name: 'dog',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 5,
                name: 'cat',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 6,
                name: 'service',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 7,
                name: 'furniture',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },
}
