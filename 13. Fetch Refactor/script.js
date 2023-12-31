// // Fetch
// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', function(){

//     const inputKeyword = document.querySelector('.input-keyword');
//     fetch('http://www.omdbapi.com/?apikey=d20aad1e&s=' + inputKeyword.value)
//     .then(response => response.json())
//     .then(response => {
//         const movies = response.Search;
//         let cards = '';
//         movies.forEach(m => cards += showCards(m));
//         const movieContainer = document.querySelector('.movie-container');
//         movieContainer.innerHTML = cards;


//         // ketika tombol detail di-klik
//         const modalDettailButton = document.querySelectorAll('.modal-detail-button');
//         modalDettailButton.forEach(btn =>{
//             btn.addEventListener('click', function(){
//                 const imdbid = this.dataset.imdbid;
//                 fetch('http://www.omdbapi.com/?apikey=d20aad1e&i='+ imdbid)
//                 .then(response => response.json())
//                 .then(m => {
//                     const movieDetail = showMovieDeail(m);
//                     const modalBody = document.querySelector('.modal-body');
//                     modalBody.innerHTML = movieDetail;
//                     // $('.modal-body').html(movieDetail);
//                 })
//             })
//         }) 
//     })
// })



const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click',async function(){
    const inputKeyword = document.querySelector('.input-keyword');
    const movies = await getMovies(inputKeyword.value);
    console.log(movies)
    updateUI(movies);
})

// event binding
document.addEventListener('click', async function(e){
    if(e.target.classList.contains('modal-detail-button')){
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbid);
        updateUIDetail(movieDetail);
    }
})

function getMovieDetail(imdbid){
    return fetch('http://www.omdbapi.com/?apikey=d20aad1e&i='+ imdbid)
                .then(response => response.json())
                .then(m => m)
}

function updateUIDetail(m){
    const movieDetail = showMovieDeail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}

function getMovies(keyword){
    return fetch('http://www.omdbapi.com/?apikey=d20aad1e&s=' + keyword)
        .then(response => response.json())
        .then(response => response.Search)
}

function updateUI(movies){
        let cards = '';
        movies.forEach(m => cards += showCards(m));
        const movieContainer = document.querySelector('.movie-container');
        movieContainer.innerHTML = cards;
}

function showCards(m){
    return `
    <div class="col-md-4 my-5">
    <div class="card" style="width: 18rem;">
        <img src="${m.Poster}" width="100px" class="card-img-top" >
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
          <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${m.imdbID}">Show Details</a>
        </div>
      </div>
    </div>`
}

function showMovieDeail(m){
    return `
    <div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.Poster}" class="img-fluid">
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                <li class="list-group-item">Director : <strong>${m.Director}</strong></h4></li>
                <li class="list-group-item">Actor : <strong>${m.Actors}</strong></li>
                <li class="list-group-item">Writter : <strong>${m.Writer}</strong></li>
                <li class="list-group-item">plot : <strong>${m.Plot}</strong><br></li>
            </ul>
        </div>
    </div>
</div>
`
}

