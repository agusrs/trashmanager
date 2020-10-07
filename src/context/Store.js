import React from "react";
const { createContext, useReducer } = React;

const initialState = {
    data: [
        {
            lat: "x",
            long: "y",
            calle_nombre: 'Av Callao',
            calle_altura: '7523'
        },
        {
            lat: "x",
            long: "y",
            calle_nombre: 'Corrientes',
            calle_altura: '2000'
        },
        {
            lat: "x",
            long: "y",
            calle_nombre: 'Santa fe',
            calle_altura: '1800'
        },
        {
            lat: "x",
            long: "y",
            calle_nombre: 'Carlos Pellegrini',
            calle_altura: '900'
        },
        {
            lat: "x",
            long: "y",
            calle_nombre: 'Mitre',
            calle_altura: '3020'
        },
        {
            lat: "x",
            long: "y",
            calle_nombre: 'Pueyrredon',
            calle_altura: '4300'
        },
        {
            lat: "x",
            long: "y",
            calle_nombre: 'Rio negro',
            calle_altura: '1460'
        },
        {
            lat: "x",
            long: "y",
            calle_nombre: 'Tucuman',
            calle_altura: '2300'
        },
        {
            lat: "x",
            long: "y",
            calle_nombre: 'Rosales',
            calle_altura: '300'
        }
    ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return { ...state };
    }
  }
};



export const StoreContext = createContext({
  state: initialState,
  dispatch: () => {},
});


export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const store = { state, dispatch };


  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default { StoreContext, StoreProvider };
