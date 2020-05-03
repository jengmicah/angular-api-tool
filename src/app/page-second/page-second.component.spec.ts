import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSecondComponent } from './page-second.component';

describe('PageSecondComponent', () => {
  let component: PageSecondComponent;
  let fixture: ComponentFixture<PageSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
