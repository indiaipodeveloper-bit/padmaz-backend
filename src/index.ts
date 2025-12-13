import express, { type Application } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./config/dbconnections.js";
import { AuthRouter } from "./routes/AuthRoutes.js";
import { OrderRouter } from "./routes/OrderRoutes.js";
import { CartRouter } from "./routes/CartRoutes.js";
import { ProductRouter } from "./routes/ProductsRoutes.js";
import { CheckUserLoggedIn } from "./middleware/Auth.js";
dotenv.config();
const maxAge = 3 * 24 * 60 * 60 * 1000;

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    maxAge,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use("/uploads/products", express.static("uploads/products"));

app.use("/api/auth", AuthRouter);
app.use("/api/cart", CheckUserLoggedIn, CartRouter);
app.use("/api/products", ProductRouter);
app.use("/api/order", CheckUserLoggedIn, OrderRouter);

app.get("/", (req, res) => {
  return res.send("padmaz ecommerce backend");
});

connectDB(process.env.DB_URI || "mongodb://127.0.0.1:27017/padmaz").then(() => {
  console.log("db connected");
  app.listen(PORT, () => {
    console.log("app running on port", PORT);
  });
});
