document.addEventListener("DOMContentLoaded", function(event) {
  let play = true;  //xKiss is first up initially, and whoever loses is first thereafter. It would be cool to put in a coin toss to choose who is first.
  let xScore = 0;
  let oScore = 0;
  let xKiss = "X";
  let oHugs = "O";

  //set player names
  function changePlayer1Name() {
    document.getElementById('player1-X').innerHTML = this.value + ' :';
    this.remove();
  }

  function changePlayer2Name() {
    document.getElementById('player2-O').innerHTML = this.value + ' :';
    this.remove();
  }

  //reset board after game
  function restart() {
    let squares = document.getElementsByTagName("td");
    for (let i = 0; i < squares.length; i++) {
      squares[i].innerHTML = "";
    }
    if (play) {
      document.getElementById('referee').innerHTML = xKiss;
      document.getElementById('refereeMessage').innerHTML = '\'s Turn';
    } else {
      document.getElementById('referee').innerHTML = oHugs;
      document.getElementById('refereeMessage').innerHTML = '\'s Turn';
    }
  }

  function changeMessage(player, message) {
    document.getElementById('referee').innerHTML = player;
    document.getElementById('refereeMessage').innerHTML = message;
    document.getElementById('xScore').innerHTML = xScore;
    document.getElementById('oScore').innerHTML = oScore;
    setTimeout(restart, 1000);
  }

  function checkRowWin(children) {
    let rowWinX = 0;
    let rowWinO = 0;
    for (let j = 0; j < children.length; j++) {
      if (children[j].innerHTML === xKiss) {
        rowWinX +=1;
      } else if (children[j].innerHTML === oHugs) {
        rowWinO +=1;
      }
    }
    if (rowWinX === 3) {
      xScore += 1;
      changeMessage(xKiss, '  is the winner')
    } else if (rowWinO === 3) {
      oScore += 1;
      changeMessage(oHugs, ' is the winner')
    }
  };

  function checkColumnWin(children, columns) {
    for (let i = 0; i < children.length; i++) {
      if (children[i].innerHTML === xKiss) {
        columns[i] += 1;
        if (columns[i] === 3) {
          xScore += 1;
          changeMessage(xKiss, ' is the winner')
        }
      } else if (children[i].innerHTML === oHugs){
        columns[i] -= 1;
        if (columns[i] === -3) {
          oScore += 1;
          changeMessage(oHugs, ' is the winner')
        }
      }
    }
  };

  function checkDiagWin() {
   let arrM = ["1-1", "2-2", "3-3"];
   let arrm = ["1-3", "2-2", "3-1"];

   for (let i = 0; i < 3; i++) {
    arrM[i] = document.getElementById(arrM[i]).innerHTML;
    arrm[i] = document.getElementById(arrm[i]).innerHTML;
   }

   if (arrM.every(elem => {return elem === xKiss}) || arrm.every( elem => {return elem === xKiss})) {
    xScore += 1;
    changeMessage(xKiss, ' is the winner')
   }

   if (arrM.every(elem => {return elem === oHugs}) || arrm.every( elem => {return elem === oHugs})) {
    oScore += 1;
    changeMessage(oHugs, ' is the winner')
   }
  };

  function checkWin() {
    let rows = document.getElementsByClassName("row");
    let columns = {0:0, 1:0, 2:0};
    checkDiagWin();
    for (let i = 0; i < rows.length; i++) {
      let children = rows[i].children;
      checkRowWin(children);
      checkColumnWin(children, columns);
    }
  };

  function togglePiece() {
    if (this.innerHTML === xKiss || this.innerHTML === oHugs){
      console.log('Choose another spot to play!')
    } else {
      if (play) {
        document.getElementById('referee').innerHTML = oHugs;
        document.getElementById('refereeMessage').innerHTML = '\'s Turn';
        this.innerHTML = xKiss;
        play = false;
      } else {
        document.getElementById('referee').innerHTML = xKiss;
        document.getElementById('refereeMessage').innerHTML = '\'s Turn';
        this.innerHTML = oHugs;
        play = true;
      }
    }
    checkWin();
  };


//init
  let squares = document.getElementsByTagName("td");
  for (let i = 0; i < squares.length; i++) {
    squares[i].onclick = togglePiece;
  }

  let restartButton = document.getElementById('restart');
  restartButton.onclick = restart;

  let form = document.getElementById('p1');
  form.click = changePlayer1Name;
  form.addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById('p1').click();
    }
  });

  let form2 = document.getElementById('p2');
  form2.click = changePlayer2Name;
  form2.addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById('p2').click();
    }
  })

  document.getElementById('referee').innerHTML = xKiss;
  document.getElementById('refereeMessage').innerHTML = '\'s Turn';
});


