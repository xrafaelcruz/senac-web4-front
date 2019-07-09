import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "resultOfPercentage" })
export class ResultOfPercentage implements PipeTransform {
  transform(value: number, percentage: number): number {
    return (percentage * value) / 100;
  }
}
