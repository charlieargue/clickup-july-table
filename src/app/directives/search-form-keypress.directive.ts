import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/reducers';
import { SetSearch } from '../state/actions/july-table.actions';

@Directive({
  selector: '[appSearchFormKeypress]',
})
export class SearchFormKeypressDirective {
  // ------------------------
  constructor(private el: ElementRef, public store: Store<AppState>) {}

  // ------------------------
  @HostListener('keyup', ['$event']) onKeyUp(event) {
    const e: KeyboardEvent = <KeyboardEvent>event;
    // tslint:disable-next-line: deprecation
    if (e.keyCode === 13) {
      this.store.dispatch(new SetSearch(this.el.nativeElement.value));
    }
  }
}
