import Music from "./music.js"
import Pikachu from "./pikachu.js"
import { srcSelect, srcConnect, srcMiss, srcSoundBackground1 } from './variables.js';

var COL = 16;
var ROW = 9;
class Game {
    constructor() {
            this.selectedArray = [
                [null, null],
                [null, null]
            ];

            this.numberHint = 3 //allowed number of times click hint button
            this.numberRandom = 3 //allowed number of times click random button
            this.caseAlgorithm = null //6 case
            this.directList = [] // direction list connect 2 cells
            this.pathArray = []; // Array contain path when connect 2 cell
            this.typeOfPikachu = 4 // type number of pika chu init is 7
            this.rowMax = ROW + 2 //the actual number of rows of the matrix including the border (border value is 0)
            this.colMax = COL + 2 //the actual number of columns of the matrix including the border (border value is 0)
            this.board = document.getElementById('board')
            this.mainArray = this.borderEmptyArray(this.shuffledArr(this.randomTwinArray()));
            this.createBoardPikachu(this.mainArray);
            this.cells = document.querySelectorAll(".pikachu")
            this.music = new Music(srcSelect)
            this.musicBackground = new Music(srcSoundBackground1) //create background muscic
            this.isPlayBackgroundSound = false
            this.musicBtn = document.getElementById('sound');
            //add icon volume to button on off music
            this.loadIconMusic()
            this.handleOption() //handle click option: sound, search, random, reset
        }
        //load icon music and check on or off
    loadIconMusic() {
            this.iconMusic = window.bodymovin.loadAnimation({
                container: this.musicBtn, // the dom element that will contain the animation
                renderer: 'svg',
                loop: false,
                autoplay: false,
                path: './assets/json/volume.json' // the path to the animation json
            });
            //this.isPlayBackgroundSound =true => icon on else off
            if (this.isPlayBackgroundSound) {
                this.iconMusic.goToAndStop(40, true);
            } else {
                this.iconMusic.goToAndStop(0, true);
            }
        }
        /* Create elements cell + load image based on matrix */
    createBoardPikachu(array) {
            const table = document.createElement("table");
            this.board.appendChild(table);
            for (let i = 0; i < this.rowMax; i++) {
                const tr = document.createElement("tr");
                table.appendChild(tr);
                for (var j = 0; j < this.colMax; j++) {
                    const p = new Pikachu(this, i, j, array[i][j]);
                    tr.appendChild(p.getElement);
                }
            }

        }
        // clear all child in board
    clearBoard() {
            this.board.innerHTML = '';
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

            //case 1
            if (this.checkVertical(cellA[0] + 1, cellA[1], cellB[0]) && this.checkHorizontal(cellB[0], cellA[1], cellB[1])) {
                console.log("TH1")
                this.caseAlgorithm = 1
                this.addCellFirstAndLastIntoPathList(cellA, cellB, this.pathArray)
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
                    this.caseAlgorithm = 2
                    this.addCellFirstAndLastIntoPathList(cellA, cellB, this.pathArray)
                    return true;
                }
            }
            arrTemp = []
                //case 3
            for (let j = (cellA[1] + 1); j < this.colMax; j++) {
                if (this.mainArray[cellA[0]][j]) break;
                arrTemp.push([cellA[0], j])
                if (this.checkVertical((cellA[0]), j, cellB[0]) && this.checkHorizontal(cellB[0], j, cellB[1])) {
                    console.log("TH3")
                    arrTemp.pop(); // delete duplicate  element
                    this.pathArray = arrTemp.concat(this.pathArray) //concat 2 array path: arrTemp is horizontal path 
                    this.caseAlgorithm = 3
                    this.addCellFirstAndLastIntoPathList(cellA, cellB, this.pathArray)
                    return true;
                }
            }
            arrTemp = []
            if (cellA[1] > cellB[1]) {
                let C = cellA;
                cellA = cellB;
                cellB = C;
            }

