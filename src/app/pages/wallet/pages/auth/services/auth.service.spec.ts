import {AuthService} from "./auth.service";
import {RegisterRequestInterface} from "../types/registerRequest.interface";
import {environment} from "../../../../../../environments/environment";
import {CurrentUserInterface} from "../../../../../shared/types/currentUser.interface";
import {of, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginRequestInterface} from "../types/loginRequest.interface";
import {PasswordForgotRequestInterface} from "../types/passwordForgotRequest.interface";
import {PasswordResetRequestInterface} from "../types/passwordResetRequest.interface";

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: any;

  beforeEach(async () => {
    httpClientSpy = {
      put: jest.fn(),
      post: jest.fn(),
    }
    service = new AuthService(httpClientSpy);
    jest.clearAllMocks()
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a new user: register(data: RegisterRequestInterface)', (done) => {
    const mockedRegisterRequest:RegisterRequestInterface = {
      firstname: "example",
      lastname: "example",
      email: "example@example.com",
      password: "example",
      urlImg: "https://example.com"
    }

    const mockedResponse:CurrentUserInterface = {
      id: "1",
      firstname: "example",
      lastname: "example",
      email: "example@example.com",
      token: "1234559kdkdj",
      urlImg: "https://example.com"
    }

    const url = environment.apiUrl + '/api/v1/auth/register';
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(mockedResponse));
    service.register(mockedRegisterRequest).subscribe(res => {
      expect(res).toEqual(mockedResponse);
      done()
    })
    expect(httpClientSpy.post).toBeCalledTimes(1);
  });

  it('should test Error: "409 - There is already a user with that email"', (done) => {
    const mockedRegisterRequest:RegisterRequestInterface = {
      firstname: "example",
      lastname: "example",
      email: "example@example.com",
      password: "example",
      urlImg: "https://example.com"
    }
    const errorResponse = new HttpErrorResponse({
      error: 'test 409 error',
      status: 409,
      statusText: 'There is already a user with that email'
    })

    jest.spyOn(httpClientSpy, 'post').mockReturnValue(throwError(() => errorResponse));

    service.register(mockedRegisterRequest).subscribe(
      {
        next: data => console.log(data),
        error: error => {
          expect(error.status).toEqual(409);
          expect(error.message).toContain('There is already a user with that email');
          done();
        }
      }
    );
    expect(httpClientSpy.post).toBeCalledTimes(1)
  });

  it('should success login with valid credentials and return current user', (done) => {
    const mockedLoginRequest:LoginRequestInterface = {
      email: "example@example.com",
      password: "example"
    }
    const mockedResponse:CurrentUserInterface = {
      id: "1",
      firstname: "example",
      lastname: "example",
      email: "example@example.com",
      token: "1234559kdkdj",
      urlImg: "https://example.com"
    }
    const url = environment.apiUrl + '/api/v1/auth/authenticate'
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(mockedResponse));
    service.login(mockedLoginRequest).subscribe(res => {
      expect(res).toEqual(mockedResponse);
      done()
    })
    expect(httpClientSpy.post).toBeCalledTimes(1);
  });

  it('should test Error: "404 - The user with that email does not exist"', (done) => {
    const mockedLoginRequest:LoginRequestInterface = {
      email: "example@example.com",
      password: ""
    }
    const errorResponse = new HttpErrorResponse({
      error: 'test 400 error',
      status: 400,
      statusText: 'Bad credentials'
    })

    jest.spyOn(httpClientSpy, 'post').mockReturnValue(throwError(() => errorResponse));

    service.login(mockedLoginRequest).subscribe(
      {
        next: data => console.log(data),
        error: error => {
          expect(error.status).toEqual(400);
          expect(error.message).toContain('Bad credentials');
          done();
        }
      }
    );
    expect(httpClientSpy.post).toBeCalledTimes(1)
  });

  it('should test password forgot email submit success', (done) => {
    const mockedRequest:PasswordForgotRequestInterface = {
      mailTo: "example@example.com",
    }
    const mockedResponse:any = {
      mensaje: "We have sent you an email"
    }
    const url = environment.apiUrl + '/api/v1/auth/password-forgot'
    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(mockedResponse));
    service.passwordForgot(mockedRequest).subscribe(res => {
      expect(res).toEqual(mockedResponse);
      done()
    })
    expect(httpClientSpy.post).toBeCalledTimes(1);
  });

  it('should test password forgot error: "The user with that email does not exist"', (done) => {
    const mockedRequest:PasswordForgotRequestInterface = {
      mailTo: "exampleNotFount@example.com",
    }
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'The user with that email does not exist'
    })
    const url = environment.apiUrl + '/api/v1/auth/password-forgot'

    jest.spyOn(httpClientSpy, 'post').mockReturnValue(throwError(() => errorResponse));

    service.passwordForgot(mockedRequest).subscribe(
      {
        next: data => console.log(data),
        error: error => {
          expect(error.status).toEqual(404);
          expect(error.message).toContain('The user with that email does not exist');
          done();
        }
      }
    );
    expect(httpClientSpy.post).toBeCalledTimes(1)
  });

  it('should test password reset success', (done) => {
    const mockedRequest:PasswordResetRequestInterface = {
      password:"newPassword",
      confirmPassword:"newPassword",
      tokenPassword:"1234559kdkdj",
    }

    const mockedResponse:any = {
      mensaje: "Password updated successfully"
    }
    const url = environment.apiUrl + '/api/v1/auth/change-password';

    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(mockedResponse));

    service.resetPassword(mockedRequest).subscribe(res => {
      expect(res).toEqual(mockedResponse);
      done()
    })
    expect(httpClientSpy.post).toBeCalledTimes(1);
  });

  it('should test password reset error: "The user does not exist"', (done) => {
    const mockedRequest:PasswordResetRequestInterface = {
      password:"newPassword",
      confirmPassword:"newPassword",
      tokenPassword:"1234559kdkdj",
    }

    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'The user does not exist'
    })
    const url = environment.apiUrl + '/api/v1/auth/change-password';

    jest.spyOn(httpClientSpy, 'post').mockReturnValue(throwError(() => errorResponse));

    service.resetPassword(mockedRequest).subscribe(
      {
        next: data => console.log(data),
        error: error => {
          expect(error.status).toEqual(404);
          expect(error.message).toContain('The user does not exist');
          done();
        }
      }
    );
    expect(httpClientSpy.post).toBeCalledTimes(1)
  });

  it('should test update user profile success , "updateProfile(data: RegisterRequestInterface)"', (done) => {
    const mockedRegisterRequest:RegisterRequestInterface = {
      firstname: "exampleModify",
      lastname: "exampleModify",
      email: "example@example.com",
      password: "exampleModify",
      urlImg: "https://exampleModify.com"
    }

    const mockedResponse:CurrentUserInterface = {
      id: "1",
      firstname: "exampleModify",
      lastname: "exampleModify",
      email: "example@example.com",
      token: "1234559kdkdj",
      urlImg: "https://exampleModify.com"
    }

    const url = environment.apiUrl + '/api/v1/user/update';
    jest.spyOn(httpClientSpy, 'put').mockReturnValue(of(mockedResponse));
    service.updateProfile(mockedRegisterRequest).subscribe(res => {
      expect(res).toEqual(mockedResponse);
      done()
    })
    expect(httpClientSpy.put).toBeCalledTimes(1);
  });

  it('should test update user profile Error: "404 - The requested user does not exist"', (done) => {
    const mockedRegisterRequest:RegisterRequestInterface = {
      firstname: "example",
      lastname: "example",
      email: "exampleNotFound@example.com",
      password: "example",
      urlImg: "https://example.com"
    }
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'The requested user does not exist'
    })

    jest.spyOn(httpClientSpy, 'put').mockReturnValue(throwError(() => errorResponse));

    service.updateProfile(mockedRegisterRequest).subscribe(
      {
        next: data => console.log(data),
        error: error => {
          expect(error.status).toEqual(404);
          expect(error.message).toContain('The requested user does not exist');
          done();
        }
      }
    );
    expect(httpClientSpy.put).toBeCalledTimes(1)
  });

});
