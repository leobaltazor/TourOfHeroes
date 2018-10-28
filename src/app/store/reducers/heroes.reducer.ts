import { HeroesList } from "../models/heroes-list.interface";
import { HeroesActionsUnion } from "../actions/heroes.actions";
import { heroesActionTypes } from "../constants/hero.constants";
import { Hero } from "src/app/class/hero";

const initialState: HeroesList = {
  list: []
};

export function heroesReducer(
  state: HeroesList = initialState,
  action: HeroesActionsUnion
) {
  switch (action.type) {
    case heroesActionTypes.LOAD:
      return {
        ...state,
        list: action.payload
      };
    case heroesActionTypes.ADD:
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    case heroesActionTypes.DELTE:
      return {
        ...state,
        list: state.list.filter((h: Hero) => h !== action.payload)
      };
    case heroesActionTypes.UPDATE:
      return {
        ...state,
        list: state.list.map(
          (h: Hero) => (h.id !== action.payload.id ? h : action.payload)
        )
      };

    default:
      return state;
  }
}
