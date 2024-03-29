import {TestBed} from '@angular/core/testing';
import {DomSanitizer} from '@angular/platform-browser';
import {take} from 'rxjs';

import {AlertService} from './alert.service';
import {Alert} from './alert.type';

describe('AlertService', () => {
  let service: AlertService;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: DomSanitizer, useValue: {bypassSecurityTrustHtml: (html: string) => html}}],
    });
    service = TestBed.inject(AlertService);
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add and sanitize alert', (done) => {
    const mockAlert: Alert = {content: '<strong>Test Alert</strong>'};

    service.addAlert(mockAlert);

    service.alerts$.pipe(take(2)).subscribe((alerts) => {
      expect(alerts.length).toBe(1);

      const addedAlert = alerts[0];
      expect(addedAlert.content).toEqual(sanitizer.bypassSecurityTrustHtml(mockAlert.content));
      done();
    });
  });

  it('should delete alert and unregister event', (done) => {
    const mockAlert: Alert = {
      content: 'Test Alert <button id="testId">Click</button>',
      targetSelector: '#testId',
      onTargetClick: jasmine.createSpy(),
    };

    const addedAlert = service.addAlert(mockAlert);
    service.deleteAlert(addedAlert.id);

    service.alerts$.pipe(take(3)).subscribe((alerts) => {
      expect(alerts.length).toBe(0);
      done();
    });
  });

  it('should clear alerts', (done) => {
    const mockAlert: Alert = {
      content: 'Test Alert <button class="test">Click</button>',
      targetSelector: '.test',
      onTargetClick: jasmine.createSpy(),
    };

    service.addAlert(mockAlert);
    service.addAlert(mockAlert);
    service.addAlert(mockAlert);
    service.clearAlerts();

    service.alerts$.pipe(take(5)).subscribe((alerts) => {
      expect(alerts.length).toBe(0);
      done();
    });
  });
});
