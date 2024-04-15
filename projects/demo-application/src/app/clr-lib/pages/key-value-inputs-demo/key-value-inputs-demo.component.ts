import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {CalloutComponent, KeyValueFormGroup, KeyValueInputsComponent, PageContainerComponent} from 'clr-lift';

import {CodeBlockComponent} from '../../../shared/components/code-block/code-block.component';
import {highlight} from '../../../shared/utils/highlight.util';

@Component({
  selector: 'app-key-value-inputs-demo',
  standalone: true,
  imports: [
    CommonModule,
    CalloutComponent,
    RouterLink,
    KeyValueInputsComponent,
    CodeBlockComponent,
    PageContainerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './key-value-inputs-demo.component.html',
  styleUrl: './key-value-inputs-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyValueInputsDemoComponent {
  form = new FormGroup({
    appProperties: new FormArray<KeyValueFormGroup>([]),
  });

  data = [
    {key: 'key1', value: 'value1'},
    {key: 'key2', value: 'value2'},
  ];

  exampleCode = highlight(`
import {KeyValueFormGroup, KeyValueInputsComponent} from 'clr-lift';

@Component({
  standalone: true,
  imports: [KeyValueInputsComponent],
  template: \`
    <clx-key-value-inputs
      [formArray]="form.controls.appProperties"
      [data]="data"
      [uniqueKey]="true"
      [keyHelper]="'Enter a unique key'"
      [valueHelper]="'Enter a value'"
      [addText]="'Add Key-Value Pair'"
      [inputSize]="40"
      [isSmallButton]="true"
    ></clx-key-value-inputs>
  \`
})
export class KeyValueInputsDemoComponent {
  form = new FormGroup({
    appProperties: new FormArray<KeyValueFormGroup>([]),
  });

  data = [
    {key: 'key1', value: 'value1'},
    {key: 'key2', value: 'value2'},
  ];
}
    `);
}
