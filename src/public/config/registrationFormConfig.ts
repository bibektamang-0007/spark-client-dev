import type { FormConfig } from "@/shared/components/multiStepForm/MultiStepForm.types";
import {
  CONSTITUTION_OF_ENTITY,
  DISTRICTS,
  GENDER,
  INCUBATION_CENTERS,
  SECTOR_OPTIONS,
  STARTUP_AGE_TYPES,
  SUB_SECTOR_MAP,
  YESNO,
} from "../constants/formConstants";

export const registrationFromConfig: FormConfig[] = [
  {
    formHeading: "Applicant",
    children: [
      {
        label: "Name of applicant",
        type: "text",
        name: "applicantName",
      },
      { label: "Mobile no", type: "mobile", name: "mobileNo" },
      {
        label: "District of residence",
        type: "dropdown",
        name: "districtOfResidence",
        options: DISTRICTS,
      },
      {
        label: "If you have registered SPARK ID, please mention the same",
        type: "text",
        name: "sparkId",
      },
    ],
  },
  {
    formHeading: "Founder",
    children: [
      {
        label: "Founder details",
        type: "multiple",
        name: "founderDetails",
        multiGroupFields: [
          { label: "Name", type: "text", name: "founderName" },
          { label: "Role", type: "text", name: "founderRole" },
          { label: "Age", type: "text", name: "founderAge" },
          { label: "PAN no", type: "text", name: "founderPan" },
          {
            label: "Gender",
            type: "radio",
            name: "founderGender",
            options: GENDER,
          },
          {
            label: "COI holder",
            type: "radio",
            name: "isCoiHolder",
            options: YESNO,
          },
          {
            label: "Percentage of Equity share ",
            type: "number",
            name: "equityShare",
          },
          {
            label: "Attach COI",
            type: "file",
            name: "founderCoiDoc",
            dependsOn: { fieldName: "isCoiHolder", expectedValue: "yes" },
          },
          { label: "PAN document", type: "file", name: "founderPanDoc" },
          {
            label: "Residencial address",
            type: "textarea",
            name: "founderResidenceAddress",
          },
        ],
        col: 1,
      },
    ],
  },
  {
    formHeading: "Business",
    children: [
      {
        label: "Do you have Startup India Recognition as a Startup",
        type: "radio",
        name: "indiaRecognizedStartup",
        options: YESNO,
        showForRoles: ["startup", "enterprise"],
      },
      {
        label: "Registration No",
        type: "text",
        name: "registrationNo",
        dependsOn: {
          fieldName: "indiaRecognizedStartup",
          expectedValue: "yes",
        },
      },
      {
        label: "Registration Date",
        type: "date",
        name: "registrationDate",
        dependsOn: {
          fieldName: "indiaRecognizedStartup",
          expectedValue: "yes",
        },
      },
      {
        label: "Select Constitution of Entity",
        type: "dropdown",
        name: "entityConstitution",
        options: CONSTITUTION_OF_ENTITY,
      },
      {
        label: "If Other (Constitution of Entity)",
        type: "text",
        name: "otherEntityConstitution",
        dependsOn: { fieldName: "entityConstitution", expectedValue: "other" },
      },
      {
        label: "Expected Registration Date",
        type: "date",
        name: "expectedRegistrationDate",
        showForRoles: ["aspirant"],
      },
      {
        label: "Sector",
        type: "dropdown",
        name: "sector",
        options: SECTOR_OPTIONS,
      },
      {
        label: "Sub-Sector",
        type: "dropdown",
        name: "subSector",
        cascadingOptions: {
          dependsOnField: "sector",
          optionsMap: SUB_SECTOR_MAP,
        },
      },
      {
        label: "Stage of your Startup",
        type: "dropdown",
        name: "startupStage",
        options: STARTUP_AGE_TYPES,
      },
      {
        label: "Turnover in INR (is last FY)",
        type: "number",
        name: "turnOver",
      },
      {
        label: "Description of Product/Service",
        type: "textarea",
        name: "serviceDescription",
      },
      {
        label: "Problem Statement resolved by the Startup",
        type: "textarea",
        name: "problemStatement",
      },
      {
        label: "Details of Innovation / IP Component",
        type: "textarea",
        name: "innovationIpComponent",
      },
      {
        label: "R&D Activities Planned",
        type: "textarea",
        name: "r&dPlanned",
      },
      {
        label: "IPR Filed/Granted",
        type: "radio",
        name: "isIprFiled",
        options: YESNO,
      },
      {
        label: "If Yes, Please Provide Details Thereof",
        type: "textarea",
        name: "iprDetails",
        dependsOn: { fieldName: "isIprFiled", expectedValue: "yes" },
      },
      {
        label: "Incubator associated",
        type: "radio",
        name: "isIncubatorAssociated",
        options: YESNO,
      },
      {
        label: "Incubation Center",
        type: "dropdown",
        name: "incubationCenter",
        options: INCUBATION_CENTERS.filter(
          (center) => center.value !== "Others",
        ),
        dependsOn: { fieldName: "isIncubatorAssociated", expectedValue: "yes" },
      },
      {
        label: "If No, Please Select Your Preferred Incubation Centre",
        type: "dropdown",
        name: "preferedIncubationCenter",
        options: INCUBATION_CENTERS,
        dependsOn: { fieldName: "isIncubatorAssociated", expectedValue: "no" },
      },
      {
        label:
          "If Other, Please Specify (DPIIT Registered Incubation Centre Only)",
        type: "text",
        name: "otherIncubationCenter",
        dependsOn: {
          fieldName: "preferedIncubationCenter",
          expectedValue: "others",
        },
      },
    ],
  },
  {
    formHeading: "Financial",
    children: [
      { label: "Bank name", type: "text", name: "bankName" },
      { label: "Account number", type: "text", name: "accountNumber" },
      { label: "IFSC code", type: "text", name: "ifscCode" },
      {
        label: "Have you received any finance for Startup earlier",
        type: "radio",
        name: "financeReceived",
        options: YESNO,
      },
      {
        label: "If yes, please provide details thereof",
        type: "textarea",
        name: "financeReceivedDetails",
        dependsOn: {
          fieldName: "financeReceived",
          expectedValue: "yes",
        },
      },
    ],
  },
  {
    formHeading: "Documents",
    children: [
      {
        label: "Registration/Udhyam Certificate",
        type: "file",
        name: "registrationCertificate",
      },
      {
        label:
          "MOA/AOA or Partnership Deed (for Company/LLP and Partnership firms)",
        type: "file",
        name: "moaDeed",
      },
      { label: "PAN of Entity", type: "file", name: "entityPan" },
      {
        label: "Registered Office Proof (Sikkim)",
        type: "file",
        name: "officeProof",
      },
      { label: "Shareholding / Cap Table", type: "file", name: "capTable" },
      {
        label: "Patent/IP Documents (if applicable)",
        type: "file",
        name: "patentDocument",
      },
      {
        label: "Incubator Letter (if applicable)",
        type: "file",
        name: "incubatorLetter",
      },
      {
        label: "Funding Proof (if applicable)",
        type: "file",
        name: "fundingProof",
      },
      {
        label: "Business Plan / Pitch Deck (for Startups)",
        type: "file",
        name: "businessPlan",
      },
    ],
  },
];
