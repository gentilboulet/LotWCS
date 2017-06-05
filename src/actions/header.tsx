import * as constants from '../constants/header';

export interface HeaderSetName {
    type: constants.HEADER_SET_NAME;
    name: string;
}

export interface HeaderSetConcept {
    type: constants.HEADER_SET_CONCEPT;
    concept: string;
}

export type HeaderAction = HeaderSetName | HeaderSetConcept;

export function headerSetName(s: string): HeaderSetName {
    return {
        type: constants.HEADER_SET_NAME,
        name: s
    };
}

export function headerSetConcept(s: string): HeaderSetConcept {
    return {
        type: constants.HEADER_SET_CONCEPT,
        concept: s
    };
}
