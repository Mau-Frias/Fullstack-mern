import app from './app.js';
import connectDB from './connectDB.js';

connectDB();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    console.log('interact with the API at http://localhost:3000/api/users');
});