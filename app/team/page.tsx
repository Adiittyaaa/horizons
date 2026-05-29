'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/navigation';

export default function TeamPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [ownerName, setOwnerName] = useState("Aditya Pandey");
  const [invitedMembers, setInvitedMembers] = useState<any[]>([]);

  // Modal state
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Viewer');
  const [isInviting, setIsInviting] = useState(false);
  const [inviteStatus, setInviteStatus] = useState<{ type: 'success' | 'error' | null; text: string }>({ type: null, text: '' });

  // Remove member state
  const [removingEmail, setRemovingEmail] = useState<string | null>(null);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState<string | null>(null);

  // Role change dropdown
  const [editingRole, setEditingRole] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Fetch owner name from settings
  useEffect(() => {
    if (!user || !user.email) return;

    const fetchSettings = async () => {
      try {
        const res = await fetch(`/api/settings?email=${encodeURIComponent(user.email)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.name) setOwnerName(data.name);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, [user]);

  // Fetch invited members
  useEffect(() => {
    if (!user || !user.email) return;

    const fetchTeam = async () => {
      try {
        const res = await fetch(`/api/team/invite?email=${encodeURIComponent(user.email)}`);
        if (res.ok) {
          const data = await res.json();
          setInvitedMembers(data.members || []);
        }
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    };

    fetchTeam();
  }, [user]);

  // Generate avatar initials dynamically
  const getInitials = (nameStr: string) => {
    if (!nameStr) return "AP";
    const parts = nameStr.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + (parts[1][0] || '')).toUpperCase().substring(0, 2);
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  const handleInvite = async () => {
    if (!user?.email || !inviteEmail) return;
    setIsInviting(true);
    setInviteStatus({ type: null, text: '' });

    try {
      const res = await fetch('/api/team/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ownerEmail: user.email,
          inviteEmail: inviteEmail.trim(),
          inviteRole,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setInvitedMembers(prev => [...prev, data.member]);
        setInviteStatus({ type: 'success', text: `Invitation sent to ${inviteEmail}!` });
        setInviteEmail('');
        setTimeout(() => {
          setShowInviteModal(false);
          setInviteStatus({ type: null, text: '' });
        }, 2000);
      } else {
        setInviteStatus({ type: 'error', text: data.error || 'Failed to send invitation.' });
      }
    } catch (error) {
      setInviteStatus({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsInviting(false);
    }
  };

  const handleRemoveMember = async (memberEmail: string) => {
    if (!user?.email) return;
    setRemovingEmail(memberEmail);

    try {
      const res = await fetch('/api/team/invite', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerEmail: user.email, memberEmail }),
      });

      if (res.ok) {
        setInvitedMembers(prev => prev.filter(m => m.email !== memberEmail));
      }
    } catch (error) {
      console.error('Error removing member:', error);
    } finally {
      setRemovingEmail(null);
      setShowRemoveConfirm(null);
    }
  };

  const defaultMembers = [
    { name: "Sarah Chen", email: "sarah@horizons.ai", role: "Analyst", status: "Active", avatar: "SC" },
    { name: "Marcus Thorne", email: "marcus@horizons.ai", role: "Viewer", status: "Active", avatar: "MT" },
  ];

  const allMembers = [
    { name: ownerName, email: user?.email || "aditya@horizons.ai", role: "Owner", status: "Active", avatar: getInitials(ownerName), isOwner: true },
    ...defaultMembers.map(m => ({ ...m, isOwner: false })),
    ...invitedMembers.map(m => ({
      name: m.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
      email: m.email,
      role: m.role,
      status: m.status || 'Invited',
      avatar: getInitials(m.email.split('@')[0]),
      isOwner: false,
      isInvited: true,
    })),
  ];

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-2 border-primary/20 rounded-full"></div>
          <div className="w-20 h-20 border-t-2 border-primary rounded-full animate-spin absolute top-0 left-0"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary animate-pulse">groups</span>
          </div>
        </div>
        <div className="mt-8 font-label-mono text-label-mono text-outline uppercase tracking-[0.2em] animate-pulse">Loading Team...</div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md antialiased selection:bg-secondary selection:text-on-secondary">
      <Navbar />
      <main className="flex-grow w-full max-w-container-max mx-auto px-4 md:px-gutter py-8 md:py-xl pt-24 lg:pt-32 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <Sidebar />

        <div className="lg:col-span-9 flex flex-col gap-lg">
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-secondary font-label-mono text-label-mono uppercase tracking-widest mb-2">
                <span className="material-symbols-outlined text-[18px]">groups</span>
                Workspace
              </div>
              <h1 className="font-display-xl text-display-xl text-primary tracking-tight">
                Team Management
              </h1>
              <p className="font-body-md text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
                Collaborate on conversion intelligence. Invite analysts to review reports and developers to implement friction fixes.
              </p>
            </div>
            <button
              onClick={() => {
                if (!user?.isPro) {
                  router.push('/upgrade');
                  return;
                }
                setShowInviteModal(true);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 ${
                !user?.isPro
                  ? "bg-surface-container-high text-on-surface-variant cursor-pointer border border-outline-variant hover:bg-surface-container-low"
                  : "bg-primary text-on-primary hover:opacity-90"
              }`}
            >
              <span className="material-symbols-outlined">person_add</span>
              {!user?.isPro ? 'Upgrade to Invite' : 'Invite Member'}
            </button>
          </header>

          {/* Pro Lock Message for Free Users */}
          {!user?.isPro && (
            <div className="p-lg rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center gap-4">
              <span className="material-symbols-outlined text-secondary">info</span>
              <div className="flex-grow">
                <p className="font-body-sm text-on-surface">
                  <strong>Team collaboration is a Pro feature.</strong> You are currently on the Trial plan. Upgrade to invite your team and share insights across your organization.
                </p>
              </div>
              <Link href="/upgrade" className="font-bold text-secondary hover:underline whitespace-nowrap">Upgrade Now</Link>
            </div>
          )}

          {/* Team Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Members', value: allMembers.length, icon: 'group' },
              { label: 'Active', value: allMembers.filter(m => m.status === 'Active').length, icon: 'check_circle', color: 'text-green-500' },
              { label: 'Pending', value: allMembers.filter(m => m.status === 'Invited').length, icon: 'schedule', color: 'text-amber-500' },
              { label: 'Seats Available', value: user?.isPro ? Math.max(0, 10 - allMembers.length) : 0, icon: 'event_seat' },
            ].map((stat) => (
              <div key={stat.label} className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-4 text-center">
                <span className={`material-symbols-outlined text-lg ${stat.color || 'text-outline'} mb-1`}>{stat.icon}</span>
                <div className="text-2xl font-bold text-on-surface">{stat.value}</div>
                <div className="text-[10px] font-label-mono text-outline uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          <section className="bg-surface-container-lowest border border-outline-variant rounded-[2.5rem] shadow-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50 border-b border-outline-variant">
                  <th className="px-lg py-lg font-label-mono text-[10px] text-outline uppercase tracking-widest">Member</th>
                  <th className="px-lg py-lg font-label-mono text-[10px] text-outline uppercase tracking-widest">Role</th>
                  <th className="px-lg py-lg font-label-mono text-[10px] text-outline uppercase tracking-widest">Status</th>
                  <th className="px-lg py-lg font-label-mono text-[10px] text-outline uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allMembers.map((member) => (
                  <tr key={member.email} className="border-b border-outline-variant/30 hover:bg-surface-container-low/20 transition-colors">
                    <td className="px-lg py-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${
                          member.isOwner
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'bg-secondary/10 text-secondary border border-secondary/20'
                        }`}>
                          {member.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">{member.name}</p>
                          <p className="text-xs text-on-surface-variant">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-lg py-lg relative">
                      {member.isOwner ? (
                        <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-label-mono uppercase tracking-widest text-primary font-bold">
                          Owner
                        </span>
                      ) : (
                        <div className="relative">
                          <button
                            onClick={() => setEditingRole(editingRole === member.email ? null : member.email)}
                            className="px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant text-[10px] font-label-mono uppercase tracking-widest hover:border-secondary transition-colors cursor-pointer flex items-center gap-1"
                          >
                            {member.role}
                            <span className="material-symbols-outlined text-[12px]">expand_more</span>
                          </button>
                          {editingRole === member.email && (
                            <div className="absolute top-full left-0 mt-1 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl z-20 min-w-[120px] overflow-hidden">
                              {['Analyst', 'Viewer', 'Admin'].map(role => (
                                <button
                                  key={role}
                                  onClick={() => setEditingRole(null)}
                                  className={`w-full px-4 py-2 text-left text-xs font-bold hover:bg-surface-container-low transition-colors ${
                                    member.role === role ? 'text-secondary bg-secondary/5' : 'text-on-surface'
                                  }`}
                                >
                                  {role}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-lg py-lg">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`}></div>
                        <span className="text-sm font-medium">{member.status}</span>
                      </div>
                    </td>
                    <td className="px-lg py-lg text-right">
                      {member.isOwner ? (
                        <span className="text-[10px] font-label-mono text-outline uppercase tracking-widest">You</span>
                      ) : (
                        <div className="relative inline-block">
                          {showRemoveConfirm === member.email ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleRemoveMember(member.email)}
                                disabled={removingEmail === member.email}
                                className="px-3 py-1.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-xs font-bold hover:bg-red-500/20 transition-colors disabled:opacity-50"
                              >
                                {removingEmail === member.email ? 'Removing...' : 'Confirm'}
                              </button>
                              <button
                                onClick={() => setShowRemoveConfirm(null)}
                                className="px-3 py-1.5 bg-surface-container-high rounded-lg text-xs font-bold hover:bg-surface-container-low transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setShowRemoveConfirm(member.email)}
                              className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-on-surface-variant transition-colors"
                              title="Remove member"
                            >
                              <span className="material-symbols-outlined text-lg">person_remove</span>
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Security / Permissions Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div className="p-lg rounded-3xl bg-surface-container-low border border-outline-variant">
              <h3 className="font-headline-md text-primary mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined">security</span>
                Role-Based Access
              </h3>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">
                Define granular permissions for each seat. Owners have full billing and team control, while Viewers can only consume reports without modifying swarm settings.
              </p>
            </div>
            <div className="p-lg rounded-3xl bg-surface-container-low border border-outline-variant">
              <h3 className="font-headline-md text-primary mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined">audit</span>
                Action Logging
              </h3>
              <p className="font-body-sm text-on-surface-variant leading-relaxed">
                Keep track of which team member triggered a swarm or updated a fix recommendation. Full audit logs are available for Enterprise accounts.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowInviteModal(false)}>
          <div
            className="bg-surface-container-lowest border border-outline-variant rounded-[2rem] w-full max-w-md p-8 shadow-3xl animate-in zoom-in-95 duration-300 relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowInviteModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-surface-container-high rounded-xl text-on-surface-variant transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">person_add</span>
              </div>
              <div>
                <h2 className="font-headline-md text-on-surface">Invite Team Member</h2>
                <p className="text-xs text-on-surface-variant">They'll receive an email invitation to join your workspace.</p>
              </div>
            </div>

            {/* Status Message */}
            {inviteStatus.type && (
              <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border mb-6 text-sm font-medium ${
                inviteStatus.type === 'success'
                  ? 'bg-green-500/10 border-green-500/20 text-green-600'
                  : 'bg-red-500/10 border-red-500/20 text-red-500'
              }`}>
                <span className="material-symbols-outlined text-lg">
                  {inviteStatus.type === 'success' ? 'check_circle' : 'error'}
                </span>
                {inviteStatus.text}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">email</span>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@company.com"
                    className="w-full bg-surface-container-low border border-outline-variant rounded-2xl pl-12 pr-6 py-3.5 font-body-sm text-on-surface focus:outline-none focus:border-secondary transition-all"
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-label-mono text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Viewer', 'Analyst', 'Admin'].map(role => (
                    <button
                      type="button"
                      key={role}
                      onClick={() => setInviteRole(role)}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        inviteRole === role
                          ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/20'
                          : 'bg-surface-container-low border-outline-variant text-on-surface-variant hover:border-outline'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-outline mt-1">
                  {inviteRole === 'Viewer' && 'Can view reports and dashboards. Cannot modify scans or settings.'}
                  {inviteRole === 'Analyst' && 'Can run scans, view reports, and configure persona settings.'}
                  {inviteRole === 'Admin' && 'Full access except billing. Can manage team members and integrations.'}
                </p>
              </div>

              <button
                onClick={handleInvite}
                disabled={isInviting || !inviteEmail.includes('@')}
                className="w-full py-4 bg-primary text-on-primary rounded-2xl font-bold text-sm hover:opacity-90 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                {isInviting ? (
                  <>
                    <span className="animate-spin material-symbols-outlined text-lg">progress_activity</span>
                    Sending Invitation...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">send</span>
                    Send Invitation
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
