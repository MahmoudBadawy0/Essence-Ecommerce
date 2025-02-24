import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(arrOfData: any[], term: string): any[] {
    if ( term === '') {
      return arrOfData;
    }
    else if(term === 'Price: Low to High') {
        return arrOfData.sort((a, b) => a.price - b.price);
    }
    else if (term === 'Price: High to Low') {
        return arrOfData.sort((a, b) => b.price - a.price);
      }
    return arrOfData.filter(
      (e) => e.category.name.toLowerCase() == term.toLowerCase()
    );
  }
}



