import type { Request, Response, NextFunction } from 'express';

import type { GetFutureBookingsUseCase } from '../../../../core/application/use-cases/get-future-bookings.usecase';
import type { CreateBookingUseCase } from '../../../../core/application/use-cases/create-booking.usecase';

import type { CreateBookingBody, GetFutureBookingsQuery } from '../schemas/booking.schemas';

export class BookingController {
  constructor(
    private readonly getFutureBookings: GetFutureBookingsUseCase,
    private readonly createBooking: CreateBookingUseCase,
  ) {}

  getFutureBookingsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.validatedQuery as GetFutureBookingsQuery; 
      const result = await this.getFutureBookings.execute(query);
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
      console.log(req.query)
      const query = req.validatedQuery as GetFutureBookingsQuery; 
      const result = await this.getFutureBookings.execute(query);
      res.status(200).json(result);
    } catch (e) { next(e); }
  };

  getBookingsSummaryHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.validatedQuery as GetFutureBookingsQuery; 
      const result = await this.getFutureBookings.execute(query);
      res.status(200).json(result);
    } catch (e) { next(e); }
  };

  getBookingsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.validatedQuery as GetFutureBookingsQuery; 
      const result = await this.getFutureBookings.execute(query);
      res.status(200).json(result);
    } catch (e) { next(e); }
  };

  updateStatusHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.validatedQuery as GetFutureBookingsQuery; 
      const result = await this.getFutureBookings.execute(query);
      res.status(200).json(result);
    } catch (e) { next(e); }
  };

  updateBookingHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.validatedQuery as GetFutureBookingsQuery; 
      const result = await this.getFutureBookings.execute(query);
      res.status(200).json(result);
    } catch (e) { next(e); }
  };
}