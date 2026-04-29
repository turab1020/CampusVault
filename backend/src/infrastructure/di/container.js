import { MongoUserRepository } from "../../adapters/repositories/MongoUserRepository.js";
import { MongoListingRepository } from "../../adapters/repositories/MongoListingRepository.js";
import { MongoBookingRepository } from "../../adapters/repositories/MongoBookingRepository.js";
import { MongoReviewRepository } from "../../adapters/repositories/MongoReviewRepository.js";

import { BCryptAuthService } from "../../adapters/services/BCryptAuthService.js";
import { JwtTokenService } from "../../adapters/services/JwtTokenService.js";

import { RegisterUser } from "../../application/use-cases/RegisterUser.js";
import { LoginUser } from "../../application/use-cases/LoginUser.js";
import { CreateListing } from "../../application/use-cases/CreateListing.js";
import { GetListings } from "../../application/use-cases/GetListings.js";
import { GetUser } from "../../application/use-cases/GetUser.js";
import { CreateBookingRequest } from "../../application/use-cases/CreateBookingRequest.js";
import { ManageBooking } from "../../application/use-cases/ManageBooking.js";
import { SuspendUser } from "../../application/use-cases/SuspendUser.js";
import { FlagListing } from "../../application/use-cases/FlagListing.js";
// import { CreateReview } from "../../application/use-cases/CreateReview.js";

import { AuthController } from "../../adapters/controllers/AuthController.js";
import { ListingController } from "../../adapters/controllers/ListingController.js";
import { BookingController } from "../../adapters/controllers/BookingController.js";
import { UserController } from "../../adapters/controllers/UserController.js";
import { AdminController } from "../../adapters/controllers/AdminController.js";

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