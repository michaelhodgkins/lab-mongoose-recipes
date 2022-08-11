const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


// recipe object 

// const recipeObj = {
//   title: 'ramen',
//   level: 'Easy Peasy',
//   ingredients: [ 'ramen, noodles'],
//   cuisine: 'asian',
//   dishType:'main_course',
//   image: "https://images.media-allrecipes.com/images/75131.jpg",
//   duration: 1,
//   creator: 'me',
//   created: 08082022,
// };


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  // .then(() => {
  //   Recipe.create(recipeObj)
  //   console.log(recipeObj);
  // })

    .then(() => {
      return Recipe.insertMany(data)
    })

    .then(() => {

      return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, {duration: 100 })
      .then(x => {
        console.log('Update successful');

    })
  })

    .then(() => {
      
      return Recipe.deleteOne({ title: "Carrot Cake" }, {duration: 100 })
      .then(x => {
        console.log('Success: Carrot cake has been removed');

        mongoose.connection.close();
        console.log('connection closed');

    })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });