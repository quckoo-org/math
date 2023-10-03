let Settings = {
    /* Умножение */
    multiply: true,

    /* Деление */
    division: true,

    /* Количество примеров */
    count: 30
};

let getRandomInt = (max:number):number => Math.floor(Math.random() * max);

let prepareMultiplyTable =  (): string[] => {
    let table: string[] = [];

    for (let i:number = 1; i < 10; i++) {
        for (let j:number = 1; j < 10; j++) {
            table.push( i + ' * ' + j);
        }
    }

    return table;
}

let prepareDivisionTable =  (): string[] => {
    let table: string[] = [];

    for (let i:number = 1; i < 10; i++) {
        for (let j:number = 1; j < 10; j++) {
            let result:number = i * j;
            table.push( result + ' / ' + j);
        }
    }

    return table;
}

let prepareExamples =  (count:number,summaryTable: string[]): string[] => {
    let table: string[] = [];

    for (let i:number = 1; i <= count; i++) {
        /* получить рандомный элемент массива */
        let rnd:number = getRandomInt(summaryTable.length);
        table.push(summaryTable[rnd]);

        /* удалить полученный пример из массива чтобы больше не использовать*/
        let index:number = summaryTable.indexOf(summaryTable[rnd]);
        if (index > -1) {
            summaryTable.splice(index, 1);
        }
    }

    return table;
}

export default {
    Settings,
    getRandomInt,
    prepareMultiplyTable,
    prepareDivisionTable,
    prepareExamples};