import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthUserPage } from './auth-user.page';

describe('AuthUserPage', () => {
  let component: AuthUserPage;
  let fixture: ComponentFixture<AuthUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
