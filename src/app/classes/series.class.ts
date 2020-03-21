export class Series {
  name: string;
  value: number;
  min: number;
  max: number;
  constructor(name: string, value: number, min?: number, max?: number) {
    this.name = name;
    this.value = value;
    this.min = min;
    this.max = max;
  }
}
