import { Component, OnInit } from "@angular/core";
import { HeroService } from "../../services/hero.service";
import { Hero } from "../../class/hero";
import { Store } from "@ngrx/store";
import { HeroesList } from "src/app/store/models/heroes-list.interface";
import { AppStore } from "src/app/store/models/app-store.interface";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private store: Store<AppStore>
  ) {}

  ngOnInit() {
    this.store
      .select((state: AppStore) => state.heroes.list)
      .subscribe((hero: Hero[]) => {
        this.heroes = hero.slice(0, 4);
      });
  }
}
