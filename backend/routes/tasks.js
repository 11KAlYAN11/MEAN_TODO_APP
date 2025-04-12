const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET tasks with filtering
router.get('/', async (req, res) => {
    const { filter } = req.query;
    let query = {};
    
    if (filter === 'active') query.completed = false;
    if (filter === 'completed') query.completed = true;
    
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
});

// Toggle task completion
router.patch('/:id/toggle', async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    task.completed = !task.completed;
    await task.save();
    res.json(task);
});

// ADD task
router.post('/', async (req, res) => {
    const newTask = new Task({ title: req.body.title });
    const savedTask = await newTask.save();
    res.json(savedTask);
});

// DELETE task
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

module.exports = router;
