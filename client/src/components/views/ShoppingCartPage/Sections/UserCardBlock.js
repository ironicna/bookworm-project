import React from 'react'

function UserCardBlock(props){


const renderCartImage = (images) =>{
    if(images.length >0){
        let image = images[0]
        return 'http://localhost:5000/${image}'
    }
}

const renderItems = () => (
    props.books && props.books.map(book =>(
        <tr key={book._id}>
        <td>
            <img style = {{width: '70px'}} alt="book_img" src={renderCartImage(book.images)}/>
        </td>
        <td>{book.quantity} EA</td>
        <td>$ {book.price} </td>
        <td>
            <button onClick={()=> props.removeItem(book._id)}>Remove</button>
        </td>
    </tr>
    ))
    
)


    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Produt Image</th>
                        <th>Produc Quantity</th>
                        <th>Produt Price</th>
                        <th>Remove from Cart</th>
                    
                    </tr>
                </thead>
                <tbody> 
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock