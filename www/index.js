import { memory } from "wasm-life/wasm_life_bg";
import { Universe, Cell } from "wasm-life";

const CELL_SIZE = 5;
const GRID_COLOR = "#cccccc";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

const width = Math.floor(window.innerWidth / (CELL_SIZE + 1)) - 1;
const height = Math.floor(window.innerHeight / (CELL_SIZE + 1)) - 1;
const universe = Universe.new(width, height);

const canvas = document.getElementById("game-of-life-canvas");
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext('2d');

const drawGrid = () => {
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;

    // Vertical lines
    for (let i = 0; i <= width; i++) {
        ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
        ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }

    // Horizontal lines
    for (let j = 0; j <= height; j++) {
        ctx.moveTo(0, j* (CELL_SIZE + 1) + 1);
        ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
    }

    ctx.stroke();
}

const getIndex = (row, column) => {
    return row * width + column;
}

const bitIsSet = (n, arr) => {
    const byte = Math.floor(n / 8);
    const mask = 1 << (n % 8);
    return (arr[byte] &mask) == mask;
}

const drawCells = () => {
    const cellsPrt = universe.cells();
    const cells = new Uint8Array(memory.buffer, cellsPrt, width * height / 8);

    ctx.beginPath();

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const idx = getIndex(row, col);

            ctx.fillStyle = bitIsSet(idx, cells)
                ? ALIVE_COLOR
                : DEAD_COLOR

            ctx.fillRect(
                col * (CELL_SIZE + 1) + 1,
                row * (CELL_SIZE + 1) + 1,
                CELL_SIZE,
                CELL_SIZE
            );
        }
    }

    ctx.stroke();
}

const renderLoop = () => {
    drawGrid();
    drawCells();
    universe.tick();
    requestAnimationFrame(renderLoop);
}

requestAnimationFrame(renderLoop);
