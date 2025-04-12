const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    dueDate: {  // New field
        type: Date,
        default: null,
        validate: {
            validator: function(value) {
                return !value || value > new Date(); // Optional but must be future
            },
            message: 'Due date must be in the future'
        }
    }
}, { timestamps: true }); // Adds createdAt/updatedAt automatically