'use strict'

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('Regions', [
            {
                id: 1,
                name: 'Yerevan',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 2,
                name: 'Armavir',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 3,
                name: 'Ararat',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: 4,
                name: 'Kotayk',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ])
    },
}
