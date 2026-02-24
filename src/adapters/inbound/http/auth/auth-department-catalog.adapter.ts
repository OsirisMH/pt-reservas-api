import type { DepartmentOption } from "../../../../core/application/dtos/department.dto";
import type { DepartmentCatalogPort } from "../../../../core/application/ports/department-catalog.port";

import { InternalServerError } from "../../../../core/application/errors/http.error";

export class AuthDepartmentCatalogAdapter implements DepartmentCatalogPort {
  constructor(
    private readonly baseUrl: string,
    private readonly internalAuthSecret: string,
  ) {}

  async getActiveDepartments(): Promise<DepartmentOption[]> {
    const res = await fetch(`${this.baseUrl}/departments`, {
      headers: {
        'x-internal-auth': this.internalAuthSecret
      }
    });

    if (!res.ok) {
      throw new InternalServerError('AUTH_DEPARTMENTS_FETCH_FAILED')
    }

    return (await res.json()) as DepartmentOption[];
  }
}