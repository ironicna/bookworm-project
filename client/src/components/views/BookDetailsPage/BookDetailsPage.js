import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Row, Col } from 'antd';
import BookImage from './Sections/BookImage';
import BookInfo from './Sections/BookInfo';
import { addToCart } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';

function BookDetailsPage(props) {
    
    const dispatch = useDispatch();
    const bookId = props.match.params.bookId
    const [Book, setBook] = useState([])

    useEffect(() => {
       Axios.get(`/api/book/books_by_id?id=${bookId}$type=single`)
            .then(response => {
                setBook(response.data[0])
            })
    }, [])

    const addToCartHandler = (bookId) => {
       dispatch(addToCart(bookId))
    }

    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Book.title}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24}>
                    <BookImage detail={Book} />
                </Col>
                <Col lg={12} xs={24}>
                    <BookInfo
                        addToCart={addToCartHandler}
                        detail={Book} />
                </Col>
            </Row>
        </div>
    )
}

export default BookDetailsPage
