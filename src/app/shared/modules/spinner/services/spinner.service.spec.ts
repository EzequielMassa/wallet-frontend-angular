import {SpinnerService} from "./spinner.service";
import {Observable} from "rxjs";

describe('SpinnerService', () => {
  let service: SpinnerService;


  beforeEach( () => {
    service = new SpinnerService();
    jest.clearAllMocks()
  });

  it('should be created SpinnerService', () => {
    expect(service).toBeTruthy();
  });

  it('should show "spinner" on call',  async () => {
  const loading$:Observable<boolean> = service.isLoading$
  let loading:boolean = true

     loading$.subscribe(value => {
      loading = value
    })

    service.show()
    expect(loading).toBe(true);
  });

  it('should hide "spinner" on call',  async () => {
    const loading$:Observable<boolean> = service.isLoading$
    let loading:boolean = true

    loading$.subscribe(value => {
      loading = value
    })

    service.hide()
    expect(loading).toBe(false);
  });
});
