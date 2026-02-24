import type { NextFunction, Request, Response } from "express";
import type { GetDepartmentsUseCase } from "../../../../core/application/use-cases/get-departments.usecase";

export class DepartmentController {
  constructor(private readonly getDepartments: GetDepartmentsUseCase) {}

  getDepartmentsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.getDepartments.execute();
      return res.json(data);
    } catch (e) { next(e); }
  };
}