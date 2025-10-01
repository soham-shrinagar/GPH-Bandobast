import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { registration, loginWithEmail, loginWithId } from "./controllers/authControl.js";
import { personnelRegistration, loginWithPersonnelId } from "./controllers/authControlMobile.js";
dotenv.config();
const app = express();
app.use(cors({
    origin: (origin, callback) => {
        callback(null, true);
    },
    credentials: true,
}));
app.use(express.json());
app.post("/api/registration", registration);
app.post("/api/login-email", loginWithEmail);
app.post("/api/login-officerId", loginWithId);
app.post("/api/personnelRegistration", personnelRegistration);
app.post("/api/login-personnelId", loginWithPersonnelId);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
//# sourceMappingURL=app.js.map