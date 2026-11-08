import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IEvent extends Document {
  userId: mongoose.Types.ObjectId;
  linkId?: mongoose.Types.ObjectId;
  type: 'page_view' | 'link_click';
  source: 'instagram' | 'tiktok' | 'youtube' | 'direct' | 'other';
  sessionId: string;
  country: string;
  device: 'mobile' | 'desktop' | 'tablet';
  createdAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    linkId: { type: Schema.Types.ObjectId, ref: 'Link', index: true },
    type: { type: String, enum: ['page_view', 'link_click'], required: true },
    source: {
      type: String,
      enum: ['instagram', 'tiktok', 'youtube', 'direct', 'other'],
      default: 'direct',
    },
    sessionId: { type: String, default: '' },
    country: { type: String, default: '' },
    device: { type: String, enum: ['mobile', 'desktop', 'tablet'], default: 'mobile' },
  },
  { timestamps: true, versionKey: false }
);

// Index for dashboard queries
EventSchema.index({ userId: 1, createdAt: -1 });
EventSchema.index({ userId: 1, type: 1, createdAt: -1 });

export const Event = models.Event || model<IEvent>('Event', EventSchema);
