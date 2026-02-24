export type RequestContext = {
  employeeId: number;
  email: string;
  roles: string[];
  requestId?: string;
};