export default {
    type: 'object',
    properties: {
        title: {type: 'string'},
        description: {type: 'string'},
        price: {type: 'integer'},
        image: {type: 'string'},
        count: {type: 'integer'},
    },
    required: ['title', 'price']
} as const;
