import { Action } from "@ngrx/store";
import { heroesActionTypes } from "../constants/hero.constants";
import { Hero } from "src/app/class/hero";

export class Load implements Action {
  readonly type = heroesActionTypes.LOAD;
  constructor(public payload: Hero[]) {}
}

export class Add implements Action {
  readonly type = heroesActionTypes.ADD;
  constructor(public payload: Hero) {}
}

export class Delete implements Action {
  readonly type = heroesActionTypes.DELTE;
  constructor(public payload: Hero | number) {}
}

export class Update implements Action {
  readonly type = heroesActionTypes.UPDATE;
  constructor(public payload: Hero) {}
}

export type HeroesActionsUnion = Load | Add | Delete | Update;
