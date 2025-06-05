import express from "express";
import  userRoute  from "./route/userRoute";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", userRoute);

const PORT = 3000;

app.listen(PORT, ( ) => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);
})