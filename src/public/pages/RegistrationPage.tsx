import { Button } from "@/shared/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { RegistrationForm } from "../components/forms/registration/RegistrationForm";

export const RegistrationPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-6 py-14">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/auth/registration-options")}
        className="-ml-2 h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to options
      </Button>
      <RegistrationForm />
    </div>
  );
};
