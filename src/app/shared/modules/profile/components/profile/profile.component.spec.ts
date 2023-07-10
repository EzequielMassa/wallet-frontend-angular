import {ProfileComponent} from "./profile.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {StoreModule} from "@ngrx/store";
import {reducers} from "../../../../../pages/wallet/pages/auth/store/reducers/auth.reducers";
import {EffectsModule} from "@ngrx/effects";
import {LogoutEffect} from "../../../../../pages/wallet/pages/auth/store/effects/logout.effect";
import {PersistanceService} from "../../../../services/persistance.service";
import {CurrentUserInterface} from "../../../../types/currentUser.interface";
import {of} from "rxjs";
import {Router, RouterModule} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatTooltipModule,
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
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router)
    jest.clearAllMocks();
  });

  test('should create ProfileComponent', () => {
    expect(component).toBeTruthy();
  });

  test('should have a variable "currentUser$" with default value of null"', () => {
    component.currentUser$.subscribe((currentUser) => {
      expect(currentUser).toBeNull();
    })
  });

  test('should have a variable "currentUser$" with value of the currentUser if exist"', () => {
    let currentUser: CurrentUserInterface = {
      email: "example@example.com",
      firstname: "example",
      id: "1",
      lastname: "example",
      token: "1234559kdkdj",
      urlImg: "https://example.com"
    }
    component.currentUser$ = of(currentUser);
    fixture.detectChanges()
    component.currentUser$.subscribe((currentUser) => {
      expect(currentUser).toEqual(currentUser);
    })
  });

  test('should redirect to "/profile/edit" on "navigate()"', () => {
    const spy = jest.spyOn(component, 'navigate');
    const navigateSpy = jest.spyOn(router, 'navigate');
    fixture.detectChanges()
    const compiled: HTMLButtonElement = fixture.nativeElement as HTMLButtonElement
    const btn = compiled.querySelector('#profile-edit-btn');
    btn?.dispatchEvent(new Event('click'));
    const navigate = component.navigate()
    expect(spy).toHaveBeenCalled()
    expect(navigateSpy).toHaveBeenCalledWith(['/profile/edit']);
  })

  test('should call "onLogut()" when user logout', () => {
    fixture.detectChanges()
    const logoutSpy = jest.spyOn(component, 'onLogout');
    const compiled: HTMLButtonElement = fixture.nativeElement as HTMLButtonElement
    const btnLogout = compiled.querySelector('#navbar-logout-btn');

    btnLogout?.dispatchEvent(new Event('click'));
    const logout = component.onLogout()
    expect(logoutSpy).toHaveBeenCalled()
  })
});
