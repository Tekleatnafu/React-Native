const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const COLLECTION_NAME = 'Owners';

const mongo = new MongoClient(url);
let db;

exports.connectDB = async () => {
  try {
    const client = await mongo.connect();
    db = client.db('RestaurantManagement');
    console.log('Conneciton is successful.');
  } catch (error) {}
};

exports.addOwner = (owner) => {
  return new Promise((resolve, reject) => {
    db.collection(COLLECTION_NAME)
      .insertOne(owner)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
exports.getOwnerByOwnername = (name) => {
  return new Promise((resolve, reject) => {
    db.collection(COLLECTION_NAME)
      .findOne({ name })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

/////////////////////////////////////
exports.addFood = (name, food) => {
  return new Promise((resolve, reject) => {
    db.collection(COLLECTION_NAME)
      .updateOne({ name: name }, { $push: { foods: food } })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};
exports.getAllFoods = (name) => {
  return new Promise((resolve, reject) => {
    db.collection(COLLECTION_NAME)
      .findOne({ name: name })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

exports.getAllOwners = () => {
  return new Promise((resolve, reject) => {
    db.collection(COLLECTION_NAME)
      .find()
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

exports.deleteFood = (name, foodName) => {
  return new Promise((resolve, reject) => {
    db.collection(COLLECTION_NAME)
      .updateOne({ name: name }, { $pull: { foods: { name: foodName } } })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

exports.editFood = async (ownerName, fname, food) => {
  return new Promise((resolve, reject) => {
    db.collection(COLLECTION_NAME)
      .updateOne(
        { name: ownerName },
        { $set: { 'foods.$[o]': food } },
        { arrayFilters: [{ 'o.name': fname }] }
      )
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
};
////////////////////////////////////////////////////
exports.addNote = (name, food) => {
  return new Promise((resolve, reject) => {
    db.collection(COLLECTION_NAME)
      .updateOne({ name: name }, { $push: { notes: food } })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

exports.getAllNotes = (name) => {
  return new Promise((resolve, reject) => {
    db.collection(COLLECTION_NAME)
      .findOne({ name: name })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

exports.deleteNote = (name, header) => {
  return new Promise((resolve, reject) => {
    db.collection(COLLECTION_NAME)
      .updateOne({ name: name }, { $pull: { notes: { header: header } } })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

exports.editFood = async (ownerName, fname, food) => {
  return new Promise((resolve, reject) => {
    db.collection(COLLECTION_NAME)
      .updateOne(
        { name: ownerName },
        { $set: { 'foods.$[o]': food } },
        { arrayFilters: [{ 'o.name': fname }] }
      )
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
};

// function User(name, age) {
//   this.name = name;
//   this.age = age;

//   this.getProfile = function () {
//     // Outer function context
//     console.log(this.constructor.name); //User
//     return () => {
//       // Inner function context
//       console.log(this.prototype.name); // User(Get it from the outer context)
//       console.log("I'm " + this.name + ', ' + this.age + ' yrs old');
//     };
//   };
// }

// let user = new User('John', 25);
// let profile = user.getProfile();
// profile(); //I'm John, 25 yrs old
