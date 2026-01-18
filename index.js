import express from "express";
import cors from "cors";
import router from "./routes/payment.routes.js";
import { config } from "dotenv";


const app = express();

config();
app.use(express.json());
app.use(cors());
app.use("/", router);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))