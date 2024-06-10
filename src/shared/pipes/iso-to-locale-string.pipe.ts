import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'isoToVnLocale',
  standalone: true,
})
export class IsoToVnLocalePipe implements PipeTransform {
  transform(isoDate: Date) {
    return isoDate.toLocaleString("vi-VN");
  }
}
