const express = require("express");
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
const errorMiddleware = require("./middleware/errorMiddleware")
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(errorMiddleware);

app.use("/user", userRoutes);

app.get("/", (req, res) => {
    res.send("Server running!")
})

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})