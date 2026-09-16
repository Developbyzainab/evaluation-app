"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Certificate from "@/components/Certificate";

export default function CertificateClient({ certificateId }) {
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!certificateId || certificateId === "undefined") {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const fetchCertificate = async () => {
      try {
        const res = await fetch(`/api/certificates/${certificateId}`);
        if (res.ok) {
          const data = await res.json();
          setCertificate(data);
        } else {
          setNotFound(true);
        }
      } catch (e) {
        console.error("Failed to fetch certificate:", e);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificate();
  }, [certificateId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05050a]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="mt-4 text-zinc-400">Loading certificate...</p>
        </div>
      </main>
    );
  }

  if (notFound || !certificate) {
    return (
      <main className="min-h-screen bg-[#05050a] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-3xl">
            ✕
          </div>
          <h1 className="mt-6 text-2xl font-bold text-white">Certificate Not Found</h1>
          <p className="mt-3 text-zinc-500">
            This certificate could not be found in our system.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-black hover:bg-white/90 transition"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-[#05050a] px-4 py-12"
      dir={certificate.language === "Urdu" ? "rtl" : "ltr"}
    >
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[5%] top-[5%] h-[420px] w-[420px] rounded-full bg-violet-700/15 blur-[140px]" />
        <div className="absolute right-[0%] top-[30%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-0 left-[35%] h-[350px] w-[350px] rounded-full bg-fuchsia-600/10 blur-[150px]" />
        <div className="grid-background absolute inset-0 opacity-[0.025]" />
      </div>

      <div className="mx-auto max-w-5xl">
        <Certificate certificate={certificate} showPrintButton={true} />

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Verify Button */}
          <Link
            href={`/verify/${certificate.certificateId}`}
            className="rounded-2xl bg-violet-600 px-6 py-4 text-center font-bold text-white transition hover:bg-violet-700 hover:-translate-y-1"
          >
            Verify Certificate
          </Link>

          {/* LinkedIn Share Button */}
          <button
            onClick={() => {
              const shareUrl = `${window.location.origin}/certificate/${certificate.certificateId}`;
              window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                "_blank",
                "width=600,height=500"
              );
            }}
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-center font-bold text-white transition hover:from-blue-700 hover:to-blue-800 hover:-translate-y-1 inline-flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.137-.925 2.063-2.064 2.063zm1.782 13.019H3.555V9h3.642v11.019zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.547C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>Share on LinkedIn</span>
          </button>

          {/* Dashboard Button */}
          <Link
            href="/dashboard"
            className="rounded-2xl bg-white px-6 py-4 text-center font-bold text-black transition hover:-translate-y-1"
          >
            View Dashboard
          </Link>

          {/* New Assessment Button */}
          <Link
            href="/evaluate"
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-4 text-center font-bold text-zinc-300 transition hover:border-violet-400/20 hover:text-white hover:-translate-y-1"
          >
            New Assessment
          </Link>
        </div>
      </div>
    </main>
  );
}