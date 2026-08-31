"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getCertificateById } from "../../../lib/certificate";

export default function VerifyPage() {
  const params = useParams();
  const router = useRouter();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const id = params.id;
    if (!id) {
      router.push("/dashboard");
      return;
    }

    const cert = getCertificateById(id);
    if (cert) {
      setCertificate(cert);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  }, [params.id, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#05050a]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="mt-4 text-zinc-400">Verifying certificate...</p>
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
          <h1 className="mt-6 text-2xl font-bold text-white">Invalid Certificate</h1>
          <p className="mt-3 text-zinc-500">
            This certificate could not be verified in our system.
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

  const isVerified = certificate && certificate.id;

  return (
    <main className="min-h-screen bg-[#05050a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Certificate Verification</h1>
          <p className="mt-2 text-zinc-500">Verify the authenticity of a certificate</p>
        </div>

        <div className="bg-[#0a0a10] border border-white/[0.06] rounded-2xl p-8">
          {isVerified ? (
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-4xl">
                ✓
              </div>
              <h2 className="mt-4 text-xl font-bold text-green-400">Valid Certificate</h2>
              <p className="mt-2 text-zinc-500">This certificate has been verified.</p>
              
              <div className="mt-6 space-y-3 text-left">
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-zinc-500">Name</span>
                  <span className="text-white font-medium">{certificate.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-zinc-500">Certificate ID</span>
                  <span className="text-white font-mono text-sm">{certificate.id}</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-zinc-500">Score</span>
                  <span className="text-white">{certificate.percentage}%</span>
                </div>
                <div className="flex justify-between border-b border-white/[0.06] pb-2">
                  <span className="text-zinc-500">Level</span>
                  <span className="text-violet-300">{certificate.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Date</span>
                  <span className="text-white">{new Date(certificate.date).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/certificate/${certificate.id}`}
                  className="inline-flex rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white hover:bg-violet-700 transition"
                >
                  View Full Certificate
                </Link>
                <Link
                  href="/"
                  className="inline-flex rounded-xl border border-white/[0.1] px-6 py-3 text-sm font-bold text-zinc-300 hover:border-violet-400/20 hover:text-white transition"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-4xl">
                ✕
              </div>
              <h2 className="mt-4 text-xl font-bold text-red-400">Invalid Certificate</h2>
              <p className="mt-2 text-zinc-500">This certificate could not be verified.</p>
              <Link
                href="/"
                className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-black hover:bg-white/90 transition"
              >
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}