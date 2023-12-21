import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selected'
})
export class SelectedPipe implements PipeTransform {

  transform(value: Partial<{file: File, progress: number, inprogress: boolean, selected: boolean}>[]): boolean {
    return value.filter(i=>i.selected).length > 0;
  }

}
