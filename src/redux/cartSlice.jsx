// import { createSlice } from "@reduxjs/toolkit";

// const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers : {
//         addToCart(state, action){
//             state.push(action.payload)
//         },
//         deleteFromCart(state,action){
//             return state.filter(item => item.id != action.payload.id);
//         }
//     }
// })

// export const {addToCart, deleteFromCart} = cartSlice.actions;

// export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers : {
        addToCart(state, action){
            const { id, quantity  } = action.payload;
            const existingItem = state.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity ++;
            } else {
                state.push({ ...action.payload, quantity: 1 });
                const newState = [...state]
                localStorage.setItem('cart', JSON.stringify(newState));
                
            }
        },
        deleteFromCart(state, action){
            return state.filter(item => item.id !== action.payload.id);
        },
        //get quantity each product
       

        //incrementQuantity
        incrementQuantity(state, action){
            const { id } = action.payload;
            const existingItem = state.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
            }
        },
        //decrementQuantity
        decrementQuantity(state, action){
            const { id } = action.payload;
            const existingItem = state.find(item => item.id === id);
            if (existingItem) {
                if(existingItem.quantity > 1)
                    existingItem.quantity--
                
            }
        }

    }
});

export const { addToCart, deleteFromCart,incrementQuantity,decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
