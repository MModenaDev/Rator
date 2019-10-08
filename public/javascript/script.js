let star = document.getElementById('star')
star.onclick = (e) => {
  if (star.alt == "star-vazio") {
    star.src = "/img/star-cheio.png";
    star.alt = "star-cheio";
  } else {
    star.src = "/img/star-vazio.png";
    star.alt = "star-vazio";
  }
}