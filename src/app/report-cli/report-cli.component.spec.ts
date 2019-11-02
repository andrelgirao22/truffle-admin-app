import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCliComponent } from './report-cli.component';

describe('ReportCliComponent', () => {
  let component: ReportCliComponent;
  let fixture: ComponentFixture<ReportCliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
