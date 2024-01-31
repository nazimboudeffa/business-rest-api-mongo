import mongoose from 'mongoose';

const IdeaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
})

let IdeaModel = mongoose.model('Idea', IdeaSchema);

export default IdeaModel;