import { Component, OnInit } from "@angular/core";
import { Hero } from "../../class/hero";
import { HeroService } from "../../services/hero.service";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }
  getHeroes() {
    // this.heroes = this.heroService.getHeroes();
    this.heroService.getHeroes().subscribe((heroes: Hero[]) => {
      this.heroes = heroes;
    });
  }
  delete(hero: Hero): void {
    this.heroService.deleteHero(hero).subscribe(
      _ => {
        this.heroes = this.heroes.filter(h => h !== hero);
      }
    );
  }
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe(hero => {
      this.heroes.push(hero);
    });
  }
}
