import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Hero } from "src/app/class/hero";
import { debounceTime, switchMap, distinctUntilChanged } from "rxjs/operators";
import { HeroService } from "src/app/services/hero.service";
import { Store } from "@ngrx/store";
import { HeroesList } from "src/app/store/models/heroes-list.interface";

@Component({
  selector: "app-hero-search",
  templateUrl: "./hero-search.component.html",
  styleUrls: ["./hero-search.component.css"]
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroService: HeroService,
    private store: Store<HeroesList>
  ) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      // switchMap((term: string) => this.heroService.searchHeroes(term))
      switchMap((term: string) =>
        this.store.select((state: HeroesList) => {
          if (!term.trim()) {
            // if not search term, return empty hero array.
            return [];
          }
          return state.heroes.list.filter((h: Hero) =>
            h.name.toLowerCase().indexOf(terms.toLowerCase() > 0)
          );
        })
      )
    );
  }
}
