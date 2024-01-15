import {Component, Input} from '@angular/core';

import {User} from '../../models/user.model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input({required: true}) user = {} as User;
}
