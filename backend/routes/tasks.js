const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET tasks with filtering
router.get('/', async (req, res) => {
    const { filter } = req.query;
    let query = {};
    
    if (filter === 'active') query.completed = false;
    if (filter === 'completed') query.completed = true;
    
    let tasks = await Task.find(query).sort({ createdAt: -1 });
    // Convert dates to ISO strings
    tasks = tasks.map(task => ({
      ...task._doc,
      dueDate: task.dueDate ? task.dueDate.toISOString() : null
    }));
    console.log('Returning tasks:', tasks);
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

// Modified POST endpoint
router.post('/', async (req, res) => {
    const newTask = new Task({ 
        title: req.body.title,
        dueDate: req.body.dueDate || null 
    });
    await newTask.save();
    res.status(201).json(newTask);
});

// DELETE task
router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

// New endpoint for date filtering
router.get('/upcoming', async (req, res) => {
    const tasks = await Task.find({ 
        completed: false,
        dueDate: { $ne: null, $gt: new Date() }
    }).sort({ dueDate: 1 }); // Sort by nearest due date
    res.json(tasks);
});

module.exports = router;
