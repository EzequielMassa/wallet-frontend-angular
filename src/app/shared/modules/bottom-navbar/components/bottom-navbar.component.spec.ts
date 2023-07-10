import {BottomNavbarComponent} from "./bottom-navbar.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NgOptimizedImage} from "@angular/common";
import {ProfileModule} from "../../profile/profile.module";
import {RouterTestingModule} from "@angular/router/testing";
import {StoreModule} from "@ngrx/store";
import {reducers} from "../../../../pages/wallet/pages/auth/store/reducers/auth.reducers";
import {EffectsModule} from "@ngrx/effects";
import {LogoutEffect} from "../../../../pages/wallet/pages/auth/store/effects/logout.effect";
import {PersistanceService} from "../../../services/persistance.service";

describe('BottomNavbarComponent', () => {
  let component: BottomNavbarComponent;
  let fixture: ComponentFixture<BottomNavbarComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottomNavbarComponent],
      imports: [
        NoopAnimationsModule,
        MatTabsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        NgOptimizedImage,
        ProfileModule,
        RouterTestingModule,
        StoreModule.forRoot({},{}),
        StoreModule.forFeature('auth', reducers),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature([LogoutEffect]),
      ],
      providers: [
        PersistanceService
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    //limpia todas las funciones de jest (ex. spyons)
    jest.clearAllMocks();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should have an array of links "[Home, Income, Expenses]"', () => {
   let links = ['Home', 'Income', 'Expenses'];
   expect(component.links).toEqual(links);
  });

  test('should have as default link "Home"', () => {
    let links = ['Home', 'Income', 'Expenses'];
    let dafultLink = links[0];
    expect(component.activeLink).toEqual(dafultLink);
  });

  test('should have as default mat-tab-nav-bar color value : "primary"', () => {
    let defaultBackgroundColor = "primary";
    expect(component.background).toBe(defaultBackgroundColor);
  });
});
