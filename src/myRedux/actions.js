import { TABLE_RESIZE } from './types';

// Actioncreator
export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    };
};