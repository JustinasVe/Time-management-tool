const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 8000;

app.listen(PORT, () => console.log(`Express server is runnig on PORT: ${PORT}`));