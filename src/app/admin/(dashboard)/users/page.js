"use client";

export const dynamic = 'force-dynamic';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminUsers() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchUsers = async (pageNum = 1, append = false) => {
    setLoading(pageNum === 1);
    setLoadingMore(pageNum > 1);

    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: "20",
      });
      if (search) {
        params.append("search", search);
      }
      if (roleFilter) {
        params.append("role", roleFilter);
      }

      const res = await fetch(`/api/admin/users?${params}`);
      if (res.ok) {
        const data = await res.json();
        if (append) {
          setUsers((prev) => [...prev, ...data.users]);
        } else {
          setUsers(data.users);
        }
        setTotal(data.total);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
    fetchUsers(1);
  };

  const handleRoleFilter = (e) => {
    setRoleFilter(e.target.value);
    setPage(1);
    fetchUsers(1);
  };

  const loadMore = () => {
    if (!loadingMore) {
      fetchUsers(page + 1, true);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#05050a] flex items-center justify-center">
        <div className="animate-pulse w-96 h-96 bg-[#0a0a10] rounded-2xl" />
      </main>
    );
  }

  const filteredUsers = users;

  return (
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

        <div className="mb-5 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-64">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white placeholder:text-zinc-600 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
            />
          </div>
          <select
            value={roleFilter}
            onChange={handleRoleFilter}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm font-medium text-zinc-300 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

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
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02]">
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

        {filteredUsers.length === 0 && !loading && !loadingMore && (
          <div className="text-center py-10 text-zinc-500">
            No users found matching your criteria.
          </div>
        )}
      </section>
    </main>
  );
}