const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    address: String,
    gstNumber: String,
    creditLimit: {
        type: Number,
        default: 0
    },
    currentBalance: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    notes: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastTransaction: {
        type: Date
    },
    tags: [String],
    customFields: {
        type: Map,
        of: String
    }
});

// Index for faster searching
customerSchema.index({ name: 'text', email: 'text', phone: 'text' });

// Virtual for full address
customerSchema.virtual('fullAddress').get(function() {
    return this.address;
});

module.exports = mongoose.model('Customer', customerSchema);