import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: "img[defaultImage]"
})
export class DefaultImageDirective {

  @Input() defaultImage: string = 'assets/images/default-image.png'; // Inicializando con un valor por defecto

  constructor() { }

  @HostListener('error', ['$event']) onError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src = this.defaultImage;
  }

}
