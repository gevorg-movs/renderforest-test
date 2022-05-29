'use strict'

const yerevanCities = [
    {
        id: 1,
        regionId: 1,
        name: 'Ajapnyak',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 2,
        regionId: 1,
        name: 'Arabkir',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 3,
        regionId: 1,
        name: 'Avan',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 4,
        regionId: 1,
        name: 'Davitashen',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 5,
        regionId: 1,
        name: 'Erebuni',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]

const armavirCities = [
    {
        id: 6,
        regionId: 2,
        name: 'Armavir',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 7,
        regionId: 2,
        name: 'Echmiadzin',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 8,
        regionId: 2,
        name: 'Merdzavan',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 9,
        regionId: 2,
        name: 'Metsamor',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 10,
        regionId: 2,
        name: 'Musaler',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]

const artashatCities = [
    {
        id: 11,
        regionId: 3,
        name: 'Artashat',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 12,
        regionId: 3,
        name: 'Masis',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 13,
        regionId: 3,
        name: 'Ararat',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 14,
        regionId: 3,
        name: 'Ayntap',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 15,
        regionId: 3,
        name: 'Hayanist',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]

const kotaykCities = [
    {
        id: 16,
        regionId: 4,
        name: 'Abovian',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 17,
        regionId: 4,
        name: 'Hrazdan',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 18,
        regionId: 4,
        name: 'Aghveran',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 19,
        regionId: 4,
        name: 'Arinj',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 20,
        regionId: 4,
        name: 'Arzni',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]

module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert('Cities', [
            ...yerevanCities,
            ...armavirCities,
            ...artashatCities,
            ...kotaykCities,
        ])
    },
}
