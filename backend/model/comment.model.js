import mongoose from "mongoose";

// Comment Schema
const commentSchema = new mongoose.Schema({
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',  // Reference to the Lead model
    required: [true, 'Lead reference is required'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SalesAgent',  // Reference to the SalesAgent who authored the comment
    required: [true, 'Author is required'],
  },
  commentText: {
    type: String,
    required: [true, 'Comment text is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically set the creation time
  }
});

export default mongoose.model('Comment', commentSchema);
