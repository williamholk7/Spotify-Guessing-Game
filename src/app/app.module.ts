import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ConfigureComponent } from './configure/configure.component';
import { GamemodeOneComponent } from './gamemode-one/gamemode-one.component';
import { ResultsComponent } from './results/results.component';
import { InputComponent } from './input/input.component';
import { GamemodeTwoComponent } from './gamemode-two/gamemode-two.component';
import { GamemodeThreeComponent } from './gamemode-three/gamemode-three.component';

const routes: Routes = [{ path: "", component: HomeComponent },
{path: "leaderboard", component: LeaderboardComponent},
{path: "configure", component: ConfigureComponent},
{path: "gamemodeone", component: GamemodeOneComponent},
{path: "results", component: ResultsComponent},
{path: "gamemodetwo", component: GamemodeTwoComponent},
{path: "gamemodethree", component: GamemodeThreeComponent}
];

@NgModule({
  declarations: [AppComponent, HomeComponent, LeaderboardComponent, ConfigureComponent, GamemodeOneComponent, ResultsComponent, InputComponent, GamemodeTwoComponent, GamemodeThreeComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
