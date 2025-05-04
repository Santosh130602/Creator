import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  url: String,
  source: String,
  reports: [
    {
      reason: String,
      reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      date: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

export default mongoose.model('Content', contentSchema);
