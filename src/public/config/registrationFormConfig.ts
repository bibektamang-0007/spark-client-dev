import type { FormConfig } from "@/shared/components/multiStepForm/MultiStepForm.types";
import {
  DISTRICTS,
  GENDER,
  INCUBATION_CENTERS,
  STARTUP_AGE_TYPES,
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
      { label: "Email", type: "email", name: "email" },
      {
        label: "If you have registered SPARK ID, please mention the same",
        type: "text",
        name: "sparkId",
      },
      {
        label: "Is aspirant ?",
        type: "radio",
        name: "isAspirant",
        options: YESNO,
      },
      {
        label: "Intended Constitution (Type of Entity, if any)",
        type: "text",
        name: "intendedConstitution",
        dependsOn: { fieldName: "isAspirant", expectedValue: "yes" },
      },
      {
        label: "Expected Registration Date (if any)",
        type: "date",
        name: "expectedRegistrationDate",
        dependsOn: { fieldName: "isAspirant", expectedValue: "yes" },
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
          {
            label: "Gender",
            type: "radio",
            name: "founderGender",
            options: GENDER,
          },
          { label: "Age", type: "text", name: "founderAge" },
          {
            label: "COI holder",
            type: "radio",
            name: "isCoiHolder",
            options: YESNO,
          },
          {
            label: "Attach COI",
            type: "file",
            name: "founderCoiDoc",
            dependsOn: { fieldName: "isCoiHolder", expectedValue: "yes" },
          },
          { label: "PAN no", type: "text", name: "founderPan" },
          { label: "PAN document", type: "file", name: "founderPanDoc" },
          {
            label: "Residencial address",
            type: "text",
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
      { label: "Sector", type: "text", name: "sector" },
      { label: "Sub-Sector", type: "text", name: "subSector" },
      {
        label: "Description of Product/Service",
        type: "text",
        name: "serviceDescription",
      },
      {
        label: "Problem Statement resolved by the Startup",
        type: "text",
        name: "problemStatement",
      },
      {
        label: "Details of Innovation / IP Component",
        type: "text",
        name: "innovationIpComponent",
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
        label: "R&D Activities Planned",
        type: "text",
        name: "r&dPlanned",
      },
      {
        label: "IPR Filed/Granted",
        type: "radio",
        name: "isIprFiled",
        options: YESNO,
      },
      {
        label: "If yes, please provide details thereof",
        type: "text",
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
        label: "If yes, name and address of the Incubator",
        type: "text",
        name: "incubatorAssociated",
        dependsOn: { fieldName: "isIncubatorAssociated", expectedValue: "yes" },
      },
      {
        label: "If no, please select your preferred incubation centre",
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
      {
        label: "Have you received any finance for Startup earlier",
        type: "radio",
        name: "financeReceived",
        options: YESNO,
      },
      {
        label: "If yes, please provide details thereof",
        type: "text",
        name: "financeReceivedDetails",
        dependsOn: {
          fieldName: "financeReceived",
          expectedValue: "yes",
        },
      },
      { label: "Bank name", type: "text", name: "bankName" },
      { label: "Account number", type: "text", name: "accountNumber" },
      { label: "IFSC code", type: "text", name: "ifscCode" },
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
