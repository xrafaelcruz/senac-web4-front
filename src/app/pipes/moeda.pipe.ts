import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moeda'
})
export class MoedaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let valor = +value.toFixed(2);
    let moeda:string = 'R$ '+valor.toString().replace(".",",");
    return moeda;
  }

}
