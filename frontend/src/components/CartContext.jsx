import { createContext, useReducer, useContext } from "react";

// Create Context
const CartContext = createContext();

// Initial State
const initialState = {
  cart: [],
};

// Reducer Function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };

    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };

    default:
      return state;
  }
};

// Context Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart: state.cart, cartDispatch: dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to Use Cart
export const useCart = () => {
  return useContext(CartContext);
};
