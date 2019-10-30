// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Lesson = require('.../models/Lesson');
const bcryptSalt = 10;

mongoose
  .connect('mongodb://heroku_d7xld3w3:dnlgr8q8v8uk6al59ulmoqr3ee@ds237588.mlab.com:37588/heroku_d7xld3w3', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });




let users = [
  {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
    firstname: 'Alice',
    lastname: 'Primosch'
  },
  {
    username: "bob",
    password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
    firstname: 'Bob',
    lastname: 'Lepceig'
  }
]

let lessons = [
  { lesson_name: "Tennis",
    lesson_duration:40,
    lesson_location: "Ingolstadt",
    lesson_price: 45,
    lesson_equip: "Tennis Racket and shoes",
    lesson_language:"German",
    lesson_amountPeople: 4,
    lesson_eMailTeacher: "primosch@mediamarktsaturn.com",
    lesson_aboutTeacher: "Hi, I am a professional Tennis teacher. I am looking forward to our future lessons.",
    lesson_pictureURL: "https://www.radiowroclaw.pl/img/articles/88000/bL2oZ3Q0dX.jpg"
  },
  { lesson_name: "Harfe",
    lesson_duration:120,
    lesson_location: "Regensburg",
    lesson_price: 90,
    lesson_equip: "Harfe",
    lesson_language:"Englisch",
    lesson_amountPeople: 2,
    lesson_eMailTeacher: "vahrens@mediamarktsaturn.com",
    lesson_aboutTeacher: "I am a musician and i like to play the harp.",
    lesson_pictureURL: "https://www.musikschule-hochsauerlandkreis.de/wp-content/uploads/2019/01/Dorothea-Bach-300x200.jpeg"
  },
  { lesson_name: "Tennis",
    lesson_duration:80,
    lesson_location: "Ingolstadt",
    lesson_price: 80,
    lesson_equip: "Tennis Racket and shoes",
    lesson_language:"German",
    lesson_amountPeople: 4,
    lesson_eMailTeacher: "primosch@mediamarktsaturn.com",
    lesson_aboutTeacher: "Hi, I am a professional tennis teacher. I am looking forward to our future lessons.",
    lesson_pictureURL: "https://www.delraytennis.com/wp-content/uploads/sites/2829/2014/10/Jeff-Bingo-GM-of-Racquet-Sports-in-Delray-Beach-Florida-1024x753.jpg"
  },
  { lesson_name: "Tennis",
    lesson_duration:60,
    lesson_location: "München",
    lesson_price: 60,
    lesson_equip: "Tennis Racket and shoes",
    lesson_language:"German",
    lesson_amountPeople: 4,
    lesson_eMailTeacher: "primosch@mediamarktsaturn.com",
    lesson_aboutTeacher: "Hi, I am a tennis teacher and I want to find new talents.",
    lesson_pictureURL: "https://www.narcity.com/u/2019/08/12/c13c40d1834455b69bc45fc3cfa5d9dd.png_1200x630.png"
  },
  { lesson_name: "Skateboard",
    lesson_duration:60,
    lesson_location: "Pfaffenhofen an der Ilm",
    lesson_price: 100,
    lesson_equip: "Skateboard",
    lesson_language:"German",
    lesson_amountPeople: 2,
    lesson_eMailTeacher: "verdang@mediamarktsaturn.com",
    lesson_aboutTeacher: "I am a skateboard teacher, hang loose"
  },
  { lesson_name: "Soccer",
    lesson_duration:120,
    lesson_location: "Wolnzach",
    lesson_price: 75,
    lesson_equip: "Soccer Shoes",
    lesson_language:"German",
    lesson_amountPeople: 20,
    lesson_eMailTeacher: "verdang@mediamarktsaturn.com",
    lesson_aboutTeacher: "I am a semi-pro soccer trainer and I want to find new talents"
  },
  { lesson_name: "Harfe",
    lesson_duration:240,
    lesson_location: "Regensburg",
    lesson_price: 145,
    lesson_equip: "Harfe",
    lesson_language:"Englisch",
    lesson_amountPeople: 1,
    lesson_eMailTeacher: "vahrens@mediamarktsaturn.com",
    lesson_aboutTeacher: "I am a musician and i like to play the harp."
  },
  { lesson_name: "Athletics - running",
    lesson_duration:85,
    lesson_location: "Wolnzach",
    lesson_price: 100,
    lesson_equip: "Running shoes",
    lesson_language:"French",
    lesson_amountPeople: 5,
    lesson_eMailTeacher: "verdang@mediamarktsaturn.com",
    lesson_aboutTeacher: "I am a marathoni and i want other people to join"
  },
  { lesson_name: "Athletics - pentathlon",
    lesson_duration:200,
    lesson_location: "Wolnzach",
    lesson_price: 250,
    lesson_equip: "Sport shoes",
    lesson_language:"German",
    lesson_amountPeople: 4,
    lesson_eMailTeacher: "verdang@mediamarktsaturn.com",
    lesson_aboutTeacher: "1 athletics sport is not enough - join the pentathlon team"
  },
  { lesson_name: "Excel Basics",
    lesson_duration:120,
    lesson_location: "Ingolstadt",
    lesson_price: 190,
    lesson_equip: "Laptop with MS-Excel",
    lesson_language:"German",
    lesson_amountPeople: 18,
    lesson_eMailTeacher: "verdang@mediamarktsaturn.com",
    lesson_aboutTeacher: "I am an excel expert, i will teach you fun with cells and columns "
  },
  { lesson_name: "Excel Expert",
    lesson_duration:180,
    lesson_location: "Ingolstadt",
    lesson_price: 350,
    lesson_equip: "Laptop with MS-Excel",
    lesson_language:"German",
    lesson_amountPeople: 12,
    lesson_eMailTeacher: "verdang@mediamarktsaturn.com",
    lesson_aboutTeacher: "I am an excel expert, and with my expert courses you will be an excel pro"
  },
  { lesson_name: "Painting",
    lesson_duration:15,
    lesson_location: "Muenchen",
    lesson_price: 900,
    lesson_equip: "Nothing special",
    lesson_language:"German",
    lesson_amountPeople: 1,
    lesson_eMailTeacher: "xyz@mediamarktsaturn.com",
    lesson_aboutTeacher: "I am a passionate painter and i can teach you how to do lovely paintings"
  },
  { lesson_name: "Painting",
    lesson_duration:150,
    lesson_location: "Muenchen",
    lesson_price: 1750,
    lesson_equip: "Paint box",
    lesson_language:"Englisch",
    lesson_amountPeople: 1,
    lesson_eMailTeacher: "abc@mediamarktsaturn.com",
    lesson_aboutTeacher: "I am a passionate painter and i can teach you how to do professional paintings"
  }

]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})

Lesson.create(lessons)
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})