import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  themeId: string;
  fontId: string;
  bgType: 'solid' | 'dither' | 'tiled';
  socialLinks: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true, minlength: 3, maxlength: 30 },
    name: { type: String, default: '' },
    bio: { type: String, default: '', maxlength: 160 },
    avatarUrl: { type: String, default: '' },
    themeId: { type: String, default: 'default' },
    fontId: { type: String, default: 'press-start' },
    bgType: { type: String, enum: ['solid', 'dither', 'tiled'], default: 'solid' },
    socialLinks: {
      instagram: String,
      tiktok: String,
      youtube: String,
      twitter: String,
      linkedin: String,
      github: String,
    },
  },
  { timestamps: true }
);

export const User = models.User || model<IUser>('User', UserSchema);
