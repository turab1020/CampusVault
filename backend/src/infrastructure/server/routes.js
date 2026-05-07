import { Router } from "express";
import { di } from "../di/container.js";
import { authMiddleware } from "../../adapters/middleware/AuthMiddleware.js";
import { validateRequest, registerSchema, loginSchema, createListingSchema } from "../../adapters/middleware/ValidationMiddleware.js";

export const router = Router();

// Auth Routes
router.post("/auth/register", validateRequest(registerSchema), (req, res) => di.authController.register(req, res));
router.post("/auth/login", validateRequest(loginSchema), (req, res) => di.authController.login(req, res));
router.get("/auth/me", authMiddleware, (req, res) => di.authController.getMe(req, res));

// User Routes
router.get("/users/:id", (req, res) => di.userController.getById(req, res));
router.delete("/users/me", authMiddleware, (req, res) => di.userController.deleteMyAccount(req, res));

// Listing Routes
router.get("/listings", (req, res) => di.listingController.getAll(req, res));
router.get("/listings/:id", (req, res) => di.listingController.getById(req, res));
router.post("/listings", authMiddleware, validateRequest(createListingSchema), (req, res) => di.listingController.create(req, res));

// Booking Routes
router.post("/bookings", authMiddleware, (req, res) => di.bookingController.create(req, res));
router.get("/bookings/mine", authMiddleware, (req, res) => di.bookingController.getMine(req, res));
router.patch("/bookings/:id/approve", authMiddleware, (req, res) => di.bookingController.approve(req, res));
router.patch("/bookings/:id/cancel", authMiddleware, (req, res) => di.bookingController.cancel(req, res));

// Admin Routes
router.patch("/admin/users/:id/suspend", authMiddleware, (req, res) => di.adminController.suspendUserAction(req, res));
router.patch("/admin/listings/:id/flag", authMiddleware, (req, res) => di.adminController.flagListingAction(req, res));
router.patch("/admin/listings/:id/unflag", authMiddleware, (req, res) => di.adminController.unflagListingAction(req, res));