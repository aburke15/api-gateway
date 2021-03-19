const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('hello, world');
});

app.use('/api/auth', require('./routes/auth.js'));

console.log(`app is listening on port: ${port}`);
app.listen(port);