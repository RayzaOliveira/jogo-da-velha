let players = {
  1: {
    name: '',
    score: 0,
  },
  2: {
    name: '',
    score: 0,
  },
}

const modal = document.getElementById('modal-overlay');

function showTimePlayer(show = true) {
  if (show) {
    document.getElementsByClassName('currentPlayer')[0].classList.toggle('d-none');
  } else {
    document.getElementsByClassName('currentPlayer')[0].classList.remove('d-none');
  }
}

function changePlayers() {
  document.getElementById('change-players').classList.toggle('d-none');
  document.getElementsByClassName('currentPlayer')[0].classList.add('desactive');
  document.getElementById('playersName').classList.remove('d-none');

  showTimePlayer(true);
  cleanItems();

  players = {
    1: {
      name: '',
      score: 0,
    },
    2: {
      name: '',
      score: 0,
    },
  }
}

function startGame() {
  const player1element = document.querySelector("#playersName input#player-1");
  const player2element = document.querySelector("#playersName input#player-2");

  const player1 = player1element.value;
  const player2 = player2element.value;

  if (!player1 || !player2) {
    modal.classList.add('active');
    return;
  }

  players = {
    1: {
      name: player1,
      score: 0,
    },
    2: {
      name: player2,
      score: 0,
    },
  }

  currentPlayerImg.style.backgroundImage = "url(assets/1.png)";
  currentPlayerName.textContent = ` - ${players[1].name}`;

  document.getElementById('playersName').classList.toggle('d-none');
  document.getElementById('change-players').classList.remove('d-none');
  document.getElementsByClassName('currentPlayer')[0].classList.remove('desactive');

  showTimePlayer(true);
  updateScore();
}

function cleanItems() {
  document.querySelectorAll('.row').forEach(row => {
    row.querySelectorAll('.table-item').forEach(item => {
      item.style.backgroundImage = '';
    })
  })
}

function restartGame() {
  cleanItems();

  document.getElementById("restartGame").classList.toggle('d-none');
}

function updateScore() {
  const table = document.querySelector('table.score');

  table.querySelectorAll('tr').forEach(row => {
    const id = row.id;

    if (!id) {
      return;
    }

    row.querySelector('.name').textContent = players[id].name;
    row.querySelector('.points').textContent = players[id].score;
  })
}

document.addEventListener("DOMContentLoaded", () => {
  let time = 1;
  let winner = "";

  let currentPlayerImg = document.getElementById('currentPlayerImg');
  let currentPlayerName = document.getElementById('currentPlayerName');

  function equalItems(a, b, c) {
    let itemA = document.querySelector("#table-item" + a);
    let itemB = document.querySelector("#table-item" + b);
    let itemC = document.querySelector("#table-item" + c);

    let bgA = itemA.style.backgroundImage;
    let bgB = itemB.style.backgroundImage;
    let bgC = itemC.style.backgroundImage;

    if ((bgA == bgB) && (bgB == bgC) && (bgA != "none" && bgA != "")) {
      winner = bgA.indexOf("assets/1.png") >= 0 ? "1" : "2";
      return true;
    } else {
      return false;
    }
  }

  function checkGameOver() {
    if (
      equalItems(1, 2, 3) || equalItems(4, 5, 6) || equalItems(7, 8, 9) ||
      equalItems(1, 4, 7) || equalItems(2, 5, 8) || equalItems(3, 6, 9) ||
      equalItems(1, 5, 9) || equalItems(3, 5, 7)
    ) {
      players[winner].score = players[winner].score + 1;
      document.getElementById("restartGame").classList.toggle('d-none');
      document.getElementById("result").innerHTML = `🏆 ${players[winner].name} ganhou!`;
      updateScore();

    } else {
      let fullItems = 0;
      document.querySelectorAll('.table-item').forEach(item => {
        const bg = item.style.backgroundImage;

        if (bg !== "") {
          fullItems++;
        }
      })

      if (fullItems === 9) {
        document.getElementById("restartGame").classList.toggle('d-none');
        document.getElementById("result").innerHTML = `👵🏻 Deu velha :(`;
      }
    }
  }
  
  document.querySelectorAll('.table-item').forEach(item => {
    item.addEventListener('click', () => {
      const playersReady = !!players[1].name && !!players[2].name;

      if (!playersReady) {
        // alert('Insira os names dos players para iniciar!')
        modal.classList.add('active');
        return;
      }

      let bg = item.style.backgroundImage;

      if (bg == "none" || bg == "") {
        let fig = `url(assets/${time.toString()}.png)`;
        item.style.backgroundImage = fig;
        time = (time == 1 ? 2 : 1);
        checkGameOver();
        currentPlayerImg.style.backgroundImage = `url(assets/${time.toString()}.png)`;
        currentPlayerName.textContent = ` - ${players[time].name}`;
      }
    })
  })
})

document.querySelector('.close-button').addEventListener('click', function(){
  modal.classList.remove('active');
});