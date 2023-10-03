import Math from '../math/functions';
import React from 'react';

export class Content extends React.Component{



    prepareExamples = (count:number,summaryTable:string[]): string[] => {
        let table = [];

        for (let i = 1; i <= count; i++) {
            /* получить рандомный элемент массива */
            let rnd = Math.getRandomInt(summaryTable.length);
            table.push(summaryTable[rnd]);

            /* удалить полученный пример из массива чтобы больше не использовать*/
            let index = summaryTable.indexOf(summaryTable[rnd]);
            if (index > -1) {
                summaryTable.splice(index, 1);
            }
        }

        return table;
    }

    /* Все виды примеров */
    summaryTable: string[] = Array.prototype
        .concat
        .call(
            Math.Settings.multiply ? Math.prepareMultiplyTable() : null,
            Math.Settings.division ? Math.prepareDivisionTable() : null
        );

    /* Выбранные примеры из ообщей таблицы */
    chosenExamples: string[] = this.prepareExamples(Math.Settings.count,this.summaryTable);

    normalize = (string : string) : string => {
        string = string.replaceAll("/"," : ");
        string = string.replaceAll("*"," x ");

        return string;
    }

    answer = (string : string) : number => {
        // eslint-disable-next-line no-eval
        return eval(string);
    }

    handleCheck = (val : number, answer : number): boolean => {
        return val === answer;
    }

    handleNext = (key : string,iterator : number) => {
        let elem = null;
        if(key === 'ArrowDown')
            elem = document.getElementById(`inp-${iterator+1}`);

        if(key === 'ArrowUp')
            elem = document.getElementById(`inp-${iterator-1}`);

        elem?.focus();
    }

    render() {
        const examples = this.chosenExamples.map( (example,i) =>
            {
                let iterator = i+1;
                return <div key={iterator} className={"example " + (iterator % 10 === 0 ? "break" : "") }>
                    {this.normalize(example)} =
                    <input id={`inp-${iterator}`} className={"input"}

                           onKeyDown={
                                (event) => this.handleNext(event.key,iterator)
                           }

                           onKeyPress={
                                (event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }
                           }

                           onChange={
                                (event)=>
                                    this.handleCheck(this.answer(event.target.value),this.answer(example))
                                        ? event.target.className = 'input green'
                                        : event.target.className = 'input red' }
                    />
                </div>
            }
        );



        return(
            <div>{examples}</div>
        );

    }
}