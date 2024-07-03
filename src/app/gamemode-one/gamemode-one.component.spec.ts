import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamemodeOneComponent } from './gamemode-one.component';

describe('GamemodeOneComponent', () => {
  let component: GamemodeOneComponent;
  let fixture: ComponentFixture<GamemodeOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamemodeOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamemodeOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
