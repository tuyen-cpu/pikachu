class Pikachu {
    constructor(game, x, y, value) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.value = value;
        this.init();
        this.isSelected = false;

    }
    init() {
        this.cell = document.createElement("td");
        this.cell.className = "pikachu";

        if (this.value != 0) {
            let img = document.createElement("img");
            img.src = "./assets/img/a" + this.value + ".png";
            this.cell.setAttribute("onclick", `check(this, ${this.x}, ${this.y})`)
            this.cell.appendChild(img);
        }

    }
    set setSelected(para) {
        this.isSelected = para;
    }
    get getElement() {
        return this.cell;
    }


}