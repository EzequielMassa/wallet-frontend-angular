import {RouterTestingModule} from "@angular/router/testing";
import {TestBed} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./pages/wallet/pages/auth/store/reducers/auth.reducers";

import {SpinnerModule} from "./shared/modules/spinner/spinner.module";
import {FooterModule} from "./shared/modules/footer/footer.module";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}, {}),
        StoreModule.forFeature('auth', reducers),
        FooterModule,
        SpinnerModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  })

  it('should create the app', function () {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a variable called "isLoggedIn" with default value of null', function () {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.isLoggedIn$.subscribe(value => {
      expect(value).toBeNull()
    })
  });

  it('should get the screen width onInit', function () {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges()
    const app = fixture.componentInstance;
    const screenWidth = window.innerWidth
    expect(app.getScreenWidth).toEqual(screenWidth);
  });
})
