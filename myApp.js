require('dotenv').config();

let mongoose = require('mongoose');
let { Schema } = mongoose;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

let personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: {
    type: [String],
    required: true
  }
})

let Person = mongoose.model('Person', personSchema);


const createAndSavePerson = (done) => {
  let john = new Person({
    name: "John",
    age: 30,
    favoriteFoods: ["pizza", "burrito"]
  })
  john.save((err, data) => {
    if (!err) {
      done(null, data);
    }
  })
};

let arrayOfPeople = [
  {
    name: "John",
    age: 30,
    favoriteFoods: ["pizza", "burrito"]
  },
  {
    name: "Mary",
    age: 25,
    favoriteFoods: ["pizza", "burrito"]

  },
  {
    name: "Bob",
    age: 40,
    favoriteFoods: ["pizza", "burrito"]
  }
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    !err ? done(null, data) : console.log(err);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    !err ? done(null, data) : console.log(err);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    !err ? done(null, data) : console.log(err);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    !err ? done(null, data) : console.log(err);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, data) => {
    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => {
      !err ? done(null, data) : console.log(err);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, data) => {
    !err ? done(null, data) : console.log(err);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    !err ? done(null, data) : console.log(err);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
