"use client";

import { useRef, useState } from "react";
import { formatCertificateDate } from "../lib/certificate";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function Certificate({ certificate, showPrintButton = true }) {
  if (!certificate) return null;

  const certificateRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const isUrdu = certificate.language === "Urdu";

  const levelText = isUrdu
    ? certificate.level === "Advanced"
      ? "ماہر (Advanced)"
      : certificate.level === "Intermediate"
      ? "درمیانہ (Intermediate)"
      : "ابتدائی (Beginner)"
    : certificate.level;

  const grade = certificate.percentage >= 90 ? "A+" : 
                certificate.percentage >= 80 ? "A" : 
                certificate.percentage >= 70 ? "B+" : 
                certificate.percentage >= 60 ? "B" : 
                certificate.percentage >= 50 ? "C" : "D";

  const skillName = certificate.skills?.[0] || "General Skills";
  const duration = certificate.duration || "—";
  const year = new Date(certificate.date).getFullYear();

  const verifyUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/verify/${certificate.id}`
    : `https://skilleval.com/verify/${certificate.id}`;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!certificateRef.current || isDownloading) return;
    
    setIsDownloading(true);
    
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#063F56",
      });

      const imgData = canvas.toDataURL("image/png", 1.0);
      
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1200, 850],
      });

      pdf.addImage(imgData, "PNG", 0, 0, 1200, 850);
      pdf.save(`Certificate-${certificate.name.replace(/\s+/g, "-")}-${certificate.id}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert(isUrdu ? "پی ڈی ایف بنانے میں ناکام رہا" : "Failed to generate PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="certificate-container" dir={isUrdu ? "rtl" : "ltr"}>
      <div className="certificate-paper" ref={certificateRef}>
        {/* Decorative Curves - Left Side */}
        <div className="cert-curve-left-1" aria-hidden="true" />
        <div className="cert-curve-left-2" aria-hidden="true" />
        <div className="cert-curve-left-3" aria-hidden="true" />
        <div className="cert-curve-left-4" aria-hidden="true" />

        {/* Decorative Curves - Right/Bottom Side */}
        <div className="cert-curve-right-1" aria-hidden="true" />
        <div className="cert-curve-right-2" aria-hidden="true" />
        <div className="cert-curve-right-3" aria-hidden="true" />
        <div className="cert-curve-right-4" aria-hidden="true" />

        {/* Certificate Content */}
        <div className="cert-content">
          {/* Header - Right Aligned */}
          <header className="cert-header">
            <h1 className="cert-main-title">CERTIFICATE</h1>
            <p className="cert-subtitle">OF APPRECIATION</p>
          </header>

          {/* Recipient Section */}
          <section className="cert-recipient-section">
            <p className="cert-presented-text">PROUDLY PRESENTED TO</p>
            <h2 className="cert-recipient-name font-dancing-script">{certificate.name}</h2>
            <p className="cert-completion-text">for successfully completing the</p>
            <p className="cert-skill-name">{skillName} Skills Assessment</p>
          </section>

          {/* Description */}
          <p className="cert-description">
            This certificate is proudly presented in recognition of successfully 
            demonstrating the required skills and completing the evaluation.
          </p>

          {/* Award Badge - Right Side */}
          <div className="cert-badge-wrapper no-print" aria-hidden="true">
            <div className="cert-award-badge">
              <span className="cert-badge-year">{year}</span>
              <span className="cert-badge-label">AWARD</span>
            </div>
            <div className="cert-ribbon-tail" aria-hidden="true" />
            <div className="cert-ribbon-tail" aria-hidden="true" />
          </div>

          {/* Completion Ribbon */}
          <div className="cert-completion-ribbon no-print" aria-hidden="true">
            <span className="cert-ribbon-text">Finished - {year}</span>
          </div>

          {/* QR Code */}
          <div className="absolute bottom-6 right-6 no-print">
            <QRCodeSVG value={verifyUrl} size={60} bgColor="#063F56" fgColor="#ffffff" />
          </div>

          {/* Signatures Area - Bottom */}
          <div className="cert-signatures">
            <div className="cert-signature-block">
              <div className="cert-signature-line" />
              <p className="cert-signature-label">DIRECTOR</p>
              <p className="cert-signature-name font-playfair">Sarah Mitchell</p>
              <p className="cert-signature-title">SkillEval AI</p>
            </div>

            <div className="cert-id-block">
              <p className="cert-id-label">Certificate ID</p>
              <p className="cert-id-value">{certificate.id}</p>
              <p className="cert-id-value text-[10px] mt-1 text-white/30">
                {formatCertificateDate(certificate.date)}
              </p>
            </div>

            <div className="cert-signature-block">
              <div className="cert-signature-line" />
              <p className="cert-signature-label">MANAGER</p>
              <p className="cert-signature-name font-playfair">James Wilson</p>
              <p className="cert-signature-title">SkillEval AI</p>
            </div>
          </div>
        </div>
      </div>

      {showPrintButton && (
        <div className="cert-actions no-print">
          <button 
            onClick={handleDownloadPDF} 
            disabled={isDownloading}
            className="cert-btn cert-btn-download"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>{isDownloading ? (isUrdu ? "ڈاؤن لوڈ ہو رہا ہے..." : "Downloading...") : (isUrdu ? "پی ڈی ایف ڈاؤن لوڈ کریں" : "Download PDF")}</span>
          </button>
          
          <button onClick={handlePrint} className="cert-btn cert-btn-print">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            <span>{isUrdu ? "پرنٹ / پی ڈی ایف محفوظ کریں" : "Print / Save as PDF"}</span>
          </button>
          
          <p className="cert-hint">
            {isUrdu 
              ? "پی ڈی ایف محفوظ کرنے کے لئے براؤزر کے پرنٹ ڈائیلاگ (Ctrl+P) کا استعمال کریں" 
              : "Use browser print dialog (Ctrl+P) to save as PDF"}
          </p>
        </div>
      )}
    </div>
  );
}