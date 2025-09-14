

const mockTrains = [
  {
    name: 'GARIBRATH EXP',
    number: '12740',
    runsOn: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    departure: {
      station: 'SECUNDERABAD JN',
      time: '20:30',
      day: 'Tue, 31 May',
    },
    arrival: {
      station: 'VIJAYAWADA JN',
      time: '01:35',
      day: 'Wed, 01 Jun',
    },
    duration: '05:05',
    availability: [
      {
        date: 'Tue, 31 May',
        status: 'AVAILABLE-0031',
      },
      {
        date: 'Wed, 01 Jun',
        status: 'AVAILABLE-0017',
      },
      {
        date: 'Thu, 02 Jun',
        status: 'AVAILABLE-0146',
      },
      {
        date: 'Fri, 03 Jun',
        status: 'AVAILABLE-0043',
      },
      {
        date: 'Sat, 04 Jun',
        status: 'AVAILABLE-0022',
      },
      {
        date: 'Sun, 05 Jun',
        status: 'AVAILABLE-0011',
      },
    ],
    classes: [
      {
        name: 'AC 3 Tier (3A)',
        price: 495,
        status: 'AVAILABLE-0031',
      },
    ],
  },
  {
    name: 'SIMHAPURI EXP',
    number: '12710',
    runsOn: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    departure: {
      station: 'SECUNDERABAD JN',
      time: '23:05',
      day: 'Tue, 31 May',
    },
    arrival: {
      station: 'VIJAYAWADA JN',
      time: '04:20',
      day: 'Wed, 01 Jun',
    },
    duration: '05:15',
    availability: [], 
    classes: [
      {
        name: 'Second Sitting (2S)',
        price: null, 
        status: 'Refresh',
      },
      {
        name: 'Sleeper (SL)',
        price: null,
        status: 'Refresh',
      },
      {
        name: 'AC 3 Tier (3A)',
        price: null,
        status: 'Refresh',
      },
      {
        name: 'AC 2 Tier (2A)',
        price: null,
        status: 'Refresh',
      },
      {
        name: 'AC First Class (1A)',
        price: null,
        status: 'Refresh',
      },
    ],
  },
  {
    name: 'PADMAVATHI EXP',
    number: '12764',
    runsOn: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    departure: {
      station: 'SECUNDERABAD JN',
      time: '18:40',
      day: 'Tue, 31 May',
    },
    arrival: {
      station: 'VIJAYAWADA JN',
      time: '00:10',
      day: 'Wed, 01 Jun',
    },
    duration: '05:30',
    availability: [],
    classes: [
        {
            name: 'Second Sitting (2S)',
            price: null,
            status: 'Refresh',
        },
        {
            name: 'Sleeper (SL)',
            price: null,
            status: 'Refresh',
        },
        {
            name: 'AC 3 Tier (3A)',
            price: null,
            status: 'Refresh',
        },
        {
            name: 'AC 2 Tier (2A)',
            price: null,
            status: 'Refresh',
        },
    ],
  },
];


export const fetchMockTrains = (searchCriteria) => {
  console.log('Fetching trains for:', searchCriteria);
  


  return new Promise((resolve) => {
    setTimeout(() => {
      if (searchCriteria.from.toLowerCase() === 'secunderabad' && searchCriteria.to.toLowerCase() === 'vijayawada') {
        resolve({ trains: mockTrains });
      } else {
        // Simulate no trains found for other routes
        resolve({ trains: [] });
      }
    }, 500); // Simulate network delay
  });
};
