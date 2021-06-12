
let theInput = document.querySelector(".repos-container .get-repos input"),
  getBtn = document.querySelector(".repos-container .get-repos .get-btn"),
  reposPlace = document.querySelector(".repos-container .data-show ");
getBtn.addEventListener("click", _ => getRepositories());
function getRepositories() {
  if (theInput.value == "") {
    reposPlace.innerHTML = "<span>Please Write Github Username</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then(response => response.json())
      .then(Repositories => {
        reposPlace.innerHTML = "";
        Repositories.forEach(repository => {
          let mainDiv = document.createElement("div"),
            btnsDiv = document.createElement("div"),
            textDiv = document.createElement("div"),
            repoName = document.createTextNode(repository.name),
            theUrl = document.createElement("a"),
            urlText = document.createTextNode("Visit"),
            stars = document.createElement("span"),
            starsCount = document.createTextNode(`Stars ${repository.stargazers_count}`);
          theUrl.href = `https://github.com/${theInput.value}/${repository.name}`;
          theUrl.setAttribute('target', '_blank');
          theUrl.appendChild(urlText);
          stars.appendChild(starsCount);
          btnsDiv.appendChild(theUrl);
          btnsDiv.appendChild(stars);
          btnsDiv.setAttribute('class', "btn-div");
          textDiv.appendChild(repoName);
          mainDiv.appendChild(btnsDiv);
          mainDiv.appendChild(textDiv);
          mainDiv.setAttribute("class", "repo-box");
          reposPlace.appendChild(mainDiv);
        });
      });
  }
}
