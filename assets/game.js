var COL = 4;
var ROW = 4;
class Game {
    constructor() {
            this.selectedArray = [
                [null, null],
                [null, null]
            ];
            this.pathArray = []; // Array contain path when connect 2 cell
            this.typeOfPikachu = 3; // type number of pika chu init is 7
            this.rowMax = ROW + 2; //the actual number of rows of the matrix including the border (border value is 0)
            this.colMax = COL + 2; //the actual number of columns of the matrix including the border (border value is 0)
            this.mainArray = this.borderEmptyArray(this.shuffledArr(this.randomTwinArray()));
            // this.mainArray = [
            //     [0, 0, 0, 0, 0, 0],
            //     [0, 1, 0, 1, 1, 0],
            //     [0, 0, 0, 0, 0, 0],
            //     [0, 0, 0, 0, 0, 0],
            //     [0, 0, 0, 0, 0, 0]
            // ]
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
        // Generate pairs of numbers
    randomTwinArray() {
            let array = [ROW * COL / 2];
            let count = 1,
                index = 0;
            for (let i = 0; i < ROW * COL / 2; i++) {
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
                // console.log("[" + i + ", " + y + "]: " + this.mainArray[i][y])
                if (this.mainArray[i][y]) {
                    this.pathArray = [];
                    return false;
                } else {
                    console.log("V add " + this.getIndexOfCell(i, y))
                    this.pathArray.push(this.getIndexOfCell(i, y))
                }
            }
            return true;
        }
        //Check if adjacent cells are empty
    checkHorizontal(x, y, yt) {
            for (let i = y; i != yt;
                (y < yt ? i++ : i--)) {
                // console.log("[" + x + ", " + i + "]: " + this.mainArray[x][i])
                if (this.mainArray[x][i]) {
                    this.pathArray = [];
                    return false;
                } else {
                    console.log("H add " + this.getIndexOfCell(x, i))
                    this.pathArray.push(this.getIndexOfCell(x, i))
                }
            }
            return true;
        }
        //Check cellA and cellB is connect ??=> true ? false
    isConnect(cellA, cellB) {

        if (cellA[0] > cellB[0]) {
            let C = cellA;
            cellA = cellB;
            cellB = C;
        }

        //case 1
        if (this.checkVertical(cellA[0] + 1, cellA[1], cellB[0]) && this.checkHorizontal(cellB[0], cellA[1], cellB[1])) {
            console.log("TH1")
            return true;
        }

        //case 2
        for (let j = (cellA[1] - 1); j >= 0; j--) {
            if (this.mainArray[cellA[0]][j]) break;
            if (this.checkVertical((cellA[0]), j, cellB[0]) && this.checkHorizontal(cellB[0], j, cellB[1])) {
                console.log("TH2")
                return true;
            }
        }

        //case 3
        for (let j = (cellA[1] + 1); j < this.colMax; j++) {
            if (this.mainArray[cellA[0]][j]) break;
            if (this.checkVertical((cellA[0]), j, cellB[0]) && this.checkHorizontal(cellB[0], j, cellB[1])) {
                console.log("TH3")
                return true;
            }
        }

        if (cellA[1] > cellB[1]) {
            let C = cellA;
            cellA = cellB;
            cellB = C;
        }
        //case 4
        if (this.checkHorizontal(cellA[0], cellA[1] + 1, cellB[1]) && this.checkVertical(cellA[0], cellB[1], cellB[0])) {
            console.log("TH4")
            return true;
        }
        //case 5
        for (let j = (cellA[0] - 1); j >= 0; j--) {
            if (this.mainArray[j][cellA[1]]) break;

            if (this.checkHorizontal(j, (cellA[1]), cellB[1]) && this.checkVertical(j, cellB[1], cellB[0])) {
                console.log("TH5")
                return true;
            }
        }

        //case 6
        for (let j = (cellA[0] + 1); j < this.rowMax; j++) {
            if (this.mainArray[j][cellA[1]]) break;

            if (this.checkHorizontal(j, (cellA[1]), cellB[1]) && this.checkVertical(j, cellB[1], cellB[0])) {


                console.log("TH6")
                return true;
            }
        }

    }
    check(cell, x, y) {
            /*
            selectedArray[a][b]: a=[0,1], b[0,1]
            */
            let a0 = this.selectedArray[0][0];
            let a1 = this.selectedArray[0][1];
            if (!a0) {
                // when you haven't select any cell
                this.selectedArray[0] = [x, y];
                this.borderCell(cell)
            } else {
                //when you select cell 2
                this.selectedArray[1] = [x, y];
                let b0 = this.selectedArray[1][0];
                let b1 = this.selectedArray[1][1];
                this.clearBorderCell(this.getIndexOfCell(a0, a1));
                this.clearBorderCell(this.getIndexOfCell(b0, b1));
                if (JSON.stringify(this.selectedArray[0]) === JSON.stringify(this.selectedArray[1])) {
                    // 2 selected cells is same
                    this.resetSelectedArray();
                    return;
                } else {
                    // 2 selected cells have different
                    this.clearBorderCell(this.getIndexOfCell(a0, a1));
                    this.clearBorderCell(this.getIndexOfCell(b0, b1));
                    if (this.mainArray[a0][a1] == this.mainArray[b0][b1]) {
                        // 2 selected cells have the same value
                        if (this.isConnect(this.selectedArray[0], this.selectedArray[1])) {

                            this.pathArray.unshift(this.getIndexOfCell(a0, a1)); // first index of path 
                            this.pathArray.push(this.getIndexOfCell(b0, b1)); //last index of path 

                            this.mainArray[a0][a1] = 0;
                            this.mainArray[b0][b1] = 0;

                            this.removeCell(this.getIndexOfCell(a0, a1));
                            this.removeCell(this.getIndexOfCell(b0, b1));

                            const pikachu = document.querySelectorAll(".pikachu");
                            this.pathArray.forEach((element) => {
                                pikachu[element].classList.add("path");
                                const time = setTimeout(() => { pikachu[element].classList.remove("path") }, 500);

                            });

                            console.log(this.pathArray)
                        } else {
                            this.pathArray = [];
                        }
                    } else {
                        this.pathArray = [];
                    }
                    this.resetSelectedArray();
                }
                this.pathArray = [];
            }
            console.log(this.pathArray)

        }
        // set selected array = null
    resetSelectedArray() {
            this.selectedArray = [
                [null, null],
                [null, null]
            ]
        }
        //Border cell 
    borderCell(cell) {

            cell.isSelected = true;
            cell.style.opacity = "0.9";
            cell.style.boxShadow = "0px 0px 1px 1px red"
        }
        // remove border cell 
    clearBorderCell(index) {
            const pikachu = document.querySelectorAll(".pikachu");
            for (var i = 0; i < this.rowMax; i++) {
                for (var j = 0; j < this.colMax; j++) {
                    pikachu[index].isSelected = false;
                    pikachu[index].style.opacity = "1";
                    pikachu[index].style.boxShadow = "none";
                }
            }
        }
        //hidden cell
    removeCell(index) {
            const pikachu = document.querySelectorAll(".pikachu");
            // pikachu[index].style.visibility = "hidden"
            pikachu[index].innerHTML = "";
        }
        //get index of cell base x y from main array
    getIndexOfCell(x, y) {
        return x * this.colMax + y;
    }
}
const g = new Game();

function check(cell, x, y) {
    g.check(cell, x, y)
}