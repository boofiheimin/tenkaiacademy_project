export const uniqByKey = (inputArray: any[], key: string): any[] => {
    return inputArray.filter((element, index) => inputArray.findIndex((obj) => obj[key] === element[key]) === index);
};

export const filterClassConstructor = (thisContext: any, filter: any, acceptedField: any[]): void => {
    acceptedField.forEach((key) => {
        filter[key] && (thisContext[key] = filter[key]);
    });
};
