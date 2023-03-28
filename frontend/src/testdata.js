export const testRDI = [
    {
        nutrientId: 0,
        min: 2000,
        max: 2500,
    },
    {
        nutrientId: 1,
        min: 100,
        max: 150,
    },
    {
        nutrientId: 2,
        min: 50,
        max: 100,
    },
    {
        nutrientId: 3,
        min: 100,
        max: 150,
    },
];

export const testNutrients = [
    {
        id: 0,
        name: "Calories",
    },
    {
        id: 1,
        name: "Carbs",
    },
    {
        id: 2,
        name: "Fat",
    },
    {
        id: 3,
        name: "Protein",
    },
];

export const testFood = [
    {
        id: 1,
        name: "Eggs",
        servings: 1,
        unit: "whole",
        nutrients: [
            {
                nutrientId: 0,
                amount: 150,
            },
            {
                nutrientId: 1,
                amount: 2,
            },
            {
                nutrientId: 2,
                amount: 4,
            },
            {
                nutrientId: 3,
                amount: 6,
            },
        ],
    },
    {
        id: 2,
        name: "Milk",
        servings: 8,
        unit: "oz",
        nutrients: [
            {
                nutrientId: 0,
                amount: 230,
            },
            {
                nutrientId: 1,
                amount: 2,
            },
            {
                nutrientId: 2,
                amount: 4,
            },
            {
                nutrientId: 3,
                amount: 6,
            },
        ],
    },
    {
        id: 3,
        name: "Cereal",
        servings: 1,
        unit: "cup",
        nutrients: [
            {
                nutrientId: 0,
                amount: 120,
            },
            {
                nutrientId: 1,
                amount: 2,
            },
            {
                nutrientId: 2,
                amount: 4,
            },
            {
                nutrientId: 3,
                amount: 6,
            },
        ],
    },
    {
        id: 4,
        name: "Banana",
        servings: 1,
        unit: "whole",
        nutrients: [
            {
                nutrientId: 0,
                amount: 80,
            },
            {
                nutrientId: 1,
                amount: 2,
            },
            {
                nutrientId: 2,
                amount: 4,
            },
            {
                nutrientId: 3,
                amount: 6,
            },
        ],
    },
];

const today = new Date();
const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
);
const tomorrow = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
);

export const testFoodLogs = [
    {
        id: 1,
        date: today,
        food: testFood[0],
        amount: 2,
    },
    {
        id: 2,
        date: today,
        food: testFood[2],
        amount: 4,
    },
    // {
    //     id: 3,
    //     date: today,
    //     food: testFood[3],
    //     amount: 6,
    // },
    {
        id: 4,
        date: today,
        food: testFood[1],
        amount: 2,
    },
    {
        id: 5,
        date: today,
        food: testFood[0],
        amount: 4,
    },
    {
        id: 6,
        date: yesterday,
        food: testFood[0],
        amount: 8,
    },
    {
        id: 7,
        date: yesterday,
        food: testFood[1],
        amount: 3,
    },
    {
        id: 8,
        date: yesterday,
        food: testFood[2],
        amount: 9,
    },
    {
        id: 9,
        date: tomorrow,
        food: testFood[3],
        amount: 3,
    },
    {
        id: 10,
        date: tomorrow,
        food: testFood[1],
        amount: 5,
    },
];
