export interface LoginResponse {
    token: string;
  }
  export interface SignupPayload {
    email: string;
    password: string;
    company: string;
    username: string;
  }