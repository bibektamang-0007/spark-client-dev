import {
  Building2,
  User,
  FileText,
  Download,
  Briefcase,
  Landmark,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ApplicationData } from "@/shared/types/ApplicantRegistration.types";

// Reusing your interfaces...
// import { ApplicationData, FounderDetails, MockFile } from './types';

// ==========================================
// UTILITY COMPONENTS
// ==========================================

const DetailItem = ({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value?: string;
  fullWidth?: boolean;
}) => (
  <div className={`space-y-1 ${fullWidth ? "col-span-full" : ""}`}>
    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
      {label}
    </p>
    <p className="text-sm text-gray-900 font-medium bg-gray-50/50 p-2 rounded-md border border-gray-100">
      {value || <span className="text-gray-400 italic">Not provided</span>}
    </p>
  </div>
);

const DocumentLink = ({
  label,
  file,
}: {
  label: string;
  file?: File | any;
}) => {
  if (!file) return null;
  const fileName = file.name || "Document attached";

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 border rounded-lg group hover:bg-brand-secondary/10 transition-colors">
      <div className="flex items-center space-x-3 overflow-hidden">
        <div className="p-2 bg-white rounded shadow-sm shrink-0">
          <FileText className="w-4 h-4 text-brand-primary" />
        </div>
        <span className="text-sm font-medium text-gray-700 truncate group-hover:text-brand-primary transition-colors">
          {fileName}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 text-gray-400 hover:text-brand-primary"
      >
        <Download className="w-4 h-4" />
      </Button>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Draft: "bg-gray-100 text-gray-700",
    Submitted: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    "Under Review":
      "bg-brand-ternary/20 text-yellow-700 hover:bg-brand-ternary/30",
    Approved: "bg-green-100 text-green-700 hover:bg-green-200",
  };
  return (
    <Badge className={`${styles[status] || styles["Draft"]} shadow-none`}>
      {status}
    </Badge>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================

export function ApplicantDetails({ data }: { data: ApplicationData }) {
  if (!data)
    return (
      <div className="p-8 text-center text-gray-500">
        No application data found.
      </div>
    );

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {data.entityName}
            </h1>
            <StatusBadge status={data.status} />
          </div>
          <p className="text-sm text-gray-500 flex items-center space-x-2">
            <span>
              ID:{" "}
              <span className="font-mono font-medium text-gray-700">
                {data.applicationId}
              </span>
            </span>
            <span>•</span>
            <span>
              Submitted:{" "}
              {data.submittedDate
                ? new Date(data.submittedDate).toLocaleDateString()
                : "N/A"}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl">
            Reject / Query
          </Button>
          <Button className="rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white">
            Approve Application
          </Button>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Data Heavy Content (Spans 2 columns on Desktop) */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Basic & Entity Info */}
          <Card className="shadow-sm border-0 ring-1 ring-gray-200">
            <CardHeader className="bg-gray-50/50 border-b pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-gray-400" />
                Entity & Applicant Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem label="Applicant Name" value={data.applicantName} />
              <DetailItem label="Email Address" value={data.email} />
              <DetailItem label="Mobile Number" value={data.mobileNo} />
              <DetailItem label="District" value={data.districtOfResidence} />
              <DetailItem label="Spark ID" value={data.sparkId} />
              <DetailItem
                label="Expected Registration"
                value={data.expectedRegistrationDate}
              />
              <DetailItem
                label="Constitution"
                value={data.entityConstitution}
              />
              <DetailItem
                label="Stage & Turnover"
                value={`${data.startupStage} • ₹${data.turnOver}`}
              />
            </CardContent>
          </Card>

          {/* 2. Business Details */}
          <Card className="shadow-sm border-0 ring-1 ring-gray-200">
            <CardHeader className="bg-gray-50/50 border-b pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-gray-400" />
                Business & Innovation Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem label="Sector" value={data.sector} />
              <DetailItem label="Sub-Sector" value={data.subSector} />
              <DetailItem
                label="Service Description"
                value={data.serviceDescription}
                fullWidth
              />
              <DetailItem
                label="Problem Statement"
                value={data.problemStatement}
                fullWidth
              />
              <DetailItem
                label="Innovation / IP Component"
                value={data.innovationIpComponent}
                fullWidth
              />
              <DetailItem
                label="Planned R&D"
                value={data.rAndDPlanned}
                fullWidth
              />
            </CardContent>
          </Card>

          {/* 3. Founders List */}
          <Card className="shadow-sm border-0 ring-1 ring-gray-200">
            <CardHeader className="bg-gray-50/50 border-b pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-400" />
                Founders & Directors ({data.founderDetails?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {data.founderDetails?.map((founder, idx) => (
                <div
                  key={idx}
                  className="p-6 border-b last:border-0 hover:bg-gray-50/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <User className="w-4 h-4 text-brand-primary" />
                      {founder.founderName}
                    </h4>
                    <Badge variant="outline" className="bg-white">
                      {founder.founderRole}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailItem
                      label="Age/Gender"
                      value={`${founder.founderAge} • ${founder.founderGender}`}
                    />
                    <DetailItem
                      label="Equity"
                      value={`${founder.equityShare}%`}
                    />
                    <DetailItem label="PAN" value={founder.founderPan} />
                    <DetailItem
                      label="COI Holder"
                      value={founder.isCoiHolder}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN: Sidebar (Spans 1 column on Desktop) */}
        <div className="space-y-6">
          {/* 4. Financials & Bank */}
          <Card className="shadow-sm border-0 ring-1 ring-gray-200">
            <CardHeader className="bg-gray-50/50 border-b pb-4">
              <CardTitle className="text-md flex items-center gap-2">
                <Landmark className="w-4 h-4 text-gray-400" />
                Banking & Finance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-5">
              <DetailItem label="Bank Name" value={data.bankName} />
              <DetailItem label="Account No." value={data.accountNumber} />
              <DetailItem label="IFSC Code" value={data.ifscCode} />
              <Separator />
              <DetailItem
                label="Finance Received"
                value={data.financeReceived}
              />
              {data.financeReceived?.toLowerCase() === "yes" && (
                <DetailItem
                  label="Finance Details"
                  value={data.financeReceivedDetails}
                />
              )}
            </CardContent>
          </Card>

          {/* 5. Uploaded Documents */}
          <Card className="shadow-sm border-0 ring-1 ring-brand-primary/10 bg-brand-primary/5">
            <CardHeader className="pb-4">
              <CardTitle className="text-md flex items-center gap-2 text-brand-primary">
                <FileText className="w-4 h-4" />
                Uploaded Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-3">
              <DocumentLink
                label="Registration Certificate"
                file={data.registrationCertificate}
              />
              <DocumentLink label="MOA / Deed" file={data.moaDeed} />
              <DocumentLink label="Entity PAN" file={data.entityPan} />
              <DocumentLink label="Office Proof" file={data.officeProof} />
              <DocumentLink label="Cap Table" file={data.capTable} />
              <DocumentLink label="Business Plan" file={data.businessPlan} />
              <DocumentLink
                label="Patent Document"
                file={data.patentDocument}
              />
              <DocumentLink
                label="Incubator Letter"
                file={data.incubatorLetter}
              />
              <DocumentLink label="Funding Proof" file={data.fundingProof} />

              {/* Check if no documents were uploaded at all */}
              {!data.registrationCertificate &&
                !data.moaDeed &&
                !data.businessPlan && (
                  <p className="text-sm text-gray-500 italic text-center py-4">
                    No documents uploaded
                  </p>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export const ApplicantDetailsPage = () => {
  const mockApplicantData: ApplicationData = {
    applicationId: "APP-9A4B2C7",
    status: "Submitted",
    submittedDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago

    // Basic & Entity Info
    email: "founder@himalayanagri.com",
    entityName: "Himalayan AgriTech Solutions",
    applicantName: "Bibek Tamang",
    mobileNo: "+91 9876543210",
    districtOfResidence: "Gangtok",
    sparkId: "SPRK-2026-8891",
    entityConstitution: "Private Limited Company",
    expectedRegistrationDate: "2026-08-27",

    // Business Details
    sector: "Agriculture",
    subSector: "Agri-Tech",
    startupStage: "Early Traction",
    turnOver: "12,50,000",
    serviceDescription:
      "Developing IoT-based smart irrigation and soil monitoring systems specifically designed for terrace farming in hilly terrains.",
    problemStatement:
      "Farmers in high-altitude regions face unpredictable weather patterns and water scarcity, leading to a 30% reduction in optimal crop yields.",
    innovationIpComponent:
      "Proprietary low-energy IoT soil moisture sensors that communicate via long-range radio (LoRaWAN) in areas without cellular coverage.",
    rAndDPlanned:
      "Developing an AI-driven predictive weather model tailored for the micro-climates of the Himalayan belt.",
    isIprFiled: "Yes",
    iprDetails:
      "Provisional patent filed for the LoRaWAN sensor casing and deployment mechanism.",
    isIncubatorAssociated: "Yes",
    incubationCenter: "Advanced Technical Training Centre (ATTC), Bardang",

    // Founders Array
    founderDetails: [
      {
        founderName: "Bibek Tamang",
        founderRole: "Chief Executive Officer (CEO)",
        founderAge: "31",
        founderPan: "ABCDE1234F",
        founderGender: "Male",
        isCoiHolder: "Yes",
        equityShare: "65",
        founderResidenceAddress: "Nam Nang Road, Gangtok, Sikkim 737101",
        // Optional docs omitted for brevity, UI will handle it gracefully
      },
      {
        founderName: "Jordan Smith",
        founderRole: "Chief Technology Officer (CTO)",
        founderAge: "29",
        founderPan: "VWXYZ9876Q",
        founderGender: "Male",
        isCoiHolder: "No",
        equityShare: "35",
        founderResidenceAddress: "Tech Park Phase 1, Bangalore",
      },
    ],

    // Financials
    bankName: "State Bank of Sikkim",
    accountNumber: "0123456789098",
    ifscCode: "SBSK0000123",
    financeReceived: "Yes",
    financeReceivedDetails:
      "Seed grant of ₹5,000,000 received from State Innovation Fund.",

    // Mocked Documents (Using the MockFile interface structure)
    registrationCertificate: {
      name: "incorporation_cert_final.pdf",
      type: "application/pdf",
      size: 1024000,
      base64: "data:application/pdf;base64,dummy...",
    },
    moaDeed: {
      name: "moa_and_aoa_stamped.pdf",
      type: "application/pdf",
      size: 2500000,
      base64: "data:application/pdf;base64,dummy...",
    },
    businessPlan: {
      name: "Himalayan_Agri_PitchDeck_v2.pdf",
      type: "application/pdf",
      size: 5200000,
      base64: "data:application/pdf;base64,dummy...",
    },
    incubatorLetter: {
      name: "ATTC_incubation_approval.pdf",
      type: "application/pdf",
      size: 850000,
      base64: "data:application/pdf;base64,dummy...",
    },
    // Left out capTable, patentDocument, etc., to see how the UI handles missing files
  };
  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="mx-auto space-y-6">
        <ApplicantDetails data={mockApplicantData} />
      </div>
    </div>
  );
};
