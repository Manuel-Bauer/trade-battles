import express from 'express';
const app = express();
const router = require('./router.ts');
const PORT = 3000;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`We are in boys... http://localhost:${PORT}`);
});