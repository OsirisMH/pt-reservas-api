import type { AppContext } from './context';

import { GetDepartmentsUseCase } from '../core/application/use-cases/get-departments.usecase';
import { CachedDepartmentCatalogAdapter } from '../adapters/outbound/cache/cached-department-catalog.adapter';
import { AuthDepartmentCatalogAdapter } from '../adapters/inbound/http/auth/auth-department-catalog.adapter';
import { DepartmentController } from '../adapters/inbound/http/controller/department.controller';

export const buildDepartmentModule = (ctx: AppContext) => {
  const authCatalog = new AuthDepartmentCatalogAdapter(ctx.authBaseUrl, ctx.internalAuthSecret);
  const cachedCatalog = new CachedDepartmentCatalogAdapter(authCatalog, 10 * 60 * 1000); // 10 min
  
  const getDepartments = new GetDepartmentsUseCase(cachedCatalog);

  const controller = new DepartmentController(getDepartments)

  return { controller };
};