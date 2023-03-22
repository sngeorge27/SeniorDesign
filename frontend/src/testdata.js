export const testRDI = [
    {
        nutrientId: 1,
        min: 15,
        max: 23,
    },
    {
        nutrientId: 2,
        min: 10,
        max: 15,
    },
    {
        nutrientId: 3,
        min: 20,
        max: 25,
    },
    {
        nutrientId: 4,
        min: 1500,
        max: 2500,
    },
];

export const testNutrients = [
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
    {
        id: 4,
        name: "Calories",
    },
];

export const testFood = [
    {
        id: 1,
        name: "Eggs",
        servings: 2,
        unit: "whole",
        calories: 150,
        nutrients: [
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
        calories: 230,
        nutrients: [
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
        calories: 120,
        nutrients: [
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
        calories: 80,
        nutrients: [
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
