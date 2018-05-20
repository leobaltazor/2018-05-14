var player = "X";
var arr = [["", "", ""], ["", "", ""], ["", "", ""]];
var _whoseTurn = $(".player");
var _statistic = $(".statistic");
var win = false;
var _stat = {
  winX: 0,
  winO: 0,
  sumGame: 0
};
_stat = initStatistic(_stat);

function initStatistic(_stat) {
  if (localStorage.getItem("_stat") !== null) {
    return JSON.parse(localStorage.getItem("_stat"));
  } else {
    localStorage.setItem("_stat", JSON.stringify(_stat));
  }
  return JSON.parse(localStorage.getItem("_stat"));
}
genStatistic();

function gen() {
  var body = $(".table");
  var table = document.createElement("table");
  table.classList.add("table");
  for (let i = 0; i < 3; i++) {
    var tr = document.createElement("tr");
    for (let j = 0; j < 3; j++) {
      var td = document.createElement("td");
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  body.append(table);
}
gen();

function genStatistic() {
  x = _stat.winX;
  o = _stat.winO;
  sum = _stat.sumGame == 0 ? 1 : _stat.sumGame;
  _statistic.html(`<div>X побеждал в ${(x / sum * 100).toFixed(2)}%</div>
	<div>O побеждал в ${(o / sum * 100).toFixed(2)}%</div>
	<div>Всего ${_stat.sumGame} игр</div>`);
}

// document.querySelector(".table").addEventListener("click", click);
$(".table td").click(click);

function click(e) {
  marking(e);
  whoseTurn();
  whoWin();
}

function marking(e) {
  if (player == "X") {
    if (!e.target.className) {
      e.target.classList.add("player1");
      result(e);
      player = "O";
    }
  } else if (player == "O") {
    if (!e.target.className) {
      e.target.classList.add("player2");
      result(e);
      player = "X";
    }
  }
}

function result(e) {
  var click = $(e.target)
    .attr("data-pos")
    .split("-");
  arr[+click[0]][+click[1]] = player;
  document.getElementById("test").innerHTML = `<pre>${JSON.stringify(
    arr,
    0,
    2
  )}</pre>`;
}
function whoseTurn() {
  if (player == "X") {
    //   _whoseTurn.innerHTML = "Ходит игрок X";
    _whoseTurn.html("Ходит игрок X");
  } else if (player == "O") {
    // _whoseTurn.innerHTML = "Ходит игрок O";
    _whoseTurn.html("Ходит игрок O");
  }
}

function whoWin() {
  arr.forEach(e => {
    var str = e.join("");
    gameOwer(str);
  });
  for (var i = 0; i < 3; i++) {
    var str = `${arr[0][i]}${arr[1][i]}${arr[2][i]}`;
    gameOwer(str);
  }
  var str = `${arr[0][0]}${arr[1][1]}${arr[2][2]}`;
  gameOwer(str);
  var str = `${arr[2][0]}${arr[1][1]}${arr[0][2]}`;
  gameOwer(str);
}
function gameOwer(str) {
  setTimeout(() => {
    if (str === "XXX") {
      stat(1, 0);
      confirmm(str[0]);
      _whoseTurn.innerHTML = "Победил игрок X";
    } else if (str === "OOO") {
      confirmm(str[0]);
      stat(0, 1);
      _whoseTurn.innerHTML = "Победил игрок О";
    }
  }, 100);
}
function confirmm(data) {
  if (confirm(`Победил ${data}.\nИграем еще?`)) {
    window.location.reload();
  } else {
    document.querySelector(".table").removeEventListener("click", click);
  }
}

function stat(data1, data2) {
  _stat.winX += +data1;
  _stat.winO += +data2;
  _stat.sumGame++;
  localStorage.setItem("_stat", JSON.stringify(_stat));
  genStatistic();
}

function clearStat() {
  window.localStorage.clear();
  window.location.reload();
}

addPos();
function addPos() {
  var F = $("table tr");
  for (let i = 0; i < F.length; i++) {
    var T = $(F[i]).find("td");
    for (let j = 0; j < T.length; j++) {
      $(T[j]).attr("data-pos", `${i}-${j}`);
    }
  }
}
