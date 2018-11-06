import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { HeroesList } from "./store/models/heroes-list.interface";
import { heroesActionTypes } from "./store/constants/hero.constants";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "TourOfHeroes";

  constructor(
    private store: Store<HeroesList>
  ) {}

  ngOnInit(): void {
    this.store
      .select("heroes")
      .subscribe((value: HeroesList) => console.log("value"));
    // this.getHeroes();
  }

  // getHeroes(): void {
  //   this.store.dispatch({
  //     type: heroesActionTypes.LOAD
  //   });
  // }
}
