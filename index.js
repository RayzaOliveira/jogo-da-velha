document.addEventListener("DOMContentLoaded", () => {
  let vez = 1;
  let winner = "";

  function casasIguais(a, b, c) {
    let casaA = document.querySelector("#casa" + a);
    let casaB = document.querySelector("#casa" + b);
    let casaC = document.querySelector("#casa" + c);

    let bgA = casaA.style.backgroundImage;
    let bgB = casaB.style.backgroundImage;
    let bgC = casaC.style.backgroundImage;

    if ((bgA == bgB) && (bgB == bgC) && (bgA != "none" && bgA != "")) {
      vencedor = bgA.indexOf("assets/1.png") >= 0 ? "1" : "2";
      return true;
    } else {
      return false;
    }
  }

  function verificarFimJogo() {
    if (
      casasIguais(1, 2, 3) || casasIguais(4, 5, 6) || casasIguais(7, 8, 9) ||
      casasIguais(1, 4, 7) || casasIguais(2, 5, 8) || casasIguais(3, 6, 9) ||
      casasIguais(1, 5, 9) || casasIguais(3, 5, 7)
    ) {
      document.querySelector("#resultado").innerText = `🏆 ${vencedor} ganhou!`;
      document.getElementById("restartGame").classList.toggle('d-none');
      document.querySelectorAll('casa').forEach(casa => {
        casa.removeEventListener('click');
      })
    }
  }

  let currentPlayerImg = document.getElementById('currentPlayerImg');
  currentPlayerImg.style.backgroundImage = "url(assets/1.png)";

  document.querySelectorAll('.casa').forEach(casa => {
    casa.addEventListener('click', () => {
      let bg = casa.style.backgroundImage;
      if (bg == "none" || bg == "") {
        let fig = `url(assets/${vez.toString()}.png)`;
        casa.style.backgroundImage = fig;
        vez = (vez == 1 ? 2 : 1);
        verificarFimJogo();
        currentPlayerImg.style.backgroundImage = `url(assets/${vez.toString()}.png)`;
      }
    })
  })
})