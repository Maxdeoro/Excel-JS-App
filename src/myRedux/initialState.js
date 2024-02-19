import { storage } from '../core/utils';
import { defaultStyles } from '../constants';

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {}, // '0:1': 'some text'
    currentText: '', // text in Cell or Formula
    currentStyles: defaultStyles,
};

export const initialState = storage('excel-state') 
                            ? storage('excel-state') 
                            : defaultState;