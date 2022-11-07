"use strict";

class Game {
  constructor() {
    this.ctx = ctx;
    this.ready = false;
    this.players = [];
    this.chips = [];
    this.insertSpace = [];
    //this.boardChips;
    this.isDragging = false;
    this.draggingChip = null;
    this.previousSelectedChip = null;
    this.boardColumns = 7;
    this.boardRows = 6;
    this.numberChips = 21;
    this.insertImg = document.getElementById("insertImg");
    this.alienChipImg = document.getElementById("alienChipImg");
    this.astronautChipImg = document.getElementById("astronautChipImg");
    this.backgroundImg = document.getElementById("backgroundImg");
    this.tableImg = document.getElementById("tableImg");
    this.totalTime = 30;
    this.lineNumber = 4;
    this.yArrows = 0.7;
    this.init();
  }

  init() {
    this.addPlayers();
    this.createBoard();
    this.createChips();
    this.onMouseDown();
    this.onMouseUp();
    this.onMouseMove();
    this.play();
    this.drawChips();
  }

  startAgain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.insertSpace = [];
    this.players = [];
    this.chips = [];
    this.isDragging = false;
    this.draggingChip = null;
    this.previousSelectedChip = null;
    this.addPlayers();
    this.createBoard();
    this.createChips();
    this.drawChips();
    this.totalTime = 30;
    if (document.getElementById("countdown").style.color == "blue") {
      document.getElementById("countdown").style.color = "green";
    }
  }

  changeConnect4To(number) {
    if (number == 4) {
      this.lineNumber = 4;
      this.boardColumns = 8;
      this.boardRows = 7;
      this.yArrows = 0.9;
      this.startAgain();
      return;
    } else if (number == 5) {
      this.lineNumber = 5;
      this.boardColumns = 9;
      this.boardRows = 8;
      this.yArrows = 0.9;
      this.startAgain();
      return;
    } else if (number == 6) {
      this.lineNumber = 6;
      this.boardColumns = 10;
      this.boardRows = 9;
      this.yArrows = 1;
      this.startAgain();
      return;
    } else if (number == 7) {
      this.lineNumber = 7;
      this.boardColumns = 11;
      this.boardRows = 10;
      this.yArrows = 1;
      this.startAgain();
      return;
    }
  }

  play() {
    this.startClock();
  }

  startClock() {
    this.totalTime = 30;
    this.updateClock(this.totalTime);
  }

  updateClock() {
    document.getElementById("countdown").innerHTML = this.totalTime;
    if (this.totalTime == 30) {
      if (document.getElementById("countdown").style.color == "blue") {
        document.getElementById("countdown").style.color = "green";
      } else {
        document.getElementById("countdown").style.color = "blue";
      }
    }
    if (this.totalTime == 0) {
      this.setTurn();
      this.updateClock();
    } else if (this.totalTime == -1) {
      document.getElementById("countdown").innerHTML = "";
      this.players.forEach((player) => {
        player.getChips().forEach((chip) => {
          chip.setStatics(true);
        });
      });
      return;
    } else {
      this.totalTime -= 1;
      setTimeout(() => {
        this.updateClock();
      }, 1000);
    }
  }

  setTurn() {
    this.players[0].setIsPlaying(!this.players[0].getIsPlaying());
    this.players[1].setIsPlaying(!this.players[1].getIsPlaying());
    this.totalTime = 30;
  }

  addPlayers() {
    let p1 = new Player(1, "Astronauta", "Astronauta", true);
    let p2 = new Player(2, "Alien", "Alien", false);
    this.players.push(p1, p2);
  }

  createChips() {
    //calculo el radio de las fichas en base a la altura del canvas y la cantidad de columnas
    let radius = (canvas.height * 0.2) / this.boardColumns;
    //calculo la posicion inicial en x e y
    let x = radius * 1 + canvas.width * 0.028;
    let y = radius * 2.6 - canvas.height * 0.01;
    //calcula la distancia horizontal entre las fichas disponibles
    let offSetX = radius;
    //calcula la distancia vertical entre las fichas disponibles
    let offSetY = radius * 2.1;
    let flagPlayer1 = true;
    let flagPlayer2 = true;
    //por cada jugador dibujo la cantidad de fichas necesarias
    for (let j = 0; j < this.players.length; j++) {
      for (let i = 0; i < (this.boardColumns * this.boardRows) / 2; i++) {
        //cada vez que se dibujo un numero de fichas igual al doble de columnas agrego un espacio vertical
        if (i % (this.boardColumns * 2) == 0) {
          //agrego un espacio entre la fila de fichas recien creada y la siguiente
          y = y + offSetY;
          //reestablesco la pocision inicial de la nueva fila de fichas
          x = radius * 1 + canvas.width * 0.028;
        }
        //dibujo un tipo de ficha dependiendo del jugador
        if (this.players[j].getId() == 1) {
          //al dibujar la primera ficha del jugador 1 reestablesco la posicion en y
          if (flagPlayer1 == true) {
            y = radius * 2.6 - canvas.height * 0.01;
            flagPlayer1 = false;
          }
          let color = "blue";
          let chip = new Chip(
            x + canvas.width * 0.7,
            y,
            radius,
            color,
            this.players[j].getIsPlaying()
          );
          this.players[j].addChip(chip);
        } else {
          //al dibujar la primera ficha del jugador 2 reestablesco la posicion en y
          if (flagPlayer2 == true) {
            y = radius * 2.6 - canvas.height * 0.01;
            flagPlayer2 = false;
          }
          let color = "green";
          let chip = new Chip(
            x,
            y,
            radius,
            color,
            this.players[j].getIsPlaying()
          );
          this.players[j].addChip(chip);
        }
        //agrego un espacio entre la ficha recien creada y la siguiente
        x = x + offSetX;
      }

      this.drawChips();
    }
  }

  createBoard() {
    //calculo el radio de las fichas en base a la altura del canvas y la cantidad de columnas
    let radius = (canvas.height * 0.2) / this.boardColumns;
    //calcula la distancia entre las casillas del tablero
    let offSet = radius * 4;
    //calculo la posicion inicial en x e y
    let x = radius * 3 + canvas.width * 0.3;
    let y = radius * 3 + canvas.height * 0.2;
    //dibujo las casillas para insertar
    for (let g = 0; g < this.boardColumns; g++) {
      let color = "red";
      let chip = new Chip(
        x,
        y - canvas.height * 0.15,
        radius,
        color,
        false,
        true,
        false,
        g,
        10
      );
      this.insertSpace.push(chip);
      x = x + offSet;
    }
    //reestablesco x inicial
    x = radius * 2.6 + canvas.width * 0.297;
    //dibujo las casillas libres del tablero
    for (let i = 0; i < this.boardRows; i++) {
      let row = [];
      for (let j = 0; j < this.boardColumns; j++) {
        let color = "white";
        //creo una ficha nueva
        let chip = new Chip(x, y, radius, color, false, true, false, j, i);
        this.chips.push(chip);
        row.push("white");
        //agrego un espacio entre la ficha recien creada y la siguiente
        x = x + offSet;
      }
      //agrego un espacio entre la fila de fichas recien creada y la siguiente
      y = y + offSet;
      //reestablesco la pocision inicial de la nueva fila de fichas
      x = radius * 2.6 + canvas.width * 0.297;
      //this.boardChips.push(row);
    }
    this.drawChips();
  }

  drawChips() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.drawImage(this.backgroundImg, 0, 0, 1200, 700);
    this.ctx.drawImage(this.tableImg, 340, 110, 490, 410);
    for (let i = 0; i < this.chips.length; i++) {
      this.chips[i].draw();
    }
    this.drawArrows();
    if (this.players[0].getChips != null) {
      for (let j = 0; j < this.players.length; j++) {
        let chipsPlayer = this.players[j].getChips();
        for (let i = 0; i < chipsPlayer.length; i++) {
          chipsPlayer[i].draw();
          if (chipsPlayer[i].color == "blue") {
            this.ctx.drawImage(
              this.astronautChipImg,
              chipsPlayer[i].x - 16,
              chipsPlayer[i].y - 16,
              32,
              32
            );
          } else {
            this.ctx.drawImage(
              this.alienChipImg,
              chipsPlayer[i].x - 16,
              chipsPlayer[i].y - 16,
              32,
              31
            );
          }
        }
      }
    }
  }

  drawArrows() {
    for (let i = 0; i < this.insertSpace.length; i++) {
      this.ctx.drawImage(
        this.insertImg,
        this.insertSpace[i].x - 19,
        this.insertSpace[i].y - 19,
        40,
        40
      );
    }
  }

  checkWinner() {
    //horizontaly
    for (let r = 0; r < this.boardRows; r++) {
      for (let c = 0; c < this.boardColumns - this.lineNumber + 1; c++) {
        if (
          this.getChipByPosBoard(r, c) !== null &&
          this.getChipByPosBoard(r, c).getColor() != "white"
        ) {
          let result = true;
          for (let i = 1; i < this.lineNumber; i++) {
            if (
              this.getChipByPosBoard(r, c).getColor() !=
              this.getChipByPosBoard(r, c + i).getColor()
            ) {
              result = false;
            }
          }
          if (result) {
            this.setWinner(this.getChipByPosBoard(r, c).getColor());
            return;
          }
        }
      }
    }

    //vertically
    for (let c = 0; c < this.boardColumns; c++) {
      for (let r = 0; r < this.boardRows - this.lineNumber + 1; r++) {
        if (
          this.getChipByPosBoard(r, c) !== null &&
          this.getChipByPosBoard(r, c).getColor() != "white"
        ) {
          let result = true;
          for (let i = 1; i < this.lineNumber; i++) {
            if (
              this.getChipByPosBoard(r, c).getColor() !=
              this.getChipByPosBoard(r + i, c).getColor()
            ) {
              result = false;
            }
          }
          if (result) {
            this.setWinner(this.getChipByPosBoard(r, c).getColor());
            return;
          }
        }
      }
    }

    //anti diagonally
    for (let r = 0; r < this.boardRows - this.lineNumber + 1; r++) {
      for (let c = 0; c < this.boardColumns - this.lineNumber + 1; c++) {
        if (
          this.getChipByPosBoard(r, c) !== null &&
          this.getChipByPosBoard(r, c).getColor() != "white"
        ) {
          let result = true;
          for (let i = 1; i < this.lineNumber; i++) {
            if (
              this.getChipByPosBoard(r, c).getColor() !=
              this.getChipByPosBoard(r + i, c + i).getColor()
            ) {
              result = false;
            }
          }
          if (result) {
            this.setWinner(this.getChipByPosBoard(r, c).getColor());
            return;
          }
        }
      }
    }

    //diagonally
    for (let r = this.lineNumber + 1; r < this.boardRows; r++) {
      for (let c = 0; c < this.boardColumns - this.lineNumber + 1; c++) {
        if (
          this.getChipByPosBoard(r, c) !== null &&
          this.getChipByPosBoard(r, c).getColor() != "white"
        ) {
          let result = true;
          for (let i = 1; i < this.lineNumber; i++) {
            if (
              this.getChipByPosBoard(r, c).getColor() !=
              this.getChipByPosBoard(r - i, c + i).getColor()
            ) {
              result = false;
            }
          }
          if (result) {
            this.setWinner(this.getChipByPosBoard(r, c).getColor());
            return;
          }
        }
      }
    }
  }

  setWinner(color) {
    let winnerText = document.getElementById("winnerText");
    if (color == "blue") {
      winnerText.style.color = "blue";
      winnerText.innerHTML = "Ganador: Equipo Astronautas";
    } else {
      winnerText.style.color = "green";
      winnerText.innerHTML = "Ganador: Equipo Aliens";
    }
    this.totalTime = -1;
    console.log("Winner: " + color);
  }

  getChipByPosBoard(y, x) {
    let findedChip = this.chips.find(
      (chip) => chip.xBoard == x && chip.yBoard == y
    );
    return findedChip;
  }

  findClicked(clickX, clickY) {
    for (let p = 0; p < this.players.length; p++) {
      let chips = this.players[p].getChips();
      for (let i = chips.length - 1; i >= 0; i--) {
        let chip = chips[i];
        if (chip.isClicked(clickX, clickY)) {
          return chip;
        }
      }
    }
  }

  findClickedSpace(x, y) {
    for (let i = 0; i < this.insertSpace.length; i++) {
      if (
        !(
          x < this.insertSpace[i].x ||
          x > this.insertSpace[i].x + 21 ||
          y < this.insertSpace[i].h ||
          y > this.insertSpace[i].h + 21
        )
      ) {
        return this.insertSpace[i];
      }
    }
    return false;
  }

  onMouseUp() {
    canvas.addEventListener("mouseup", (e) => {
      if (this.isDragging) {
        let x = e.pageX - canvas.offsetLeft;
        let y = e.pageY - canvas.offsetTop;
        let putChip = this.findClickedSpace(x, y);
        if (putChip != null) {
          let changeChip = this.getPosLibre(putChip);
          if (changeChip != null) {
            changeChip.color = this.draggingChip.color;
            this.draggingChip.move(changeChip.x, changeChip.y);
            this.draggingChip.statics = true;
            /*this.boardChips[changeChip.xBoard][changeChip.yBoard] =
              changeChip.color;*/
            changeChip.draw();
            this.drawChips();
            this.setTurn();
            this.checkWinner();
          }
        }
      }
      this.isDragging = false;
    });
  }

  getPosLibre(putChip) {
    for (let i = this.boardRows - 1; i >= 0; i--) {
      let changeChip = this.chips.find(
        (chip) => chip.xBoard == putChip.xBoard && chip.yBoard == i
      );
      if (changeChip != null) {
        if (changeChip.color == "white") {
          return changeChip;
        }
      }
    }
    return null;
  }
  onMouseDown() {
    canvas.addEventListener("mousedown", (e) => {
      let clickX = e.pageX - canvas.offsetLeft;
      let clickY = e.pageY - canvas.offsetTop;
      let clickedChip = this.findClicked(clickX, clickY);

      if (
        clickedChip != null &&
        clickedChip.statics == false &&
        clickedChip.getTurn() == true
      ) {
        if (this.previousSelectedChip != null)
          this.previousSelectedChip.isSelected = false;
        this.previousSelectedChip = clickedChip;

        clickedChip.isSelected = true;

        this.isDragging = true;

        this.draggingChip = clickedChip;

        clickedChip.draw();
        return;
      }
    });
  }
  onMouseMove() {
    canvas.addEventListener("mousemove", (e) => {
      this.dragChip(e);
    });
  }

  dragChip(e) {
    if (this.isDragging == true) {
      if (this.previousSelectedChip != null) {
        let x = e.pageX - canvas.offsetLeft;
        let y = e.pageY - canvas.offsetTop;

        this.previousSelectedChip.x = x;
        this.previousSelectedChip.y = y;

        this.drawChips();
      }
    }
  }
}
