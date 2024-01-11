import { TestBed } from '@angular/core/testing';

import { OverlayserviceService } from './overlayservice.service';

describe('OverlayserviceService', () => {
  let service: OverlayserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
