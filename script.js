const gridEl = document.getElementById('grid');
const grid = [];
const gridSize = 50;

function createGrid() {
    for (let i = 0; i < gridSize; i++) {
        grid.push([]);

        for (let j = 0; j < gridSize; j++) {
            grid[i].push(Math.random() < 0.5 ? 0 : 1)
        }
    }
}

function drawGrid() {
    for (let i = 0; i < grid.length; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < grid[i].length; j++) {
            const cell = document.createElement('div');
            cell.setAttribute('id', `cell${i}${j}`);
            cell.classList.add('cell');

            if (grid[i][j] === 1) {
                cell.classList.add('alive');
            }

            row.appendChild(cell);
        }

        gridEl.appendChild(row);
    }

    const wrapperWidth = document.getElementById('wrapper').getBoundingClientRect().width;
    const wrapperHeight = document.getElementById('wrapper').getBoundingClientRect().height;
    const margin = 30;

    if (wrapperWidth > wrapperHeight) {
        gridEl.style.width = `${wrapperHeight - margin}px`;
        gridEl.style.height = `${wrapperHeight - margin}px`;
    } else {
        gridEl.style.width = `${wrapperWidth - margin}px`;
        gridEl.style.height = `${wrapperWidth - margin}px`;
    }
}

function main() {
    createGrid();
    drawGrid();

    setInterval(gameLoop, 100);
}

function gameLoop() {
    let numberOfNeighbours;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            numberOfNeighbours = 0;

            if (typeof grid[i - 1] !== 'undefined' && grid[i - i][j] === 1) {
                numberOfNeighbours++;
            }

            if (typeof grid[i - 1] !== 'undefined' && grid[i - 1][j + 1] === 1) {
                numberOfNeighbours++;
            }

            if (typeof grid[i][j + 1] !== 'undefined' && grid[i][j + 1] === 1) {
                numberOfNeighbours++;
            }

            if (typeof grid[i + 1] !== 'undefined' && grid[i + 1][j + 1] === 1) {
                numberOfNeighbours++;
            }

            if (typeof grid[i + 1] !== 'undefined' && grid[i + 1][j] === 1) {
                numberOfNeighbours++;
            }

            if (typeof grid[i + 1] !== 'undefined' && grid[i + 1][j - 1] === 1) {
                numberOfNeighbours++;
            }

            if (typeof grid[i] !== 'undefined' && grid[i][j - 1] === 1) {
                numberOfNeighbours++;
            }

            if (typeof grid[i - 1] !== 'undefined' && grid[i - 1][j - 1] === 1) {
                numberOfNeighbours++;
            }

            if (grid[i][j] === 1 && (numberOfNeighbours < 2 || numberOfNeighbours > 3)) {
                grid[i][j] = 0;
                document.getElementById(`cell${i}${j}`).classList.remove('alive');
            } else if (grid[i][j] === 0 && numberOfNeighbours === 3) {
                grid[i][j] = 1;
                document.getElementById(`cell${i}${j}`).classList.add('alive');
            }
        }
    }
}


main();