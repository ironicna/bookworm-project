import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';

const { Meta } = Card;

function HomePage() {

    const [Books, setBooks] = useState([])

    useEffect(() => {
        Axios.post('/api/book/getBooks')
            .then(response => {
                if(response.data.success) {
                    setBooks(response.data.books)
                } else {
                    alert('Failed to fetch book data')
                }
            })
    }, [])
    
    const renderCards = Books.map((book, index) => {

        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/book/${book._id}`} > <ImageSlider images={book.images} /></a>}
            >
                <Meta
                    title={book.title}
                    description={`${book.price} KM`}
                />
            </Card>
        </Col>
    })
    
    return (
        <div style={{ width:'75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>What book are you looking for?</h1>
                <hr></hr>
            </div>


            {Books.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No books yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16,16]}>
                        {renderCards}
                    </Row>
                </div>
            }
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button>Load More</button>
            </div>



        </div>
    )
}

export default HomePage
