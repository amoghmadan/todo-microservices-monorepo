const { Schema, model } = require('mongoose');

const TaskSchema = new Schema(
    {
        userId: { type: Number, required: true },
        userEmail: { type: String, required: true },
        userFullName: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, enum: ['TODO', 'IN_PROGRESS', 'DONE'], default: 'TODO' },
    },
    {
        timestamps: true
    },
);

module.exports = model('Task', TaskSchema);
