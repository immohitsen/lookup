import {
  Link01Icon,
  SparklesIcon,
  StarIcon,
  FireIcon,
  HeartIcon,
  Rocket01Icon,
  FlashIcon,
  CrownIcon,
  Compass01Icon,
  Award01Icon,
  Bookmark01Icon,
  Shield01Icon,
  MusicNote01Icon,
  Video01Icon,
  Camera01Icon,
  PodcastIcon,
  BookOpen01Icon,
  Image01Icon,
  PlayIcon,
  HeadphonesIcon,
  Mic01Icon,
  ShoppingBag01Icon,
  Store01Icon,
  CreditCardIcon,
  DollarCircleIcon,
  Briefcase01Icon,
  Tag01Icon,
  GiftIcon,
  Discount01Icon,
  Message01Icon,
  Mail01Icon,
  SendIcon,
  CallIcon,
  Location01Icon,
  Notification01Icon,
  CodeIcon,
  ComputerIcon,
  SmartPhone01Icon,
  CloudIcon,
  CpuIcon,
  Folder01Icon,
  File01Icon,
  Globe02Icon,
  UserIcon,
  Settings01Icon,
  Share01Icon,
  ArrowUpRight01Icon,
  Delete01Icon,
  Tick01Icon,
  Copy01Icon,
  EyeIcon,
  QrCodeIcon,
  Search01Icon,
  Download01Icon,
  CursorPointer01Icon,
  ChartHistogramIcon,
  Menu01Icon,
  Cancel01Icon,
  Logout01Icon,
  Wifi01Icon,
  DicesIcon,
  DashboardSquare01Icon,
  Layers01Icon,
  PaintBoardIcon,
  Calendar01Icon,
  Edit01Icon,
  UserGroupIcon,
  ArrowRight01Icon,
  Add01Icon,
} from '@hugeicons/core-free-icons';

export interface IconDefinition {
  id: string;
  name: string;
  category: 'popular' | 'media' | 'commerce' | 'social' | 'tech';
  icon: any;
}

