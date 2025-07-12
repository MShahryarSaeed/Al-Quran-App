import express from "express";
import { createBookmark } from "./controllers/BookmarkCtrl.js";
import ipMiddleware from "../../middlewares/ipMiddleware.js";

const bookmarksRoutes=express.Router();

bookmarksRoutes.post('/create',ipMiddleware,createBookmark);


export default bookmarksRoutes;