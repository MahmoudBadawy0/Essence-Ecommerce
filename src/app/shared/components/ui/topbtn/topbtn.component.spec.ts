import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbtnComponent } from './topbtn.component';

describe('TopbtnComponent', () => {
  let component: TopbtnComponent;
  let fixture: ComponentFixture<TopbtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopbtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
