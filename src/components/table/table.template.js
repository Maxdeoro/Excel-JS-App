/* eslint-disable no-multi-spaces */
const CODES = {
    A: 65,          // 'A'.charCodeAt()
    Z: 90           // 'Z'.charCodeAt()
};

function toCell(_, col) {
    return `<div class="cell" contenteditable data-col='${col}'></div>`;
};

// eslint-disable-next-line no-unused-vars
function toColumn(col, index) {
    return `<div class='column' data-type='resizable' data-col='${index}'>
                ${col}
                <div class='col-resize' data-resize='col'></div>
            </div>`;
};

function createRow(index, content) {
    // remove row-resize from upper row
    const resize = index ? `<div class='row-resize' data-resize='row'>
                            </div>` : '';
    return `<div class='row'>
                <div class='row-info'>
                    ${index ? index : ''}
                    ${resize}
                </div>
                <div class='row-data'>${content}</div>
            </div>`;
};

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
};

export function createTable(rowsCount=15) {
    // eslint-disable-next-line no-unused-vars
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('');

    rows.push(createRow(null, cols));

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell)
            // .map((el) => {
            //     return toCell(el);
            // })
            .join('');

        rows.push(createRow(i + 1, cells));
    }

    return rows.join('');
};