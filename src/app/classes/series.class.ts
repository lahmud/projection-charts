export class Series {
  name: number;
  value: number;
  min: number;
  max: number;
  constructor(name: number, value: number, min?: number, max?: number) {
    this.name = name;
    this.value = value;
    this.min = min;
    this.max = max;
  }
}
