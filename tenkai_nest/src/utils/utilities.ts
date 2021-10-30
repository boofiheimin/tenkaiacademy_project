export const uniqByKey = (inputArray: any[], key: string): any[] => {
    return inputArray.filter((element, index) => inputArray.findIndex((obj) => obj[key] === element[key]) === index);
};
