const express = require("express");
const router = express.Router();
const { search, details, videos, reviews, trending } = require("../controllers/movies.controller");

router.get("/search", search);
router.get("/trending", trending);
router.get("/:id/videos", videos);
router.get("/:id/reviews", reviews);
router.get("/:id", details);

module.exports = router;
