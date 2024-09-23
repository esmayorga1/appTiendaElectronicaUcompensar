import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { npAuthGuard } from './np-auth.guard';

describe('npAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => npAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
