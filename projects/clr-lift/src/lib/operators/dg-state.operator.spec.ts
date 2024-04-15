import {ClrDatagridStateInterface} from '@clr/angular';
import {BehaviorSubject} from 'rxjs';
import {TestScheduler} from 'rxjs/testing';

import {dgState} from './dg-state.operator';

describe('dgState', () => {
  const clrDgState = {
    page: {
      from: 0,
      to: 9,
      size: 10,
      current: 1,
    },
    sort: {
      by: 'description',
      reverse: false,
    },
    filters: [
      {
        property: 'name',
        value: 'mike',
      },
      {
        property: 'job',
        value: 'programming',
      },
    ],
  };

  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should debounce emissions when filters does not change', () => {
    testScheduler.run(({cold, expectObservable}) => {
      // Arrange
      const initialState: ClrDatagridStateInterface | null = null;
      const newState1: ClrDatagridStateInterface | null = {filters: [{column1: 'value1'}]};
      const newState2: ClrDatagridStateInterface | null = {filters: [{column1: 'value1'}]};

      const source$ = cold('a-b-c|', {a: initialState, b: newState1, c: newState2});

      // Act
      const result$ = source$.pipe(dgState());

      // Assert
      expectObservable(result$).toBe('a---c|', {a: initialState, c: newState2}); // Delay applied to newState2

      // Fast-forward time (no debounce needed)
      testScheduler.flush();
    });
  });

  it('should emit when filter changes after 500ms', (done) => {
    // Arrange
    const initialState: ClrDatagridStateInterface | null = null;
    const newState1: ClrDatagridStateInterface | null = {filters: [{column1: 'value1'}]};
    const newState2: ClrDatagridStateInterface | null = {filters: [{column1: 'value2'}]};

    const source$ = new BehaviorSubject<ClrDatagridStateInterface | null>(initialState);

    setTimeout(() => {
      source$.next(newState1);
    }, 100);

    setTimeout(() => {
      source$.next(newState2);
      source$.complete();
    }, 700);

    // Act
    const result$ = source$.pipe(dgState());

    let count = 0;

    result$.subscribe((result) => {
      if (count === 0) {
        expect(result).toEqual(null);
      } else if (count === 1) {
        expect(result).toEqual(newState1);
      } else if (count === 2) {
        expect(result).toEqual(newState2);
        done();
      }

      count++;
    });
  });

  it('should not emit when filter changes back to original value within 500ms', (done) => {
    // Arrange
    const initialState: ClrDatagridStateInterface | null = null;
    const newState1: ClrDatagridStateInterface | null = {filters: [{column1: 'value1'}]};
    const newState2: ClrDatagridStateInterface | null = {filters: [{column1: 'value2'}]};

    const source$ = new BehaviorSubject<ClrDatagridStateInterface | null>(initialState);

    setTimeout(() => {
      source$.next(newState1);
    }, 100);
    setTimeout(() => {
      source$.next(newState2);
    }, 200);
    setTimeout(() => {
      source$.next(newState1);
      source$.complete();
    }, 300);

    // Act
    const result$ = source$.pipe(dgState());

    let count = 0;

    result$.subscribe((result) => {
      if (count === 0) {
        expect(result).toEqual(null);
      } else if (count === 1) {
        expect(result).toEqual(newState1);
        done();
      }

      count++;
    });
  });

  it('should not emit when filter does not change', (done) => {
    // Arrange
    const initialState: ClrDatagridStateInterface | null = null;
    const newState1: ClrDatagridStateInterface | null = {filters: [{column1: 'value1'}]};
    const newState2: ClrDatagridStateInterface | null = {filters: [{column1: 'value1'}]};

    const source$ = new BehaviorSubject<ClrDatagridStateInterface | null>(initialState);

    setTimeout(() => {
      source$.next(newState1);
    }, 100);

    setTimeout(() => {
      source$.next(newState2);
      source$.complete();
    }, 700);

    // Act
    const result$ = source$.pipe(dgState());

    let count = 0;

    result$.subscribe((result) => {
      if (count === 0) {
        expect(result).toEqual(null);
      } else if (count === 1) {
        expect(result).toEqual(newState1);
        done();
      }

      count++;
    });
  });

  it('should emit the same state when enableDistinctUntilChanged is false', (done) => {
    // Arrange
    const initialState: ClrDatagridStateInterface | null = null;
    const newState1: ClrDatagridStateInterface | null = clrDgState;
    const newState2: ClrDatagridStateInterface | null = clrDgState;

    const source$ = new BehaviorSubject<ClrDatagridStateInterface | null>(initialState);

    setTimeout(() => {
      source$.next(newState1);
    }, 100);

    setTimeout(() => {
      source$.next(newState2);
      source$.complete();
    }, 700);

    // Act
    const result$ = source$.pipe(dgState(false)); // Disable distinctUntilChanged

    let count = 0;

    result$.subscribe((result) => {
      if (count === 0) {
        expect(result).toEqual(null);
      } else if (count === 1) {
        expect(result).toEqual(clrDgState);
      } else if (count === 2) {
        expect(result).toEqual(clrDgState);
        done();
      }

      count++;
    });
  });

  it('should not emit the same state when enableDistinctUntilChanged is true', (done) => {
    // Arrange
    const initialState: ClrDatagridStateInterface | null = null;
    const newState1: ClrDatagridStateInterface | null = clrDgState;
    const newState2: ClrDatagridStateInterface | null = clrDgState;

    const source$ = new BehaviorSubject<ClrDatagridStateInterface | null>(initialState);

    setTimeout(() => {
      source$.next(newState1);
    }, 100);

    setTimeout(() => {
      source$.next(newState2);
      source$.complete();
    }, 700);

    // Act
    const result$ = source$.pipe(dgState());

    let count = 0;

    result$.subscribe((result) => {
      if (count === 0) {
        expect(result).toEqual(null);
      } else if (count === 1) {
        expect(result).toEqual(clrDgState);
        done();
      }

      count++;
    });
  });
});
