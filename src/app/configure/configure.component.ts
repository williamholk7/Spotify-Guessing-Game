import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GamestateService } from '../gamestate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {

  genre: string = "";
  difficulty: string = "";
  configured: boolean = false;
  infoShown: boolean = false;
  genres: string[] = ['Rock', 'Pop', 'Rap'];
  difficulties: string[] = ['Easy', 'Medium', 'Hard'];
  error: boolean = false;

  configForm: FormGroup = new FormGroup({
    selectedGenre: new FormControl<string>('',
      [Validators.required,]),
    selectedDifficulty: new FormControl<string>('', [
      Validators.required
    ]),

  });

  constructor(private gameService: GamestateService, private router: Router) { }

  ngOnInit(): void {
  }

  setConfigValues() {
    if (!this.difficulties.includes(this.configForm.controls['selectedDifficulty'].value) ||
      !this.genres.includes(this.configForm.controls['selectedGenre'].value)) {
      this.error = true;
    } else {
      this.error = false
      this.gameService.updateSelectedGenre(this.configForm.controls['selectedGenre'].value);
      this.gameService.selectedGenre.subscribe(selectedGenre => this.genre = selectedGenre);

      this.gameService.updateSelectedDifficulty(this.configForm.controls['selectedDifficulty'].value);
      this.gameService.selectedDifficulty.subscribe(selectedDifficulty => this.difficulty = selectedDifficulty);

      this.configured = true;
    }


  }

  exit(): void {
    this.router.navigateByUrl('/');
  }

  toggleInfo(): void {
    this.infoShown = !this.infoShown;
  }

}
