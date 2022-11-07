class Chip {
  constructor(
    x,
    y,
    radius,
    color,
    turn = false,
    statics = false,
    stroke = true,
    xBoard = null,
    yBoard = null
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.turn = turn;
    this.isSelected = false;
    this.stroke = stroke;
    this.xBoard = xBoard;
    this.yBoard = yBoard;
    this.statics = statics;

    this.context = ctx;
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fillStyle = this.color;
    if (this.stroke) {
      this.context.strokeStyle = "black";
    }

    if (this.isSelected) {
      this.context.lineWidth = 2.5;
    } else {
      this.context.lineWidth = 1;
    }

    this.context.fill();
    if (this.stroke) {
      this.context.stroke();
    }
  }

  getTurn() {
    return this.turn;
  }

  setTurn(turn) {
    this.turn = turn;
  }

  setStatics(statics) {
    this.statics = statics;
  }

  getColor() {
    return this.color;
  }

  move(x, y) {
    this.x = x;
    this.y = y;
    this.draw();
  }

  isClicked(x, y) {
    let _x = this.x - x;
    let _y = this.y - y;

    return Math.sqrt(_x * _x + _y * _y) <= this.radius;
  }
}
