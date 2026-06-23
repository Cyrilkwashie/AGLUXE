'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader, { adminButtonPrimary, adminInputClass, adminLabelClass } from '@/components/admin/AdminHeader';
import type { HeroVideo, InstagramPost } from '@/lib/types';

export default function SettingsAdminPage() {
  const [marqueeItems, setMarqueeItems] = useState('');
  const [heroVideos, setHeroVideos] = useState<HeroVideo[]>([]);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((data) => {
        setMarqueeItems(data.marqueeItems.join('\n'));
        setHeroVideos(data.heroVideos);
        setInstagramPosts(data.instagramPosts);
      });
  }, []);

  const save = async () => {
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        marqueeItems: marqueeItems.split('\n').filter(Boolean),
        heroVideos,
        instagramPosts,
      }),
    });
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 md:p-12 max-w-3xl">
        <AdminHeader
          title="Site Settings"
          description="Edit homepage marquee text, hero videos, and Instagram gallery images."
        />

        <div className="space-y-10">
          <section>
            <label className={adminLabelClass}>Marquee Banner (one item per line)</label>
            <textarea
              className={`${adminInputClass} min-h-[160px] font-mono text-xs`}
              value={marqueeItems}
              onChange={(e) => setMarqueeItems(e.target.value)}
            />
          </section>

          <section>
            <h2 className="font-display text-xl mb-4">Hero Videos</h2>
            {heroVideos.map((v, i) => (
              <div key={i} className="border border-ag-border p-4 mb-4 space-y-3">
                <div>
                  <label className={adminLabelClass}>Video URL</label>
                  <input
                    className={adminInputClass}
                    value={v.src}
                    onChange={(e) => {
                      const next = [...heroVideos];
                      next[i] = { ...next[i], src: e.target.value };
                      setHeroVideos(next);
                    }}
                  />
                </div>
                <div>
                  <label className={adminLabelClass}>Poster Image URL</label>
                  <input
                    className={adminInputClass}
                    value={v.poster}
                    onChange={(e) => {
                      const next = [...heroVideos];
                      next[i] = { ...next[i], poster: e.target.value };
                      setHeroVideos(next);
                    }}
                  />
                </div>
              </div>
            ))}
          </section>

          <section>
            <h2 className="font-display text-xl mb-4">Instagram Gallery</h2>
            {instagramPosts.map((post, i) => (
              <div key={post.id} className="border border-ag-border p-4 mb-4 space-y-3">
                <div>
                  <label className={adminLabelClass}>Image URL</label>
                  <input
                    className={adminInputClass}
                    value={post.image}
                    onChange={(e) => {
                      const next = [...instagramPosts];
                      next[i] = { ...next[i], image: e.target.value };
                      setInstagramPosts(next);
                    }}
                  />
                </div>
                <div>
                  <label className={adminLabelClass}>Alt Text</label>
                  <input
                    className={adminInputClass}
                    value={post.alt}
                    onChange={(e) => {
                      const next = [...instagramPosts];
                      next[i] = { ...next[i], alt: e.target.value };
                      setInstagramPosts(next);
                    }}
                  />
                </div>
              </div>
            ))}
          </section>

          <button onClick={save} className={adminButtonPrimary}>
            {saved ? 'Saved ✓' : 'Save Settings'}
          </button>
        </div>
      </main>
    </div>
  );
}
