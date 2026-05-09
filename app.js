const express = require("express");
const path = require("path");

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (req, res) => {
    res.json({ status: "Healthy", project: "Music player" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 DeploySafe SafarMusicPlayergit status running on port ${PORT}`);
});