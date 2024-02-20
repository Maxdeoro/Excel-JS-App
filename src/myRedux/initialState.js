import { storage } from '../core/utils';
import { defaultStyles, defaultTitle } from '../constants';

const defaultState = {
    title: defaultTitle,
    rowState: {},
    colState: {},
    dataState: {}, // '0:1': 'some text'
    stylesState: {},
    currentText: '', // text in Cell or Formula
    currentStyles: defaultStyles,
};

const normalize = (state) => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
});

export const initialState = storage('excel-state') 
                            ? normalize(storage('excel-state')) 
                            : defaultState;