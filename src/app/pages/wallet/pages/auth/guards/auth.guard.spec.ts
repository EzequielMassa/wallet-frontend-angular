import {AuthGuard} from "./auth.guard";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {TestBed} from "@angular/core/testing";
import {StoreModule} from "@ngrx/store";
import {reducers} from "../store/reducers/auth.reducers";
import {HttpClientModule} from "@angular/common/http";

describe('RedirectGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let navigateSpy: jest.SpyInstance;
  let authService: AuthService;


  beforeEach(() => {
    TestBed.configureTestingModule({
   imports: [
     HttpClientModule,
     StoreModule.forRoot({}),
     StoreModule.forFeature('auth', reducers),
   ],
   providers: [
     AuthService
   ]
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    navigateSpy = jest.spyOn(router, 'createUrlTree');
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
})
