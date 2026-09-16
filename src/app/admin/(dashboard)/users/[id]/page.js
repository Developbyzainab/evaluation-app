import UserDetailClient from "./UserDetailClient";

export default function Page({ params }) {
  return <UserDetailClient userId={params.id} />;
}