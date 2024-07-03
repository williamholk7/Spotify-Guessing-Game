import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import fetchFromSpotify, { request } from "../../services/api";
import { GamestateService } from "../gamestate.service";
import { Router } from "@angular/router";
import { StringIterator } from "lodash";

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {

  genres: String[] = ["House", "Alternative", "J-Rock", "R&B"];
  selectedGenre: String = "";
  authLoading: boolean = false;
  configLoading: boolean = false;
  token: String = "";
  configureSidebarShown: boolean = false;
  genre: string = '';
  gameMode: string = '';
  infoShown: boolean = false;
  error: boolean = false;

  private userName: string = "";

  homeForm: FormGroup = new FormGroup({
    selectedName: new FormControl<string>('',
      [Validators.required,
      Validators.minLength(1),
      ]),
    selectedGameMode: new FormControl<string>('', [
      Validators.required,
    ]),

  });

  constructor(private gameService: GamestateService, private router: Router) { }

  ngOnInit(): void {
    this.gameService.selectedGenre.subscribe(selectedGenre => this.genre = selectedGenre);
  }

  toggleConfigureButton(): void {
    this.configureSidebarShown = !this.configureSidebarShown;
    console.log(this.configureSidebarShown)
  }

  toggleInfoButton(): void {
    this.infoShown = !this.infoShown;
  }

  startPlaying(): void {
    this.gameService.updateSelectedUser(this.homeForm.controls['selectedName'].value);
    this.gameService.selectedUser.subscribe(selectedUser => this.userName = selectedUser);
    this.gameService.updateSelectedGameMode(this.homeForm.controls['selectedGameMode'].value);
    this.gameService.selectedGameMode.subscribe(selectedGameMode => this.gameMode = selectedGameMode);

    if (!this.gameMode || this.userName.length < 1) {
      this.error = true;
    } else {
      this.error = false;
      if (!this.genre) {
        this.gameService.updateSelectedGenre("Rock");
      }
  
      switch (this.gameMode) {
        case "Game Mode 1":
          this.router.navigateByUrl('/gamemodeone');
          break;
        case "Game Mode 2":
          this.router.navigateByUrl('/gamemodetwo');
          break;
        case "Game Mode 3":
          this.router.navigateByUrl('/gamemodethree');
          break;
      }
    }
    
  }

}
