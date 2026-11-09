import { LoaderCircle } from "lucide-react";

export default function Spinner({ fullPage = false }) {
  const icon = <LoaderCircle className="w-6 h-6 animate-spin text-teal-900" aria-label="Loading" />;
  return fullPage ? (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">{icon}</div>
  ) : (
    icon
  );
}
