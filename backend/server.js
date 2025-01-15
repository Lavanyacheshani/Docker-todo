const express = require('express');
const mongoose = require('mongoose');
const Todo = require('./models/Todo');
const cors = require('cors');
const User = require('./models/User');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:80'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


app.get('/', (req, res) => {
    res.send('Server is running successfully!');
});

app.post('/api/user', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.post('/api/user/login', async (req, res) => {
    try {
        const { email, pw } = req.body;
        const user = await User.findOne({ email, pw });

        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.post('/api/task', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/task/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const tasks = await Task.find({ email }).sort({ stat: 1 });

        if (!tasks.length) {
            return res.status(404).json({ message: "No tasks found" });
        }

        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.put('/api/task/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.delete('/api/task/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


mongoose.connect('mongodb://mongodb:27017/todoDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to the database!');
        app.listen(5000, () => {
            console.log('Server is running on port 5000');
        });
    })
    .catch(err => {
        console.error('Database connection failed:', err.message);
    });

