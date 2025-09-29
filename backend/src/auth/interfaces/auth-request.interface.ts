export interface AuthenticatedUser {
  userId: string;
  email: string;
}

export interface AuthRequest extends Request {
  user: AuthenticatedUser;
}
