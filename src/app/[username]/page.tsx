import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/mongoose';
import { User } from '@/lib/models/User';
import { Link as LinkModel } from '@/lib/models/Link';
import { PublicBioPage } from '@/components/public/PublicBioPage';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface Props { params: Promise<{ username: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  await connectDB();
  const user = await User.findOne({ username: username.toLowerCase() }).lean();
  if (!user) return { title: 'Not Found' };
  
  const pageTitle = user.seoTitle || user.name || user.username;
  const pageDesc = user.seoDescription || user.bio || `Explore ${user.name || user.username}'s links and creative portfolio on Lookup.`;

  return {
    title: `${pageTitle} | Lookup`,
    description: pageDesc,
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      images: user.avatarUrl ? [user.avatarUrl] : [],
    },
  };
}

export default async function UserPage({ params }: Props) {
  const { username } = await params;
  await connectDB();
  const user = await User.findOne({ username: username.toLowerCase() }).lean();
  if (!user) notFound();

  const now = new Date();
  const rawLinks = await LinkModel.find({ userId: user._id, isActive: true })
    .sort({ isPinned: -1, order: 1 })
    .lean();

  // Filter out scheduled links that are outside their live window
  const links = rawLinks.filter(l => {
    if (l.scheduledStart && new Date(l.scheduledStart) > now) return false;
    if (l.scheduledEnd && new Date(l.scheduledEnd) < now) return false;
    return true;
  });

  const socialLinksRaw = user.socialLinks;
  const socialLinks: Record<string, string> =
    socialLinksRaw instanceof Map
      ? Object.fromEntries(socialLinksRaw)
      : typeof socialLinksRaw === 'object' && socialLinksRaw !== null
      ? (socialLinksRaw as Record<string, string>)
      : {};

  return (
    <PublicBioPage
      user={{
        id: String(user._id),
        username: user.username,
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
        themeId: user.themeId,
        fontId: user.fontId,
        bgType: user.bgType,
        customColors: user.customColors,
        socialPosition: user.socialPosition ?? 'top',
        socialLinks,
      }}
      links={links.map(l => ({
        id: String(l._id),
        type: l.type,
        title: l.title,
        url: l.url,
        isPinned: l.isPinned,
        icon: l.icon,
        thumbnail: l.thumbnail,
        config: l.config,
      }))}
    />
  );
}
