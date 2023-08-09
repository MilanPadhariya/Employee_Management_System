import { ProjectService } from './project.service';

describe('ProjectService', () => {
  const service: ProjectService = new ProjectService();

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
