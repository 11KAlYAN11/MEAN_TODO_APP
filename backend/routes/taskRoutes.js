const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Middleware to extract userId (for demonstration purposes, assuming userId is passed in headers)
router.use((req, res, next) => {
    req.userId = req.headers['user-id'] === 'default' ? 'default' : req.headers['user-id']; // Handle 'default' user as a string
    next();
});

// Create a new task
router.post('/', async (req, res) => {
    try {
        const { title, dueDate } = req.body;
        const task = new Task({ title, dueDate, userId: req.userId });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an existing task
router.put('/:id', async (req, res) => {
    try {
        const { title, completed, dueDate } = req.body; // Include dueDate
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, completed, dueDate },
            { new: true }
        );
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Toggle task completion
router.patch('/:id/toggle', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        task.completed = !task.completed;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all tasks for the logged-in user
router.get('/', async (req, res) => {
    try {
        const filter = req.query.filter || 'all';
        let query = { userId: req.userId };

        if (filter === 'active') query.completed = false;
        if (filter === 'completed') query.completed = true;

        const tasks = await Task.find(query);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get upcoming tasks
router.get('/upcoming', async (req, res) => {
    try {
        const today = new Date();
        const tasks = await Task.find({ dueDate: { $gte: today } });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;