import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Howl, Howler } from 'howler';
import fetchFromSpotify, { request } from "../../services/api";
import { GamestateService } from '../gamestate.service';
import { Router } from '@angular/router';

// const AUTH_ENDPOINT =
// A Spotify token is needed to pull data from the Spotify API.
  
// const TOKEN_KEY = 
// A token key is needed to pull data from the Spotify API.

@Component({
  selector: 'app-gamemode-one',
  templateUrl: './gamemode-one.component.html',
  styleUrls: ['./gamemode-one.component.css']
})
export class GamemodeOneComponent implements OnInit {

  constructor(private gameService: GamestateService, private router: Router) { }

  authLoading: boolean = false;
  configLoading: boolean = false;
  token: String = "";
  playlist: String = "";
  genre: string = "";
  tracks: Array<any> = [];
  sound: any = undefined
  correctSongName: string = '';
  songOptions: string[] = [];
  entered: boolean = false;
  questionCounter: number = 1;
  score: number = 0;
  difficulty: string = '';
  audioLength: number = 0;
  pointValue: number = 0;
  albumSource: string = '';
  playing: boolean = false;
  addedPoints: number = 0;
  error: boolean = false;

  songForm: FormGroup = new FormGroup({
    selectedSong: new FormControl<string>('',
      [Validators.required,])
  });

  ngOnInit(): void {
    this.gameService.selectedGenre.subscribe(selectedGenre => this.genre = selectedGenre);
    switch (this.genre) {
      case "Rock":
        this.playlist = "7HduMTWBaKJmMKcinwX9xL";
        break;
      case "Pop":
        this.playlist = "37i9dQZF1EQncLwOalG3K7"
        break;
      case "Rap":
        this.playlist = "2xT3ZPE51ewIFa3dLLpkSa"
        break;
      default:
        this.playlist = "7HduMTWBaKJmMKcinwX9xL";
        this.genre = 'Rock';
        this.gameService.updateSelectedGenre(this.genre);
    }

    this.gameService.selectedDifficulty.subscribe(selectedDifficulty => this.difficulty = selectedDifficulty);
    switch (this.difficulty) {
      case "Easy":
        this.audioLength = 9000;
        this.pointValue = 10;
        break;
      case "Medium":
        this.audioLength = 5000;
        this.pointValue = 20;
        break;
      case "Hard":
        this.audioLength = 2000;
        this.pointValue = 30;
        break;
      default:
        this.audioLength = 9000;
        this.pointValue = 10;
    }


    this.authLoading = true;
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        this.authLoading = false;
        this.token = storedToken.value;
        this.loadPlaylist(storedToken.value);
        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      this.authLoading = false;
      this.token = newToken.value;
      this.loadPlaylist(newToken.value);
    });

  }

  getRandom(upper: number) {
    return Math.floor(Math.random() * upper);
  }

  shuffle(arr: string[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = this.getRandom(i + 1);

      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  loadPlaylist = async (t: any) => {
    this.configLoading = true;
    const response = await fetchFromSpotify({
      token: t,
      endpoint: `playlists/${this.playlist}`,
    });
    this.tracks = response.tracks.items;
    this.configLoading = false;
    let randIndex = this.getRandom(this.tracks.length);
    if (this.tracks[randIndex].track['preview_url']) {
      this.loadSong(randIndex);
      this.correctSongName = this.tracks[randIndex].track['name'];
      this.albumSource = this.tracks[randIndex].track['album'].images[0].url;
      this.tracks.splice(randIndex, 1);
    } else {
      this.tracks.splice(randIndex, 1);
      this.newSong();
    }
    this.newOptions();
  }

  loadSong(index: number): void {
    this.sound = new Howl({
      src: [`${this.tracks[index].track['preview_url']}`],
      format: ['mp3']
    });
  }

  newSong(): void {
    let randIndex = this.getRandom(this.tracks.length);
    if (this.tracks[randIndex].track['preview_url']) {
      this.loadSong(randIndex);
      this.correctSongName = this.tracks[randIndex].track['name'];
      this.albumSource = this.tracks[randIndex].track['album'].images[0].url;
      this.tracks.splice(randIndex, 1);
    } else {
      this.tracks.splice(randIndex, 1);
      this.newSong();
    }
  }

  newOptions(): void {
    this.songOptions = [];
    this.songOptions.push(this.correctSongName);
    while (this.songOptions.length < 4) {
      let randIndex = this.getRandom(this.tracks.length);
      let songName = this.tracks[randIndex].track['name'];
      if (!this.songOptions.includes(songName)) {
        this.songOptions.push(songName);
      }
    }
    this.songOptions = this.shuffle(this.songOptions);
  }

  nextQuestion(): void {
    if (this.sound.playing()) {
      this.sound.stop();
      this.playing = false;
    }
    if (this.questionCounter === 10) {
      this.gameService.updateFinalScore(this.score);
      this.router.navigateByUrl("/results");
    } else {
      this.newSong();
      this.newOptions();
      this.entered = !this.entered;
      this.questionCounter++;
    }
  }

  enter(): void {
    if (!this.songOptions.includes(this.songForm.controls['selectedSong'].value)) {
      this.error = true;
    } else {
      this.error = false;
      this.addedPoints = 0;
      if (this.sound.playing()) {
        this.sound.stop();
        this.playing = false;
      }
      this.entered = !this.entered;
      if (this.songForm.controls['selectedSong'].value === this.correctSongName) {
        this.score += this.pointValue;
        this.addedPoints += this.pointValue;
      }
    }
  }

  playOrPauseAudio() {
    if (this.sound.playing()) {
      this.sound.stop();
      this.playing = false;
    } else {
      this.sound.play();
      this.playing = true;
      setTimeout(() => {
        this.sound.stop();
        this.playing = false;
      }, this.audioLength);
    }
  }

}
