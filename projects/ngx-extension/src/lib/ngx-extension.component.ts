import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'lib-ngx-extension',
  standalone: true,
  imports: [],
  template: ` <p>ngx-extension works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxExtensionComponent {}
