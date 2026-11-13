import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface ISubscriber extends Document {
  userId: mongoose.Types.ObjectId;
  email: string;
  source: string;
  createdAt: Date;
}

const SubscriberSchema = new Schema<ISubscriber>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    source: { type: String, default: 'direct' },
  },
  { timestamps: true, versionKey: false }
);

SubscriberSchema.index({ userId: 1, email: 1 }, { unique: true });

export const Subscriber = models.Subscriber || model<ISubscriber>('Subscriber', SubscriberSchema);

