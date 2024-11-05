const express = require("express");
const app = express();
// middleware for parsing body into js object
app.use(express.json());

const port = 3001;

let movies = [
  { id: 1, title: "Inception", watchlist: true },
  { id: 2, title: "The Matrix", watchlist: false },
  { id: 3, title: "Interstellar", watchlist: true },
];

app.post("/api/movies", (req, res) => {
  const { title, watchlist } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  } else {
    const movie = {
      id: `${Date.now()}${Math.floor(Math.random() * 10000)}`,
      title,
      watchlist: watchlist || false,
    };
    movies.push(movie);
    return res.status(201).json(movie);
  }
});

app.get("/api/movies", (req, res) => {
  res.json(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find((m) => m.id === Number(req.params.id));
  if (!movie) {
    res.status(404).json({ error: "Movie not found" });
  } else {
    res.json(movie);
  }
});

app.delete("/api/movies/:id", (req, res) => {
  const movie = movies.find((m) => m.id === Number(req.params.id));
  if (!movie) {
    res.status(404).json({ error: "Movie not found!" });
  } else {
    movies = movies.filter((m) => m.id != req.params.id);
    res.json({ message: "Movie deleted successfully" });
  }
});

app.get("/", (req, res) => {
  res.send("Whats up");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
