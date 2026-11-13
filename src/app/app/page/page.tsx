'use client';
import { useEffect, useState, useCallback, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { toast } from 'react-hot-toast';
import { SortableLinkItem } from '@/components/editor/SortableLinkItem';
import { AddBlockModal } from '@/components/editor/AddBlockModal';
import { PhonePreview } from '@/components/editor/PhonePreview';
import { HeaderEditor } from '@/components/editor/HeaderEditor';
import { DesignEditor } from '@/components/editor/DesignEditor';
import { ShareModal } from '@/components/editor/ShareModal';
import { CustomColorsConfig } from '@/components/public/LinkBlock';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Layers01Icon,
  UserIcon,
  PaintBoardIcon,
  Share01Icon,
  Add01Icon,
  EyeIcon,
  Tick01Icon,
  Loading01Icon,
  AlertCircleIcon,
} from '@hugeicons/core-free-icons';

interface LinkItem {
  _id: string;
  type: string;
  title: string;
  url: string;
  isPinned: boolean;
  isActive: boolean;
  icon: string;
  thumbnail: string;
  config: Record<string, unknown>;
  clicks: number;
  order: number;
}

interface ProfileState {
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  themeId: string;
  bgType?: string;
  customColors?: CustomColorsConfig;
  socialPosition?: 'top' | 'bottom';
  socialLinks?: Record<string, string>;
}

type TabType = 'content' | 'header' | 'design';
type SaveState = 'idle' | 'saving' | 'saved' | 'error';

function PageEditorContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as TabType | null;

  const [activeTab, setActiveTab] = useState<TabType>('content');

  useEffect(() => {
    if (tabParam && ['content', 'header', 'design'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [profile, setProfile] = useState<ProfileState | null>(null);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );

  useEffect(() => {
    Promise.all([
      fetch('/api/links').then(r => r.json()),
      fetch('/api/user/profile').then(r => r.json()),
    ])
      .then(([linksData, profileData]) => {
        setLinks(Array.isArray(linksData) ? linksData : []);
        setProfile(profileData);
      })
      .catch(() => toast.error('Failed to load profile data'))
      .finally(() => setLoading(false));
  }, []);

  // Debounced profile saver
  const debouncedSaveProfile = useCallback((updated: Partial<ProfileState>) => {
    setSaveState('saving');
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/user/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated),
        });
        if (!res.ok) throw new Error('Save failed');
        setSaveState('saved');
        setTimeout(() => setSaveState('idle'), 2500);
      } catch {
        setSaveState('error');
        toast.error('Failed to save changes');
      }
    }, 600);
  }, []);

  function handleUpdateProfile(updates: Partial<ProfileState>) {
    setProfile(prev => {
      if (!prev) return null;
      const next = { ...prev, ...updates };
      debouncedSaveProfile(updates);
      return next;
    });
  }

  const saveOrder = useCallback(async (newLinks: LinkItem[]) => {
    setSaveState('saving');
    try {
      await fetch('/api/links/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: newLinks.map(l => l._id) }),
      });
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 2000);
    } catch {
      setSaveState('error');
      toast.error('Failed to save link order');
    }
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = links.findIndex(l => l._id === active.id);
    const newIdx = links.findIndex(l => l._id === over.id);
    const reordered = arrayMove(links, oldIdx, newIdx);
    setLinks(reordered);
    saveOrder(reordered);
  }

  async function handleAddLink(data: Omit<LinkItem, '_id' | 'clicks' | 'order'>) {
    setSaveState('saving');
    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const newLink = await res.json();
      setLinks(prev => [...prev, newLink]);
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 2000);
      toast.success('Block added!');
    } catch {
      setSaveState('error');
      toast.error('Failed to add block');
    }
    setAddOpen(false);
  }

  async function handleUpdateLink(id: string, data: Partial<LinkItem>) {
    setSaveState('saving');
    try {
      const res = await fetch(`/api/links/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const updated = await res.json();
      setLinks(prev => prev.map(l => (l._id === id ? updated : l)));
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 2000);
    } catch {
      setSaveState('error');
      toast.error('Failed to update block');
    }
  }

  async function handleDeleteLink(id: string) {
    if (!confirm('Are you sure you want to delete this block?')) return;
    try {
      await fetch(`/api/links/${id}`, { method: 'DELETE' });
      setLinks(prev => prev.filter(l => l._id !== id));
      toast.success('Deleted block.');
    } catch {
      toast.error('Failed to delete block');
    }
  }

  return (
    <div className="h-full w-full flex flex-col font-sans overflow-hidden bg-[#FAF7EE]">
      {/* ── Fixed Top Navigation Bar ── */}
      <header className="h-16 flex-shrink-0 bg-white border-b border-[#540B0E]/10 px-4 sm:px-8 flex items-center justify-between z-30 select-none">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 ml-10 lg:ml-0">
          {(
            [
              { id: 'content', label: 'Content', icon: Layers01Icon },
              { id: 'header',  label: 'Header',  icon: UserIcon },
              { id: 'design',  label: 'Design',  icon: PaintBoardIcon },
            ] as const
          ).map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowMobilePreview(false);
                }}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#540B0E] text-[#FFF3B0] shadow-sm'
                    : 'text-[#766050] hover:text-[#540B0E] hover:bg-[#FAF7EE]'
                }`}
              >
                <HugeiconsIcon icon={tab.icon} size={17} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Toolbar Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Save Status Pill */}
          <div className="hidden sm:flex items-center">
            {saveState === 'saving' && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-[#766050] bg-[#FAF7EE] px-3 py-1 rounded-full border border-[#540B0E]/10">
                <HugeiconsIcon icon={Loading01Icon} size={14} className="animate-spin text-[#E09F3E]" />
                Saving...
              </span>
            )}
            {saveState === 'saved' && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <HugeiconsIcon icon={Tick01Icon} size={14} />
                Saved
              </span>
            )}
            {saveState === 'error' && (
              <span className="flex items-center gap-1.5 text-xs font-bold text-[#9E2A2B] bg-[#9E2A2B]/10 px-3 py-1 rounded-full">
                <HugeiconsIcon icon={AlertCircleIcon} size={14} />
                Save Failed
              </span>
            )}
          </div>

          {/* Mobile Preview Toggle */}
          <button
            type="button"
            onClick={() => setShowMobilePreview(!showMobilePreview)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#540B0E]/15 text-xs font-bold text-[#540B0E] bg-white hover:bg-[#FAF7EE] transition-all cursor-pointer"
          >
            <HugeiconsIcon icon={EyeIcon} size={15} />
            <span>{showMobilePreview ? 'Editor' : 'Preview'}</span>
          </button>

          {/* Share Button */}
          {profile && (
            <button
              type="button"
              onClick={() => setShareOpen(true)}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#230E01] bg-[#E09F3E] hover:brightness-105 active:scale-95 shadow-sm transition-all cursor-pointer"
            >
              <HugeiconsIcon icon={Share01Icon} size={16} />
              <span>Share</span>
            </button>
          )}
        </div>
      </header>

      {/* ── Dual-Pane Workspace ── */}
      <div className="flex-1 flex overflow-hidden w-full relative">
        {/* ── Left Settings Panel (Independently Scrollable) ── */}
        <div
          className={`flex-1 h-full overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 flex justify-center ${
            showMobilePreview ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <div className="w-full max-w-2xl space-y-6 pb-24">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-28 text-[#766050] space-y-3">
                <HugeiconsIcon icon={Loading01Icon} size={32} className="animate-spin text-[#E09F3E]" />
                <p className="text-sm font-medium">Loading workspace...</p>
              </div>
            ) : profile ? (
              <>
                {/* 1. CONTENT TAB */}
                {activeTab === 'content' && (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#540B0E]/10 shadow-sm space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-[#540B0E]/10">
                      <div>
                        <h2 className="text-2xl font-black text-[#540B0E] tracking-tight">Content</h2>
                        <p className="text-xs text-[#766050] mt-0.5">
                          Add and reorder custom destinations, pinned features, and newsletter blocks.
                        </p>
                      </div>
                      <Button size="sm" onClick={() => setAddOpen(true)}>
                        <HugeiconsIcon icon={Add01Icon} size={16} />
                        <span>Add Block</span>
                      </Button>
                    </div>

                    {/* Links List */}
                    <div className="space-y-3">
                      {links.length === 0 ? (
                        <div className="py-14 text-center space-y-3">
                          <EmptyState
                            title="NO BLOCKS YET"
                            description="Add your first link block, pinned highlight, or email newsletter."
                            action={
                              <Button size="sm" onClick={() => setAddOpen(true)}>
                                <HugeiconsIcon icon={Add01Icon} size={15} /> Add First Block
                              </Button>
                            }
                          />
                        </div>
                      ) : (
                        <DndContext
                          sensors={sensors}
                          collisionDetection={closestCenter}
                          onDragEnd={handleDragEnd}
                        >
                          <SortableContext
                            items={links.map(l => l._id)}
                            strategy={verticalListSortingStrategy}
                          >
                            <div className="space-y-3">
                              {links.map(link => (
                                <SortableLinkItem
                                  key={link._id}
                                  link={link}
                                  onUpdate={handleUpdateLink}
                                  onDelete={handleDeleteLink}
                                />
                              ))}
                            </div>
                          </SortableContext>
                        </DndContext>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. HEADER TAB */}
                {activeTab === 'header' && (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#540B0E]/10 shadow-sm">
                    <HeaderEditor
                      name={profile.name}
                      username={profile.username}
                      bio={profile.bio}
                      avatarUrl={profile.avatarUrl}
                      socialPosition={profile.socialPosition || 'top'}
                      socialLinks={profile.socialLinks || {}}
                      onChangeProfile={handleUpdateProfile}
                    />
                  </div>
                )}

                {/* 3. DESIGN TAB */}
                {activeTab === 'design' && (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#540B0E]/10 shadow-sm">
                    <DesignEditor
                      themeId={profile.themeId}
                      bgType={profile.bgType}
                      customColors={profile.customColors}
                      onChangeTheme={themeId => handleUpdateProfile({ themeId })}
                      onChangeBgType={bgType => handleUpdateProfile({ bgType })}
                      onChangeCustomColors={colors => handleUpdateProfile({ customColors: colors })}
                    />
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>

        {/* ── Right Phone Preview Panel (Permanently Fixed in Viewport) ── */}
        <aside
          className={`w-full lg:w-[410px] xl:w-[450px] h-full flex-shrink-0 border-l border-[#540B0E]/10 bg-[#FAF7EE] flex items-center justify-center p-6 select-none overflow-hidden ${
            showMobilePreview ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {profile && (
            <PhonePreview
              username={profile.username}
              themeId={profile.themeId}
              name={profile.name}
              bio={profile.bio}
              avatarUrl={profile.avatarUrl}
              bgType={profile.bgType}
              customColors={profile.customColors}
              socialPosition={profile.socialPosition || 'top'}
              socialLinks={profile.socialLinks || {}}
              links={links}
            />
          )}
        </aside>
      </div>

      {/* ── Modals ── */}
      <AddBlockModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAddLink} />
      {profile && (
        <ShareModal
          open={shareOpen}
          onClose={() => setShareOpen(false)}
          username={profile.username}
        />
      )}
    </div>
  );
}

export default function PageEditor() {
  return (
    <Suspense
      fallback={
        <div className="h-full w-full flex items-center justify-center bg-[#FAF7EE] text-[#766050] gap-3">
          <HugeiconsIcon icon={Loading01Icon} size={28} className="animate-spin text-[#E09F3E]" />
          <span className="text-sm font-semibold">Loading editor...</span>
        </div>
      }
    >
      <PageEditorContent />
    </Suspense>
  );
}
