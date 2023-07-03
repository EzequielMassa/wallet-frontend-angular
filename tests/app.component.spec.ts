import {RouterTestingModule} from "@angular/router/testing";
import {TestBed} from "@angular/core/testing";
import {AppComponent} from "../src/app/app.component";
import {StoreModule} from "@ngrx/store";
import {reducers} from "../src/app/pages/wallet/pages/auth/store/reducers/auth.reducers";
import {FooterModule} from "../src/app/shared/modules/footer/footer.module";
import {SpinnerModule} from "../src/app/shared/modules/spinner/spinner.module";

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
})
