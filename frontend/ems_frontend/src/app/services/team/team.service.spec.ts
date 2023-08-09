import { TeamService } from './team.service';

describe('TeamService', () => {
  const service: TeamService = new TeamService();

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
