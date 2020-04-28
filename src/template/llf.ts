import { Form } from 'mithril-ui-form';
import { padLeft } from '../utils';

export const countries = [
  {
    id: 'austria',
    label: 'Austria',
  },
  {
    id: 'belgium',
    label: 'Belgium',
  },
  {
    id: 'bulgaria',
    label: 'Bulgaria',
  },
  {
    id: 'croatia',
    label: 'Croatia',
  },
  {
    id: 'cyprus',
    label: 'Cyprus',
  },
  {
    id: 'czech_republic',
    label: 'Czech Republic',
  },
  {
    id: 'denmark',
    label: 'Denmark',
  },
  {
    id: 'estonia',
    label: 'Estonia',
  },
  {
    id: 'finland',
    label: 'Finland',
  },
  {
    id: 'france',
    label: 'France',
  },
  {
    id: 'germany',
    label: 'Germany',
  },
  {
    id: 'greece',
    label: 'Greece',
  },
  {
    id: 'hungary',
    label: 'Hungary',
  },
  {
    id: 'ireland',
    label: 'Ireland',
  },
  {
    id: 'italy',
    label: 'Italy',
  },
  {
    id: 'latvia',
    label: 'Latvia',
  },
  {
    id: 'lithuania',
    label: 'Lithuania',
  },
  {
    id: 'luxembourg',
    label: 'Luxembourg',
  },
  {
    id: 'malta',
    label: 'Malta',
  },
  {
    id: 'netherlands',
    label: 'Netherlands',
  },
  {
    id: 'poland',
    label: 'Poland',
  },
  {
    id: 'portugal',
    label: 'Portugal',
  },
  {
    id: 'romania',
    label: 'Romania',
  },
  {
    id: 'slovakia',
    label: 'Slovakia',
  },
  {
    id: 'slovenia',
    label: 'Slovenia',
  },
  {
    id: 'spain',
    label: 'Spain',
  },
  {
    id: 'sweden',
    label: 'Sweden',
  },
  {
    id: 'united_kingdom',
    label: 'United Kingdom',
  },
];

const languages = [
  {
    id: 'en',
    label: 'English',
  },
  {
    id: 'de',
    label: 'German',
  },
  {
    id: 'fr',
    label: 'French',
  },
  {
    id: 'other',
    label: 'Other',
  },
];

const sortByLabel: ((a: { id: string; label: string }, b: { id: string; label: string }) => number) | undefined = (
  a,
  b
) => (a.label > b.label ? 1 : a.label < b.label ? -1 : 0);

