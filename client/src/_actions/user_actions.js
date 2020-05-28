import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,
    REMOVE_CART_ITEMS_USER,
    ON_SUCCESS_BUY_USER


} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function addToCart(_id){
    const request = axios.post(`${USER_SERVER}/addToCart?bookId=${_id}`)
    .then(response => response.data);

    return {
        type: ADD_TO_CART_USER,
        payload: request
    }
}

export function getCartItems(cartItems, userCart){
    const request = axios.get(`/api/book/books_by_id?id=${cartItems}&type=array`)
    .then(response => {

    //Make CartDetail in redux store to add the quantity data using also the Book collection

    userCart.forEach(cartItem => {
        response.data.forEach((bookDetail,i) => {
            if(cartItem.id===bookDetail._id){
            response.data[i].quantity = cartItem.quantity;   //getting the quantity data
            }
        })
    })
    return response.data;
});
    return {
        type: GET_CART_ITEMS_USER,
        payload: request
    }
}

export function removeCartItem(id){
    const request = axios.get(`/api/users/removeFromCart?_id=${id}`)
    .then(response => {
        response.data.cart.forEach(item => {
            response.data.cart.forEach((k,i) => {
                if (item.id === k._id){
                    response.data.cartDetail[i].quantity = item.quantity
                }
            })

        })

    return response.data;
});
    return {
        type: REMOVE_CART_ITEMS_USER,
        payload: request
    }
}

export function onSuccessBuy(data){
    const request = axios.post(`${USER_SERVER}/successBuy`, data)	
    .then(response => response.data);
    return{
        type: ON_SUCCESS_BUY_USER,
        payload: data
    }
}

