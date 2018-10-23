import { HeroesList } from "../models/heroes-list.interface";
import { HeroesActionsUnion } from "../actions/heroes.actions";
import { heroesActionTypes } from "../constants/hero.constants";

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
        list: action.payload,
      };

    default:
      return state;
  }
}
