import { Router } from "express";
import cors from "cors";

import {
    getCourses,
    getCoursesD,
    getSessions,
    getPaper,
    getLimits
} from "../controls/controller.js";

const cousrseRoute = Router();

//Get course list
cousrseRoute.get("/:id/courses", getCourses);
cousrseRoute.get("/:id/coursesD", getCoursesD);
cousrseRoute.get("/:id/sessions/:course", getSessions);
cousrseRoute.get("/:id/paper/:course/:session", cors(), getPaper);
cousrseRoute.get("/limits", getLimits);

export default cousrseRoute;
