import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ClarityModule} from '@clr/angular';

import {AlertComponent, PageContainerComponent, SpinnerComponent} from '../../../../clr-extension/src/public-api';
import {createAsyncState} from '../../../../ngx-extension/src/public-api';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-user-card-list',
  standalone: true,
  imports: [CommonModule, ClarityModule, PageContainerComponent, SpinnerComponent, AlertComponent],
  templateUrl: './user-card-list.component.html',
  styleUrl: './user-card-list.component.scss',
})
export class UserCardListComponent {
  private userService = inject(UserService);

  usersState$ = this.userService.getUsers({results: 9}).pipe(createAsyncState());
}