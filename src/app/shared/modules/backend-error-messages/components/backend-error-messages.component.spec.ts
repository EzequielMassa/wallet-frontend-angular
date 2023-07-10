import {BackendErrorMessagesComponent} from "./backend-error-messages.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {BackendErrorsInterface} from "../../../types/backendErrors.interface";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('FatherSonComponent', () => {
  let component: BackendErrorMessagesComponent;
  let fixture: ComponentFixture<BackendErrorMessagesComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackendErrorMessagesComponent],
      imports: [
        NoopAnimationsModule,
        MatListModule,
        MatIconModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendErrorMessagesComponent);
    component = fixture.componentInstance;
    const errorMessage: BackendErrorsInterface = {
      code: "404",
      message: "Not found"
    };
    component.backendErrorsProps = errorMessage;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should not render error messages if backendErrorsProps is null', () => {
    component.backendErrorsProps = null;
    fixture.detectChanges()
    const span = compiled.querySelector('.error-messages__item__text');
    expect(component.backendErrorsProps).toBeNull();
    expect(span?.innerHTML).toMatch("")
  });

  test('should render error message: "Not found"', () => {
    const span = compiled.querySelector('.error-messages__item__text');
    expect(component.backendErrorsProps).not.toBeNull();
    expect(span?.textContent).toContain("Not found")
  });

});
