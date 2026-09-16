export function generateCertificateId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CERT-${timestamp}-${random}`;
}

export function formatCertificateDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function createCertificate(assessment, result, user) {
  const certificateId = generateCertificateId();
  const verificationUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/certificate/${certificateId}`;
  
  return {
    id: certificateId,
    certificateId,
    name: assessment.name,
    email: assessment.email || "",
    userId: user?.id || null,
    userName: assessment.name,
    userEmail: assessment.email || "",
    skill: assessment.skills?.[0] || "General",
    skills: assessment.skills,
    score: result.score,
    total: result.total,
    totalQuestions: result.total,
    percentage: result.percentage,
    level: result.level,
    date: new Date().toISOString(),
    issuedAt: new Date().toISOString(),
    completedAt: result.completedAt,
    strengths: result.strengths || [],
    weaknesses: result.weaknesses || [],
    skillStats: result.skillStats || {},
    language: assessment.language || "English",
    duration: result.duration || "—",
    verificationUrl: `${typeof window !== "undefined" ? window.location.origin : ""}/certificate/${certificateId}`,
    pdfUrl: null,
  };
}

export function getAllCertificates() {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("skilleval-certificates");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveCertificate(certificate) {
  if (typeof window === "undefined") return;
  const certificates = getAllCertificates();
  certificates.unshift(certificate);
  localStorage.setItem("skilleval-certificates", JSON.stringify(certificates));
}

export function getCertificateById(id) {
  const certificates = getAllCertificates();
  return certificates.find((c) => c.id === id) || null;
}

// Save certificate to MongoDB via API
export async function saveCertificateToMongo(certificate) {
  try {
    const res = await fetch("/api/certificates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(certificate),
    });
    return res.ok;
  } catch (error) {
    console.error("Failed to save certificate to MongoDB:", error);
    return false;
  }
}