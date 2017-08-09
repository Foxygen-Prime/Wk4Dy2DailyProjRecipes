let searchQuery = document.querySelector("#searchTerms");
let searchResults = document.querySelector('#searchResults');
let searchInput = document.getElementById("searchInputSubmit");
let recipeCard = '';
let url = "http://recipepuppyproxy.herokuapp.com/api/?q=";

searchInput.addEventListener("click", function () {

  fetch(url + searchQuery.value)
    .then(
      function(resp) {
        if (resp.status !== 200) {
          console.log('Shit\'s broke' + resp.status);
          return;
        }
        resp.json().then(function(objectData) {
          const data = objectData.results;
          dataToPopulate(data);
        });
      }
    )
    .catch(function(err) {
      console.log("Fetching errors", err);
    })
});


function dataToPopulate(data) {
  recipeCard = "";
  data.forEach( function (data) {
    let title = data.title;
    let href = data.href;
    let thumbnail = data.thumbnail;
    if (thumbnail === "") {
      thumbnail = "http://via.placeholder.com/107x80";

    }
    // console.log(title, href, thumbnail);
    recipeCard += `
    <div class="oneRecipeCard hvr-float-shadow">
    <p>${title}</p>
    <a href="${href}"><p>Recipe</p></a>
    <img src="${thumbnail}">
    </div>
    `;
    console.log(recipeCard);
  })
  searchResults.innerHTML = recipeCard;
}
