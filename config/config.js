import { config } from "dotenv";
config();

const cfg = {
    GRU: process.env.GITHUB_RAW_URL,
    GAU: process.env.GITHUB_API_URL,
    PORT: process.env.PORT,
    gk1: process.env.KEY1,
    gk2: process.env.KEY2,
    gk3: process.env.KEY3,
    gk4: process.env.KEY4,
    gk5: process.env.KEY5,
    gk6: process.env.KEY6,
    DB_URL: process.env.DB_URL
};

export default cfg;

