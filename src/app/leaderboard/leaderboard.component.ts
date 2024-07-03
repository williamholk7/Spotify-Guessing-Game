import { Component, OnInit } from '@angular/core';
import LeaderboardInfo from '../models/LeaderboardInfo';
import { GamestateService } from '../gamestate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  leaderboardArray: LeaderboardInfo[] = [];

  constructor(private gameService: GamestateService, private router: Router) { }

  ngOnInit(): void {
    this.gameService.leaderboardArray.subscribe(currentLeaderboard => this.leaderboardArray = currentLeaderboard);
  }

}
