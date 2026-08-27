import type { FieldOption } from "@/shared/components/multiStepForm/MultiStepForm.types";

export const DISTRICTS: FieldOption[] = [
  { label: "Gangtok", value: "Gangtok" },
  { label: "Gyalshing", value: "Gyalshing" },
  { label: "Mangan", value: "Mangan" },
  { label: "Pakyong", value: "Pakyong" },
  { label: "Namchi", value: "Namchi" },
  { label: "Soreng", value: "Soreng" },
];

export const GENDER: FieldOption[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export const YESNO: FieldOption[] = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export const STARTUP_AGE_TYPES: FieldOption[] = [
  { label: "Ideation", value: "Ideation" },
  { label: "Prototype", value: "Prototype" },
  { label: "Pilot", value: "Pilot" },
  { label: "Revenue", value: "Revenue" },
  { label: "Scaling", value: "Scaling" },
];

export const INCUBATION_CENTERS: FieldOption[] = [
  {
    label: "Advanced Technical Training Centre (ATTC), Bardang",
    value: "Advanced Technical Training Centre (ATTC), Bardang",
  },
  {
    label: "Computers and Communication Technology (CCCT), Chisopani",
    value: "Computers and Communication Technology (CCCT), Chisopani",
  },
  {
    label: "Sikkim Innovation Hub, Gangtok",
    value: "Sikkim Innovation Hub, Gangtok",
  },
  { label: "Others", value: "Others" },
];

export const REGISTRATION_OPTIONS = {
  ASPIRANT: "aspirant",
  STARTUP: "startup",
  ENTERPRISE: "enterprise",
  MENTOR: "mentor",
};

export const SECTOR_OPTIONS: FieldOption[] = [
  { label: "Agriculture & Allied", value: "agriculture" },
  { label: "Information Technology (IT)", value: "it" },
  { label: "Healthcare & Lifesciences", value: "healthcare" },
  { label: "Green Technology", value: "green_tech" },
];

export const SUB_SECTOR_MAP: Record<string, FieldOption[]> = {
  agriculture: [
    { label: "Organic Farming", value: "organic_farming" },
    { label: "Agri-Tech", value: "agri_tech" },
    { label: "Food Processing", value: "food_processing" },
    { label: "Dairy & Livestock", value: "dairy" },
  ],
  it: [
    { label: "SaaS & Software", value: "saas" },
    { label: "AI & Machine Learning", value: "ai_ml" },
    { label: "Cybersecurity", value: "cybersecurity" },
    { label: "E-Commerce", value: "ecommerce" },
  ],
  healthcare: [
    { label: "Telemedicine", value: "telemedicine" },
    { label: "Medical Devices", value: "medical_devices" },
    { label: "Pharma", value: "pharma" },
  ],
  green_tech: [
    { label: "Renewable Energy", value: "renewable_energy" },
    { label: "Waste Management", value: "waste_management" },
    { label: "EV & Mobility", value: "ev_mobility" },
  ],
};

export const CONSTITUTION_OF_ENTITY: FieldOption[] = [
  { label: "Private Limited Company", value: "Private Limited Company" },
  { label: "One Person Company (OPC)", value: "One Person Company (OPC)" },
  { label: "Public Limited Company", value: "Public Limited Company" },
  {
    label: "Company under Sikkim Company/Registration Act",
    value: "Company under Sikkim Company/Registration Act",
  },
  {
    label: "Limited Liability Partnership (LLP)",
    value: "Limited Liability Partnership (LLP)",
  },
  { label: "Partnership Firm", value: "Partnership Firm" },
  { label: "Proprietorship", value: "Proprietorship" },
  {
    label: "SHG / Producer Group / Cooperative Society",
    value: "SHG / Producer Group / Cooperative Society",
  },
  { label: "Society / Trust", value: "Society / Trust" },
  {
    label: "Group of Persons or Individual",
    value: "Group of Persons or Individual",
  },
  { label: "Other", value: "other" },
];

export const INDIA_STATES: FieldOption[] = [
  { label: "Sikkim", value: "sikkim" },
];

export const INDIA_DISTRICTS_MAP: Record<string, FieldOption[]> = {
  sikkim: [
    { label: "Gangtok", value: "gangtok" },
    { label: "Gyalshing", value: "gyalshing" },
    { label: "Mangan", value: "mangan" },
    { label: "Namchi", value: "namchi" },
    { label: "Pakyong", value: "pakyong" },
    { label: "Soreng", value: "soreng" },
  ],
};
