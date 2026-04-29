import { MongoUserRepository } from "../../adapters/repositories/MongoUserRepository";
import { MongoListingRepository } from "../../adapters/repositories/MongoListingRepository";
import { MongoBookingRepository } from "../../adapters/repositories/MongoBookingRepository";
import { MongoReviewRepository } from "../../adapters/repositories/MongoReviewRepository";

import { BCryptAuthService } from "../../adapters/services/BCryptAuthService";
import { JwtTokenService } from "../../adapters/services/JwtTokenService";

import { RegisterUser } from "../../application/use-cases/RegisterUser";
import { LoginUser } from "../../application/use-cases/LoginUser";
import { CreateListing } from "../../application/use-cases/CreateListing";
import { GetListings } from "../../application/use-cases/GetListings";
import { GetUser } from "../../application/use-cases/GetUser";
import { CreateBookingRequest } from "../../application/use-cases/CreateBookingRequest";
import { ManageBooking } from "../../application/use-cases/ManageBooking";
import { SuspendUser } from "../../application/use-cases/SuspendUser";
import { FlagListing } from "../../application/use-cases/FlagListing";
// import { CreateReview } from "../../application/use-cases/CreateReview";

import { AuthController } from "../../adapters/controllers/AuthController";
import { ListingController } from "../../adapters/controllers/ListingController";
import { BookingController } from "../../adapters/controllers/BookingController";
import { UserController } from "../../adapters/controllers/UserController";
import { AdminController } from "../../adapters/controllers/AdminController";

class DIContainer {






  constructor() {
    // 1. Repositories
    const userRepo = new MongoUserRepository();
    const listingRepo = new MongoListingRepository();
    const bookingRepo = new MongoBookingRepository();
    const reviewRepo = new MongoReviewRepository();

    // 2. Services
    const authService = new BCryptAuthService();
    const tokenService = new JwtTokenService(process.env.JWT_SECRET || "secret");

    // 3. Use Cases
    const registerUser = new RegisterUser(userRepo, authService);
    const loginUser = new LoginUser(userRepo, authService, tokenService);

    const createListing = new CreateListing(listingRepo);
    const getListings = new GetListings(listingRepo);
    const getUser = new GetUser(userRepo);

    const createBookingRequest = new CreateBookingRequest(bookingRepo, listingRepo);
    const manageBooking = new ManageBooking(bookingRepo);

    const suspendUser = new SuspendUser(userRepo);
    const flagListing = new FlagListing(listingRepo, userRepo);

    // 4. Controllers
    this.authController = new AuthController(registerUser, loginUser);
    this.listingController = new ListingController(createListing, getListings);
    this.bookingController = new BookingController(createBookingRequest, manageBooking, bookingRepo);
    this.userController = new UserController(getUser);
    this.adminController = new AdminController(suspendUser, flagListing);
  }
}

export const di = new DIContainer();