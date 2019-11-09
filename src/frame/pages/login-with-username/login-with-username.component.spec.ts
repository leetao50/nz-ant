import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithUsernameComponent } from './login-with-username.component';

describe('LoginWithUsernameComponent', () => {
  let component: LoginWithUsernameComponent;
  let fixture: ComponentFixture<LoginWithUsernameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginWithUsernameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWithUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
