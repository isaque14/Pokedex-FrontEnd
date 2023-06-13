import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModel } from './user.model';

describe('UserModel', () => {
  let component: UserModel;
  let fixture: ComponentFixture<UserModel>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserModel]
    });
    fixture = TestBed.createComponent(UserModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
