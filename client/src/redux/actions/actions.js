import {
  SET_DISHES,
  SET_PROMOS,
  SET_SHOPPING_CART,
  SET_CATEGORIES,
  SET_FILTERING,
  ORDER_BY,
  GET_NAME,
  POST_USER,
  RESET,
} from "./types";
import axios from "axios";

// ? ----------------------------- Set Dishes

export function setDishes() {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/products");
      const data = await response.json();
      dispatch({
        type: SET_DISHES,
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching dishes: ", error);
    }
  };
}

// ? ----------------------------- Set Promos

export const setPromos = (payload) => ({
  type: SET_PROMOS,
  payload,
});

// ? ----------------------------- Set Shopping Cart

export const setShoppingCart = (payload) => ({
  type: SET_SHOPPING_CART,
  payload,
});

// ? ----------------------------- Filter By

export const orderBy = (payload) => {
  return {
    type: ORDER_BY,
    payload,
  };
};

// ? ----------------------------- Filter By

export function getByName(name) {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:3001/products?name=${name}`
      );
      if (!response.ok) {
        throw new Error("No hay ningún plato en el menu con ese nombre");
      }
      const data = await response.json();
      dispatch({
        type: GET_NAME,
        payload: data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
}

// ? ---------------------------------------------- Reset

export const resetDishes = () => {
  return {
    type: RESET,
  };
};

// ? ----------------------------- Set Categories

export function setCategories() {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "http://localhost:3001/filter/default/default/default"
      );
      const data = await response.json();
      dispatch({
        type: SET_CATEGORIES,
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };
}

// ? ----------------------------- Set filtering

export function setFiltering(category) {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:3001/filter/${category}/default/default`
      );
      const data = await response.json();
      dispatch({
        type: SET_FILTERING,
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };
}

// ? ----------------------------- Post Users

export function postUsers(payload) {
	return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/users",
				payload
        );
        dispatch({
          type: POST_USER,
          payload: response.data,
        });
        console.log(payload)
		} catch (error) {
			console.error("Tienes un error en: ", error);
		}
	};
}