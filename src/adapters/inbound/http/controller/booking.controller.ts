import type { Request, Response, NextFunction } from 'express';

import type { CreateBookingUseCase } from '../../../../core/application/use-cases/create-booking.usecase';

import type { CreateBookingBody, SearchBookingsQuery } from '../schemas/booking.schema';
import type { SearchBookingsUseCase } from '../../../../core/application/use-cases/search-bookings.usecase';
import type { GetBookingsByReferenceUseCase } from '../../../../core/application/use-cases/get-booking-by-reference.usecase';
import type { UpdateBookingByReferenceUseCase } from '../../../../core/application/use-cases/update-booking-by-reference-usecase';

export class BookingController {
  constructor(
    private readonly searchBookings: SearchBookingsUseCase,
    private readonly createBooking: CreateBookingUseCase,
    private readonly getBookingByReference: GetBookingsByReferenceUseCase,
    private readonly updateByReference: UpdateBookingByReferenceUseCase,
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
      const reference = req.params.reference as string;
      const result = await this.getBookingByReference.execute(reference);
      res.status(200).json(result);
    } catch (e) { next(e); }
  };

  getBookingsHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.validatedQuery as SearchBookingsQuery; 
      const result = await this.searchBookings.execute(query);
      res.status(200).json(result);
    } catch (e) { next(e); }
  };

  updateBookingHandler = async (req: Request<{ reference: string }, unknown, any>, res: Response, next: NextFunction) => {
    try {
      const reference = req.params.reference as string
      const body = req.body;
      console.log({body, reference})
      await this.updateByReference.execute({
        ...body,
        reference,
      });
      res.status(204).json();
    } catch (e) { next(e); }
  };
}