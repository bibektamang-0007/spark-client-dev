import logoSrc from "@/shared/assets/logo-startup-sikkim.jpeg";
import React from "react";

type BrandVariant = "default" | "icon" | "monochrome";

interface BrandLogoProps {
  variant?: BrandVariant;
  className?: string;
  onClick?: () => void;
  showText?: boolean;
  brandText?: string | React.ReactNode;
}

export const BrandLogo = ({
  variant = "default",
  className = "",
  onClick,
  showText = false,
  brandText = "STARTUP SIKKIM",
}: BrandLogoProps) => {
  const outerWrapperStyles =
    "group inline-flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] cursor-pointer shrink-0";

  const variants = {
    default: {
      imageContainer: "h-14 w-auto",
      image: "h-full w-auto object-contain",
      text: "text-xl font-extrabold tracking-tight text-slate-900",
    },
    icon: {
      imageContainer:
        "h-12 w-12 shrink-0 rounded-xl overflow-hidden shadow-sm shadow-brand-primary/10 border border-gray-100 bg-white",
      image:
        "h-[180%] w-[180%] max-w-none object-cover object-top -translate-y-[5%]",
      text: "text-xl font-extrabold tracking-tight text-brand-primary",
    },
    monochrome: {
      imageContainer:
        "h-14 w-auto opacity-70 group-hover:opacity-100 transition-opacity",
      image:
        "h-full w-auto object-contain grayscale contrast-125 brightness-90",
      text: "text-xl font-bold tracking-tight text-gray-500 group-hover:text-gray-700 transition-colors",
    },
  };

  const activeVariant = variants[variant];

  return (
    <div
      className={`${outerWrapperStyles} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : "img"}
      aria-label={typeof brandText === "string" ? brandText : "Brand Logo"}
    >
      <div className={activeVariant.imageContainer}>
        <img src={logoSrc} alt="Brand Logo" className={activeVariant.image} />
      </div>

      {showText && (
        <div className="flex flex-col justify-center pt-1">
          {typeof brandText === "string" ? (
            <div className={activeVariant.text}>
              {brandText.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={
                    index === 0
                      ? "text-brand-primary mr-1.5"
                      : "text-slate-600 font-medium"
                  }
                >
                  {word}
                </span>
              ))}
            </div>
          ) : (
            <div className={activeVariant.text}>{brandText}</div>
          )}
        </div>
      )}
    </div>
  );
};
