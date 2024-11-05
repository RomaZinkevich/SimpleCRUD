const express = require("express");
const app = express();
let movies = [ { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 }, { id: 2, title: "The Matrix", director: "The Wachowskis", year: 1999 }, { id: 3, title: "Parasite", director: "Bong Joon-ho", year: 2019 } ];
app.set("view engine", "ejs");
app.use(express.json());

app.get("/", (req, res) => {
    let htmlCode = "<ul>"
    movies.forEach(movie => {
        htmlCode += `<li><b>${movie.title}<b> by ${movie.director} (${movie.year})</li>`;
    })
    htmlCode+="</ul>"
    res.send(htmlCode);
});

app.get("/movies", (req, res) => {
    res.json(movies)
})

app.get("/movies/:id", (req, res) => {
    let id = req.params.id;
    let movie = movies.find(movie => movie.id == id);
    if (!movie) {
        res.json({"error":"id not found"});
    }
    else res.json(movie)
})

app.post("/movies", (req, res) => {
    if (!req.body.title || !req.body.director || !req.body.year) {
        return res.json({"error":"Please enter title, director and year properly"});
    }
    let newMovie = {
        id: Math.round(Math.random()*10000),
        title: req.body.title,
        director: req.body.director,
        year: req.body.year
    }
    movies = [...movies, newMovie];
    res.json({"status":"success","data":newMovie})
})

const port = 5000;
app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});