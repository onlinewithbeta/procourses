import axios from "axios";
import mongoose from "mongoose";
import courseReq from "../Models/reqcous.models.js";
import { deductTokens, PermiumUser } from "../Models/user.models.js";
import cfg from "../config/config.js";

const GITHUB_TOKENs = [cfg.gk1, cfg.gk2, cfg.gk3, cfg.gk4, cfg.gk5, cfg.gk6];

let token = GITHUB_TOKENs[0];
let rateLeft;

await selectToken();

async function checkLimit(Tk) {
    let tester = axios.create({
        baseURL: cfg.GAU,
        headers: {
            "User-Agent": "Express.js GitHub API Client",
            Authorization: `token ${Tk}`
        }
    });

    
    let remaining = await tester.get("/rate_limit");
    remaining = remaining.data.resources.core.remaining;
    rateLeft = remaining;
    console.log(remaining);

    if (remaining > 5) return "high";
    return "low";
}

async function selectToken() {
    let TKN = null;
    for (let TK of GITHUB_TOKENs) {
        TKN = await checkLimit(TK);
        if (TKN === "high") return (token = TK);
    }
}

let githubApi = axios.create({
    baseURL: cfg.GAU,
    headers: {
        "User-Agent": "Express.js GitHub API Client",
        Authorization: `token ${token}`
    }
});

let githubRaw = axios.create({
    baseURL: cfg.GRU,
    headers: {
        Accept: "application/vnd.github.v3.raw",
        "User-Agent": "Express.js GitHub API Client",
        Authorization: `token ${token}`
    }
});

export async function getCourses(req, res) {
    try {
        //find userby ID
        let id = req.params.id;
        const user = await PermiumUser.findById(id);
        //validation
        if (!user) throw new Error(`User  not found`);
        //free mode
        if (user.tokens < -1) throw new Error(`Insufficient Tokens`);

        await selectToken();
        //get the courses
        const onlineCourses = await githubApi.get(`/users/UniportPQ/repos`);
        // Format the Online Courses data
        const ourCourses = onlineCourses.data.map(repo => repo.name);
        res.send(ourCourses);
    } catch (err) {
        res.status(500).json({
            error: `Failed to fetch paper : ${e.message}`
        });
    }
}

export async function getCoursesD(req, res) {
    try {
        //find userby ID
        let id = req.params.id;
        const user = await PermiumUser.findById(id);
        //validation
        if (!user) throw new Error(`User  not found`);
             //free mode
        if (user.tokens < -2) throw new Error(`Insufficient Tokens`);

        await selectToken();

        //get the courses
        const onlineCourses = await githubApi.get(`/users/UniportPQ/repos`);

        // Format the Online Courses data
        const ourCourses = onlineCourses.data.map(repo => ({
            name: repo.name,
            description: repo.description
        }));

        res.send(ourCourses);
    } catch (e) {
        res.status(500).json({
            error: `Failed to fetch paper : ${e.message}`
        });
    }
}

export async function getSessions(req, res) {
    try {
        //find userby ID
        let id = req.params.id;
        const user = await PermiumUser.findById(id);
        //validation
        if (!user) throw new Error(`User  not found`);
             //free mode
        if (user.tokens < -2) throw new Error(`Insufficient Tokens`);

        let course = req.params.course;

        if (typeof course !== "string") throw new Error("Select a course ");

        await selectToken();

        let availableYears = await githubApi.get(
            `/repos/UniportPQ/${course}/contents/`
        );
        // Format the Online Courses data
        const ourYears = availableYears.data.map(repo => repo.name);

        res.send(ourYears);
    } catch (e) {
        res.status(500).json({
            error: `Failed to fetch paper : ${e.message}`
        });
    }
}

export async function getPaper(req, res) {
    try {
        //find userby ID
        let id = req.params.id;
        let course = req.params.course;
        let session = req.params.session;
        const user = await PermiumUser.findById(id);

        //validation
        if (!user) throw new Error(`User  not found`);
             //free mode
        if (user.tokens < -2) throw new Error(`Insufficient Tokens`);

        if (typeof course !== "string") throw new Error("Select a course ");
        if (typeof session !== "string") throw new Error("Select a session ");

        await selectToken();

        let paper = await githubRaw.get(`/${course}/main/${session}.json`);
        let ogr = req.headers.origin || " no nononov og";
        let newReq = new courseReq({
            course: course,
            session: session,
            origin: ogr,
            time: new Date().toISOString(),
            user: user.gmail,
            ip: req.ip
        });

        let userSeen = await deductTokens(
            id,
            -1,
            `Requested ${course} ${session}.`
        );

        await newReq.save();

        //send Past Question
        res.json({
            user: userSeen,
            pq: paper.data
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: `Failed to fetch paper : ${err}`
        });
    }
}

export async function getLimits(req, res) {
    try {
        let TKN = null;
        let counts = [];
        for (let Tk of GITHUB_TOKENs) {
            let tester = axios.create({
                baseURL: cfg.GAU,
                headers: {
                    "User-Agent": "Express.js GitHub API Client",
                    Authorization: `token ${Tk}`
                }
            });

            let remaining = await tester.get("/rate_limit");
            remaining = remaining.data.resources.core.remaining;
        }
        res.send(counts);
    } catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
}
