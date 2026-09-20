// Quality Careers Framework (QCF) Master Dataset
// Extracted directly from official KHDA QCF SEF Specifications

export const sortStatements = (statementsList = []) => {
  return [...statementsList].sort((a, b) => {
    if (a.domainNumber !== b.domainNumber) {
      return a.domainNumber - b.domainNumber;
    }
    return a.code.localeCompare(b.code, undefined, { numeric: true, sensitivity: 'base' });
  });
};

export const QCF_DOMAINS = [
  {
    id: 1,
    code: 'D1',
    title: 'Leadership & Philosophy',
    subtitle: 'Core leadership commitment, vision, and governing body backing for quality careers education.',
    iconName: 'Crown',
    color: '#16362B'
  },
  {
    id: 2,
    code: 'D2',
    title: 'Educational Strategy & Delivery',
    subtitle: 'Curriculum integration, inclusive pathways, community partners, and university links.',
    iconName: 'BookOpen',
    color: '#2C6450'
  },
  {
    id: 3,
    code: 'D3',
    title: 'Engagement & Interactions',
    subtitle: 'Sustained engagement with teachers, counsellors, alumni, parents, and industry experts.',
    iconName: 'Users',
    color: '#3B7A64'
  },
  {
    id: 4,
    code: 'D4',
    title: 'Innovation & Digital Engagement',
    subtitle: 'Digital platforms, student digital fluency, innovative delivery, and school uniqueness.',
    iconName: 'Sparkles',
    color: '#4C8E77'
  },
  {
    id: 5,
    code: 'D5',
    title: 'Forward Planning & Future Readiness',
    subtitle: '4-Year careers roadmap, business partnerships, and university guidance outcomes.',
    iconName: 'TrendingUp',
    color: '#1F4B3C'
  }
];

export const RATING_SCALE = [
  {
    level: 1,
    title: 'Not Evidenced',
    label: 'Is not able to be evidenced in documentation or for the visit',
    color: '#EF4444',
    bg: '#FEF2F2',
    border: '#FCA5A5'
  },
  {
    level: 2,
    title: 'Developing',
    label: 'Showing development',
    color: '#F59E0B',
    bg: '#FFFBEB',
    border: '#FCD34D'
  },
  {
    level: 3,
    title: 'In Place',
    label: 'Standard is in place',
    color: '#3B82F6',
    bg: '#EFF6FF',
    border: '#93C5FD'
  },
  {
    level: 4,
    title: 'Good / Excellent',
    label: 'Excellent evidence of this standard was in place',
    color: '#10B981',
    bg: '#ECFDF5',
    border: '#6EE7B7'
  },
  {
    level: 5,
    title: 'Exemplary',
    label: 'Evidence of this standard was exemplary',
    color: '#059669',
    bg: '#D1FAE5',
    border: '#34D399'
  }
];

