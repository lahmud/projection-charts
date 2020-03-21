import { Series } from './series.class';

export class DataModel {
    name: string;
    series: Series[];
    constructor(name: string) {
        this.name = name;
        this.series = [];
    }
}