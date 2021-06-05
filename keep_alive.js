const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('musical era is Alive!'));

app.listen(port, () => console.log(`musical era is listening to http://localhost:${port}`));