export type UserRole = "super_admin";

export interface AuthUser {
  userId: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
}
