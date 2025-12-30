import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    isUpdated: { type: Boolean, default: false },
    parentArticleId: {type: mongoose.Schema.Types.ObjectId, ref: 'Article', default: null},
    references: { type: [String], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model('Article', ArticleSchema);
