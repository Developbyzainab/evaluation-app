"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";

export default function AdminUsers() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);

  // ✅ Controlled input
  const [searchInput, setSearchInput] = useState("");
  const searchTimeoutRef = useRef(null);
  const isFirstLoad = useRef(true);
  const abortRef = useRef(null);

  const fetchUsers = useCallback(async (pageNum, append, searchTerm, role) => {
    // cancel previous request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    if (pageNum > 1) setLoadingMore(true);

    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: "20",
      });
      if (searchTerm) params.append("search", searchTerm);
      if (role) params.append("role", role);

      const res = await fetch(`/api/admin/users?${params}`, {
        signal: controller.signal,
      });
      if (res.ok) {
        const data = await res.json();
        if (append) setUsers((prev) => [...prev, ...data.users]);
        else setUsers(data.users);
        setTotal(data.total);
      }
    } catch (err) {
      if (err.name !== "AbortError") console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // ✅ Initial load — once
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      fetchUsers(1, false, "", "");
    }
  }, [fetchUsers]);

  // ✅ Search — debounced, no setPage on keystroke
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setPage(1);
      fetchUsers(1, false, value, roleFilter);
    }, 400);
  };

  // ✅ Role filter — single fetch
  const handleRoleFilter = (e) => {
    const value = e.target.value;
    setRoleFilter(value);
    setPage(1);
    fetchUsers(1, false, searchInput, value);
  };

  const loadMore = () => {
    if (loadingMore) return;
    const next = page + 1;
    setPage(next);
    fetchUsers(next, true, searchInput, roleFilter);
  };

  // Action modal state
  const [actionModal, setActionModal] = useState({ open: false, user: null });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "user", isActive: true });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const openActionModal = (user) => setActionModal({ open: true, user });
  const closeActionModal = () => setActionModal({ open: false, user: null });

  const handleEditFromModal = async () => {
    const u = actionModal.user;
    if (!u) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/users/${u.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        fetchUsers(page, false, searchInput, roleFilter);
        closeActionModal();
        setShowEditModal(false);
        alert("User updated successfully");
      } else alert("Failed to update user");
    } catch (error) {
      console.error(error);
      alert("Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFromModal = async () => {
    const u = actionModal.user;
    if (!u) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/users/${u.id}`, { method: "DELETE" });
      if (res.ok) {
        fetchUsers(page, false, searchInput, roleFilter);
        closeActionModal();
        setShowDeleteModal(false);
        alert("User deleted successfully");
      } else alert("Failed to delete user");
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    } finally {
      setDeleting(false);
    }
  };

  const handleView = (u) => {
    closeActionModal();
    router.push(`/admin/users/${u._id}`);
  };
  const handleViewCertificates = (u) => {
    closeActionModal();
    router.push(`/admin/users/${u._id}?tab=certificates`);
  };
  const handleEditClick = (u) => {
    setEditForm({ name: u.name, email: u.email, role: u.role, isActive: u.isActive });
    closeActionModal();
    setShowEditModal(true);
  };
  const handleDeleteClick = (u) => {
    closeActionModal();
    setShowDeleteModal(true);
  };

  if (loading && users.length === 0) {
    return (
      <main className="min-h-screen bg-[#05050a] flex items-center justify-center">
        <div className="animate-pulse w-96 h-96 bg-[#0a0a10] rounded-2xl" />
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
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold">User Management</h1>
            <p className="text-zinc-500 mt-1">View and manage all platform users</p>
          </div>

          {/* ✅ Filters — extracted to memo-friendly static block */}
          <div className="mb-5 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-64">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                value={searchInput}
                onChange={handleSearch}
                placeholder="Search users..."
                autoComplete="off"
                spellCheck={false}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white placeholder:text-zinc-600 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-colors"
              />
            </div>
            <div className="w-full sm:w-64">
              <select
                value={roleFilter}
                onChange={handleRoleFilter}
                className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm font-medium text-zinc-300 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-colors"
              >
                <option value="">All Roles</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* ✅ Table — separate block so filter re-render doesn't touch input */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06] text-left text-sm text-zinc-500">
                  <th className="pb-3 px-4 font-medium">Name</th>
                  <th className="pb-3 px-4 font-medium">Email</th>
                  <th className="pb-3 px-4 font-medium">Role</th>
                  <th className="pb-3 px-4 font-medium">Provider</th>
                  <th className="pb-3 px-4 font-medium">Tests</th>
                  <th className="pb-3 px-4 font-medium">Last Login</th>
                  <th className="pb-3 px-4 font-medium">Joined</th>
                  <th className="pb-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-white/[0.02]">
                    <td className="py-4 px-4 font-medium">{u.name}</td>
                    <td className="py-4 px-4 text-zinc-400">{u.email}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${u.role === "admin" ? "bg-red-500/20 text-red-300" : "bg-violet-500/20 text-violet-300"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-zinc-400 capitalize">{u.provider}</td>
                    <td className="py-4 px-4 text-zinc-400">{u.testsCompleted || 0}</td>
                    <td className="py-4 px-4 text-zinc-400">{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : "Never"}</td>
                    <td className="py-4 px-4 text-zinc-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => openActionModal(u)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.03] text-zinc-400 hover:bg-violet-500/10 hover:text-violet-300 border border-white/[0.06] text-xs font-medium transition-all"
                      >
                        Actions
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {loadingMore && (
            <div className="text-center py-4 text-zinc-500">Loading more...</div>
          )}

          {users.length > 20 && !loadingMore && (
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="mt-5 mx-auto block rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-3 text-sm font-medium text-zinc-400 hover:border-violet-400/30 hover:bg-white/[0.03] hover:text-white transition-all"
            >
              Load More ({users.length}/{total})
            </button>
          )}

          {users.length === 0 && !loading && !loadingMore && (
            <div className="text-center py-10 text-zinc-500">
              No users found matching your criteria.
            </div>
          )}
        </section>
      </main>

      {/* Action Modal */}
      {actionModal.open && actionModal.user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={closeActionModal}>
          <div className="bg-[#0a0a10] rounded-2xl border border-white/[0.06] p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">User Actions</h2>
              <button onClick={closeActionModal} className="text-zinc-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <p className="font-medium">{actionModal.user.name}</p>
                <p className="text-sm text-zinc-500">{actionModal.user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${actionModal.user.role === "admin" ? "bg-red-500/20 text-red-300" : "bg-violet-500/20 text-violet-300"}`}>
                    {actionModal.user.role}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs bg-zinc-800 text-zinc-400 border border-white/[0.06]">
                    {actionModal.user.provider}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleView(actionModal.user)} className="w-full py-3 px-4 rounded-xl bg-violet-600/20 text-violet-300 font-medium hover:bg-violet-600/30 border border-violet-500/20 transition-all">View Details</button>
                <button onClick={() => handleViewCertificates(actionModal.user)} className="w-full py-3 px-4 rounded-xl bg-cyan-600/20 text-cyan-300 font-medium hover:bg-cyan-600/30 border border-cyan-500/20 transition-all">Certificates</button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleEditClick(actionModal.user)} className="w-full py-3 px-4 rounded-xl bg-yellow-600/20 text-yellow-300 font-medium hover:bg-yellow-600/30 border border-yellow-500/20 transition-all">Edit</button>
                <button onClick={() => handleDeleteClick(actionModal.user)} className="w-full py-3 px-4 rounded-xl bg-red-600/20 text-red-300 font-medium hover:bg-red-600/30 border border-red-500/20 transition-all">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowEditModal(false)}>
          <div className="bg-[#0a0a10] rounded-2xl border border-white/[0.06] p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Edit User</h2>
              <button onClick={() => setShowEditModal(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleEditFromModal(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Name</label>
                <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Role</label>
                <select value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all">
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editForm.isActive} onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })} className="w-4 h-4 rounded border-white/[0.06] bg-white/[0.02] text-violet-500 focus:ring-violet-500/20" />
                  <span className="text-sm font-medium">Active</span>
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-3 font-medium text-zinc-300 transition hover:bg-white/[0.04] hover:text-white">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 rounded-xl bg-violet-600 px-6 py-3 font-bold text-white transition hover:bg-violet-700 disabled:opacity-50">{saving ? "Saving..." : "Save Changes"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowDeleteModal(false)}>
          <div className="bg-[#0a0a10] rounded-2xl border border-red-500/20 p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 text-2xl">⚠</div>
              <div>
                <h2 className="text-xl font-bold text-white">Delete User</h2>
                <p className="text-zinc-400 text-sm">Are you sure you want to delete this user? This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteModal(false)} className="flex-1 rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-3 font-medium text-zinc-300 transition hover:bg-white/[0.04] hover:text-white">Cancel</button>
              <button onClick={handleDeleteFromModal} disabled={deleting} className="flex-1 rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700 disabled:opacity-50">{deleting ? "Deleting..." : "Delete User"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}