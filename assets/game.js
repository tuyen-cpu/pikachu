var COL = 12;
var ROW = 8;
class Game {
    constructor() {
            this.selectedArray = [
                [null, null],
                [null, null]
            ];
            this.caseAlgorithm = null
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
                    this.pathArray.push([i, y])
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
                    this.pathArray.push([x, i])
                }
            }
            return true;
        }
        //Check cellA and cellB is connect ??=> true ? false
    isConnect(cellA, cellB) {
        let arrTemp = [] //horizontal path 
        if (cellA[0] > cellB[0]) {
            let C = cellA;
            cellA = cellB;
            cellB = C;
        }
        if (cellA[1] > cellB[1]) {
            let C = cellA;
            cellA = cellB;
            cellB = C;
        }
        console.log(cellA, cellB)
            //case 1
        if (this.checkVertical(cellA[0] + 1, cellA[1], cellB[0]) && this.checkHorizontal(cellB[0], cellA[1], cellB[1])) {
            console.log("TH1")
            this.caseAlgorithm = 1
            return true;
        }

        //case 2
        for (let j = (cellA[1] - 1); j >= 0; j--) {

            if (this.mainArray[cellA[0]][j]) break;
            arrTemp.push([cellA[0], j])
            if (this.checkVertical((cellA[0]), j, cellB[0]) && this.checkHorizontal(cellB[0], j, cellB[1])) {
                console.log("TH2")
                arrTemp.pop(); // delete duplicate  element
                this.pathArray = arrTemp.concat(this.pathArray) //concat 2 array path: arrTemp is horizontal path 
                arrTemp = []
                this.caseAlgorithm = 2
                return true;
            }
        }

        //case 3
        for (let j = (cellA[1] + 1); j < this.colMax; j++) {
            if (this.mainArray[cellA[0]][j]) break;
            arrTemp.push([cellA[0], j])
            if (this.checkVertical((cellA[0]), j, cellB[0]) && this.checkHorizontal(cellB[0], j, cellB[1])) {
                console.log("TH3")
                arrTemp.pop(); // delete duplicate  element
                this.pathArray = arrTemp.concat(this.pathArray) //concat 2 array path: arrTemp is horizontal path 
                arrTemp = []
                this.caseAlgorithm = 3
                return true;
            }
        }


        //case 4
        if (this.checkHorizontal(cellA[0], cellA[1] + 1, cellB[1]) && this.checkVertical(cellA[0], cellB[1], cellB[0])) {
            console.log("TH4")
            this.caseAlgorithm = 4
            return true;
        }
        //case 5
        for (let j = (cellA[0] - 1); j >= 0; j--) {
            if (this.mainArray[j][cellA[1]]) break;

            if (this.checkHorizontal(j, (cellA[1]), cellB[1]) && this.checkVertical(j, cellB[1], cellB[0])) {
                console.log("TH5")
                this.caseAlgorithm = 5
                return true;
            }
        }

        //case 6
        for (let j = (cellA[0] + 1); j < this.rowMax; j++) {
            console.log(cellA, cellB)
            if (this.mainArray[j][cellA[1]]) break;
            if (this.checkHorizontal(j, (cellA[1]), cellB[1]) && this.checkVertical(j, cellB[1], cellB[0])) {
                this.caseAlgorithm = 6
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
            a0 = this.selectedArray[0][0];
            a1 = this.selectedArray[0][1];
            if (this.mainArray[a0][a1]) {
                this.borderCell(cell)
            }
        } else {
            //when you select cell 2
            this.selectedArray[1] = [x, y]
            let b0 = this.selectedArray[1][0]
            let b1 = this.selectedArray[1][1]
            this.clearBorderCell(this.getIndexOfCell(a0, a1))
            this.clearBorderCell(this.getIndexOfCell(b0, b1))
            if (this.mainArray[b0][b1]) {
                // cell != number 0
                if (JSON.stringify(this.selectedArray[0]) === JSON.stringify(this.selectedArray[1])) {
                    // 2 selected cells is same
                    this.resetSelectedArray()
                    return;
                } else {
                    // 2 selected cells have different
                    this.clearBorderCell(this.getIndexOfCell(a0, a1))
                    this.clearBorderCell(this.getIndexOfCell(b0, b1))
                    if (this.mainArray[a0][a1] == this.mainArray[b0][b1]) {
                        // 2 selected cells have the same value
                        if (this.isConnect(this.selectedArray[0], this.selectedArray[1])) {

                            if (a1 > b1) {
                                console.log("0 > 1")
                                this.pathArray.unshift([b0, b1]); // first index of path 
                                this.pathArray.push([a0, a1]); //last index of path 
                            } else {
                                this.pathArray.unshift([a0, a1]); // first index of path 
                                this.pathArray.push([b0, b1]);
                            }

                            this.mainArray[a0][a1] = 0
                            this.mainArray[b0][b1] = 0
                            this.removeCell(this.getIndexOfCell(a0, a1))
                            this.removeCell(this.getIndexOfCell(b0, b1))
                            this.drawPath()
                                // pikachu[element].classList.add("path");
                                // const time = setTimeout(() => { pikachu[element].classList.remove("path") }, 500);
                                // console.log(element[0]<)



                        } else {
                            this.pathArray = []
                        }
                    } else {
                        this.pathArray = []
                    }
                    this.resetSelectedArray()
                    console.log(this.pathArray)
                }
                this.pathArray = [];
            }
        }
    }
    drawPath() {
            const pikachu = document.querySelectorAll(".pikachu")
            let zigzag = 1;
            for (let i = 0; i < this.pathArray.length; i++) {
                let prev = this.pathArray[i - 1]
                let next = this.pathArray[i + 1]
                let current = this.pathArray[i]
                if (prev && next && i != 0 && i != this.pathArray.length - 1) {
                    switch (this.caseAlgorithm) {
                        case 1:
                            if (current[0] < next[0] && current[1] == next[1]) {
                                console.log("xuống")
                            }
                            break;
                        case 2:
                            if (prev[0] < next[0] && prev[1] < next[1]) {
                                console.log("trên-phải", current)
                            } else if (prev[0] < next[0] && prev[1] > next[1] && zigzag == 1) {
                                zigzag = 2;
                                console.log("phải dưới", current)
                            } else if (prev[0] < next[0] && prev[1] > next[1] && zigzag == 2) {
                                zigzag = 1
                                console.log("trên-trái", current)
                            } else if (current[0] < next[0] && current[1] == next[1]) {
                                console.log("xuống", current)
                            } else {
                                console.log("ngang", current)
                            }
                            break;
                        case 3:
                            if (prev[0] < next[0] && prev[1] > next[1]) {
                                console.log("trên-trái", current)
                            } else if (prev[0] < next[0] && prev[1] < next[1] && zigzag == 1) {
                                zigzag = 2
                                console.log("trái-dưới", current)
                            } else if (prev[0] < next[0] && prev[1] < next[1] && zigzag == 2) {
                                zigzag = 1
                                console.log("trên-phải", current)
                            } else if (current[0] < next[0] && current[1] == next[1]) {
                                console.log("xuống", current)
                            } else {
                                console.log("ngang", current)
                            }
                            break;
                        case 4:
                            if (current[0] == next[0] && current[1] < next[1]) {
                                console.log("ngang")
                            }
                            break;
                        case 5:
                            if (prev[0] > next[0] && prev[1] < next[1]) {
                                console.log("dưới-phải")
                            } else if (prev[0] < next[0] && prev[1] < next[1]) {
                                console.log("dưới-trái")
                            } else if (current[0] == next[0] && current[1] < next[1]) {
                                console.log("ngang", current)
                            } else {
                                console.log("dọc", current)
                            }
                            break;
                        case 6:
                            if (prev[0] < next[0] && prev[1] < next[1]) {
                                console.log("trên-phải")
                            } else if (prev[0] > next[0] && prev[1] < next[1]) {
                                console.log("trên-trái")
                            } else if (current[0] == next[0] && current[1] < next[1]) {
                                console.log("ngang", current)
                            } else {
                                console.log("dọc", current)
                            }
                            break;

                    }
                }

            }
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
        cell.classList.add("hover")
    }

    // remove border cell 
    clearBorderCell(index) {
            const pikachu = document.querySelectorAll(".pikachu");
            for (var i = 0; i < this.rowMax; i++) {
                for (var j = 0; j < this.colMax; j++) {
                    pikachu[index].isSelected = false;
                    pikachu[index].classList.remove("hover")

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