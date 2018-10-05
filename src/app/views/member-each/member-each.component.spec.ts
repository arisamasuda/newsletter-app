import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEachComponent } from './member-each.component';

describe('MemberEachComponent', () => {
  let component: MemberEachComponent;
  let fixture: ComponentFixture<MemberEachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberEachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
