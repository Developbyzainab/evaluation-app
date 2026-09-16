import CertificateClient from "./CertificateClient";

export default function Page({ params }) {
  return <CertificateClient certificateId={params.id} />;
}