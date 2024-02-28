function toHTML() {
    return `
       <li class="db__record">
          <a href="#">Tab #1</a>
          <strong>01.06.2024</strong>
       </li>
    `;
};

// keys of all tables
function getAllKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.includes('excel')) {
            continue;
        }
        keys.push(key);
    };
    return keys;
};

export function createRecordsTable() {
    const keys = getAllKeys();
    if (!keys.length) {
       return `
          <p>There is not table here.</p>
       `;
    }

    return `
       <div class="db__list-header"
          <span>Name</span>
          <span>Date of creating</span>
       </div>

       <ul class="db__list">
          ${keys.map(toHTML).join('')}
       </ul>
       `;
};