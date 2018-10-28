import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Hero } from "../../class/hero";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { HeroService } from "../../services/hero.service";
import { store } from "@angular/core/src/render3/instructions";
import { Store } from "@ngrx/store";
import { HeroesList } from "src/app/store/models/heroes-list.interface";
import { heroesActionTypes } from "src/app/store/constants/hero.constants";
import { AppStore } from "src/app/store/models/app-store.interface";

@Component({
  selector: "app-hero-detail",
  templateUrl: "./hero-detail.component.html",
  styleUrls: ["./hero-detail.component.css"]
})
export class HeroDetailComponent implements OnInit, OnChanges {
  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private store: Store<AppStore>
  ) {}
  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => {
      this.store.dispatch({
        type: heroesActionTypes.UPDATE,
        payload: this.hero
      });
      this.goBack();
    });
  }
  goBack(): void {
    this.location.back();
  }
  ngOnInit() {
    console.log("OnInit");
    const id = +this.route.snapshot.paramMap.get("id");
    this.store
      .select(state => state.heroes.list.find(h => h.id === id))
      .subscribe(hero => {
        this.hero = { ...hero };
      });
  }
  ngOnChanges() {
    console.log("OnChanges");
  }
}
