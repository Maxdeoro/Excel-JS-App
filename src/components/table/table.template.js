/* eslint-disable no-multi-spaces */
const CODES = {
    A: 65,          // 'A'.charCodeAt()
    Z: 90           // 'Z'.charCodeAt()
};

function createCell() {
    return `<div class="cell" contenteditable></div>`;
};

// eslint-disable-next-line no-unused-vars
function createCol(col) {
    return `<div class='column'>
                ${col}
                <div class='col-resize'></div>
            </div>`;
};

function createRow(index, content) {
    // remove row-resize from upper row
    const resizer = index ? `<div class='row-resize'></div>` : '';
    return `<div class='row'>
                <div class='row-info'>
                    ${index ? index : ''}
                    ${resizer}
                </div>
                <div class='row-data'>${content}</div>
            </div>`;
};

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

    rows.push(createRow(null, cols));

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map((el) => {
                return createCell(el);
            })
            .join('');

        rows.push(createRow(i + 1, cells));
    }

    return rows.join('');
};