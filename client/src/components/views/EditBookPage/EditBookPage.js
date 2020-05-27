import React, { useState } from 'react'
import {Typography, Button, Form, Input } from "antd";
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
import HomePage from '../HomePage/HomePage';

const { Title } = Typography;

const AuthorsNo = [
    { key: 1, value: "1"},
    { key: 2, value: "2"},
    { key: 3, value: "3"},
    { key: 4, value: "4"},
    { key: 5, value: "5"},
]

const Genres = [
    { key: 1, value: "Fiction"},
    { key: 2, value: "Non-Fiction"}
]

const BookStates = [
    { key: 1, value: "New"},
    { key: 2, value: "Used"}
]

function EditBookPage(props) {
    const [TitleValue, setTitleValue] = useState('')
    const [AuthorValue, setAuthorValue] = useState('')
    const [PublisherValue, setPublisherValue] = useState('')
    const [YearValue, setYearValue] = useState('')
    const [EditionValue, setEditionValue] = useState('')
    const [PriceValue, setPriceValue] = useState(0)
    const [AuthorsNoValue, setAuthorsNoValue] = useState(1)
    const [GenreValue, setGenreValue] = useState(1)
    const [BookStateValue, setBookStateValue] = useState(1)
    const [Images, setImages] = useState([])

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }
    const onAuthorChange = (event) => {
        setAuthorValue(event.currentTarget.value)
    }
    const onPublisherChange = (event) => {
        setPublisherValue(event.currentTarget.value)
    }
    const onYearChange = (event) => {
        setYearValue(event.currentTarget.value)
    }
    const onEditionChange = (event) => {
        setEditionValue(event.currentTarget.value)
    }
    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }
    const onAuthorsNoSelectChange = (event) => {
        setAuthorsNoValue(event.currentTarget.value)
    }
    const onGenreSelectChange = (event) => {
        setGenreValue(event.currentTarget.value)
    }
    const onBookStateSelectChange = (event) => {
        setBookStateValue(event.currentTarget.value)
    }
    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if(!TitleValue || !AuthorValue || !PublisherValue || !YearValue || !EditionValue || 
            !PriceValue || !AuthorsNoValue ||!GenreValue ||!BookStateValue ||!Images) {
            return alert('Fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            authorsNo: AuthorsNoValue,
            author: AuthorValue,
            publisher: PublisherValue,
            year: YearValue,
            edition: EditionValue,
            stateOfBook: BookStateValue,
            genre: GenreValue,
            images: Images,
            price: PriceValue
        }

        Axios.post('/api/book/editBook', variables)
            .then(response => {
                if(response.data.success) {
                    alert('Book Successfully Edited')
                    // edit location
                    props.history.push('/')
                } else {
                    alert('Failed to edit book')
                }
            })
    }
    return (
        <div style={{maxWidth:'700px',margin:'2rem auto' }}>
            <div style={{ textAlign:'center',marginBottom:'2rem' }}>
                <Title level={2}>Edit a book</Title>
                <hr></hr>
            </div>
            <div style={{ textAlign:'left', marginBottom:'1rem' }}>
                <Title level={4}>Please fill out all fields and make changes to those fields you wish:</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <FileUpload refreshFunction={updateImages}/>

                <br></br>
                <br></br>
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br></br>
                <br></br>
                <label>Number of authors</label>
                <select onChange={onAuthorsNoSelectChange}>
                    {AuthorsNo.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br></br>
                <br></br>
                <label>Author</label>
                <Input
                    onChange={onAuthorChange}
                    value={AuthorValue}
                />
                <br></br>
                <br></br>
                <label>Publisher</label>
                <Input
                    onChange={onPublisherChange}
                    value={PublisherValue}
                />
                <br></br>
                <br></br>
                <label>Year of publishing</label>
                <Input
                    onChange={onYearChange}
                    value={YearValue}
                />
                <br></br>
                <br></br>
                <label>Edition</label>
                <Input
                    onChange={onEditionChange}
                    value={EditionValue}
                />
                <br></br>
                <br></br>
                <label>Genre</label>
                <select onChange={onGenreSelectChange}>
                    {Genres.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                &emsp;
                &emsp;
                <label>State</label>
                <select onChange={onBookStateSelectChange}>
                    {BookStates.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br></br>
                <br></br>
                <label>Price(KM)</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type='number'
                />
                <br></br>
                <br></br>
                <Button
                    onClick={onSubmit}
                >
                    Edit book
                </Button>
                   <Button>
                <a href="javascript: history.go(-1)">Cancel</a>
                  
             </Button>
                
                
            </Form>
        </div>
    )
}



export default EditBookPage