  let star = document.getElementById('star');
  let starClick = document.getElementById('starHit');
  let idValue = document.getElementById('idValue').value;
  let starUpdate = axios.create({
    baseURL: window.location.href
  })

  let count = 1;

  starClick.onclick = (e) => {
    starUpdate
      .post(`/updateStar`, {
        count
      })
      .then(() => {
        if (star.alt == "star-vazio") {
          star.src = "/img/star-cheio.png";
          star.alt = "star-cheio";
          count = -1;
        } else {
          star.src = "/img/star-vazio.png";
          star.alt = "star-vazio";
          count = 1;
        }
      })
      .catch(err => console.log(err))
  }

  