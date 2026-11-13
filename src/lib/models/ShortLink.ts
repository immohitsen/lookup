import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IShortLink extends Document {
  userId: mongoose.Types.ObjectId;
  slug: string;
  destination: string;
  clicks: number;
  createdAt: Date;
}

const ShortLinkSchema = new Schema<IShortLink>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    destination: { type: String, required: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

export const ShortLink = models.ShortLink || model<IShortLink>('ShortLink', ShortLinkSchema);

