function toButton(button) {
    return `<div class="button ${button.active} ? 'active' || ''">
                <span class="material-icons">${button.icon}</span>
            </div>`;
};

export function createToolbar() {
    const buttons = [
        {
            icon: 'format_align_left',
            active: false,
        },
        {
            icon: 'format_align_center',
            active: true,
        },
        {
            icon: 'format_align_right',
            active: false,
        },
        {
            icon: 'format_bold',
            active: true,
        },
        {
            icon: 'format_italic',
            active: false,
        },
        {
            icon: 'format_underlined',
            active: false,
        }
    ];
    return buttons.map(toButton).join('');
};