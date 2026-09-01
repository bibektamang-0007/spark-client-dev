import { useState, useEffect } from "react";
import {
  Building2,
  User,
  FileText,
  Download,
  Briefcase,
  Landmark,
  Users,
  ArrowLeft,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ApplicationData } from "@/shared/types/ApplicantRegistration.types";
import { SparkSuccessModal } from "@/admin/components/modals/SparkSuccessModal";

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
  <div className={`space-y-1.5 ${fullWidth ? "col-span-full" : ""}`}>
    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
      {label}
    </p>
    <div className="text-sm text-gray-800 font-medium bg-linear-to-br from-white to-gray-50/50 p-3 rounded-xl border border-gray-100 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
      {value || <span className="text-gray-400 italic">Not provided</span>}
    </div>
  </div>
);

const DocumentLink = ({ file }: { label: string; file?: File | any }) => {
  if (!file) return null;
  const fileName = file.name || "Document attached";

  return (
    <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl group hover:border-brand-primary/30 hover:shadow-md hover:shadow-brand-primary/5 transition-all duration-300 cursor-pointer">
      <div className="flex items-center space-x-3 overflow-hidden">
        <div className="p-2.5 bg-brand-primary/5 rounded-lg shrink-0 group-hover:bg-brand-primary/10 transition-colors">
          <FileText className="w-4 h-4 text-brand-primary" />
        </div>
        <span className="text-sm font-semibold text-gray-700 truncate group-hover:text-brand-primary transition-colors">
          {fileName}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 text-gray-400 group-hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors"
      >
        <Download className="w-4 h-4" />
      </Button>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Draft: "bg-gray-100 text-gray-600 border-gray-200",
    Submitted: "bg-blue-50 text-blue-600 border-blue-200",
    "Under Review":
      "bg-brand-ternary/10 text-amber-700 border-brand-ternary/30",
    Approved: "bg-green-50 text-green-600 border-green-200",
  };
  return (
    <Badge
      variant="outline"
      className={`${styles[status] || styles["Draft"]} font-bold px-3 py-1 shadow-sm`}
    >
      {status}
    </Badge>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================

export function ApplicantDetails({ data }: { data: ApplicationData }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!data)
    return (
      <div className="p-8 text-center text-gray-500 font-medium">
        No application data found.
      </div>
    );

  return (
    <div className="relative">
      {/* Floating Sticky Header */}
      <SparkSuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        sparkId="SS26GTK0001M"
      />
      <div
        className={`sticky top-4 z-40 mb-8 transition-all duration-300 ease-in-out flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-2xl border ${
          isScrolled
            ? "bg-white/85 backdrop-blur-md shadow-xl shadow-brand-primary/5 py-4 px-6 border-white/20"
            : "bg-white shadow-sm p-6 border-gray-100"
        }`}
      >
        <div className="flex items-center gap-5">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-gray-50 hover:bg-brand-secondary/20 hover:text-brand-primary transition-colors shrink-0"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div>
            <div className="flex items-center space-x-3 mb-1.5">
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                {data.entityName}
              </h1>
              <StatusBadge status={data.status} />
            </div>
            <p className="text-sm font-medium text-gray-500 flex items-center space-x-2">
              <span>
                ID:{" "}
                <span className="font-mono text-brand-primary">
                  {data.applicationId}
                </span>
              </span>
              <span className="text-gray-300">•</span>
              <span>
                Submitted:{" "}
                {data.submittedDate
                  ? new Date(data.submittedDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isApproved ? (
            <div className="rounded-xl bg-green-200 text-green-600 shadow-md shadow-green-600/20 transition-all px-4 flex items-center py-2">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Approved
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                className="rounded-xl border-red-200 text-red-600 bg-red-50/50 hover:bg-red-100 hover:text-red-700 hover:border-red-300 shadow-sm transition-all"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject / Query
              </Button>
              <Button
                className="rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-600/20 transition-all border border-green-700/50"
                onClick={() => {
                  setShowModal(true);
                  setIsApproved(true);
                }}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Approve Application
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Data Heavy Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. Basic & Entity Info */}
          <Card className="shadow-lg shadow-gray-100/50 border-0 ring-1 ring-gray-100 rounded-2xl overflow-hidden relative pt-0">
            <CardHeader className="bg-brand-primary/10 border-b border-gray-50 pt-4">
              <CardTitle className="text-lg font-bold flex items-center gap-3 text-gray-900">
                <div className="p-2 bg-brand-primary/10 rounded-lg">
                  <Building2 className="w-5 h-5 text-brand-primary" />
                </div>
                Entity & Applicant Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-gray-50/30 grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <Card className="shadow-lg shadow-gray-100/50 border-0 ring-1 ring-gray-100 rounded-2xl overflow-hidden relative pt-0">
            <CardHeader className="bg-brand-ternary/10 border-b border-gray-50 pt-4">
              <CardTitle className="text-lg font-bold flex items-center gap-3 text-gray-900">
                <div className="p-2 bg-brand-ternary/20 rounded-lg">
                  <Briefcase className="w-5 h-5 text-amber-600" />
                </div>
                Business & Innovation Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-gray-50/30 grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <Card className="shadow-lg shadow-gray-100/50 border-0 ring-1 ring-gray-100 rounded-2xl overflow-hidden relative pt-0">
            <CardHeader className="bg-brand-secondary/10 border-b border-gray-50 pt-4">
              <CardTitle className="text-lg font-bold flex items-center gap-3 text-gray-900">
                <div className="p-2 bg-brand-secondary/30 rounded-lg">
                  <Users className="w-5 h-5 text-purple-700" />
                </div>
                Founders & Directors
                <Badge className="ml-2 bg-brand-secondary text-brand-primary hover:bg-brand-secondary/80">
                  {data.founderDetails?.length || 0}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 bg-gray-50/30">
              {data.founderDetails?.map((founder, idx) => (
                <div
                  key={idx}
                  className="p-6 border-b border-gray-100 last:border-0 hover:bg-white transition-colors"
                >
                  <div className="flex items-center justify-between mb-5">
                    <h4 className="font-bold text-gray-900 flex items-center gap-3 text-lg">
                      <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-brand-primary" />
                      </div>
                      {founder.founderName}
                    </h4>
                    <Badge
                      variant="outline"
                      className="bg-white font-semibold text-brand-primary border-brand-primary/20 px-3 py-1"
                    >
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

        {/* RIGHT COLUMN: Sidebar */}
        <div className="space-y-8">
          {/* 4. Financials & Bank */}
          <Card className="shadow-lg shadow-gray-100/50 border-0 ring-1 ring-gray-100 rounded-2xl overflow-hidden pt-0">
            <CardHeader className="bg-linear-to-br from-gray-50 to-white border-b border-gray-100 pb-5 pt-6">
              <CardTitle className="text-md font-bold flex items-center gap-3 text-gray-900">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Landmark className="w-4 h-4 text-blue-600" />
                </div>
                Banking & Finance
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <DetailItem label="Bank Name" value={data.bankName} />
              <DetailItem label="Account No." value={data.accountNumber} />
              <DetailItem label="IFSC Code" value={data.ifscCode} />
              <Separator className="bg-gray-100" />
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
          <Card className="shadow-xl shadow-brand-primary/5 border-0 ring-1 ring-brand-primary/20 rounded-2xl overflow-hidden bg-linear-to-b from-brand-primary/2 to-transparent">
            <CardHeader className="pb-5 pt-6 border-b border-brand-primary/10">
              <CardTitle className="text-md font-bold flex items-center gap-3 text-brand-primary">
                <div className="p-2 bg-brand-primary/10 rounded-lg">
                  <FileText className="w-4 h-4" />
                </div>
                Uploaded Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
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

              {!data.registrationCertificate &&
                !data.moaDeed &&
                !data.businessPlan && (
                  <div className="py-8 text-center bg-white rounded-xl border border-dashed border-gray-200">
                    <p className="text-sm font-medium text-gray-500">
                      No documents uploaded
                    </p>
                  </div>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export const ApplicantDetailsPage = () => {
  const mockApplicantData: ApplicationData = {
    applicationId: "APP-9A4B2C7",
    status: "Submitted",
    submittedDate: new Date(Date.now() - 86400000).toISOString(),

    email: "founder@himalayanagri.com",
    entityName: "Himalayan AgriTech Solutions",
    applicantName: "Bibek Tamang",
    mobileNo: "+91 9876543210",
    districtOfResidence: "Gangtok",
    sparkId: "SPRK-2026-8891",
    entityConstitution: "Private Limited Company",
    expectedRegistrationDate: "2026-08-27",

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

    bankName: "State Bank of Sikkim",
    accountNumber: "0123456789098",
    ifscCode: "SBSK0000123",
    financeReceived: "Yes",
    financeReceivedDetails:
      "Seed grant of ₹5,000,000 received from State Innovation Fund.",

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
  };
  return (
    <div className="min-h-screen bg-[#fafafa] p-6 custom-scrollbar">
      <div className="mx-auto space-y-6">
        <ApplicantDetails data={mockApplicantData} />
      </div>
    </div>
  );
};
