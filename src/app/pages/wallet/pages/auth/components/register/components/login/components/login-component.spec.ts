import {LoginComponent} from "./login.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {reducers} from "../../../../../store/reducers/auth.reducers";
import {EffectsModule} from "@ngrx/effects";
import {LoginEffect} from "../../../../../store/effects/login.effect";
import {LogoutEffect} from "../../../../../store/effects/logout.effect";
import {RegisterEffect} from "../../../../../store/effects/register.effect";
import {UpdateProfileEffect} from "../../../../../store/effects/update-profile.effect";
import {AuthService} from "../../../../../services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {PersistanceService} from "../../../../../../../../../shared/services/persistance.service";
import {ToastrModule} from "ngx-toastr";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {LottieModule} from "ngx-lottie";
import {playerFactory} from "../../../../../../../../../app.module";
import {RouterTestingModule} from "@angular/router/testing";
import {GenericTitleModule} from "../../../../../../../../../shared/modules/generic-title/generic-title.module";
import {By} from "@angular/platform-browser";
import {
  GenericTitleComponent
} from "../../../../../../../../../shared/modules/generic-title/components/generic-title.component";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let compiled: HTMLElement;
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        GenericTitleModule,
        HttpClientModule,
        StoreModule.forRoot({},{}),
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forRoot([LoginEffect,LogoutEffect,RegisterEffect,UpdateProfileEffect]),
        EffectsModule.forFeature([LoginEffect]),
        ToastrModule.forRoot({
          timeOut: 3500,
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,}),
        LottieModule.forRoot({ player: playerFactory }),
      ],
      providers: [AuthService,PersistanceService],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  beforeEach(() => {

    compiled = fixture.nativeElement;
    jest.clearAllMocks();
  });

  it('should create LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with name loginForm', () => {

    expect(component.loginForm).toBeTruthy();
  });

  it('should have form controls names "email", "password"', () => {
    fixture.detectChanges();
    expect(component.loginForm.controls['email']).toBeTruthy();
    expect(component.loginForm.controls['password']).toBeTruthy();
  });

  it('should not submit data if form is invalid" ', () => {
    const form = component.loginForm
    const submitBtn = fixture.debugElement.nativeElement.querySelector('#login-btn');
    submitBtn.click();
    expect(form.valid).toBeFalsy();
  });

  it('should submit data if form is valid" ', () => {
    const form = component.loginForm
    form.controls['email'].setValue('example@example.com')
    form.controls['password'].setValue('example')

    const submitBtn = fixture.debugElement.nativeElement.querySelector('#login-btn');
    submitBtn.click();
    expect(form.valid).toBeTruthy();
    expect(form.value).toEqual({
      email: 'example@example.com',
      password: 'example',
    })
  });

  it('should have a generic title componet with value of "Login" ', () => {
    const titleDebug = fixture.debugElement.query( By.directive(  GenericTitleComponent) );
    const titleComponent:GenericTitleComponent = titleDebug.componentInstance;
    expect(titleComponent.titleProps).toEqual('Login');
  });


  it('should have link to redirect to "/auth/login/password-forgot" ', () => {
   const link = compiled.querySelector('#password-forgot-link');
   const linkRef = link?.getAttribute('routerLink');
    expect(linkRef).toEqual('/auth/login/password-forgot');
  });

  it('should have link to redirect to "/auth/register" ', () => {
    const link = compiled.querySelector('#register-link');
    const linkRef = link?.getAttribute('routerLink');
    expect(linkRef).toEqual('/auth/register');
  });
});
