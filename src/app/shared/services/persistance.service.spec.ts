import {PersistanceService} from "./persistance.service";

describe('PersistanceService', () => {
  let service: PersistanceService;


  beforeEach( () => {
    service = new PersistanceService();
    jest.clearAllMocks()
  });

  it('should be created PersistanceService', () => {
    expect(service).toBeTruthy();
  });

  it('should  set(key: any, data: any) on localStorage',  async () => {
    const key = 'test';
    const data = {data: 'data'};
    service.set(key, data);
    expect(localStorage.getItem('test')).toEqual(JSON.stringify(data));
  });


  it('should  "get(key: any): any" of localStorage',  async () => {
    const key = 'test';
    const data = {data: 'data'};
    service.set(key, data);
    expect(service.get('test')).toEqual(data);
  });

  it('should  " clear(): void" all data of localStorage',  async () => {
    const key = 'test';
    const data = {data: 'data'};
    service.set(key, data);
    service.clear()
    expect(service.get('test')).toEqual(null);
  });
});
