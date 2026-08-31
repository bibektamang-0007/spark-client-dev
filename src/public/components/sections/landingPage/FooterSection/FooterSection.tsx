import { useTranslation } from "react-i18next";
import brandSrc from "@/shared/assets/logo-startup-sikkim.jpeg";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#4E285E] text-white/75">
      <div className="max-w-350 mx-auto px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
        <div className="flex flex-col gap-4 lg:col-span-1 md:col-span-2">
          <div className="inline-grid place-items-center px-3 py-1.5 bg-white rounded w-max">
            <img
              src={brandSrc}
              alt="SPARK"
              className="h-10 mix-blend-multiply"
            />
          </div>
          <p className="text-[13.5px] leading-relaxed max-w-xs text-white/70">
            {t(
              "footer.about",
              "SPARK is the single digital front door for startups and innovators in Sikkim, operationalising the Sikkim Startup Policy 2024.",
            )}{" "}
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-[11.5px] font-bold tracking-[0.09em] uppercase text-white/70">
            {t("footer.founders.title", "For founders")}
          </h4>{" "}
          <ul className="flex flex-col gap-2.5 text-[13.5px]">
            <li>
              <a
                href="#"
                className="hover:text-white hover:underline underline-offset-4"
              >
                {t("footer.founders.register", "Register your startup")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white hover:underline underline-offset-4"
              >
                {t("footer.founders.schemes", "Open schemes")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white hover:underline underline-offset-4"
              >
                {t("footer.founders.track", "Track an application")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white hover:underline underline-offset-4"
              >
                {t("footer.founders.mentor", "Find a mentor")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-[11.5px] font-bold tracking-[0.09em] uppercase text-white/70">
            {t("footer.ecosystem.title", "Ecosystem")}
          </h4>{" "}
          <ul className="flex flex-col gap-2.5 text-[13.5px]">
            <li>
              <a
                href="#"
                className="hover:text-white hover:underline underline-offset-4"
              >
                {t("footer.ecosystem.incubation", "Incubation Centers")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white hover:underline underline-offset-4"
              >
                {t("footer.ecosystem.innovation", "Innovation Hub")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white hover:underline underline-offset-4"
              >
                {t("footer.ecosystem.dic", "District Industries Centers")}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-white hover:underline underline-offset-4"
              >
                {t("footer.ecosystem.parnter", "Partner Institutions")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-[11.5px] font-bold tracking-[0.09em] uppercase text-white/70">
            {t("footer.dept.title", "Department")}
          </h4>
          <address className="not-italic text-[13px] leading-relaxed text-white/70">
            {t("footer.dept.line1", "Department of Commerce & Industries")}
            <br />
            {t("footer.dept.line2", "Government of Sikkim")}
            <br />
            {t("footer.dept.line3", "Tashiling Secretariat, Gangtok 737101")}
            <br />
            <a
              href="mailto:spark@sikkim.gov.in"
              className="hover:text-white hover:underline"
            >
              spark@sikkim.gov.in
            </a>
          </address>
        </div>
      </div>

      <div className="max-w-350 mx-auto px-10 py-6 border-t border-white/15 flex flex-wrap items-center gap-4 text-[12.5px] text-white/60">
        <span>
          {t(
            "footer.copyright",
            "© 2026 Department of Commerce & Industries, Government of Sikkim",
          )}
        </span>{" "}
        <span className="ml-auto flex gap-5">
          <a href="#" className="hover:text-white">
            {t("footer.legal.privacy", "Privacy")}
          </a>
          <a href="#" className="hover:text-white">
            {t("footer.legal.terms", "Terms")}
          </a>
          <a href="#" className="hover:text-white">
            {t("footer.legal.a11y", "Accessibility")}
          </a>
          <a href="#" className="hover:text-white">
            {t("footer.legal.rti", "RTI")}
          </a>{" "}
        </span>
      </div>
    </footer>
  );
}
