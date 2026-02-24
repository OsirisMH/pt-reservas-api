import { Router } from 'express';
import type { DepartmentController } from '../controller/department.controller';


export const buildDepartmentRoutes = (controller: DepartmentController) => {
  const r = Router();
  r.get('/', controller.getDepartmentsHandler);

  return r;
};