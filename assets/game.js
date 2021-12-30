const COL = 12;
const ROW = 8;
class Game {
    constructor() {
            this.typeOfPikachu = 7; // type number of pikachu init is 7
            this.rowMax = ROW + 2; //the actual number of rows of the matrix including the border
            this.colMax = COL + 2; //the actual number of columns of the matrix including the border
            this.arr = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]
            this.initBoard();
            this.randomArray();
        }
        /* Create elements cell + load image based on matrix frame */
    initBoard() {
        const table = document.createElement("table");
        const board = document.getElementById("board");
        board.appendChild(table);
        for (let i = 0; i < this.rowMax; i++) {
            const tr = document.createElement("tr");
            table.appendChild(tr);
            for (var j = 0; j < this.colMax; j++) {
                const p = new Pikachu(this, i, j, this.arr[i][j]);
                tr.appendChild(p.getElement);
            }
        }

    }
    randomArray() {
        var array = [ROW * COL / 2];
        //twin
        let count = 1,
            index = 0;
        for (let i = 0; i < COL * ROW / 2; i++) {
            if (count > this.typeOfPikachu) count = 1;
            array[index] = count;
            array[index + 1] = count;
            index = index + 2;
            count++;
        }
        var arrayLength = array.length
        var tempArray1 = new Array();
        for (var i = 0; i < arrayLength; i++) {
            tempArray1[i] = i;
        }
        var tempArray2 = new Array();
        for (var i = 0; i < arrayLength; i++) {
            tempArray2[i] = tempArray1.splice(Math.floor(Math.random() * tempArray1.length), 1)
        }
        console.log(tempArray2)
            // return arr;
    }

}
const g = new Game();