const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    name: {type: String, required: true},
    complete: {type: Boolean, required: true}, 
    creator: {type: String, required: true},
})

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;