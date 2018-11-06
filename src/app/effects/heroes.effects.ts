import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { HeroService } from "../services/hero.service";
import { Observable, of, defer } from "rxjs";
import { heroesActionTypes } from "../store/constants/hero.constants";
import { mergeMap, map, catchError, tap } from "rxjs/operators";
import { Action } from "@ngrx/store";
import { Load } from "../store/actions/heroes.actions";

@Injectable()
export class HeroesEffects {

  @Effect()
  loadList$: Observable<Action> = this.actions$.pipe(
    ofType<Load>(heroesActionTypes.LOAD),
    mergeMap(
      () => this.heroService.getHeroes().pipe(
        // If successful, dispatch success action with result
        map(data => ({type: heroesActionTypes.LOAD_SUCCESS, payload: data})),
        // If request fails, dispatch failed action
        catchError(_ => of({type: heroesActionTypes.LOAD_FAILED}))
      )
   )
  );

  @Effect()
  init$: Observable<Action> = defer(() => {
    return of(new Load);
  });

  constructor(
    private actions$: Actions,
    private heroService: HeroService
    ) {}
}
