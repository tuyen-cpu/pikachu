var COL = 12;
var ROW = 8;
class Game {
    constructor() {
            this.typeOfPikachu = 7; // type number of pikachu init is 7
            this.rowMax = ROW + 2; //the actual number of rows of the matrix including the border
            this.colMax = COL + 2; //the actual number of columns of the matrix including the border
            this.mainArray = this.borderEmptyArray(this.shuffledArr(this.randomTwinArray()));
            this.createBoardPikachu(this.mainArray);

        }
        /* Create elements cell + load image based on matrix */
    createBoardPikachu(array) {
        const table = document.createElement("table");
        const board = document.getElementById("board");
        board.appendChild(table);
        for (let i = 0; i < this.rowMax; i++) {
            const tr = document.createElement("tr");
            table.appendChild(tr);
            for (var j = 0; j < this.colMax; j++) {
                const p = new Pikachu(this, i, j, array[i][j]);
                tr.appendChild(p.getElement);
            }
        }

    }
    clearBoardPikachu() {
            document.getElementById("board").innerHTML = '';
        }
        // Generate pairs of numbers that are the same
    randomTwinArray() {
            let array = [ROW * COL];
            let count = 1,
                index = 0;
            for (let i = 0; i < 50; i++) {
                if (count > this.typeOfPikachu) count = 1;
                array[index] = count;
                array[index + 1] = count;
                index = index + 2;
                count++;
            }
            console.log(array)
            return array;
        }
        // Mix index of element in array
    shuffledArr(arr) {
        const newArr = arr.slice()
        for (let i = newArr.length - 1; i > 0; i--) {
            const random = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[random]] = [newArr[random], newArr[i]];
        }
        console.log(newArr)
        return newArr
    };
    // Create border array with number 0
    borderEmptyArray(arr) {
        const newArr = new Array();
        let tempArr = [];
        let index = 0;
        for (let i = 0; i < this.rowMax; i++) {
            for (let j = 0; j < this.colMax; j++) {
                if (i != 0 && i != this.rowMax - 1 && j != 0 && j != this.colMax - 1) {
                    tempArr[j] = arr[index];
                    index++;
                } else {
                    tempArr[j] = 0
                }
            }
            newArr.push(tempArr);
            tempArr = [];
        }
        console.log(newArr)
        return newArr;

    }
}
const g = new Game();