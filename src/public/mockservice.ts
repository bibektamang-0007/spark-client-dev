import type {
  ApplicationData,
  ApplicationListItem,
  MockFile,
} from "@/shared/types/ApplicantRegistration.types";

const STORAGE_KEY = "spark_application_mock_db";

export class ApplicationMockAPI {
  /**
   * Helper: Converts a File object to a Base64 string for localStorage
   */
  private static async fileToMockFile(file: File): Promise<MockFile> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve({
          name: file.name,
          type: file.type,
          size: file.size,
          base64: reader.result as string,
        });
      reader.onerror = (error) => reject(error);
    });
  }

  /**
   * Helper: Recursively processes data to serialize File objects
   */
  private static async serializeData(data: any): Promise<any> {
    const processed = { ...data };

    for (const key in processed) {
      if (processed[key] instanceof File) {
        processed[key] = await this.fileToMockFile(processed[key]);
      } else if (Array.isArray(processed[key])) {
        processed[key] = await Promise.all(
          processed[key].map(
            async (item: any) => await this.serializeData(item),
          ),
        );
      }
    }
    return processed;
  }

  /**
   * METHOD 1: Save Step Progress
   * Merges new step data with existing data. If no applicationId exists, it creates one.
   */
  static async saveStepProgress(
    applicationId: string | null,
    stepData: Partial<ApplicationData>,
    isFinalSubmit: boolean = false,
  ): Promise<string> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const db = this.getAllFromStorage();
    const id =
      applicationId ||
      `APP-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    const existingIndex = db.findIndex((app) => app.applicationId === id);
    const serializedStepData = await this.serializeData(stepData);

    const baseApplication = {
      applicationId: id,
      status: isFinalSubmit ? "Submitted" : "Draft",
      submittedDate: isFinalSubmit ? new Date().toISOString() : undefined,
    };

    if (existingIndex > -1) {
      // Merge existing data with new step data
      db[existingIndex] = {
        ...db[existingIndex],
        ...serializedStepData,
        status: isFinalSubmit ? "Submitted" : db[existingIndex].status,
        submittedDate: isFinalSubmit
          ? new Date().toISOString()
          : db[existingIndex].submittedDate,
      };
    } else {
      // Create new record
      db.push({ ...baseApplication, ...serializedStepData });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    return id;
  }

  /**
   * METHOD 2: Get Minimal Application List
   */
  static async getApplicationList(): Promise<ApplicationListItem[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const db = this.getAllFromStorage();

    return db.map((app) => ({
      applicationId: app.applicationId,
      entityName: app.entityName || app.applicantName || "Unnamed Entity",
      email: app.email || "No email provided",
      entityType: app.entityConstitution || "Not specified",
      submittedDate: app.submittedDate || "Not submitted",
      status: app.status,
    }));
  }

  /**
   * METHOD 3: Get Full Application Details
   */
  static async getApplicationDetails(
    applicationId: string,
  ): Promise<ApplicationData> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const db = this.getAllFromStorage();
    const application = db.find((app) => app.applicationId === applicationId);

    if (!application) {
      throw new Error(`Application with ID ${applicationId} not found.`);
    }

    return application;
  }

  // --- Private Utility ---
  private static getAllFromStorage(): ApplicationData[] {
    const rawData = localStorage.getItem(STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : [];
  }
}
