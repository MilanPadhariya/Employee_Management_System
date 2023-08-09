import { LeaveService } from './leave.service';

describe('LeaveService', () => {
  const service: LeaveService = new LeaveService();

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
