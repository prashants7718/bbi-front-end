export interface InviteUserPayload {
  email: string;
  team: string;
  company: string;
  name: string;
  username: string;
}
export interface Team {
  _id: string;
  name: string;
  username: string;
  company: string;
}
export interface TeamResponse {
  data: Team;
}

export interface EmployeeRecord {
  _id: string;
  username: string;
  email: string;
  password: string;
  company: string;
  team: string[];
  local: Local;
  role: string;
  name: string;
  scores: number[];
  jobTitle: string;
  __v: number;
  teamNames: string[];
  testStatus: string;
}

export interface Local {
  verificationCode: string;
  status: string;
}
export interface UserAssignment  {
  assigned: EmployeeRecord[];
  remaining: EmployeeRecord[];
};