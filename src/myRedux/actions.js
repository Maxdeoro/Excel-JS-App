import { APPLY_STYLE, CHANGE_STYLES, CHANGE_TEXT, TABLE_RESIZE } from './types';

// Action Creators

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    };
};

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    };
};

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data
    };
};

// data = value, id
export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    };
};