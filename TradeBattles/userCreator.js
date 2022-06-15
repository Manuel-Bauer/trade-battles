// THIS FILE SHOULD BE DELETED

const {v4} = require('uuid');
const fetch = require('node-fetch');

const createUsers = async n => {
  user = [];
  for (let i = 0; i < n; i++) {
    let fullName = await fetch('https://api.namefake.com/')
      .then(res => res.json())
      .then(data => data.name);
    let givenName = await fullName.split(' ')[0];
    let familyName = await fullName.split(' ')[1];
    let email =
      givenName[0].toLowerCase() +
      familyName.toLowerCase() +
      '@dummydomain.com';
    let photo = 'https://picsum.photos/200';

    await user.push({fullName, givenName, familyName, email, photo, id: v4()});

    console.log(user);
    fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify({
        givenName: user[0].givenName,
        familyName: user[0].familyName,
        email: user[0].email,
        photo: user[0].photo,
        id: user[0].id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  return user;
};

createUsers(1);
