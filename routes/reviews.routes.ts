import { Router } from "express";
import {
  createReview,
  deleteReview,
  getReviewByUserAndFilm,
  getReviewsByFilm,
  getReviewsByUser,
  updateReview,
} from "../controllers/ReviewsController";
import checkAuth from "../middleware/auth.middelware";

export const router = Router();

// api/reviews/
router.get("/", checkAuth, getReviewsByUser);
// api/reviews/for-films/:filmId
router.get("/for-film/:filmId", getReviewsByFilm);
// api/reviews/for-films-user/:filmId
router.get("/for-film-user/:filmId", checkAuth, getReviewByUserAndFilm);
// api/reviews/:id
router.delete("/:id", checkAuth, deleteReview);
// api/reviews/
router.put("/", checkAuth, createReview);
// api/reviews/
router.post("/", checkAuth, updateReview);
