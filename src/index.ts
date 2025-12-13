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
import { Product } from "./models/ProductModel.js";
dotenv.config();
const maxAge = 3 * 24 * 60 * 60 * 1000;

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://padmas.vercel.app"],
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

connectDB(process.env.DB_URI || "mongodb://127.0.0.1:27017/padmaz").then(
  async () => {
    await Product.insertMany([
      {
        title: "5050 Cookies",
        description: "Crispy and sweet 50-50 style cookies.",
        img: "5050 cookies.png",
        price: 35,
        category: ["cookies", "morning"],
      },
      {
        title: "Ajwain Cookie",
        description: "Aromatic ajwain flavored cookie.",
        img: "ajwain cookie.png",
        price: 30,
        category: ["cookies", "morning"],
      },
      {
        title: "Ajwain",
        description: "Classic ajwain flavored biscuit.",
        img: "ajwain.png",
        price: 28,
        category: ["biscuits", "morning"],
      },
      {
        title: "Big Peanut Brust",
        description: "Crunchy peanut burst cookies.",
        img: "big peanut brust.png",
        price: 40,
        category: ["cookies", "morning"],
      },
      {
        title: "Big Til Coconut Cookie",
        description: "Sesame and coconut blended cookie.",
        img: "big til coconut cookie.png",
        price: 42,
        category: ["cookies", "morning"],
      },
      {
        title: "Bombay Toast",
        description: "Crispy and delicious Bombay-style toast.",
        img: "bombay toast.png",
        price: 25,
        category: ["toast", "morning"],
      },
      {
        title: "Butter Cake",
        description: "Soft and rich buttery cake.",
        img: "butter cake.png",
        price: 50,
        category: ["cake", "morning"],
      },
      {
        title: "Chaska Maska",
        description: "Tangy and savory chaska maska snack.",
        img: "chaska maska.png",
        price: 20,
        category: ["snack", "evening"],
      },
      {
        title: "Choco Bite",
        description: "Small bites of chocolate cookies.",
        img: "choco bite.png",
        price: 30,
        category: ["cookies", "morning"],
      },
      {
        title: "Choco Cake",
        description: "Soft chocolate-flavored cake.",
        img: "choco cake.png",
        price: 55,
        category: ["cake", "morning"],
      },
      {
        title: "Coco King",
        description: "Coconut-rich crispy cookie.",
        img: "coco king.png",
        price: 38,
        category: ["cookies", "morning"],
      },
      {
        title: "Cocobite Cokkie",
        description: "Crunchy coconut-flavored cookie.",
        img: "cocobite cokkie.png",
        price: 32,
        category: ["cookies", "morning"],
      },
      {
        title: "Corn Bite Cookie",
        description: "Corn bite crunchy cookie.",
        img: "corn bite cookie.png",
        price: 28,
        category: ["cookies", "morning"],
      },
      {
        title: "Corn Bite",
        description: "Crispy and tasty corn snack.",
        img: "corn bite.png",
        price: 20,
        category: ["snack", "evening"],
      },
      {
        title: "Corn Brust",
        description: "Bursting corny crunch treat.",
        img: "corn brust.png",
        price: 22,
        category: ["snack", "evening"],
      },
      {
        title: "Cup Cake Brown",
        description: "Soft brown-colored cupcake.",
        img: "cup cake brown.png",
        price: 18,
        category: ["cupcake", "morning"],
      },
      {
        title: "Cup Cake Chocolate Cream",
        description: "Chocolate cream-filled cupcake.",
        img: "cup cake chocolate cream.png",
        price: 22,
        category: ["cupcake", "morning"],
      },
      {
        title: "Cup Cake Cream Filled Cake",
        description: "Cupcake filled with creamy goodness.",
        img: "cup cake cream filled cake.png",
        price: 24,
        category: ["cupcake", "morning"],
      },
      {
        title: "Cup Cake Orange",
        description: "Zesty orange-flavored cupcake.",
        img: "cup cake orange.png",
        price: 20,
        category: ["cupcake", "morning"],
      },
      {
        title: "Cup Cake Red Velvet Cream",
        description: "Red velvet cupcake with cream.",
        img: "cup cake red velvet cream.png",
        price: 25,
        category: ["cupcake", "morning"],
      },
      {
        title: "Cup Cake Strawberry",
        description: "Strawberry flavored cupcake.",
        img: "cup cake strawberry.png",
        price: 20,
        category: ["cupcake", "morning"],
      },
      {
        title: "Cup Cake",
        description: "Soft and fluffy cupcake.",
        img: "cup cake.png",
        price: 15,
        category: ["cupcake", "morning"],
      },
      {
        title: "Finger Toast",
        description: "Thin and crunchy finger-shaped toast.",
        img: "finger toast.png",
        price: 18,
        category: ["toast", "morning"],
      },
      {
        title: "Fruit Bite",
        description: "Fruit flavored crispy cookies.",
        img: "fruit bite.png",
        price: 32,
        category: ["cookies", "morning"],
      },
      {
        title: "Fruit Cake",
        description: "Soft fruit-filled cake.",
        img: "fruit cake.png",
        price: 60,
        category: ["cake", "morning"],
      },
      {
        title: "Jeera",
        description: "Jeera flavored classic biscuit.",
        img: "jeera.png",
        price: 25,
        category: ["biscuits", "morning"],
      },
      {
        title: "Jhal Misti Cookie",
        description: "Sweet and spicy jhal misti cookie.",
        img: "jhal misti cookie.png",
        price: 30,
        category: ["cookies", "morning"],
      },
      {
        title: "Jhal Misti",
        description: "A sweet and spicy snack delight.",
        img: "jhal misti.png",
        price: 20,
        category: ["snack", "evening"],
      },
      {
        title: "Jhilmil Cookie",
        description: "Colorful crunchy jhilmil cookie.",
        img: "jhilmil cookie.png",
        price: 35,
        category: ["cookies", "morning"],
      },
      {
        title: "Jumbo Toast",
        description: "Large thick-cut crispy toast.",
        img: "jumbo toast.png",
        price: 28,
        category: ["toast", "morning"],
      },
      {
        title: "Kala Jeera",
        description: "Dark roasted jeera flavored biscuit.",
        img: "kala jeera.png",
        price: 27,
        category: ["biscuits", "morning"],
      },
      {
        title: "Magical Milk Toast",
        description: "Milk-based crunchy toast snack.",
        img: "magical milk toast.png",
        price: 30,
        category: ["toast", "morning"],
      },
      {
        title: "Makhan Cake",
        description: "Soft buttery makhan cake.",
        img: "makhan cake.png",
        price: 55,
        category: ["cake", "morning"],
      },
      {
        title: "Malai Cake",
        description: "Rich and creamy malai cake.",
        img: "malai cake.png",
        price: 58,
        category: ["cake", "morning"],
      },
      {
        title: "Namkeen Bite Cookie",
        description: "Salted namkeen-flavored cookie.",
        img: "namkeen bite cookie.png",
        price: 30,
        category: ["cookies", "morning"],
      },
      {
        title: "Namkeen Bite",
        description: "Crispy namkeen snack.",
        img: "namkeen bite.png",
        price: 18,
        category: ["snack", "evening"],
      },
      {
        title: "Nankhatai",
        description: "Classic Indian nankhatai cookie.",
        img: "nankhatai.png",
        price: 40,
        category: ["cookies", "morning"],
      },
      {
        title: "Peanut Cookie",
        description: "Crunchy peanut-flavored cookie.",
        img: "peanut cookie.png",
        price: 32,
        category: ["cookies", "morning"],
      },
      {
        title: "Peanut",
        description: "Classic peanut-based snack.",
        img: "peanut.png",
        price: 20,
        category: ["snack", "evening"],
      },
      {
        title: "Pineapple Cookies",
        description: "Sweet pineapple-flavored cookies.",
        img: "pineapple cookies.png",
        price: 35,
        category: ["cookies", "morning"],
      },
      {
        title: "Puff Pakija",
        description: "Crispy puffed snack delight.",
        img: "puff pakija.png",
        price: 22,
        category: ["snack", "evening"],
      },
      {
        title: "Roll Cake",
        description: "Soft and sweet rolled cake.",
        img: "roll cake.png",
        price: 60,
        category: ["cake", "morning"],
      },
      {
        title: "Ruskee",
        description: "Crunchy ruskee toast.",
        img: "ruskee.png",
        price: 25,
        category: ["toast", "morning"],
      },
      {
        title: "Soanpapdi Cookies",
        description: "Cookies inspired by soanpapdi flavor.",
        img: "soanpapdi cookies.png",
        price: 38,
        category: ["cookies", "morning"],
      },
      {
        title: "Special Butter Toast",
        description: "Rich butter-infused toast.",
        img: "special butter toast.png",
        price: 28,
        category: ["toast", "morning"],
      },
      {
        title: "Spicy Little Finger Toast 2",
        description: "Spicy finger-sized toast snack.",
        img: "spicy little finger toast 2.png",
        price: 20,
        category: ["toast", "morning"],
      },
      {
        title: "Spicy Little Finger Toast 3",
        description: "Extra spicy version of finger toast.",
        img: "spicy little finger toast 3.png",
        price: 20,
        category: ["toast", "morning"],
      },
      {
        title: "Spicy Little Finger Toast",
        description: "Spicy crunchy finger toast.",
        img: "spicy little finger toast.png",
        price: 20,
        category: ["toast", "morning"],
      },
      {
        title: "Sweet & Salty",
        description: "Balanced sweet and salty snack.",
        img: "sweet & salty.png",
        price: 18,
        category: ["snack", "evening"],
      },
      {
        title: "Til Badam Cookie, Jeera Cookie, Peanut Cookie",
        description: "Assorted nut and jeera cookies.",
        img: "til badam cookie, jeera cookie, peanut cookie.png",
        price: 45,
        category: ["mix", "evening"],
      },
      {
        title: "Til Badam Cookies",
        description: "Sesame and almond rich cookies.",
        img: "til badam cookies.png",
        price: 38,
        category: ["cookies", "morning"],
      },
      {
        title: "Til Badam",
        description: "Delicious sesame almond snack.",
        img: "til badam.png",
        price: 20,
        category: ["snack", "evening"],
      },
      {
        title: "Til Bite Cookie",
        description: "Crunchy sesame bite cookie.",
        img: "til bite cookie.png",
        price: 32,
        category: ["cookies", "morning"],
      },
      {
        title: "Til Bite",
        description: "Sesame flavored crunchy bites.",
        img: "til bite.png",
        price: 20,
        category: ["snack", "evening"],
      },
      {
        title: "Til Coconut Cookie",
        description: "Sesame and coconut flavored cookie.",
        img: "til coconut cookie.png",
        price: 35,
        category: ["cookies", "morning"],
      },
      {
        title: "Til Peanut Cookie",
        description: "Sesame and peanut flavored cookie.",
        img: "til peanut cookie.png",
        price: 32,
        category: ["cookies", "morning"],
      },
      {
        title: "Toast",
        description: "Classic crunchy toast.",
        img: "toast.png",
        price: 25,
        category: ["toast", "morning"],
      },
      {
        title: "Toastee",
        description: "Crispy and tasty toastee snack.",
        img: "toastee.png",
        price: 28,
        category: ["toast", "morning"],
      },
      {
        title: "Top Toast",
        description: "Premium quality crunchy toast.",
        img: "top toast.png",
        price: 30,
        category: ["toast", "morning"],
      },
      {
        title: "Yummy Roll",
        description: "Soft and delicious cake roll.",
        img: "yummy roll.png",
        price: 45,
        category: ["cake", "morning"],
      },
    ]);
    console.log("db connected");
    app.listen(PORT, () => {
      console.log("app running on port", PORT);
    });
  }
);
