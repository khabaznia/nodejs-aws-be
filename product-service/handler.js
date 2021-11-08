'use strict';

module.exports.products = async (event) => {
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(
            [
                {
                    id: "1",
                    title: "Flower 1",
                    description: "Description for flower 1",
                    image: "https://picsum.photos/200/300",
                    price: 2
                },
                {
                    id: "2",
                    title: "Flower 2",
                    description: "Description for flower 2",
                    image: "https://picsum.photos/200/300",
                    price: 3
                }
            ]
        ),
    };
};

module.exports.product = async (event) => {
    const id = event.id
    console.log(id)
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(
            {
                id: "2",
                title: "Flower 2",
                description: "Description for flower 2",
                image: "https://picsum.photos/200/300",
                price: 3
            }
        ),
    };
};