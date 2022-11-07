class Player {
  constructor(id, name, teamSide, isPlaying) {
    this.id = id;
    this.name = name;
    this.teamSide = teamSide;
    this.isPlaying = isPlaying;
    this.chips = [];
  }

  getId() {
    return this.id;
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  getChips() {
    return this.chips;
  }

  getTeamSide() {
    return this.teamSide;
  }

  setIsPlaying(boolean) {
    this.isPlaying = boolean;
    for (let i = 0; i < this.chips.length; i++) {
      this.chips[i].setTurn(boolean);
    }
  }

  addChip(chip) {
    this.chips.push(chip);
  }
}
