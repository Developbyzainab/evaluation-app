"use client";

export const dynamic = 'force-dynamic';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AdminCertificateDetail() {
  const router = useRouter();
  const params = useParams();
  const certId = params.id;
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await fetch(`/api/admin/certificates/${certId}`);
        if (!res.ok) {
          throw new Error("Certificate not found");
        }
        const data = await res.json();
        setCertificate(data);
      } catch (e) {
        console.error("Failed to fetch certificate:", e);
        setError("Failed to load certificate");
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [certId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#05050a] flex items-center justify-center">
        <div className="animate-pulse w-96 h-96 bg-[#0a0a10] rounded-2xl" />
      </main>
    );
  }

  if (!certificate) {
    return (
      <main className="min-h-screen bg-[#05050a] flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-red-400 mb-4">Certificate not found</p>
          <Link href="/admin/certificates" className="text-violet-400 hover:text-violet-300">
            ← Back to Certificates
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#05050a] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[5%] top-[5%] h-[420px] w-[420px] rounded-full bg-violet-700/15 blur-[140px]" />
        <div className="absolute right-[0%] top-[30%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-0 left-[35%] h-[350px] w-[350px] rounded-full bg-fuchsia-600/10 blur-[150px]" />
        <div className="grid-background absolute inset-0 opacity-[0.025]" />
      </div>

      <section className="mx-auto max-w-7xl px-4 lg:px-6 py-4">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link href="/admin/certificates" className="text-sm text-violet-400 hover:text-violet-300 mb-2 inline-block">
              ← Back to Certificates
            </Link>
            <h1 className="text-2xl lg:text-3xl font-bold">Certificate Details</h1>
            <p className="text-zinc-500 mt-1">Certificate ID: {certificate.certificateId}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <h3 className="text-lg font-bold mb-6">Certificate Information</h3>
            <div className="space-y-4">
              <DetailRow label="Certificate ID" value={certificate.certificateId} />
              <DetailRow label="User" value={certificate.userName} />
              <DetailRow label="Email" value={certificate.userEmail} />
              <DetailRow label="Skill" value={certificate.skill} />
              <DetailRow label="Score" value={`${certificate.score}/${certificate.totalQuestions} (${certificate.percentage}%)`} />
              <DetailRow label="Level" value={
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${getLevelColor(certificate.level)}`}>
                  {certificate.level}
                </span>
              } />
              <DetailRow label="Issued Date" value={new Date(certificate.issuedAt).toLocaleDateString()} />
              <DetailRow label="Test Attempt ID" value={certificate.testAttemptId} />
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
            <h3 className="text-lg font-bold mb-6">Verification & PDF</h3>
            <div className="space-y-4">
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="text-xs text-zinc-500 mb-2">Verification URL</p>
                <p className="text-sm text-zinc-300 break-all mb-2">{certificate.verificationUrl}</p>
                <div className="flex gap-2 mt-2">
                  <a
                    href={certificate.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-400 hover:text-violet-300 text-sm font-medium"
                  >
                    Open Verification Page
                  </a>
                  <button
                    onClick={() => navigator.clipboard.writeText(certificate.verificationUrl)}
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                  >
                    Copy URL
                  </button>
                  <button
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}/certificate/${certificate.certificateId}`)}`, "_blank", "width=600,height=400")}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-bold text-white transition hover:from-blue-700 hover:to-blue-800"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.137-.925 2.063-2.064 2.063zm1.782 13.019H3.555V9h3.642v11.019zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.547C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span>Share on LinkedIn</span>
                  </button>
                </div>
              </div>

              {certificate.pdfUrl && (
                <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-4">
                  <p className="text-xs text-zinc-500 mb-2">PDF Certificate</p>
                  <p className="text-sm text-zinc-300 break-all mb-2">{certificate.pdfUrl}</p>
                  <div className="flex gap-2">
                    <a
                      href={certificate.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-400 hover:text-violet-300 text-sm font-medium"
                    >
                      Open PDF
                    </a>
                    <a
                      href={certificate.pdfUrl}
                      download
                      className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
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

function getLevelColor(level) {
  switch (level) {
    case "Advanced": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "Intermediate": return "bg-violet-500/10 text-violet-400 border-violet-500/20";
    case "Beginner": return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    default: return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  }
}