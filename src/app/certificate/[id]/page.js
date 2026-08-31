"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Certificate from "../../../components/Certificate";
import { getCertificateById } from "../../../lib/certificate";

export default function CertificatePage() {
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
            ⚠️
          </div>
          <h1 className="mt-6 text-2xl font-bold text-white">Certificate Not Found</h1>
          <p className="mt-3 text-zinc-500">
            The certificate you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/dashboard"
            className="mt-6 inline-flex rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white hover:bg-violet-700 transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return <Certificate certificate={certificate} />;
}