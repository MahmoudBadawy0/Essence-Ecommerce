import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(arrOfData: any[], term:string): any[] {
    return arrOfData.filter((e) =>
      e.title.toLowerCase().includes(term.toLowerCase())
    );
  }
}
