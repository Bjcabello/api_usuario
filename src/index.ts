import express from "express";
import  indexRoutes  from "./routes/index";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/api',indexRoutes);

const PORT = 3000;


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
})
