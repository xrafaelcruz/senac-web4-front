import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroMarca'
})
export class FiltroMarcaPipe implements PipeTransform {

  transform(produtos: any, args?: any): any {
    return produtos.filter(function(prod){
      return prod.marca == "marcax"
    });
  }

}