export const incidentTypes = [
  {
    id: 'animalDisease',
    label: 'Animal disease',
    show: ['incidentCategory=natural'],
  },
  {
    id: 'avalanche',
    label: 'Avalanche',
    show: ['incidentCategory=natural'],
  },
  {
    id: 'earthquake',
    label: 'Earthquake',
    show: ['incidentCategory=natural'],
  },
  {
    id: 'epidemics',
    label: 'Epidemics / Pandemics',
    show: ['incidentCategory=natural'],
  },
  {
    id: 'cold',
    label: 'Extreme cold',
    show: ['incidentCategory=natural'],
  },
  {
    id: 'heat',
    label: 'Extreme heat/drought',
    show: ['incidentCategory=natural'],
  },
  {
    id: 'hail',
    label: 'Extreme hail or snowfall',
    show: ['incidentCategory=natural'],
  },
  {
    id: 'rain',
    label: 'Extreme rainfall',
    show: ['incidentCategory=natural'],
  },
  {
    id: 'coastal',
    label: 'Flood: Coastal flood',
    show: ['incidentCategory=natural'],
  },
  {
    id: 'flash',
    label: 'Flood: Flash flood',
    show: ['incidentCategory=natural'],
  },
  {
    id: 'river',
    label: 'Flood: River flood',
    show: ['incidentCategory=natural'],
  },
  {
    id: 'wildfire',
    label: 'Forest fire',
    show: ['incidentCategory=natural'],
  },
  {
    id: 'landslide',
    label: 'Landslide',
    show: ['incidentCategory=natural'],
  },
  {
    id: 'meteorites',
    label: 'Meteorites',
    show: ['incidentCategory=natural'],
  },
  {
    id: 'storm',
    label: 'Storm/tornado',
    show: ['incidentCategory=natural'],
  },
  {
    id: 'eruption',
    label: 'Volcanic eruption',
    show: ['incidentCategory=natural'],
  },

  // {
  //   id: 'movement',
  //   label: 'Mass movement',
  //   show: ['incidentCategory=natural'],
  // },
  // {
  //   id: 'infestation',
  //   label: 'Insect infestation',
  //   show: ['incidentCategory=natural'],
  // },
  // {
  //   id: 'animal',
  //   label: 'Animal stampede',
  //   show: ['incidentCategory=natural'],
  // },

  {
    id: 'infra',
    label: 'Collapse of infra',
    show: ['incidentCategory=technical'],
  },
  {
    id: 'explosion',
    label: 'Explosion/gas leak',
    show: ['incidentCategory=technical'],
  },
  {
    id: 'fire',
    label: 'Fire in building/infrastructure',
    show: ['incidentCategory=technical'],
  },
  {
    id: 'chemical',
    label: 'Industry: Chemical spill',
    show: ['incidentCategory=technical'],
  },
  {
    id: 'industrial_explosion',
    label: 'Industry: Explosion/fire',
    show: ['incidentCategory=technical'],
  },
  {
    id: 'nuclear',
    label: 'Industry: Nuclear accident',
    show: ['incidentCategory=technical'],
  },
  {
    id: 'gas_supply',
    label: 'Outage: Gas supply',
    show: ['incidentCategory=technical'],
  },
  {
    id: 'power',
    label: 'Outage: Power (electricity)',
    show: ['incidentCategory=technical'],
  },
  {
    id: 'ict_failure',
    label: 'Outage: Telecom/ICT',
    show: ['incidentCategory=technical'],
  },
  {
    id: 'drinkingwater',
    label: 'Outage: Water supply',
    show: ['incidentCategory=technical'],
  },
  {
    id: 'aircrash',
    label: 'Transport: Air crash',
    show: ['incidentCategory=technical'],
  },
  {
    id: 'railaccident',
    label: 'Transport: Railway accident',
    show: ['incidentCategory=technical'],
  },
  {
    id: 'roadaccident',
    label: 'Transport: Road accident',
    show: ['incidentCategory=technical'],
  },
  {
    id: 'wateraccident',
    label: 'Transport: Accident on the water',
    show: ['incidentCategory=technical'],
  },

  {
    id: 'arson',
    label: 'Arson (fire raising)',
    show: ['incidentCategory=attack'],
  },
  {
    id: 'biological',
    label: 'Biological attack',
    show: ['incidentCategory=attack'],
  },
  {
    id: 'bomb',
    label: 'Bombing (explosives)',
    show: ['incidentCategory=attack'],
  },
  {
    id: 'chemical_attack',
    label: 'Chemical attack',
    show: ['incidentCategory=attack'],
  },
  {
    id: 'cyber_attack',
    label: 'Cyber attack/crime',
    show: ['incidentCategory=attack'],
  },
  {
    id: 'dumping',
    label: 'Dumping waste',
    show: ['incidentCategory=attack'],
  },
  {
    id: 'rn',
    label: 'Radiological/nuclear attack',
    show: ['incidentCategory=attack'],
  },
  {
    id: 'sabotage',
    label: 'Sabotage',
    show: ['incidentCategory=attack'],
  },
  {
    id: 'vandalism',
    label: 'Vandalism',
    show: ['incidentCategory=attack'],
  },
].sort(sortByLabel);

const societalSectors = [
  { id: 'society_whole', label: 'Society as a whole' },
  { id: 'drinking_water', label: 'Drinking water' },
  { id: 'education', label: 'Education/Research' },
  { id: 'energy_supply', label: 'Energy supply' },
  { id: 'financial_services', label: 'Financial services' },
  { id: 'food_agriculture', label: 'Food/Agriculture' },
  { id: 'government_administr.', label: 'Government/Administr.' },
  { id: 'industry', label: 'Industry' },
  { id: 'legal_order', label: 'Legal order' },
  { id: 'media_culture', label: 'Media/Culture' },
  { id: 'public_health', label: 'Public health' },
  { id: 'public_order', label: 'Public order/safety' },
  { id: 'retail_trade', label: 'Retail trade' },
  { id: 'telecom_internet', label: 'Telecom/Internet' },
  { id: 'transport', label: 'Transport' },
  { id: 'water_management', label: 'Water management' },
];

const publicationForm = [
  {
    id: 'title',
    label: 'English title',
    type: 'text',
    required: true,
    icon: 'title',
    className: 'col s6',
  },
  {
    id: 'orgTitle',
    label: 'Original title (if applicable)',
    type: 'text',
    icon: 'title',
    className: 'col s6',
  },
  {
    id: 'author',
    type: 'text',
    label: 'First author and/or organisation',
    icon: 'person',
    className: 'col s9',
  },
  {
    id: 'yearOfPublication',
    type: 'number',
    min: 1900,
    max: 2100,
    label: 'Year of publication',
    className: 'col s3',
  },
  {
    id: 'url',
    label: 'Link',
    type: 'url',
    icon: 'link',
    className: 'col s6',
  },
  {
    id: 'language',
    label: 'Language',
    type: 'select',
    value: 'en',
    options: languages,
    className: 'col s3',
  },
  {
    id: 'dissemination',
    required: true,
    label: 'Dissemination level',
    type: 'select',
    className: 'col s3',
    options: [
      {
        id: 'public',
        label: 'Public',
      },
      {
        id: 'restricted',
        label: 'Restricted',
      },
      {
        id: 'secret',
        label: 'Secret',
      },
    ],
  },
  {
    id: 'otherLanguage',
    label: 'Other language',
    type: 'text',
    show: 'language = other',
    options: languages,
    className: 'col s3',
  },
] as Form;

