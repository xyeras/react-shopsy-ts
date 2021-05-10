import React, { createContext, useState, useReducer } from 'react';
import instance from '../api/apiConfig';

// Initialize a default state for our app
const initialState = {
  products: [],
  cart: [],
  product: undefined,
  getProducts: () => {},
  getSingleProduct: () => {},
  addToCart: () => {}
};

// Create our global reducer
// reducer is a function that allows us to handle and update state
/*
 - reducer will take an initial state
 - will receive an action declaration
 - will look to update our state based on the desired action
 - will return our updated state
 - our reducer takes two parameters
  - first is our initialState so we can update it accordingly
  - second param is action object that gets
  - passed into dispatch({type:'some_action', payload: 'some data'})
*/
const appReducer = (state: any, action: any) => {
  //   debugger;
  switch (action.type) {
    case 'GET_PRODUCTS':
      // when case matches, return will update state for us
      return { ...state, products: action.payload };
    case 'GET_SINGLE_PRODUCT':
      // when case matches, bind payload to product property in state
      return { ...state, product: action.payload };
    case 'ADD_TO_CART':
      let _cart = state.cart;
      _cart.push(action.payload);
      return { ...state, cart: _cart };
    default:
      return state;
  }
};

// Create Context from react
export const GlobalContext = createContext<InitialStateType>(initialState);

// Create Global provider which will feed state to our components
export const GlobalProvider: React.FC = ({ children }) => {
  // useReducer is a react hook, to access and
  // update our state in our reducer function
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getProducts = async () => {
    try {
      let { data } = await instance.get('/products');
      // when case matches, rreturn will update state for us
      dispatch({ type: 'GET_PRODUCTS', payload: data });
    } catch (e) {
      console.log(e);
    }
  };

  const getSingleProduct = async (productId:number) => {
    try {
      let { data } = await instance.get(`/products/${productId}`)
      console.log(data);
      dispatch({type: 'GET_SINGLE_PRODUCT', payload: data});
    } catch (e) {
      console.log(e);
    }
  };

  const addToCart = (product: Product) => {
    // receive a product that we can then move into our cart array
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <GlobalContext.Provider
      value={{
        products: state.products,
        cart: state.cart,
        product: state.product,
        getProducts,
        getSingleProduct,
        addToCart
      }}>
      {children} {/* <AppRouter/> */}
    </GlobalContext.Provider>
  );
};