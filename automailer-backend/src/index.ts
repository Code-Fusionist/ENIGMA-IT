import express, {Request, Response} from "express";
import userRoute from "./routes/user.route";
import dotenv from "dotenv";
import {connectToDB} from "./utils/DB";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use("/api/user", userRoute);

connectToDB().then(() => {

    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({Message: "Server Running..."})
    });

    app.listen(PORT, () => {
        console.log(`Server listening on: http://localhost:${PORT}`);
    });
});