export const eventTypes = [
  { id: 'crisis', label: 'Incident, crisis or disaster' },
  { id: 'prevention', label: 'Preventive activity' },
  { id: 'test', label: 'Test or trial' },
  { id: 'training', label: 'Training or exercise' },
];

export const cmFunctions = [
  { id: 'none', label: '...' },
  { id: 'alerting', label: 'Alerting, incl. 112' },
  { id: 'border_control', label: 'Border control' },
  { id: 'risk_communication', label: 'Crisis/Risk communication' },
  { id: 'crowd_mgmt', label: 'Crowd management' },
  { id: 'decontamination', label: 'Decontamination' },
  { id: 'medical_treatment', label: 'Emergency Health Care' },
  { id: 'evacuation_shelter', label: 'Evacuation & Shelter' },
  { id: 'fight_incident_sources', label: 'Fight/Eliminate COVID-19 source' },
  { id: 'law_enforcement', label: 'Law enforcement' },
  { id: 'needs', label: 'Provide basic needs to the population' },
  { id: 'debris', label: 'Remove debris' },
  { id: 'restore', label: 'Restore criticial services' },
].sort(sortByLabel);

export const cmOperations = [
  { id: 'c3', label: 'Command, Control and Coordination (C3)' },
  { id: 'detection_surveillance', label: 'Detection/Surveillance' },
  { id: 'collaboration', label: 'International collaboration' },
  { id: 'logistics', label: 'Logistics/Resource mgt.' },
  { id: 'sa', label: 'Situation Assessment' },
  { id: 'social_media_mining', label: 'Social media mining' },
  { id: 'traffic_mgmt', label: 'Traffic management' },
  { id: 'scale', label: 'Up-scale/Down-scale' },
  { id: 'volunteer_management', label: 'Volunteer management' },
];

export const cmPreparations = [
  { id: 'education_training', label: 'Education & Training' },
  { id: 'doctrine', label: 'Doctrine development' },
  { id: 'risk_assessment', label: 'Risk assessment' },
  // { id: "rescue_operations", label: "Rescue operations/SAR" },
];

export const cmRecovery = [
  { id: 'economic', label: 'Economic recovery' },
  { id: 'health_social_services', label: 'Health & social services recovery' },
  { id: 'community', label: 'Community recovery' },
  { id: 'infrastructure', label: 'Infrastructure recovery' },
  { id: 'housing', label: 'Housing recovery' },
  { id: 'natural', label: 'Natural / cultural recovery' },
];

const scale = [
  { id: 'local', label: 'Local' },
  { id: 'regional', label: 'Regional' },
  { id: 'national', label: 'National' },
  { id: 'pan_europe', label: 'Pan-Europe' },
  { id: 'global', label: 'Global' },
];

const organisationType = [
  { id: 'individual', label: 'Individual citizen' },
  { id: 'medical_services', label: 'Medical services' },
  { id: 'hospital', label: 'Hospital' },
  { id: 'paramedical_services', label: 'Paramedical services' },
  { id: 'fireBrigade', label: 'Firebrigade' },
  { id: 'police', label: 'Police' },
  { id: 'civil_protection', label: 'Civil Protection' },
  { id: 'defence', label: 'Defence' },
  { id: 'ngo.', label: 'NGO' },
  { id: 'volunteer.', label: 'Volunteer organisation' },
  { id: 'monitoring_institute', label: 'Monitoring institute' },
  { id: 'cip', label: 'Critical Infrastructure provider' },
  { id: 'command_centres', label: 'Command and/or Control centres' },
  { id: 'local_authority', label: 'Local or regional authority' },
  { id: 'national_authority', label: 'National authority' },
  { id: 'ec', label: 'European Commision' },
  { id: 'international_organisation', label: 'International organisations' },
  { id: 'industry_sme', label: 'Industry / Company / SME' },
  { id: 'research_organisation', label: 'Research org. or University' },
].sort(sortByLabel);

