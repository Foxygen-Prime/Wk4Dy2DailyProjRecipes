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
//buttons//






function dataToPopulate(data) {
  data.forEach( function (data) {
    let title = data.title;
    let href = data.href;
    let thumbnail = data.thumbnail;
    console.log(title, href, thumbnail);
    recipeCard += `
    <div class="oneRecipeCard">
    <p>${title}</p>
    <a href="${href}"></a>
    <img src="${thumbnail}">
    </div>
    `;
    console.log(recipeCard);
  })
  searchResults.innerHTML = recipeCard;
}
