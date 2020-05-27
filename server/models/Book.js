const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = mongoose.Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 80
    },
    authorsNo: {
        type: Number,
        default: 1
    },
    author: {
        type: String,
        maxlength: 40
    },
    publisher: {
        type: String,
        maxlength: 40
    },
    year: {
        type: String,
        maxlength: 4
    },
    edition: {
        type: String,
        maxlength: 4
    },
    genre: {
        type: Number,
        default: 1
    },
    stateOfBook: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
}, { timestamps: true })

bookSchema.index({
    title: 'text',
    author: 'text',
}, {
    weights: {
        title: 5,
        author: 1,
    }
})

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book }