            //case 4
            if (this.checkHorizontal(cellA[0], cellA[1] + 1, cellB[1]) && this.checkVertical(cellA[0], cellB[1], cellB[0])) {
                console.log("TH4")
                this.caseAlgorithm = 4
                this.addCellFirstAndLastIntoPathList(cellA, cellB, this.pathArray)
                return true;
            }
            //case 5
            for (let j = (cellA[0] - 1); j >= 0; j--) {
                if (this.mainArray[j][cellA[1]]) break;
                arrTemp.push([j, cellA[1]])
                if (this.checkHorizontal(j, (cellA[1]), cellB[1]) && this.checkVertical(j, cellB[1], cellB[0])) {
                    console.log("TH5")
                    arrTemp.pop(); // delete duplicate  element
                    this.pathArray = arrTemp.concat(this.pathArray) //concat 2 array path: arrTemp is horizontal path 
                    this.caseAlgorithm = 5
                    this.addCellFirstAndLastIntoPathList(cellA, cellB, this.pathArray)
                    return true;
                }
            }
            arrTemp = []
                //case 6
            for (let j = (cellA[0] + 1); j < this.rowMax; j++) {
                arrTemp.push([j, cellA[1]])
                if (this.mainArray[j][cellA[1]]) break;
                if (this.checkHorizontal(j, (cellA[1]), cellB[1]) && this.checkVertical(j, cellB[1], cellB[0])) {
                    console.log("TH6")
                    arrTemp.pop(); // delete duplicate  element
                    this.pathArray = arrTemp.concat(this.pathArray) //concat 2 array path: arrTemp is horizontal path 
                    this.caseAlgorithm = 6
                    this.addCellFirstAndLastIntoPathList(cellA, cellB, this.pathArray)
                    return true;
                }
            }
            arrTemp = []
        }
        // add cell into the top of the list and the bottom of the list
    addCellFirstAndLastIntoPathList(a, b, arr) {
        arr.unshift(a); // first index of path 
        arr.push(b);
    }
    check(cell, x, y) {
            /*
            selectedArray[a][b]: a=[0,1], b[0,1]
            */
            let a0 = this.selectedArray[0][0];
            let a1 = this.selectedArray[0][1];
            if (!a0 && this.mainArray[x][y]) {
                // when you haven't select any cell
                this.selectedArray[0] = [x, y];
                a0 = this.selectedArray[0][0];
                a1 = this.selectedArray[0][1];
                this.music.setMusic(srcSelect)
                this.music.play()
                this.borderCell(cell)
            } else if (a0 && this.mainArray[x][y]) {
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
                        this.clearBorderCell(this.getIndexOfCell(a0, a1))
                        this.clearBorderCell(this.getIndexOfCell(b0, b1))
                        if (this.mainArray[a0][a1] == this.mainArray[b0][b1]) {
                            // 2 selected cells have the same value
                            if (this.isConnect(this.selectedArray[0], this.selectedArray[1])) {
                                this.music.setMusic(srcConnect)
                                this.music.play()
                                this.mainArray[a0][a1] = 0
                                this.mainArray[b0][b1] = 0
                                this.removeCell(this.getIndexOfCell(a0, a1))
                                this.removeCell(this.getIndexOfCell(b0, b1))
                                this.findDirect()
                            } else {
                                this.pathArray = []
                                this.music.setMusic(srcMiss)
                                this.music.play()
                            }
                        } else {
                            this.pathArray = []
                            this.music.setMusic(srcMiss)
                            this.music.play()
                        }
                        this.resetSelectedArray()
                    }
                    this.pathArray = [];
                }
            }
        }
        /*find direction based on list pathArray 
            + ud: up-down
            + ul: up-left
            + ur: up-right
            + dl: down-left
            + dr: down-right
            + lr: left-right
            + d: down
            + l: left
            + r: right
            + u: up
        @return: directList: list direction line example: ['ul','ur','dl',...] 
        */

    findDirect() {
            let zigzag = 1;
            let direct = 'null'
            for (let i = 0; i < this.pathArray.length; i++) {
                let prev = this.pathArray[i - 1]
                let next = this.pathArray[i + 1]
                let current = this.pathArray[i]
                if (prev && next && i != 0 && i != this.pathArray.length - 1) {
                    switch (this.caseAlgorithm) {
                        case 1:
                            direct = 'd'
                            if (prev[0] < next[0] && prev[1] < next[1]) {
                                this.directList.push('ur')
                                direct = 'r'
                                    // console.log("trên-phải")
                            } else if (prev[0] < next[0] && prev[1] > next[1]) {
                                direct = 'l'
                                this.directList.push('ul')
                                    // console.log("trên trái")
                            } else if (current[0] < next[0] && current[1] == next[1]) {
                                this.directList.push('ud')
                                    // console.log("xuống")
                            } else if (current[0] == next[0] && current[1] < next[1]) {
                                direct = 'r'
                                this.directList.push('lr')
                                    // console.log("ngang-phai")
                            } else if (current[0] == next[0] && current[1] > next[1]) {
                                direct = 'l'
                                this.directList.push('lr')
                                    // console.log("ngang-trái")
                            }
                            break;
                        case 2:
                            direct = 'r'
                                // console.log(prev, next, zigzag)
                            if (prev[0] < next[0] && prev[1] < next[1]) {
                                this.directList.push('ur')
                                    // console.log("trên-phải", current)
                            } else if (prev[0] < next[0] && prev[1] > next[1] && zigzag == 1) {
                                zigzag = 2;
                                direct = 'd';
                                this.directList.push('dr')
                                    // console.log("phải dưới", current)
                            } else if (prev[0] < next[0] && prev[1] > next[1] && zigzag == 2) {
                                direct = 'l';
                                zigzag = 1
                                this.directList.push('ul')
                                    // console.log("trên-trái", current)
                            } else if (current[0] < next[0] && current[1] == next[1]) {
                                this.directList.push('ud')
                                direct = 'd';
                                // console.log("xuống", current)
                            } else if (current[0] == next[0] && current[1] > next[1]) {
                                direct = 'l';
                                this.directList.push('lr')
                                    // console.log("ngang-trái", current)
                            } else if (current[0] == next[0] && current[1] < next[1]) {
                                direct = 'r';
                                this.directList.push('lr')
                                    // console.log("ngang-phải", current)
                            }
                            break;
                        case 3:
                            direct = 'l'
                            if (prev[0] < next[0] && prev[1] > next[1]) {
                                this.directList.push('ul')
                                    // console.log("trên-trái", current)
                            } else if (prev[0] < next[0] && prev[1] < next[1] && zigzag == 1) {
                                zigzag = 2
                                direct = 'd'
                                this.directList.push('dl')
                                    // console.log("trái-dưới", current)
                            } else if (prev[0] < next[0] && prev[1] < next[1] && zigzag == 2) {
                                direct = 'r'
                                zigzag = 1
                                this.directList.push('ur')
                                    // console.log("trên-phải", current)
                            } else if (current[0] < next[0] && current[1] == next[1]) {
                                this.directList.push('ud')
                                direct = 'd'
                                    // console.log("xuống", current)
                            } else if (current[0] == next[0] && current[1] < next[1]) {
                                direct = 'r'
                                this.directList.push('lr')
                                    // console.log("ngang", current)
                            } else if (current[0] == next[0] && current[1] > next[1]) {
                                direct = 'l'
                                this.directList.push('lr')
                                    // console.log("ngang", current)
                            }
                            break;
                        case 4:
                            if (current[0] == next[0] && current[1] < next[1]) {
                                this.directList.push('lr')
                                    // console.log("ngang")
                            }
                            break;
                        case 5:
                            if (prev[0] < next[0] && prev[1] < next[1]) {
                                direct = 'd'
                                this.directList.push('dl')
                                    // console.log("dưới-trái")
                            } else if (prev[0] > next[0] && prev[1] < next[1] && zigzag == 1) {
                                zigzag = 2;
                                this.directList.push('dr')
                                    // console.log("dưới-phải", current)
                            } else if (prev[0] > next[0] && prev[1] < next[1] && zigzag == 2) {
                                zigzag = 1;
                                this.directList.push('ul')
                                    // console.log("trên-trái", current)
                            } else if (current[0] == next[0] && current[1] < next[1]) {
                                this.directList.push('lr')
                                    // console.log("ngang", current)
                            } else if (current[0] > next[0] && current[1] == next[1]) {
                                this.directList.push('ud')
                                direct = 'u'
                                    // console.log("dọc", current)
                            } else if (current[0] < next[0] && current[1] == next[1]) {
                                this.directList.push('ud')
                                direct = 'd'
                                    // console.log("dọc", current)
                            }
                            break;
                        case 6:
                            direct = 'u'
                            if (prev[0] > next[0] && prev[1] < next[1]) {
                                this.directList.push('ul')
                                direct = 'u'
                                    // console.log("trên-trái", current)
                            } else if (prev[0] < next[0] && prev[1] < next[1] && zigzag == 1) {
                                zigzag = 2;
                                direct = 'd'
                                this.directList.push('ur')
                                    // console.log("trên-phải", current)
                            } else if (prev[0] < next[0] && prev[1] < next[1] && zigzag == 2) {
                                zigzag = 1;
                                direct = 'd'
                                this.directList.push('dl')
                                    // console.log("trái-dưới", current)
                            } else if (current[0] == next[0] && current[1] < next[1]) {
                                this.directList.push('lr')
                                    // console.log("ngang", current)
                            } else if (current[0] > next[0] && current[1] == next[1]) {
                                direct = 'u'
                                this.directList.push('ud')
                                    // console.log("dọc-lên", current)
                            } else if (current[0] < next[0] && current[1] == next[1]) {
                                direct = 'd'
                                this.directList.push('ud')
                                    // console.log("dọc-xuong", current)
                            }
                            break;
                    }
                } else if (i == 0) {
                    switch (this.caseAlgorithm) {
                        case 1:
                            this.directList.push('d')
                            break;
                        case 2:
                            this.directList.push('l')
                            break;
                        case 3:
                            this.directList.push('r')
                            break;
                        case 4:
                            this.directList.push('r')
                            break;
                        case 5:
                            this.directList.push('u')
                            break;
                        case 6:
                            this.directList.push('d')
                            break;
                    }
                } else if (i == this.pathArray.length - 1) {
                    switch (this.caseAlgorithm) {
                        case 1:
                            if (direct == 'r') {
                                this.directList.push('l')
                            } else if (direct == 'l') {
                                this.directList.push('r')
                            } else {
                                this.directList.push('u')
                            }
                            break;
                        case 2:
                            if (direct == 'l') {
                                this.directList.push('r')
                            } else if (direct == 'r') {
                                this.directList.push('l')
                            } else {
                                this.directList.push('u')
                            }
                            break;
                        case 3:
                            if (direct == 'r') {
                                this.directList.push('l')
                            } else if (direct == 'l') {
                                this.directList.push('r')
                            } else {
                                this.directList.push('u')
                            }
                            break;
                        case 4:
                            this.directList.push('l')
                            break;
                        case 5:
                            if (direct == 'u') {
                                this.directList.push('d')
                            } else if (direct == 'd') {
                                this.directList.push('u')
                            }
                            break;
                        case 6:
                            if (direct == 'd') {
                                this.directList.push('u')
                            } else if (direct == 'u') {
                                this.directList.push('d')
                            }


                            break;
                    }
                }

            }
            this.drawPath(this.directList, this.cells)
            this.directList = []
            setTimeout(() => {
                for (let i = 0; i < this.cells.length; i++) {
                    this.removeClassStartsWith(this.cells[i], 'line-');
                }
            }, 500)

        }
        //remove class start with the given string
    removeClassStartsWith(node, prefix) {
        var regx = new RegExp('\\b' + prefix + '[^ ]*[ ]?\\b', 'g')
        node.className = node.className.replace(regx, '');
        return node;
    }
    drawPath(array, pikachu) {
            for (let i = 0; i < array.length; i++) {
                pikachu[this.getIndexOfCell(this.pathArray[i][0], this.pathArray[i][1])].classList.add(`line-${array[i]}`)
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
            cell.childNodes[0].classList.add("hover")
        }
        //Border cell hint
    borderHintCell(cell) {
            cell.childNodes[0].classList.add("hint")
        }
        // remove border cell 
    clearBorderCell(index) {
        this.cells[index].isSelected = false;
        this.cells[index].childNodes[0].classList.remove("hover")
    }
    clearBorderAllCells() {
            for (var i = 0; i < this.rowMax; i++) {
                for (var j = 0; j < this.colMax; j++) {
                    this.cells[this.getIndexOfCell(i, j)].isSelected = false;
                    this.cells[this.getIndexOfCell(i, j)].childNodes[0].classList.remove("hover")
                }
            }
        }
        //hidden cell
    removeCell(index) {
            console.log(this.mainArray)
            this.cells[index].innerHTML = "";
            console.log(this.cells[index])
        }
        //get index of cell base x y from main array
    getIndexOfCell(x, y) {
            return x * this.colMax + y;
        }
        // help auto select 2 cells
    hint() {
            if (this.numberHint > 0) {
                A: for (var i = 0; i < this.rowMax; i++) {
                    for (var j = 0; j < this.colMax; j++) {
                        if (this.mainArray[i][j] != 0) {
                            for (var k = 0; k < this.rowMax; k++) {
                                for (var h = 0; h < this.colMax; h++) {
                                    if (this.mainArray[k][h] != 0) {
                                        if ((i != k || j != h) && this.mainArray[i][j] == this.mainArray[k][h]) {
                                            if (this.isConnect([i, j], [k, h])) {
                                                console.log([i, j], [k, h])
                                                this.borderHintCell(this.cells[this.getIndexOfCell(i, j)])
                                                this.borderHintCell(this.cells[this.getIndexOfCell(k, h)])
                                                this.pathArray = []
                                                break A;
                                            } else {
                                                console.log([i, j], [k, h], 'miss')
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else {
                alert("Đã hết lượt sử dụng gợi ý!");
            }
        }
        //random mainArray
    randomCells() {
            let arr = [];
            for (let i = 0; i < this.rowMax; i++) {
                for (let j = 0; j < this.colMax; j++) {
                    if (this.mainArray[i][j] != 0) arr.push(this.mainArray[i][j])
                }
            }
            arr = arr.sort(() => Math.random() - 0.5)
            for (let i = 0; i < this.rowMax; i++) {
                for (let j = 0; j < this.colMax; j++) {
                    if (this.mainArray[i][j] != 0) this.mainArray[i][j] = arr.shift();
                }
            }
            this.clearBoard()
            this.createBoardPikachu(this.mainArray)
            this.cells = document.querySelectorAll(".pikachu")
        }
        //handle click option: volume, hint, radom, restart
    handleOption() {
        const hintBtn = document.getElementById('hint')
        hintBtn.onclick = () => { this.hint() }
        const exchangeBtn = document.getElementById('exchange')
        exchangeBtn.onclick = () => { this.randomCells() }
        this.musicBtn.onclick = () => {
            this.isPlayBackgroundSound = !this.isPlayBackgroundSound
            if (this.isPlayBackgroundSound) {
                this.musicBackground.play()
                this.iconMusic.playSegments([0, 40], true);
            } else {
                this.iconMusic.playSegments([40, 100], true);
                this.musicBackground.pause();
            }
        }
    }
}

//run game
const g = new Game();