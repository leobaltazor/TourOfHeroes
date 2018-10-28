import { Component, OnInit } from "@angular/core";
import { Hero } from "../../class/hero";
import { HeroService } from "../../services/hero.service";
import { Store } from "@ngrx/store";
import { HeroesList } from "src/app/store/models/heroes-list.interface";
import { heroesActionTypes } from "src/app/store/constants/hero.constants";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(
    private heroService: HeroService,
    private store: Store<HeroesList>
  ) {}

  ngOnInit() {
    this.store
      .select(store => store.heroes.list)
      .subscribe((value: Hero[]) => (this.heroes = value));
  }
  delete(hero: Hero): void {
    this.heroService.deleteHero(hero).subscribe(_ => {
      this.store.dispatch({
        type: heroesActionTypes.DELTE,
        payload: hero
      });
    });
  }
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      this.store.dispatch({
        type: heroesActionTypes.ADD,
        payload: hero
      });
    });
  }
}
