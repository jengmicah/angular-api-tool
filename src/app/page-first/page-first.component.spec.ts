import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFirstComponent } from './page-first.component';

describe('PageFirstComponent', () => {
  let component: PageFirstComponent;
  let fixture: ComponentFixture<PageFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
