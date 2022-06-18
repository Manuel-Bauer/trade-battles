const express = require('express');
const app = express();
const router = require('./router.js');
const PORT = 3000;
const { getAllUsers } = require('./models/users.model');

app.use(express.json());
app.use(router);

getAllUsers().then((res) => console.log(res));

app.listen(PORT, () => {
  console.log(`We are in boys... http://localhost:${PORT}`);
});
