import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Hero } from "../../class/hero";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { HeroService } from "../../services/hero.service";

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
    private location: Location
  ) {}
  goBack(): void {
    this.location.back();
  }
  ngOnInit() {
    console.log("OnInit");
    const id = +this.route.snapshot.paramMap.get("id");
    this.heroService.getHero(id).subscribe(hero => (this.hero = hero));
  }
  ngOnChanges() {
    console.log("OnChanges");
  }
}
