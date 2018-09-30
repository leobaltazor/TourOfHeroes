import { Component, OnInit, NgModule } from "@angular/core";
import { Hero } from "../../class/hero";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: "windstorm"
  };
  constructor() {}

  ngOnInit() {}
}
