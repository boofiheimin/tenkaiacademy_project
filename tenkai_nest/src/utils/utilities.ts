import { isUndefined } from 'lodash';

export const uniqByKey = (inputArray: any[], key: string): any[] => {
    return inputArray.filter((element, index) => inputArray.findIndex((obj) => obj[key] === element[key]) === index);
};

export const objectClassConstructor = (thisContext: any, object: any = {}, acceptedField: any[]): void => {
    acceptedField.forEach((key) => {
        !isUndefined(object[key]) && (thisContext[key] = object[key]);
    });
};
