const mongoose = require('mongoose');
const Schema = mongoose.Schema;

main().then(() => {
    console.log('Connected Successfully')
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/authtestapp');

}

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    age: Number,
});

module.exports = mongoose.model('user', userSchema);