//   **text**           -> emphasis
//   [label](https://x) -> external link (opens in a new tab)
const EMPHASIS_CLASS = "font-semibold text-teal-900";
const LINK_CLASS =
  "text-teal-900 underline underline-offset-2 hover:text-orange-600 transition-colors";

//   1 = emphasised text, 2 = link label, 3 = link url
const TOKEN = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;

// Only real web addresses become links; anything else (e.g. "javascript:...") is refused.
const isSafeUrl = (url) => /^https?:\/\//i.test(url);

export default function RichText({ children }) {
  if (typeof children !== "string") return children;

  const parts = [];
  let last = 0; // index in the string where the previous match ended

  for (const match of children.matchAll(TOKEN)) {
    const [whole, emphasis, label, url] = match;

    // plain text sitting between the previous match and this one
    if (match.index > last) parts.push(children.slice(last, match.index));

    if (emphasis !== undefined) {
      parts.push(
        <strong key={match.index} className={EMPHASIS_CLASS}>
          {emphasis}
        </strong>,
      );
    } else if (isSafeUrl(url)) {
      parts.push(
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}>
          {label}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>,
      );
    } else {
      parts.push(label); // unsafe url: keep the words, drop the link
    }

    last = match.index + whole.length;
  }

  // whatever text remains after the last match
  if (last < children.length) parts.push(children.slice(last));

  return parts;
}
