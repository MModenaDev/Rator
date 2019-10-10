let results = document.getElementById("movieResults");
let search = document.getElementById("movieSearchButton");
let countClicks = 1;

search.onclick = () => {
    let searchMovie = document.getElementById("movieSearch").value;
    axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=bb5a3fc72bf4d909db05d83246521c9b&language=en-US&query=${searchMovie}`)
        .then((searchResult) => {
            searchResult.data.results.forEach(element => {
                let res = document.createElement("p");
                res.innerHTML = element.original_title;
                res.onclick = () => {
                    document.getElementById("movieSearch").remove();
                    let nameField = document.getElementById("nameField");
                    const movieSearchGroup = document.getElementById("movieSearchGroup");
                    movieSearchGroup.innerHTML = `<input name="movieSearch" type="text" class="form-control" placeholder="Digite o nome do filme" aria-label="search"
                    aria-describedby="button-addon2" id="movieSearch" value="${res.innerHTML}">
                  <div class="input-group-append">
                    <button class="btn btn-outline-primary" type="button" data-toggle="modal" data-target="#modalFilme" id="movieSearchButton">Buscar</button>
                  </div>`;
                    res.setAttribute("class", "btn btn-outline-primary");
                    nameField.setAttribute("value", res.innerHTML);
                }
                results.appendChild(res);
            });
        })
        .catch(err => console.log(err));
}