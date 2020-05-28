import React, { useEffect, useState, createFactory } from 'react'
import Axios from 'axios';
import { Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import { genre, stateOfBook } from './Sections/Data';
import SearchFeature from './Sections/SearchFeature';

const { Meta } = Card;

function HomePage() {

    const [Books, setBooks] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(4)
    const [PostSize, setPostSize] = useState()
    const [SearchTerms, setSearchTerms] = useState("")
    const [Filters, setFilters] = useState({
        genre: [],
        stateOfBook: []
    })

    useEffect(() => {
        
        const variables = {
            skip: Skip,
            limit: Limit,
        }

        getBooks(variables)
        
    }, [])
    
    const getBooks = (variables) => {
        Axios.post('/api/book/getBooks', variables)
             .then(response => {
                if(response.data.success) {
                    if(variables.loadMore) {
                        setBooks([...Books, ...response.data.books])
                    } else {
                        setBooks(response.data.books)
                    }
                    setPostSize(response.data.postSize) 
                } else {
                    alert('Failed to fetch book data')
                }
            })
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters,
            searchTerm: SearchTerms
        }
        getBooks(variables)
        setSkip(skip)
    }

    const renderCards = Books.map((book, index) => {

        return <Col lg={6} md={8} xs={24} style={{ background: '#A9A9A9', padding: '30px' }}>
            <Card
                hoverable={true}
                cover={<a href={`/book/${book._id}`} > <ImageSlider images={book.images} /></a>}
            >
                <Meta
                    title={`${book.title} - ${book.author}`}
                    description={`${book.price} KM`}
                />
            </Card>
        </Col>
    })
    
    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getBooks(variables)
        setSkip(0)
    }

    const handleStates = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        console.log(newFilters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        console.log(newFilters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)

        getBooks(variables)
    } 

    return (
        <div style={{ width:'75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>What book are you looking for?</h1>
                <hr></hr>
            </div>

            <div style={{ width:'75%', margin: '3rem auto' }}>
                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />
            </div>
            <CheckBox
                list={genre}
                handleFilters={filters => handleFilters(filters, "genre")}
                listica={stateOfBook}
                handleStates={filters => handleStates(filters, "stateOfBook")}
            />                 


            <br></br>
            {Books.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No books yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>
                </div>
            }
            <br></br>
            {PostSize >= Limit && 
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore}>Load More</button>
                </div>
            }
        </div>
    )
}

export default HomePage
