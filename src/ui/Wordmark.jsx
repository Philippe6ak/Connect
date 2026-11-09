export default function Wordmark({ className = "text-2xl" }) {
  return (
    <span className={`font-serif font-bold tracking-tight text-teal-900 ${className}`}>
      CONNECT<span className="text-orange-600">.</span>
    </span>
  );
}
