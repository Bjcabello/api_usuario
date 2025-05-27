import express from "express";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use("/api", userRoutes);

const PORT = 3000;


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
})
