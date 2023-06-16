import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RotomGPTComponent } from './rotom-gpt.component';

describe('RotomGPTComponent', () => {
  let component: RotomGPTComponent;
  let fixture: ComponentFixture<RotomGPTComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RotomGPTComponent]
    });
    fixture = TestBed.createComponent(RotomGPTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
