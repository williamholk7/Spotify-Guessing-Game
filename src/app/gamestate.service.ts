import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import LeaderboardInfo from './models/LeaderboardInfo';
// import LeaderboardInfo from './models/leaderboardInfo';

@Injectable({
  providedIn: 'root'
})
export class GamestateService {

  private selectedUserSource = new BehaviorSubject<string>('');
  selectedUser = this.selectedUserSource.asObservable();

  private selectedGenreSource = new BehaviorSubject<string>('');
  selectedGenre = this.selectedGenreSource.asObservable();

  private selectedDifficultySource = new BehaviorSubject<string>('');
  selectedDifficulty = this.selectedDifficultySource.asObservable();

  private finalScoreSource = new BehaviorSubject<number>(0);
  finalScore = this.finalScoreSource.asObservable();

  private leaderboardArraySource = new BehaviorSubject<LeaderboardInfo[]>([]);
  leaderboardArray = this.leaderboardArraySource.asObservable();

  private selectedGameModeSource = new BehaviorSubject<string>('');
  selectedGameMode = this.selectedGameModeSource.asObservable();

  updateSelectedUser(newUser: string){
    this.selectedUserSource.next(newUser);
  }

  updateSelectedGenre(newGenre: string){
    this.selectedGenreSource.next(newGenre);
  }

  updateSelectedDifficulty(newDifficulty: string){
    this.selectedDifficultySource.next(newDifficulty);
  }

  updateLeaderboardArray(newLeaderboardArray: LeaderboardInfo[]){
    this.leaderboardArraySource.next(newLeaderboardArray);
  }

  updateFinalScore(newScore: number){
    this.finalScoreSource.next(newScore);
  }

  updateSelectedGameMode(newGameMode: string){
    this.selectedGameModeSource.next(newGameMode);
  }

  constructor() { 
  }
}
