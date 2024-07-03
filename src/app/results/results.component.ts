import { Component, OnInit } from '@angular/core';
import { GamestateService } from '../gamestate.service';
import { Router } from '@angular/router';
import LeaderboardInfo from '../models/LeaderboardInfo';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  score: number = 0;
  name: string = '';
  genre: string = '';
  leaderboardArray: LeaderboardInfo[] = [];
  position: number = 0;
  gameMode: string = '';

  constructor(private gameService: GamestateService, private router: Router) { }

  ngOnInit(): void {
    this.gameService.finalScore.subscribe(finalScore => this.score = finalScore);
    this.gameService.selectedUser.subscribe(selectedUser => this.name = selectedUser);
    this.gameService.selectedGenre.subscribe(selectedGenre => this.genre = selectedGenre);
    this.gameService.selectedGameMode.subscribe(selectedGameMode => this.gameMode = selectedGameMode);
    this.gameService.leaderboardArray.subscribe(selectedLeaderboard => this.leaderboardArray = selectedLeaderboard);

    let newInfo = {
      name: this.name,
      score: this.score,
      genre: this.genre,
      gameMode: this.gameMode
    }

    this.leaderboardArray.push(newInfo);
    this.leaderboardArray.sort((a,b) => b.score - a.score);

    this.position = this.leaderboardArray.indexOf(newInfo);

    this.gameService.updateLeaderboardArray(this.leaderboardArray);

    console.log(this.leaderboardArray);
  }

}
