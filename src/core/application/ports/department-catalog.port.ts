import type { DepartmentOption } from "../dtos/department.dto";

export interface DepartmentCatalogPort {
  getActiveDepartments(): Promise<DepartmentOption[]>;
}