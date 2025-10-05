const tbl = document.getElementById('table');
const tblBody = document.createElement("tbody");
const restartBtn = document.getElementById("restart");

function createMatrix(rows, cols) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(0);
        }
        matrix.push(row);
    }
    return matrix;
}

grid = createMatrix(4, 4);

for (let i = 0; i < 4; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 4; j++) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode(`0`);
        cell.appendChild(cellText);
        row.appendChild(cell);
    }

    tblBody.appendChild(row);
}

tbl.appendChild(tblBody);
document.body.appendChild(tbl);
tbl.setAttribute("border", "2");

function changeCellText(rowIdx, colIdx, newText) {
    const rows = tblBody.getElementsByTagName("tr");
    const cells = rows[rowIdx].getElementsByTagName("td");
    const cellText = cells[colIdx].firstChild;
    cellText.nodeValue = newText;
}

function changeCellColor(rowIdx, colIdx, newColor) {
    const rows = tblBody.getElementsByTagName("tr");
    const cells = rows[rowIdx].getElementsByTagName("td");
    const cell = cells[colIdx];
    cell.style.background = newColor
}

let key = ""

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let cellCounter = 0
function onGame() {
    generateCellRandom()
    generateCellRandom()
}
onGame();

function generateCellRandom() {
    let success = false;
    let x = getRandomInt(4)
    let y = getRandomInt(4)
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] != 0 && x == i && y == j) {
                success = false
                generateCellRandom()
            }
            else if (grid[i][j] == 0 && x == i && y == j) {
                success = true
            }
        }
    }

    if (success) {
        cellCounter++
        //console.log(cellCounter)
        changeCellText(x, y, "2")
        changeCellColor(x, y, "burlywood") // burlywood #E4DEBE
        grid[x][y] = 2;
        success = false
    }
}




function chooseColor(value) {
    let color = "burlywood" //burlywood #E4DEBE
    if (value == 2) {
        color = "burlywood" //burlywood #E4DEBE
    }
    else if (value == 4) {
        color = "coral" //coral #E6BAA3
    }
    else if (value == 8) {
        color = "brown" //brown #D24545
    }
    else if (value == 16) {
        color = "#A94438"
    }
    else if (value == 32) {
        color = "#85362D"
    }
    else if (value == 64) {
        color = "#57241E"
    }
    else if (value == 128) {
        color = "#3A7528"
    }
    else if (value == 256) {
        color = "#2f5c21"
    }
    else if (value == 512) {
        color = "#1f3d15"
    }
    else if (value == 1024) {
        color = "#27366e"
    }
    else if (value == 2048) {
        color = "#1d274f"
    }
    return color
}

function switchCell(newPos, i, j) {
    grid[newPos][j] = grid[i][j]
    changeCellText(newPos, j, grid[newPos][j].toString()) // 
    changeCellColor(newPos, j, chooseColor(grid[newPos][j]))
    grid[i][j] = 0
    changeCellText(i, j, "0")
    changeCellColor(i, j, "antiquewhite")
}

function switchCellForY(newPos, i, j) {
    grid[i][newPos] = grid[i][j]
    changeCellText(i, newPos, grid[i][newPos].toString())
    changeCellColor(i, newPos, chooseColor(grid[i][newPos]))
    grid[i][j] = 0
    changeCellText(i, j, "0")
    changeCellColor(i, j, "antiquewhite")
}

function addCell(newPos, i, j) {
    grid[newPos][j] = grid[i][j] + grid[newPos][j]
    changeCellText(newPos, j, grid[newPos][j].toString())
    changeCellColor(newPos, j, chooseColor(grid[newPos][j]))
    cellCounter--
    grid[i][j] = 0
    changeCellText(i, j, "0")
    changeCellColor(i, j, "antiquewhite")
}

function addCellForY(newPos, i, j) {
    grid[i][newPos] = grid[i][j] + grid[i][newPos]
    changeCellText(i, newPos, grid[i][newPos].toString())
    changeCellColor(i, newPos, chooseColor(grid[i][newPos]))
    cellCounter--
    grid[i][j] = 0
    changeCellText(i, j, "0")
    changeCellColor(i, j, "antiquewhite")
}


function arrowUp() {
    for (let k = 0; k < 4; k++) {
        for (let i = 3; i >= 0; i--) {
            for (let j = 3; j >= 0; j--) {
                if (grid[i][j] != 0) {
                    if (i != 0) {
                        if (grid[i][j] == grid[i - 1][j]) {
                            addCell(i - 1, i, j)
                        }
                        else if (grid[i - 1][j] == 0) {
                            switchCell(i - 1, i, j)
                        }
                    }
                }
            }
        }
    }
}

function arrowDown() {
    for (let k = 0; k < 4; k++) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (grid[i][j] != 0) {
                    if (i != 3) {
                        if (grid[i][j] == grid[i + 1][j]) {
                            addCell(i + 1, i, j)
                        }
                        else if (grid[i + 1][j] == 0) {
                            switchCell(i + 1, i, j)
                        }

                    }
                }
            }
        }
    }

}

function arrowRight() {
    for (let k = 0; k < 4; k++) {

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (grid[i][j] != 0) {
                    if (j != 3) {
                        if (grid[i][j] == grid[i][j + 1]) {
                            addCellForY(j + 1, i, j)
                        }
                        else if (grid[i][j + 1] == 0) {
                            switchCellForY(j + 1, i, j)
                        }

                    }
                }
            }
        }
    }


}

function arrowLeft() {
    for (let k = 0; k < 4; k++) {

        for (let i = 3; i >= 0; i--) {
            for (let j = 3; j >= 0; j--) {
                if (grid[i][j] != 0) {
                    if (j != 0) {
                        if (grid[i][j] == grid[i][j - 1]) {
                            addCellForY(j - 1, i, j)
                        }
                        else if (grid[i][j - 1] == 0) {
                            switchCellForY(j - 1, i, j)
                        }

                    }

                }
            }
        }
    }

}

document.addEventListener('keydown', (event) => {
    key = event.key;
    //console.log(cellCounter)
    if (cellCounter < 16) {
        if (key == "b") {
            generateCellRandom()
        }
        if (key == "ArrowUp") {
            arrowUp()
            generateCellRandom()
        }
        if (key == "ArrowDown") {
            arrowDown()
            generateCellRandom()
        }
        if (key == "ArrowRight") {
            arrowRight()
            generateCellRandom()
        }
        if (key == "ArrowLeft") {
            arrowLeft()
            generateCellRandom()
        }
    }
});

/*restartBtn.addEventListener("click", restartButton())

function restartButton() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            grid[i][j] = 0;
            changeCellColor(i, j, "antiquewhite")
            changeCellText(i, j, "0")
        }
    }
}*/