export const QCF_STATEMENTS = [
  {
    "id": "stmt-1_1",
    "code": "1.1",
    "domainNumber": 1,
    "statement": "The school leadership and governing body show understanding of the importance of quality careers provision",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-1_2",
    "code": "1.2",
    "domainNumber": 1,
    "statement": "The school promotes and places value on careers education",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-1_3",
    "code": "1.3",
    "domainNumber": 1,
    "statement": "School staff are able to evidence the importance of a quality careers education",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-1_4",
    "code": "1.4",
    "domainNumber": 1,
    "statement": "Students and parents are able to evidence how the careers provision in the school is important and the value of it for life long careers education",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-1_5",
    "code": "1.5",
    "domainNumber": 1,
    "statement": "The school invests significantly in a Quality Careers Education - please note that investment need not be financial in nature, although it is likely that financial investment may form an overall part of the investment. Investment in people, time and philosophy may form a part of the overall judgement",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-1_6",
    "code": "1.6",
    "domainNumber": 1,
    "statement": "The school provides a secure rationale as to why careers education matters in the context of the school",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-1_7",
    "code": "1.7",
    "domainNumber": 1,
    "statement": "There is evidence of a careers policy that promotes a quality careers education",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-1_8",
    "code": "1.8",
    "domainNumber": 1,
    "statement": "There is evidence of continuity of careers education beyond the period of review",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-1_9",
    "code": "1.9",
    "domainNumber": 1,
    "statement": "Alumni their utilisation and engagement are central to the advancement of careers education at the school",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-2_1",
    "code": "2.1",
    "domainNumber": 2,
    "statement": "The school has a clear educational strategy to deliver careers education",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-2_2",
    "code": "2.2",
    "domainNumber": 2,
    "statement": "Careers education is evident and significant at all ages and stages of the school",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-2_3",
    "code": "2.3",
    "domainNumber": 2,
    "statement": "Teachers, leaders and the careers team are able to evidence the impact of careers education across the school",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-2_4",
    "code": "2.4",
    "domainNumber": 2,
    "statement": "Students are able to show and articulate the planning, mapping and personalisation of a careers education specific to them",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-2_5",
    "code": "2.5",
    "domainNumber": 2,
    "statement": "Parents are able to show the impact and benefits that a quality careers education brings to them and their child/children",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-2_6",
    "code": "2.6",
    "domainNumber": 2,
    "statement": "The careers education on offer at the school is inclusive",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-2_7",
    "code": "2.7",
    "domainNumber": 2,
    "statement": "The delivery and engagement of a careers education includes the use of community partners",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-2_8",
    "code": "2.8",
    "domainNumber": 2,
    "statement": "The delivery and engagement of a careers education includes the utilisation of digital platforms that are relevant (opportunity to create recommended partners list and receive referral fees as a result of this) and well utilised for the purposes of a careers education",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-2_9",
    "code": "2.9",
    "domainNumber": 2,
    "statement": "Alumni are used in the delivery and engagement of a careers education in the school",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-2_10",
    "code": "2.10",
    "domainNumber": 2,
    "statement": "Global and local university links allow for a careers education to be developed in conjunction with what universities know and do",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-3_1a",
    "code": "3.1a",
    "domainNumber": 3,
    "statement": "Students engage regularly with: (a) Teachers regarding a careers education",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-3_1b",
    "code": "3.1b",
    "domainNumber": 3,
    "statement": "Students engage regularly with: (b) Counsellors regarding a careers education",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-3_1c",
    "code": "3.1c",
    "domainNumber": 3,
    "statement": "Students engage regularly with: (c) Universities and higher education providers regarding a careers education",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-3_1d",
    "code": "3.1d",
    "domainNumber": 3,
    "statement": "Students engage regularly with: (d) Alumni regarding a careers education",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-3_1e",
    "code": "3.1e",
    "domainNumber": 3,
    "statement": "Students engage regularly with: (e) Each other as a source for discussing and furthering a careers education",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-3_1f",
    "code": "3.1f",
    "domainNumber": 3,
    "statement": "Students engage regularly with: (f) Their own parents regarding a careers education",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-3_1g",
    "code": "3.1g",
    "domainNumber": 3,
    "statement": "Students engage regularly with: (g) Digital platforms and external providers and parties regarding a careers education",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-4_1",
    "code": "4.1",
    "domainNumber": 4,
    "statement": "Students show digital fluency in their interactions with careers based digital platforms",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-4_2",
    "code": "4.2",
    "domainNumber": 4,
    "statement": "Students articulate uses of digital engagement and how it positively impacts their careers education",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-4_3",
    "code": "4.3",
    "domainNumber": 4,
    "statement": "Digital engagement drives careers education at the school",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-4_4",
    "code": "4.4",
    "domainNumber": 4,
    "statement": "New modes and methods of an impactful careers education are sought and utilised",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-4_5",
    "code": "4.5",
    "domainNumber": 4,
    "statement": "Teachers bring innovation and digital engagement into learning",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-4_6",
    "code": "4.6",
    "domainNumber": 4,
    "statement": "Parents are integrated into the use of an innovative and digital careers education",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-4_7",
    "code": "4.7",
    "domainNumber": 4,
    "statement": "Something unique to the school and the careers education is utilised for the delivery of a careers education",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-4_8",
    "code": "4.8",
    "domainNumber": 4,
    "statement": "Community partners use innovative ways, means and methods to engage careers education in the school",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-5_1",
    "code": "5.1",
    "domainNumber": 5,
    "statement": "Evidence of a 4 year plan for careers education was present at the time of evaluation (retrospectively and in a forward planning manner in the case of a 4 year review and in a forward planning manner for an accreditation visit)",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-5_2",
    "code": "5.2",
    "domainNumber": 5,
    "statement": "The schools' leadership team, teachers, students, parents and members of the wider community are involved in careers planning.",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-5_3",
    "code": "5.3",
    "domainNumber": 5,
    "statement": "Universities and higher education providers are used to enhance and guide careers planning",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-5_4",
    "code": "5.4",
    "domainNumber": 5,
    "statement": "Local business partners and public and privately owned enterprises are involved in careers planning",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-5_5",
    "code": "5.5",
    "domainNumber": 5,
    "statement": "Careers education focuses on what students need now and in the future",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-5_6",
    "code": "5.6",
    "domainNumber": 5,
    "statement": "Advice and guidance for university destinations is well planned resulting in students gaining what they need, when they need it",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-5_7",
    "code": "5.7",
    "domainNumber": 5,
    "statement": "Careers planning is not merely symbolic, the plans come to life and are evidenced in what is seen and done in terms of careers education in the school",
    "defaultRating": 3,
    "evidenceCount": 0
  },
  {
    "id": "stmt-5_8",
    "code": "5.8",
    "domainNumber": 5,
    "statement": "Careers education planning is inclusive and meets the needs of all students",
    "defaultRating": 3,
    "evidenceCount": 0
  }
];

