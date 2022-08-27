export const Cart = {
    list: [],
}

export const Ticket = {
    list: [],
}

export const Stores = [
    { 
        key: 1,
        coordinates: { latitude: 21.030961775351827, longitude: 105.84854823005392 },
        storeName: 'Aurora in Hanoi',
        address: '23, Cotton street, Hang Gai ward, Hoan Kiem district, Ha Noi city',
    },
    { 
        key: 2,
        coordinates: { latitude: 16.06336904296533, longitude:  108.23408680558316 },
        storeName: 'Aurora in Danang',
        address: '965, Ngo Quyen street, An Hai Bac ward, Son Tra district, Da Nang city',

    },
    { 
        key: 3,
        coordinates: { latitude: 10.7748190093447, longitude:  106.69986300331179 },
        storeName: 'Aurora in Ho Chi Minh',
        address: '117, Le Thanh Ton street, Ben Nghe ward, District 1, Ho Chi Minh city',
    },
    { 
        key: 4,
        coordinates: { latitude: 10.38198089123573, longitude: 105.44246632357063 },
        storeName: 'Aurora in Long Xuyen',
        address: '21, Hai Ba Trung street, My Long ward, Long Xuyen city',
    },
  ];

export const Tour = [
    { 
        key: 1,
        name: 'Day Tour',
        cover: require('../assets/tour/day.jpg'),
        hours: '8.00 AM to 5.00 PM',
        priceAdult: 4.00,
        priceKid: 2.00, 


    },
    { 
        key: 2,
        name: 'Night Tour',
        cover: require('../assets/tour/night.jpg'),
        hours: '6.30 PM to 8.00 PM',
        priceAdult: 10.00,
        priceKid: 5.00, 
    },
];

export const Animals = [
    { 
        key: 1,
        name: 'Peacock',
        cover: require('../assets/animals/peacock.jpg'),
        icon: require('../assets/animals/icons/peacock.png'),
        coordinates: { latitude: 10.78747590103391, longitude: 106.70700385185006 },
    }, 
    { 
        key: 2,
        name: 'Flamingo',
        cover: require('../assets/animals/flamingo.jpg'),
        icon: require('../assets/animals/icons/flamingo.png'),
        coordinates: { latitude: 10.787624192038303, longitude: 106.70713232738176 },
    },
    { 
        key: 3,
        name: 'Elephant',
        cover: require('../assets/animals/elephant.jpg'),
        icon: require('../assets/animals/icons/elephant.png'),
        coordinates: { latitude: 10.788702272153307, longitude: 106.70696586282457 },
    },
    { 
        key: 4,
        name: 'Giraffe',
        cover: require('../assets/animals/giffare.jpg'),
        icon: require('../assets/animals/icons/giraffe.png'),
        coordinates: { latitude: 10.788530417130628, longitude: 106.70717829883604 },
    },
    { 
        key: 5,
        name: 'Tiger',
        cover: require('../assets/animals/tiger.jpg'),
        icon: require('../assets/animals/icons/tiger.png'),
        coordinates: { latitude: 10.785371698757286, longitude: 106.708165547904 },
    },
    { 
        key: 6,
        name: 'Crocodile',
        cover: require('../assets/animals/crocodile.jpg'),
        icon: require('../assets/animals/icons/crocodile.png'),
        coordinates: { latitude: 10.785905609701132, longitude: 106.70847702718977 },
    },
    { 
        key: 7,
        name: 'Butterfly',
        icon: require('../assets/animals/icons/butterfly.png'),
        coordinates: { latitude: 10.787643500579547, longitude: 106.70639770256535 },
    },
    { 
        key: 8,
        name: 'Monkey',
        icon: require('../assets/animals/icons/monkey.png'),
        coordinates: { latitude: 10.787919754254657, longitude: 106.70678133753789 },
    },
    { 
        key: 9,
        name: 'Horse',
        icon: require('../assets/animals/icons/horse.png'),
        coordinates: { latitude: 10.787159463901347, longitude: 106.70726190827654 },
    },
    { 
        key: 10,
        name: 'Bear',
        icon: require('../assets/animals/icons/bear.png'),
        coordinates: { latitude: 10.786838864331033, longitude: 106.7077025031022 },
    },
    { 
        key: 11,
        name: 'Hippo',
        icon: require('../assets/animals/icons/hippo.png'),
        coordinates: { latitude: 10.787399913354797, longitude: 106.70761275230437 },
    },
    { 
        key: 12,
        name: 'Lion',
        icon: require('../assets/animals/icons/lion.png'),
        coordinates: { latitude: 10.787091336521248, longitude: 106.70802071047629 },
    },
    { 
        key: 13,
        name: 'Ostrich',
        icon: require('../assets/animals/icons/ostrich.png'),
        coordinates: { latitude: 10.78631788930031, longitude: 106.70765354812158 },
    },
    { 
        key: 14,
        name: 'Rhino',
        icon: require('../assets/animals/icons/rhino.png'),
        coordinates: { latitude: 10.785937176207137, longitude: 106.70747812610765 },
    },
    { 
        key: 15,
        name: 'Hedgehog',
        icon: require('../assets/animals/icons/hedgehog.png'),
        coordinates: { latitude: 10.785344072014503, longitude: 106.70727882094366 },
    },
];

export const Souvenirs = [
    {
        id: 1,
        name: 'Wooden Pen',
        price: 3.00,
        cover: require('../assets/wooden_pen.jpg'),
        height: 4.5,
        width: 1.2,
    },
    {
        id: 2,
        name: '[Crochet] Giraffe',
        price: 15.00,
        cover: require('../assets/crochet_giffare.jpg'),
        height: 10,
        width: 3,
    },

    {
        id: 3,
        name: '[Crochet] Elephant',
        price: 15.00,
        cover: require('../assets/crochet_elephant.jpg'),
        height: 10,
        width: 3,
    },
    {
        id: 4,
        name: '[Crochet] Fox',
        price: 15.00,
        cover: require('../assets/crochet_fox.jpg'),
        height: 10,
        width: 3,
    }
]

export const Notifications = [
    {
        id: 1,
        title: 'Independence Day Sale',
        date: 'Aug 27, 2022'
    },
    {
        id: 2,
        title: 'Summertime but not sadness!',
        date: 'May 21, 2022'
    }
]