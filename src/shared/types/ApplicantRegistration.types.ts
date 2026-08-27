export type ApplicationStatus = "Draft" | "Submitted" | "Approved";

export interface MockFile {
  name: string;
  type: string;
  size: number;
  base64: string;
}

export interface FounderDetails {
  founderName: string;
  founderRole: string;
  founderAge: string;
  founderPan: string;
  founderGender: string;
  isCoiHolder: string;
  equityShare: string;
  founderCoiDoc?: File | MockFile;
  founderPanDoc?: File | MockFile;
  founderResidenceAddress: string;
}

export interface ApplicationData {
  applicationId: string;
  status: ApplicationStatus;
  submittedDate?: string;

  // Fields missing from original payload but required for your list view
  email: string;
  entityName: string;

  applicantName: string;
  mobileNo: string;
  districtOfResidence: string;
  sparkId: string;
  founderDetails: FounderDetails[];
  entityConstitution: string;
  expectedRegistrationDate: string;
  sector: string;
  subSector: string;
  startupStage: string;
  turnOver: string;
  serviceDescription: string;
  problemStatement: string;
  innovationIpComponent: string;
  rAndDPlanned: string; // Renamed from r&dPlanned for valid TS syntax
  isIprFiled: string;
  isIncubatorAssociated: string;
  iprDetails: string;
  incubationCenter: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  financeReceived: string;
  financeReceivedDetails: string;

  // Documents
  registrationCertificate?: File | MockFile;
  moaDeed?: File | MockFile;
  entityPan?: File | MockFile;
  officeProof?: File | MockFile;
  capTable?: File | MockFile;
  patentDocument?: File | MockFile;
  incubatorLetter?: File | MockFile;
  fundingProof?: File | MockFile;
  businessPlan?: File | MockFile;
}

// Minimal DTO for the list view
export interface ApplicationListItem {
  applicationId: string;
  entityName: string;
  email: string;
  entityType: string;
  submittedDate: string;
  status: ApplicationStatus;
}