export const DUBAI_SCHOOLS = [
  {
    id: 'sch-101',
    name: 'Dubai International Academy - Al Barsha',
    curriculum: 'IB World School',
    khdaRating: 'Outstanding',
    district: 'Al Barsha 1, Dubai',
    studentsCount: 2450,
    completionPercentage: 88,
    status: 'Under Inspection',
    assignedInspector: 'Dr. Sarah Al Mansoori',
    lastUpdated: 'Sept 14, 2026'
  },
  {
    id: 'sch-102',
    name: 'GEMS Wellington International School',
    curriculum: 'British / IB',
    khdaRating: 'Outstanding',
    district: 'Al Sufouh, Dubai',
    studentsCount: 2800,
    completionPercentage: 100,
    status: 'Submitted',
    assignedInspector: 'Alex Harrison',
    lastUpdated: 'Sept 12, 2026'
  },
  {
    id: 'sch-103',
    name: 'Repton School Dubai',
    curriculum: 'British Curriculum',
    khdaRating: 'Outstanding',
    district: 'Nadd Al Sheba, Dubai',
    studentsCount: 2100,
    completionPercentage: 65,
    status: 'In Progress',
    assignedInspector: 'Magda Kozlowska',
    lastUpdated: 'Sept 10, 2026'
  },
  {
    id: 'sch-104',
    name: 'Emirates International School - Jumeirah',
    curriculum: 'IB Continuum',
    khdaRating: 'Very Good',
    district: 'Jumeirah 3, Dubai',
    studentsCount: 1950,
    completionPercentage: 42,
    status: 'Draft',
    assignedInspector: 'Patricia Villard',
    lastUpdated: 'Sept 08, 2026'
  },
  {
    id: 'sch-105',
    name: 'Dubai British School - Jumeirah Park',
    curriculum: 'British Curriculum',
    khdaRating: 'Very Good',
    district: 'Jumeirah Park, Dubai',
    studentsCount: 1600,
    completionPercentage: 100,
    status: 'Certified',
    assignedInspector: 'Dr. Sarah Al Mansoori',
    lastUpdated: 'Sept 13, 2026'
  }
];

export const INSPECTORS = [
  {
    id: 'insp-1',
    name: 'Dr. Sarah Al Mansoori',
    title: 'Lead KHDA Senior Inspector (Careers & Pathways)',
    email: 'sarah.almansoori@khda.gov.ae',
    assignedSchoolsCount: 4,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'insp-2',
    name: 'Alex Harrison',
    title: 'QCF Senior Framework Evaluator',
    email: 'alex.harrison@qcf.ae',
    assignedSchoolsCount: 3,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'insp-3',
    name: 'Magda Kozlowska',
    title: 'QCF Co-Creator & Quality Auditor',
    email: 'magda.k@qcf.ae',
    assignedSchoolsCount: 3,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'insp-4',
    name: 'Patricia Villard',
    title: 'Higher Education & Industry Lead',
    email: 'patricia.v@qcf.ae',
    assignedSchoolsCount: 2,
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80'
  }
];
