export default function Button({ className = "", ...props }) {
  return (
    <button
      className={`h-11 w-full rounded-md bg-teal-900 text-white text-sm font-semibold transition-colors hover:bg-teal-800 disabled:bg-teal-900/40 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
}