const editorForm: Form = [
  { id: 'editor', type: 'section', label: 'About you' },
  { type: 'md', value: '#### About you' },
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    className: 'col s12 m6',
  },
  {
    id: 'organisation',
    label: 'Organisation',
    type: 'text',
    className: 'col s12 m6',
  },
  {
    id: 'organisationType',
    label: 'Type of organisation',
    type: 'select',
    className: 'col s12 m6',
    options: organisationType,
  },
  {
    id: 'country',
    label: 'Country of organisation',
    type: 'select',
    className: 'col s12 m6',
    options: countries,
  },
];

const multimediaForm = [
  { id: 'desc', label: 'Short description', type: 'textarea' },
  { id: 'owner', label: 'Owner', type: 'text', className: 'col s6' },
  {
    id: 'yearOfPublication',
    type: 'number',
    min: 1900,
    max: 2100,
    label: 'Year of publication',
    className: 'col s6',
  },
  { id: 'url', label: 'Link', type: 'url', icon: 'link', className: 'col s12' },
];

export const llf: Form = [
  { id: 'lesson', type: 'section', label: 'Lesson' },
  {
    type: 'md',
    value: '#### Lesson / Observation',
  },
  {
    id: 'title',
    label: 'Title/brief description',
    type: 'text',
    maxLength: 70,
    required: true,
    className: 'col s12 m8',
  },
  {
    id: 'date',
    label: 'Date (dd-mm-yyyy)',
    type: 'autogenerate',
    autogenerate: 'timestamp',
    readonly: true,
    transform: (dir, value: number) => {
      if (dir === 'from' && value) {
        const d = new Date(value);
        return `${padLeft(d.getDay())}-${padLeft(d.getMonth() + 1)}-${d.getFullYear()}`;
      }
      return value;
    },
    className: 'col s12 m4',
  },
  {
    type: 'md',
    value: '#### Problem description',
  },
  {
    id: 'location',
    label: 'Location / area',
    required: true,
    type: 'text',
    className: 'col s12',
  },
  {
    id: 'memberCountries',
    label: 'Involved countries',
    required: true,
    type: 'select',
    // checkboxClass: 'col s6 m4 xl3',
    className: 'col s12 m4',
    options: countries,
  },
  {
    id: 'scale',
    label: 'Scale of the problem',
    required: true,
    type: 'select',
    className: 'col s12 m4',
    // checkboxClass: 'col s6 m4 xl3',
    options: scale,
  },
  {
    id: 'sectors',
    label: 'Affected societal sectors',
    required: true,
    type: 'select',
    className: 'col s12 m4',
    // checkboxClass: 'col s6 m4 xl3',
    options: societalSectors,
  },
  {
    id: 'description',
    label: 'Description of the problem',
    placeholder: 'Include the situation and the period in which it has occured.',
    required: true,
    type: 'textarea',
  },
  {
    type: 'md',
    value: `#### Observations / experiences

    Applying to the following crisis management functions, if any.`,
  },
  {
    id: 'cmFunctionPrimary',
    type: 'select',
    multiple: true,
    required: true,
    label: 'Primary (response)',
    className: 'col s12 m6',
    options: cmFunctions,
  },
  {
    id: 'operations',
    type: 'select',
    multiple: true,
    required: true,
    label: 'Operations enabling',
    className: 'col s12 m6',
    options: cmOperations,
  },
  {
    id: 'preparatory',
    type: 'select',
    multiple: true,
    required: true,
    label: 'Preparatory',
    className: 'col s12 m6',
    options: cmPreparations,
  },
  {
    id: 'recovery',
    type: 'select',
    multiple: true,
    required: true,
    label: 'Recovery',
    className: 'col s12 m6',
    options: cmRecovery,
  },
  {
    id: 'description',
    label: 'Description of the lesson identified',
    type: 'textarea',
  },
  {
    id: 'positive',
    label: 'Perceived positive aspects of the lesson, if any (explain why)',
    type: 'textarea',
  },
  {
    id: 'negative',
    label: 'Perceived negative aspects of the lesson, if any (explain why)',
    type: 'textarea',
  },

  { type: 'md', value: '#### Publications' },
  {
    id: 'publications',
    label: 'Add publication',
    repeat: true,
    inline: true,
    pageSize: 3,
    type: publicationForm,
    i18n: {
      createRepeat: 'Create a new publication',
      editRepeat: 'Edit publication',
    },
  },
  { type: 'md', value: '#### Multimedia sources' },
  {
    id: 'multimedia',
    label: 'Add multimedia source',
    repeat: true,
    type: multimediaForm,
    pageSize: 3,
    i18n: {
      createRepeat: 'Create a new multimedia source',
      editRepeat: 'Edit multimedia source',
    },
  },
  ...editorForm,
] as Form;
