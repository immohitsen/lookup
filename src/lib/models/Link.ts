import mongoose, { Schema, model, models, Document } from 'mongoose';

export type LinkType =
  | 'link'
  | 'pinned'
  | 'content'
  | 'booking'
  | 'email_signup'
  | 'affiliate'
  | 'social_icons';

export interface ILink extends Document {
  userId: mongoose.Types.ObjectId;
  type: LinkType;
  title: string;
  url: string;
  order: number;
  isPinned: boolean;
  isActive: boolean;
  icon: string;
  thumbnail: string;
  config: Record<string, unknown>;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

const LinkSchema = new Schema<ILink>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: {
      type: String,
      enum: ['link', 'pinned', 'content', 'booking', 'email_signup', 'affiliate', 'social_icons'],
      default: 'link',
    },
    title: { type: String, required: true, trim: true },
    url: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isPinned: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    icon: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    config: { type: Schema.Types.Mixed, default: {} },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Link = models.Link || model<ILink>('Link', LinkSchema);
