import {TopNavbarComponent} from "./top-navbar.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgOptimizedImage} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {ProfileModule} from "../../../profile/profile.module";
import {RouterTestingModule} from "@angular/router/testing";
import {StoreModule} from "@ngrx/store";
import {reducers} from "../../../../../pages/wallet/pages/auth/store/reducers/auth.reducers";
import {EffectsModule} from "@ngrx/effects";
import {LogoutEffect} from "../../../../../pages/wallet/pages/auth/store/effects/logout.effect";
import {PersistanceService} from "../../../../services/persistance.service";

describe('TopNavbarComponent', () => {
  let component: TopNavbarComponent;
  let fixture: ComponentFixture<TopNavbarComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopNavbarComponent],
      imports: [
        NoopAnimationsModule,
        MatToolbarModule,
        RouterTestingModule,
        NgOptimizedImage,
        MatButtonModule,
        MatTabsModule,
        MatIconModule,
        ProfileModule,
        StoreModule.forRoot({}, {}),
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
    fixture = TestBed.createComponent(TopNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    jest.clearAllMocks();
  });

  test('should create TopNavbarComponent', () => {
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
