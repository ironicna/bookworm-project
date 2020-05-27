import React, { useEffect, useState } from 'react'
import {useDispatch } from 'react-redux'
import {getCartItems, removeCartItem} from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import { Result, Empty } from 'antd';

function ShoppingCartPage(props) {
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        //creating cartItems array to store book ids as items in the cart
        let cartItems = [];
        if(props.user.userData && props.user.userData.cart){
            if(props.user.userData.cart.length > 0){
              props.user.userData.cart.forEach(item => {
                  cartItems.push(item.id)
                  
              });  
            dispatch(getCartItems(cartItems, props.user.userData.cart)) //to show on Redux the cart information we use dispatch

            }
        }

    }, [props.user.userData])

    //calculate total amount to pay including duplicated items 

    useEffect(() => {
        if(props.user.cartDetail && props.user.cartDetail.length > 0){
            calculateTotal(props.user.cartDetail)
        }
    },[props.user.cartDetail])

    const calculateTotal = (cartDetail) => {
        let total = 0;
        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity           
        });
        setTotal(total)
        setShowTotal(true)
    }

    //remove item from cart
    const removeFromCart = (bookID) => {
        dispatch(removeCartItem(bookID))
        .then(() => {

            /* Axios.get('/api/users/userCartInfo')
                .then(response => {
                    if(response.data.success) {
                            if(response.data.cartDetail.length <= 0){
                                setShowTotal(false)
                            }else {
                                calculateTotal(response.data.cartDetail)
                            }
                    }else {
                        alert('Failed to get cart info')
                    }
                })
                */

            if(props.user.cartDetail.length <= 0) {
                setShowTotal(false)
            }else {
                calculateTotal(props.user.cartDetail)
            }
        })
    }

    
    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <h1>My Cart</h1>
        <div>
            <UserCardBlock
                books={props.user.cartDetail}
            
            />

           

        {ShowTotal? 
         <div style={{marginTop:'3rem' }}>
         <h2>Total amount: ${Total} </h2>
         </div>
        :
        ShowSuccess? 
         <Result
            status="success"
            title="Successfully purchased books!"
         />:
         <div style={{width:'100%', display:'flex', flexDirection: 'column', justifyContent: 'center'}}>
             <br />
            <Empty description={false}/>
            <p>No items in the cart</p>
          </div>
        }       
        </div>            
        </div>
    )
}

export default ShoppingCartPage
