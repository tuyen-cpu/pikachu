var COL = 12;
var ROW = 8;
class Game {
    constructor() {
            this.selectedArray = [
                [null, null],
                [null, null]
            ];
            this.typeOfPikachu = 3; // type number of pikachu init is 7
            this.rowMax = ROW + 2; //the actual number of rows of the matrix including the border
            this.colMax = COL + 2; //the actual number of columns of the matrix including the border
            this.mainArray = this.borderEmptyArray(this.shuffledArr(this.randomTwinArray()));

            this.createBoardPikachu(this.mainArray);

            console.log(this.connectPikachu([3, 3], [5, 1]))
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

            return array;
        }
        // Mix index of element in array
    shuffledArr(arr) {
        const newArr = arr.slice()
        for (let i = newArr.length - 1; i > 0; i--) {
            const random = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[random]] = [newArr[random], newArr[i]];
        }
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
        return newArr;

    }
    checkVertical(x, y, xt) {
            for (let i = x; i != xt;
                (x < xt ? i++ : i--)) {
                console.log("[" + i + ", " + y + "]: " + this.mainArray[i][y])
                if (this.mainArray[i][y]) {
                    // this.arrVertical = [];
                    console.log("V: false")
                    return false;
                } else {
                    // var index = this.getIndex(i, y);
                    // this.arrVertical.push(index);
                    console.log("V: true")
                }
            }
            return true;
        }
        //Check if adjacent cells are empty
    checkHorizontal(x, y, yt) {
        for (let i = y; i != yt;
            (y < yt ? i++ : i--)) {
            console.log("[" + x + ", " + i + "]: " + this.mainArray[x][i])
            if (this.mainArray[x][i]) {
                // this.arrVertical = [];
                console.log("H: false")
                return false;
            } else {
                // var index = this.getIndex(x, i);
                // this.arrVertical.push(index);
                console.log("H: true")
            }
        }
        return true;
    }
    connectPikachu(cellA, cellB) {

        if (cellA[0] > cellB[0]) {
            let C = cellA;
            cellA = cellB;
            cellB = C;
        }
        //th1

        if (this.checkVertical(cellA[0] + 1, cellA[1], cellB[0]) && this.checkHorizontal(cellB[0], cellA[1], cellB[1])) {
            this.arrMarked = this.arrMarked.concat(this.arrVertical)
            console.log("TH1")
            return true;
        }
        // this.arrMarked = [];
        // this.arrVertical = [];
        //th2

        for (let j = (cellA[1] - 1); j >= 0; j--) {
            if (this.mainArray[cellA[0]][j]) break;
            // this.arrMarked.push(this.getIndex(cellA[0], j))

            if (this.checkVertical((cellA[0]), j, cellB[0]) && this.checkHorizontal(cellB[0], j, cellB[1])) {
                // this.arrMarked = this.arrMarked.concat(this.arrVertical)
                console.log("TH2")
                return true;
            }
        }
        // this.arrMarked = [];
        // this.arrVertical = [];
        //th3

        for (let j = (cellA[1] + 1); j < this.colMax; j++) {
            if (this.mainArray[cellA[0]][j]) break;
            // this.arrMarked.push(this.getIndex(cellA[0], j))
            if (this.checkVertical((cellA[0]), j, cellB[0]) && this.checkHorizontal(cellB[0], j, cellB[1])) {

                // this.arrMarked = this.arrMarked.concat(this.arrVertical)
                console.log("TH3")
                return true;
            }
        }
        // this.arrMarked = [];
        // this.arrVertical = [];
        if (cellA[1] > cellB[1]) {
            let C = cellA;
            cellA = cellB;
            cellB = C;
        }

        //th4

        if (this.checkHorizontal(cellA[0], cellA[1] + 1, cellB[1]) && this.checkVertical(cellA[0], cellB[1], cellB[0])) {
            console.log("TH4")
            return true;
        }
        //th5
        // this.arrMarked = [];
        // this.arrVertical = [];
        for (let j = (cellA[0] - 1); j >= 0; j--) {
            if (this.mainArray[j][cellA[1]]) break;
            // this.arrMarked.push(this.getIndex(j, cellA[1]));
            if (this.checkHorizontal(j, (cellA[1]), cellB[1]) && this.checkVertical(j, cellB[1], cellB[0])) {
                // this.arrMarked = this.arrMarked.concat(this.arrVertical)
                console.log("TH5")
                return true;
            }
        }
        // this.arrMarked = [];
        // this.arrVertical = [];
        //th6
        for (let j = (cellA[0] + 1); j < this.rowMax; j++) {
            if (this.mainArray[j][cellA[1]]) break;
            // this.arrMarked.push(this.getIndex(j, cellA[1]));
            if (this.checkHorizontal(j, (cellA[1]), cellB[1]) && this.checkVertical(j, cellB[1], cellB[0])) {
                // this.arrMarked = this.arrMarked.concat(this.arrVertical)
                console.log("TH6")
                return true;
            }
        }
        // this.arrMarked = [];
        // this.arrVertical = [];
    }
    check(cell, x, y) {
            this.borderCell(cell)


        }
        //Border cell when click, and remove border when click again
    borderCell(cell) {
        cell.isSelected = !cell.isSelected;
        if (cell.isSelected) {
            cell.style.opacity = "0.9";
            cell.style.boxShadow = "0px 0px 1px 1px red"
        } else {
            cell.style.opacity = "1";
            cell.style.boxShadow = "none"
        }
    }
}
const g = new Game();

function check(cell, x, y) {
    g.check(cell, x, y)
}