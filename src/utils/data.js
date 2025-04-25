// Mock data for API simulation

export const students = [
  {
    id: 1,
    name: 'John Doe',
    grade: '10',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    assessments: [
      { type: 'Academic', date: '2024-04-01' },
      { type: 'Behavioral', date: '2024-03-15' },
      { type: 'Socio-emotional', date: '2024-02-20' },
    ],
    notes: [
      'Follow up on math performance',
      'Schedule peer mediation session',
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    grade: '11',
    email: 'jane@example.com',
    phone: '(555) 987-6543',
    assessments: [
      { type: 'Academic', date: '2024-03-10' },
    ],
    notes: ['Monitor attendance'],
  },
  {
    id: 3,
    name: 'Michael Brown',
    grade: '12',
    email: 'michael@example.com',
    phone: '(555) 555-5555',
    assessments: [
      { type: 'Socio-emotional', date: '2024-02-20' },
    ],
    notes: ['Discuss graduation plans'],
  },
];

// Add more mock data exports as needed for other features 