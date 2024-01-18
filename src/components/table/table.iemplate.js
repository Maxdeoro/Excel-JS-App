/* eslint-disable no-multi-spaces */
const CODES = {
    A: 65,          // 'A'.charCodeAt()
    Z: 90           // 'Z'.charCodeAt()
};

// function createCell() {
//     return `<div class="cell" contenteditable>jdfgdh</div>`;
// };

// eslint-disable-next-line no-unused-vars
function createCol(col) {
    return `<div class='column'>${col}</div>`;
};

function createRow(content) {
    return `<div class='row'>
                <div class='row-info'></div>
                <div class='row-data'>${content}</div>
            </div>`;
};

// function toChar(_, index) {
//     return String.fromCharCode(CODES.A + index);
// };

export function createTable(rowsCount=15) {
    // eslint-disable-next-line no-unused-vars
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];
    const cols = new Array(colsCount)
        .fill('')
        .map((col, index) => {
            return String.fromCharCode(CODES.A + index);
        })
        // .map(toChar)
        .map((el) => {
            return createCol(el);
        })
        .join('');

    const emptyCols = new Array(colsCount)
        .fill('')
        .map((el) => {
            return createCol(el);
        })
        .join('');

    rows.push(createRow(cols));
    for (let i = 0; i < rowsCount; i++) {
        rows.push(createRow(emptyCols));
    }

    return rows.join('');
};