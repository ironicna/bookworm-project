import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';

function BookInfo(props) {

    const [Book, setBook] = useState({})

    useEffect(() => {

        setBook(props.detail)

    }, [props.detail])

    const addToCarthandler = () => {
        props.addToCart(props.detail._id)
    }


    return (
        <div>
            <Descriptions title="Book Info">
                <Descriptions.Item label="Author">{Book.author}</Descriptions.Item>
                <Descriptions.Item label="Publisher">{Book.publisher}</Descriptions.Item>
                <Descriptions.Item label="Price"> {Book.price}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round"
                    onClick={addToCarthandler}
                >
                    Add to Cart
                    </Button>
            </div>
        </div>
    )
}

export default BookInfo
