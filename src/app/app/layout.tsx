import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { connectDB } from '@/lib/mongoose';
import { User } from '@/lib/models/User';

export const dynamic = 'force-dynamic';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  let username = session.user.username || '';
  try {
    await connectDB();
    if (session.user.id) {
      const dbUser = await User.findById(session.user.id).select('username').lean();
      if (dbUser?.username) username = dbUser.username;
    } else if (session.user.email) {
      const dbUser = await User.findOne({ email: session.user.email }).select('username').lean();
      if (dbUser?.username) username = dbUser.username;
    }
  } catch (err) {
    console.error('Failed to load user in AppLayout:', err);
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#FAF7EE] text-[#540B0E] flex font-sans">
      {/* Fixed Sidebar */}
      <AppSidebar username={username} />

      {/* Main Content Area: Offset by sidebar width on desktop, strictly zero horizontal overflow */}
      <div className="pl-0 lg:pl-[240px] w-full h-screen overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
}
