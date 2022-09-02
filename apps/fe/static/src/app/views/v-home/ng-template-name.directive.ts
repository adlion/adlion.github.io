import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ng-template[name]'
})
export class NgTemplateNameDirective<T> {
  @Input() name='';

  constructor(public template: TemplateRef<T>) { }
}