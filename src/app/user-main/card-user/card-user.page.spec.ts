import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardUserPage } from './card-user.page';

describe('CardUserPage', () => {
  let component: CardUserPage;
  let fixture: ComponentFixture<CardUserPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CardUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
