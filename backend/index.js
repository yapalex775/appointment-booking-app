const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/offices', require('./routes/offices'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
