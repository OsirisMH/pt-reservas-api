import type { DepartmentOption } from "../dtos/department.dto";
import type { DepartmentCatalogPort } from "../ports/department-catalog.port";

export class GetDepartmentsUseCase {
  constructor(private readonly catalog: DepartmentCatalogPort) {}

  async execute(): Promise<DepartmentOption[]> {
    const items = await this.catalog.getActiveDepartments();
    return items;
  }
}