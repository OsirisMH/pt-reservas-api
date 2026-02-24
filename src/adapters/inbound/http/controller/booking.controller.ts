import type { Request, Response, NextFunction } from 'express';

import type { CreateBookingUseCase } from '../../../../core/application/use-cases/create-booking.usecase';

import type { CreateBookingBody, SearchBookingsQuery } from '../schemas/booking.schema';
import type { SearchBookingsUseCase } from '../../../../core/application/use-cases/get-future-bookings.usecase';

export class BookingController {
  constructor(
    private readonly searchBookings: SearchBookingsUseCase,
    private readonly createBooking: CreateBookingUseCase,
  ) {}

  searchBookingsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.validatedQuery as SearchBookingsQuery; 
      const result = await this.searchBookings.execute(query);
      res.status(200).json(result);
    } catch (e) { next(e); }
  };

  createBookingHandler = async (req: Request<unknown, unknown, CreateBookingBody>, res: Response, next: NextFunction) => {
    try {
      const result = await this.createBooking.execute(req.body);
      res.status(201).json(result);
    } catch (e) { next(e); }
  };

  getByReferenceHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json();
    } catch (e) { next(e); }
  };

  getBookingsSummaryHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json();
    } catch (e) { next(e); }
  };

  getBookingsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json();
    } catch (e) { next(e); }
  };

  updateStatusHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json();
    } catch (e) { next(e); }
  };

  updateBookingHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json();
    } catch (e) { next(e); }
  };
}