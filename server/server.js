import express from "express";
import cors from "cors";
import characters from "./routes/characters.js";
import items from "./routes/items.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/characters", characters);
app.use("/items", items);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});