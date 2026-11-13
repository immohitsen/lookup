import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  themeId: string;
  fontId: string;
  bgType: string;
  seoTitle?: string;
  seoDescription?: string;
  customColors?: {
    bg?: string;
    button?: string;
    text?: string;
    buttonStyle?: 'solid' | 'outline' | 'glass';
    layoutStyle?: 'stack' | 'bento' | 'editorial';
    cardGlow?: boolean;
    proBadge?: boolean;
    interfaceStyle?: string;
  };
  socialPosition?: 'top' | 'bottom';
  socialLinks: Record<string, string>;
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
    themeId: { type: String, default: 'bordeaux-honey' },
    fontId: { type: String, default: 'plus-jakarta' },
    bgType: { type: String, default: 'solid' },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    customColors: {
      bg: { type: String, default: '' },
      button: { type: String, default: '' },
      text: { type: String, default: '' },
      buttonStyle: { type: String, enum: ['solid', 'outline', 'glass'], default: 'solid' },
      layoutStyle: { type: String, enum: ['stack', 'bento', 'editorial'], default: 'stack' },
      cardGlow: { type: Boolean, default: false },
      proBadge: { type: Boolean, default: false },
      interfaceStyle: { type: String, default: 'standard' },
    },
    socialPosition: { type: String, enum: ['top', 'bottom'], default: 'top' },
    socialLinks: {
      type: Map,
      of: String,
      default: {},
    },
  },
  { timestamps: true }
);

export const User = models.User || model<IUser>('User', UserSchema);
