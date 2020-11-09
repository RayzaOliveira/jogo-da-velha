let jogadores = {
  1: {
    nome: '',
    pontos: 0,
  },
  2: {
    nome: '',
    pontos: 0,
  },
}

function mostrarVezJogador(mostrar = true) {
  if (mostrar) {
    document.getElementsByClassName('currentPlayer')[0].classList.toggle('d-none')
  } else {
    document.getElementsByClassName('currentPlayer')[0].classList.remove('d-none')
  }
}

function trocarJogadores() {
  document.getElementById('trocar-jogadores').classList.toggle('d-none')
  document.getElementById('nomeJogadores').classList.remove('d-none')
  mostrarVezJogador(false)
  limparCasas()
}

function iniciarJogo() {
  const elementJogador1 = document.querySelector("#nomeJogadores input#jogador-1");
  const elementJogador2 = document.querySelector("#nomeJogadores input#jogador-2");

  const jogador1 = elementJogador1.value
  const jogador2 = elementJogador2.value

  if (!jogador1 || !jogador2) {
    alert('Insira os nomes do jogadores para iniciar')
    return
  }

  jogadores = {
    1: {
      nome: jogador1,
      pontos: 0,
    },
    2: {
      nome: jogador2,
      pontos: 0,
    },
  }

  document.getElementById('nomeJogadores').classList.toggle('d-none')
  document.getElementById('trocar-jogadores').classList.remove('d-none')
  mostrarVezJogador(true)
  atualizarPlacar()
}

function limparCasas() {
  document.querySelectorAll('.linha').forEach(linha => {
    linha.querySelectorAll('.casa').forEach(casa => {
      casa.style.backgroundImage = ''
    })
  })
}

function reiniciarJogo() {
  limparCasas()
  document.getElementById("restartGame").classList.toggle('d-none')
}

function atualizarPlacar() {
  const table = document.querySelector('table.placar')

  table.querySelectorAll('tr').forEach(linha => {
    const id = linha.id

    if (!id) {
      return
    }

    linha.querySelector('td.nome').textContent = jogadores[id].nome
    linha.querySelector('td.pontos').textContent = jogadores[id].pontos
  })
}

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
      winner = bgA.indexOf("assets/1.png") >= 0 ? "1" : "2";
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
      jogadores[winner].pontos = jogadores[winner].pontos + 1
      document.getElementById("restartGame").classList.toggle('d-none');
      document.getElementById("resultado").innerHTML = `🏆 ${jogadores[winner].nome} ganhou!`;
      document.querySelectorAll('casa').forEach(casa => {
        casa.removeEventListener('click');
      })
      atualizarPlacar()
    } else {
      let casasCheias = 0
      document.querySelectorAll('.casa').forEach(casa => {
        const bg = casa.style.backgroundImage

        if (bg !== "") {
          casasCheias++
        }
      })

      if (casasCheias === 9) {
        document.getElementById("restartGame").classList.toggle('d-none');
        document.getElementById("resultado").innerHTML = `👵🏻 Deu velha :(`;
        document.querySelectorAll('casa').forEach(casa => {
          casa.removeEventListener('click');
        })
      }
    }
  }

  let currentPlayerImg = document.getElementById('currentPlayerImg');
  currentPlayerImg.style.backgroundImage = "url(assets/1.png)";

  document.querySelectorAll('.casa').forEach(casa => {
    casa.addEventListener('click', () => {
      const jogadoresProntos = !!jogadores[1].nome && !!jogadores[2].nome

      if (!jogadoresProntos) {
        alert('Insira os nomes dos jogadores para iniciar!')
        return
      }

      let bg = casa.style.backgroundImage;
      if (bg == "none" || bg == "") {
        let fig = `url(assets/${vez.toString()}.png)`;
        casa.style.backgroundImage = fig;
        vez = (vez == 1 ? 2 : 1);
        verificarFimJogo();
        currentPlayerImg.style.backgroundImage = `url(assets/${vez.toString()}.png)`;
        let currentPlayerName = document.getElementById('nomeJogadorAtual')
        currentPlayerName.innerText = ` - ${jogadores[vez].nome}`
      }
    })
  })
})