export const HUGEICONS_CATALOG: IconDefinition[] = [
  // ── Popular & Highlights ──
  { id: 'link-01',        name: 'Link',             category: 'popular',  icon: Link01Icon },
  { id: 'sparkles',       name: 'Sparkles',         category: 'popular',  icon: SparklesIcon },
  { id: 'star',           name: 'Star',             category: 'popular',  icon: StarIcon },
  { id: 'fire',           name: 'Fire',             category: 'popular',  icon: FireIcon },
  { id: 'heart',          name: 'Heart',            category: 'popular',  icon: HeartIcon },
  { id: 'rocket',         name: 'Rocket',           category: 'popular',  icon: Rocket01Icon },
  { id: 'flash',          name: 'Lightning',        category: 'popular',  icon: FlashIcon },
  { id: 'crown',          name: 'Crown',            category: 'popular',  icon: CrownIcon },
  { id: 'award',          name: 'Award',            category: 'popular',  icon: Award01Icon },
  { id: 'bookmark',       name: 'Bookmark',         category: 'popular',  icon: Bookmark01Icon },
  { id: 'shield',         name: 'Shield',           category: 'popular',  icon: Shield01Icon },
  { id: 'compass',        name: 'Explore',          category: 'popular',  icon: Compass01Icon },

  // ── Media & Creative ──
  { id: 'music',          name: 'Music Note',       category: 'media',    icon: MusicNote01Icon },
  { id: 'headphones',     name: 'Headphones',       category: 'media',    icon: HeadphonesIcon },
  { id: 'mic',            name: 'Microphone',       category: 'media',    icon: Mic01Icon },
  { id: 'podcast',        name: 'Podcast',          category: 'media',    icon: PodcastIcon },
  { id: 'video',          name: 'Video',            category: 'media',    icon: Video01Icon },
  { id: 'play',           name: 'Play',             category: 'media',    icon: PlayIcon },
  { id: 'camera',         name: 'Camera',           category: 'media',    icon: Camera01Icon },
  { id: 'image',          name: 'Image Gallery',    category: 'media',    icon: Image01Icon },
  { id: 'book',           name: 'Book / Reading',   category: 'media',    icon: BookOpen01Icon },

  // ── Commerce & Shop ──
  { id: 'shopping-bag',   name: 'Shopping Bag',     category: 'commerce', icon: ShoppingBag01Icon },
  { id: 'store',          name: 'Store / Shop',     category: 'commerce', icon: Store01Icon },
  { id: 'credit-card',    name: 'Credit Card',      category: 'commerce', icon: CreditCardIcon },
  { id: 'dollar-circle',  name: 'Dollar / Price',   category: 'commerce', icon: DollarCircleIcon },
  { id: 'briefcase',      name: 'Briefcase / Work', category: 'commerce', icon: Briefcase01Icon },
  { id: 'tag',            name: 'Price Tag',        category: 'commerce', icon: Tag01Icon },
  { id: 'discount',       name: 'Discount / Promo', category: 'commerce', icon: Discount01Icon },
  { id: 'gift',           name: 'Gift Box',         category: 'commerce', icon: GiftIcon },

  // ── Social & Communication ──
  { id: 'message',        name: 'Message',          category: 'social',   icon: Message01Icon },
  { id: 'mail',           name: 'Email / Letter',   category: 'social',   icon: Mail01Icon },
  { id: 'send',           name: 'Send / Direct',    category: 'social',   icon: SendIcon },
  { id: 'call',           name: 'Phone / Call',     category: 'social',   icon: CallIcon },
  { id: 'location',       name: 'Location / Pin',   category: 'social',   icon: Location01Icon },
  { id: 'notification',   name: 'Bell Alert',       category: 'social',   icon: Notification01Icon },
  { id: 'globe',          name: 'Website / Globe',  category: 'social',   icon: Globe02Icon },
  { id: 'user',           name: 'Profile / Person', category: 'social',   icon: UserIcon },

  // ── Tech & Tools ──
  { id: 'code',           name: 'Code / Dev',       category: 'tech',     icon: CodeIcon },
  { id: 'computer',       name: 'Desktop / Laptop', category: 'tech',     icon: ComputerIcon },
  { id: 'smartphone',     name: 'Smartphone / App', category: 'tech',     icon: SmartPhone01Icon },
  { id: 'cloud',          name: 'Cloud Storage',    category: 'tech',     icon: CloudIcon },
  { id: 'cpu',            name: 'Chip / Hardware',  category: 'tech',     icon: CpuIcon },
  { id: 'folder',         name: 'Folder / Project', category: 'tech',     icon: Folder01Icon },
  { id: 'file',           name: 'Document / PDF',   category: 'tech',     icon: File01Icon },
  { id: 'settings',       name: 'Settings / Gear',  category: 'tech',     icon: Settings01Icon },
];

export const HUGEICONS_MAP = new Map<string, any>(
  HUGEICONS_CATALOG.map(item => [item.id, item.icon])
);

// Map common aliases to ensure legacy or short names match
HUGEICONS_MAP.set('link', Link01Icon);
HUGEICONS_MAP.set('pin', Bookmark01Icon);
HUGEICONS_MAP.set('pinned', FireIcon);
HUGEICONS_MAP.set('content', File01Icon);
HUGEICONS_MAP.set('booking', Calendar01Icon);
HUGEICONS_MAP.set('email_signup', Mail01Icon);
HUGEICONS_MAP.set('affiliate', DollarCircleIcon);

// Core UI Icons export
export const UI_ICONS = {
  Dashboard: DashboardSquare01Icon,
  PageEditor: Edit01Icon,
  Audience: UserGroupIcon,
  Links: Link01Icon,
  Insights: ChartHistogramIcon,
  Settings: Settings01Icon,
  SignOut: Logout01Icon,
  ExternalLink: ArrowUpRight01Icon,
  ChevronRight: ArrowRight01Icon,
  Share: Share01Icon,
  Add: Add01Icon,
  Delete: Delete01Icon,
  Check: Tick01Icon,
  Copy: Copy01Icon,
  Eye: EyeIcon,
  QrCode: QrCodeIcon,
  Search: Search01Icon,
  Download: Download01Icon,
  Click: CursorPointer01Icon,
  Menu: Menu01Icon,
  Close: Cancel01Icon,
  Wifi: Wifi01Icon,
  Dices: DicesIcon,
  Sparkles: SparklesIcon,
  Layers: Layers01Icon,
  User: UserIcon,
  Design: PaintBoardIcon,
  Smartphone: SmartPhone01Icon,
  Camera: Camera01Icon,
  Mail: Mail01Icon,
};
