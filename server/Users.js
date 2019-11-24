const User = require('./model/user');
var mongoose = require("mongoose");
// const url = 'mongodb://localhost:27017/quickchat';
// const connect = mongoose.connect(url);


const users = [];

const addUser = async ({ id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // console.log('hi');
    // connect.then((db) => {
    //     console.log('Connected correctly to server');
    
    //     User.create({ 
    //         name: name
    //     }).then((user) => {
    //         console.log(user);
    //         return 
    //     })
    // })     

    // const entry = new User({username: name})
    // await entry.save();

    var schema = new Schema({ name: String });
    var Page = mongoose.model('Page', schema);
    var p = new Page({ name: name });
    console.log(p);


    const existingUser = users.find(user => user.name === name && user.room === room)

    if(existingUser) {
        return { error: 'Username is taken'}
    }

    const user = { id, name, room};

    users.push(user);

    return { user}
}
 
const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);
    
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom};