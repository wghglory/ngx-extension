import {TestBed} from '@angular/core/testing';

import {NgxExtensionService} from './ngx-lift.service';

describe('NgxExtensionService', () => {
  let service: NgxExtensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxExtensionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
