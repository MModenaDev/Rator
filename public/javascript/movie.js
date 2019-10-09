let results = document.getElementById("movieResults");
let searchMovie = document.getElementById("movieSearch").value;
let search = document.getElementById("movieSearchButton");

let movieDB = axios.create({
    baseURL: `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MDB_KEY}&language=en-US&query=${searchMovie}`
})

search.onclick = (e) => {
    console.log('FUDEU');
    
    movieDB
        .get()
        .then((searchResults) => {
            console.log(searchResults);
        })
        .catch(err => console.log(err));
}