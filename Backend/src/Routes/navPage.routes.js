import express from "express";
import {
  getAllNavPages,
  upsertManyNavPages,
  upsertNavPage,
} from "../Controller/navPage.controller.js";

const router = express.Router();

router.get("/", getAllNavPages);
router.put("/bulk", upsertManyNavPages);
router.put("/:slug", upsertNavPage);

export default router;
