"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function UserDetailClient({ userId }) {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("overview");

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "user", isActive: true });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Read tab from URL client-side (no useSearchParams → no Suspense needed)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const tab = urlParams.get("tab") || "overview";
      setActiveTab(tab);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        const [userRes, evalsRes, certsRes] = await Promise.all([
          fetch(`/api/admin/users/${userId}`),
          fetch(`/api/admin/users/${userId}/evaluations`),
          fetch(`/api/admin/users/${userId}/certificates`),
        ]);

        if (!userRes.ok) {
          throw new Error("User not found");
        }

        const userData = await userRes.json();
        setUser(userData);

        if (evalsRes.ok) {
          const evalsData = await evalsRes.json();
          setEvaluations(evalsData.evaluations || []);
        }

        if (certsRes.ok) {
          const certsData = await certsRes.json();
          setCertificates(certsData.certificates || []);
        }
      } catch (e) {
        console.error("Failed to fetch user data:", e);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (tab === "overview") {
        urlParams.delete("tab");
      } else {
        urlParams.set("tab", tab);
      }
      const qs = urlParams.toString();
      router.replace(`/admin/users/${userId}${qs ? `?${qs}` : ""}`, { scroll: false });
    }
  };

  const handleEditClick = () => {
    if (user) {
      setEditForm({
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      });
      setShowEditModal(true);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setShowEditModal(false);
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/users");
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#05050a] flex items-center justify-center">
        <div className="animate-pulse w-96 h-96 bg-[#0a0a10] rounded-2xl" />
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="min-h-screen bg-[#05050a] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-red-400 mb-4">User not found</p>
          <Link href="/admin/users" className="text-violet-400 hover:text-violet-300">
            ← Back to Users
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#05050a] text-white">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute left-[5%] top-[5%] h-[420px] w-[420px] rounded-full bg-violet-700/15 blur-[140px]" />
          <div className="absolute right-[0%] top-[30%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[150px]" />
          <div className="absolute bottom-0 left-[35%] h-[350px] w-[350px] rounded-full bg-fuchsia-600/10 blur-[150px]" />
          <div className="grid-background absolute inset-0 opacity-[0.025]" />
        </div>

        <section className="mx-auto max-w-7xl px-4 lg:px-6 py-4">
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Link href="/admin/users" className="text-sm text-violet-400 hover:text-violet-300 mb-2 inline-block">
                ← Back to Users
              </Link>
              <h1 className="text-2xl lg:text-3xl font-bold">{user.name}</h1>
              <p className="text-zinc-500 mt-1">{user.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${user.role === "admin" ? "bg-red-500/20 text-red-300" : "bg-violet-500/20 text-violet-300"}`}>
                {user.role}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-zinc-800 text-zinc-400 border border-white/[0.06]">
                {user.provider}
              </span>
              <button
                onClick={handleEditClick}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-violet-700 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5a2.121 2.121 0 0 1 0-3L19.5 3.5a2.121 2.121 0 0 1-3-3z" />
                </svg>
                <span>Edit</span>
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" />
                  <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* User Info Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <InfoCard title="Tests Completed" value={user.testsCompleted || 0} icon="✏️" color="emerald" />
            <InfoCard title="Joined" value={new Date(user.createdAt).toLocaleDateString()} icon="📅" color="violet" />
            <InfoCard title="Last Login" value={user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : "Never"} icon="🕐" color="cyan" />
            <InfoCard title="Status" value={user.isActive ? "Active" : "Inactive"} icon={user.isActive ? "✅" : "❌"} color={user.isActive ? "emerald" : "red"} />
          </div>

          {/* Tabs */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <div className="border-b border-white/[0.06]">
              <nav className="flex gap-1 px-4" aria-label="User details tabs">
                <button
                  onClick={() => handleTabChange("overview")}
                  className={`py-3 px-4 text-sm font-medium border-b-2 transition ${activeTab === "overview" ? "border-violet-400 text-violet-300" : "border-transparent text-zinc-500 hover:text-white"}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => handleTabChange("evaluations")}
                  className={`py-3 px-4 text-sm font-medium border-b-2 transition ${activeTab === "evaluations" ? "border-violet-400 text-violet-300" : "border-transparent text-zinc-500 hover:text-white"}`}
                >
                  Evaluations ({evaluations.length})
                </button>
                <button
                  onClick={() => handleTabChange("certificates")}
                  className={`py-3 px-4 text-sm font-medium border-b-2 transition ${activeTab === "certificates" ? "border-violet-400 text-violet-300" : "border-transparent text-zinc-500 hover:text-white"}`}
                >
                  Certificates ({certificates.length})
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <DetailRow label="Name" value={user.name} />
                    <DetailRow label="Email" value={user.email} />
                    <DetailRow label="Role" value={user.role} />
                    <DetailRow label="Provider" value={user.provider} />
                    <DetailRow label="Provider ID" value={user.providerId || "—"} />
                    <DetailRow label="Tests Completed" value={user.testsCompleted || 0} />
                    <DetailRow label="Last Login" value={user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "Never"} />
                    <DetailRow label="Joined" value={new Date(user.createdAt).toLocaleString()} />
                    <DetailRow label="Status" value={user.isActive ? "Active" : "Inactive"} />
                  </div>
                </div>
              )}

              {activeTab === "evaluations" && (
                <div>
                  {evaluations.length === 0 ? (
                    <p className="text-zinc-500 text-center py-8">No evaluations found</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/[0.06] text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            <th className="pb-3 px-4">Assessment</th>
                            <th className="pb-3 px-4">Score</th>
                            <th className="pb-3 px-4">Level</th>
                            <th className="pb-3 px-4">Status</th>
                            <th className="pb-3 px-4">Duration</th>
                            <th className="pb-3 px-4">Completed</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                          {evaluations.map((e) => (
                            <tr key={e._id} className="hover:bg-white/[0.02]">
                              <td className="py-4 px-4">
                                <p className="font-medium">{e.assessmentData?.name || "Unknown"}</p>
                                <p className="text-sm text-zinc-500">{(e.assessmentData?.skills || []).slice(0, 3).join(", ")}</p>
                              </td>
                              <td className="py-4 px-4 font-mono font-bold">{e.score}/{e.totalQuestions} ({e.percentage}%)</td>
                              <td className="py-4 px-4">
                                <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${getLevelColor(e.level)}`}>
                                  {e.level}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${getStatusColor(e.status)}`}>
                                  {e.status}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-zinc-400">{e.duration || "—"}</td>
                              <td className="py-4 px-4 text-zinc-400">{e.completedAt ? new Date(e.completedAt).toLocaleDateString() : "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "certificates" && (
                <div>
                  {certificates.length === 0 ? (
                    <p className="text-zinc-500 text-center py-8">No certificates found</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/[0.06] text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            <th className="pb-3 px-4">Certificate ID</th>
                            <th className="pb-3 px-4">Skill</th>
                            <th className="pb-3 px-4">Score</th>
                            <th className="pb-3 px-4">Level</th>
                            <th className="pb-3 px-4">Issued</th>
                            <th className="pb-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                          {certificates.map((c) => (
                            <tr key={c._id} className="hover:bg-white/[0.02]">
                              <td className="py-4 px-4 font-mono text-sm">{c.certificateId}</td>
                              <td className="py-4 px-4">{c.skill}</td>
                              <td className="py-4 px-4 font-mono font-bold">{c.score}/{c.totalQuestions} ({c.percentage}%)</td>
                              <td className="py-4 px-4">
                                <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${getLevelColor(c.level)}`}>
                                  {c.level}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-zinc-500 text-sm">{new Date(c.issuedAt).toLocaleDateString()}</td>
                              <td className="py-4 px-4">
                                <div className="flex items-center gap-2">
                                  <Link href={`/admin/certificates/${c._id}`} className="text-violet-400 hover:text-violet-300 text-sm font-medium">
                                    Details
                                  </Link>
                                  {c.verificationUrl && (
                                    <>
                                      <a
                                        href={c.verificationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                                      >
                                        Verify
                                      </a>
                                      <a
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(c.verificationUrl)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1"
                                        title="Share on LinkedIn"
                                      >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                        Share
                                      </a>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[#0a0a10] rounded-2xl border border-white/[0.06] p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Edit User</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white placeholder:text-zinc-600 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white placeholder:text-zinc-600 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Role</label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.isActive}
                    onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })}
                    className="w-4 h-4 rounded border-white/[0.06] bg-white/[0.02] text-violet-500 focus:ring-violet-500/20"
                  />
                  <span className="text-sm font-medium">Active</span>
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-3 font-medium text-zinc-300 transition hover:bg-white/[0.04] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-violet-600 px-6 py-3 font-bold text-white transition hover:bg-violet-700 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[#0a0a10] rounded-2xl border border-red-500/20 p-6 w-full max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-.77-1.804-.77-2.572 0L4.732 16.5c-.77.77-.77 2.015 0 2.786l1.644 1.644c.77.77 2.015.77 2.785 0l1.644-1.644c.77-.77.77-2.015 0-2.786z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Delete User</h2>
                <p className="text-zinc-400 text-sm">Are you sure you want to delete this user? This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-3 font-medium text-zinc-300 transition hover:bg-white/[0.04] hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function InfoCard({ title, value, icon, color }) {
  const colors = {
    violet: "bg-violet-500/10 text-violet-300",
    cyan: "bg-cyan-500/10 text-cyan-300",
    emerald: "bg-emerald-500/10 text-emerald-300",
    amber: "bg-amber-500/10 text-amber-300",
    red: "bg-red-500/10 text-red-300",
  };

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500">{title}</p>
          <p className="mt-1 text-2xl font-black">{value}</p>
        </div>
        <span className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${colors[color]}`}>{icon}</span>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-4">
      <p className="text-xs text-zinc-500 uppercase tracking-wider">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}

function getStatusColor(status) {
  switch (status) {
    case "completed": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "in_progress": return "bg-violet-500/10 text-violet-400 border-violet-500/20";
    case "abandoned": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "violated": return "bg-red-500/10 text-red-400 border-red-500/20";
    default: return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  }
}

function getLevelColor(level) {
  switch (level) {
    case "Advanced": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "Intermediate": return "bg-violet-500/10 text-violet-400 border-violet-500/20";
    case "Beginner": return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    default: return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  }
}