import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamemodeTwoComponent } from './gamemode-two.component';

describe('GamemodeTwoComponent', () => {
  let component: GamemodeTwoComponent;
  let fixture: ComponentFixture<GamemodeTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamemodeTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamemodeTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
