import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPointListComponent } from './check-point-list.component';

describe('CheckPointListComponent', () => {
  let component: CheckPointListComponent;
  let fixture: ComponentFixture<CheckPointListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckPointListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPointListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
