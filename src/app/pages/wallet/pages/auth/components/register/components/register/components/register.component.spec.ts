import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {GenericTitleModule} from "../../../../../../../../../shared/modules/generic-title/generic-title.module";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {
  BackendErrorMessagesModule
} from "../../../../../../../../../shared/modules/backend-error-messages/backend-error-messages.module";
import {LottieComponent, LottieModule} from "ngx-lottie";
import {RegisterComponent} from "./register.component";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {TermsConditionsModalComponent} from "./terms-conditions-modal/terms-conditions-modal.component";
import {StoreModule} from "@ngrx/store";
import {reducers} from "../../../../../store/reducers/auth.reducers";
import {playerFactory} from "../../../../../../../../../app.module";


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent,TermsConditionsModalComponent],
      imports: [
        CommonModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        GenericTitleModule,
        MatButtonModule,
        MatDialogModule,
        BackendErrorMessagesModule,
        LottieComponent,
        StoreModule.forRoot({}),
        StoreModule.forFeature('auth', reducers),
        LottieModule.forRoot({ player: playerFactory }),
      ],

    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    /*    fixture.detectChanges();*/
    expect(component).toBeTruthy();
  });

  it('should have a form with name registerForm', () => {
        fixture.detectChanges();
    expect(component.registerForm).toBeTruthy();
  });

  it('should have form controls names "firstname", "lastname", "email", "password","urlImg" ', () => {
    fixture.detectChanges();
    expect(component.registerForm.controls['firstname']).toBeTruthy();
    expect(component.registerForm.controls['lastname']).toBeTruthy();
    expect(component.registerForm.controls['email']).toBeTruthy();
    expect(component.registerForm.controls['password']).toBeTruthy();
    expect(component.registerForm.controls['urlImg']).toBeTruthy();
  });

  it('should not submit data if form is invalid" ', () => {
    fixture.detectChanges();
    const form = component.registerForm
    const submiitBtn = fixture.debugElement.nativeElement.querySelector('#register-btn');
      submiitBtn.click();
      expect(form.valid).toBeFalsy();
  });

  it('should submit data if form is valid" ', () => {
    fixture.detectChanges();
    const form = component.registerForm
    form.controls['firstname'].setValue('example')
    form.controls['lastname'].setValue('example')
    form.controls['email'].setValue('example@email.com')
    form.controls['password'].setValue('example')
    form.controls['urlImg'].setValue('hht://example.com')
    const submiitBtn = fixture.debugElement.nativeElement.querySelector('#register-btn');
    submiitBtn.click();
    expect(form.valid).toBeTruthy();
   expect(form.value).toEqual({
     firstname: 'example',
     lastname: 'example',
     email: 'example@email.com',
     password: 'example',
     urlImg: 'hht://example.com'
   })
  });

  it('should open the dialog on valid submit" ', () => {
    fixture.detectChanges();
    const form = component.registerForm
    form.controls['firstname'].setValue('example')
    form.controls['lastname'].setValue('example')
    form.controls['email'].setValue('example@email.com')
    form.controls['password'].setValue('example')
    form.controls['urlImg'].setValue('hht://example.com')

    const submiitBtn = fixture.debugElement.nativeElement.querySelector('#register-btn');

    const dialogFn = jest.spyOn(component,'openDialog')
    submiitBtn.click();
    expect(dialogFn).toHaveBeenCalled();
  })
});

