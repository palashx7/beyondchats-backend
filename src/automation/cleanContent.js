export function cleanContent(rawContent) {
  if (!rawContent || typeof rawContent !== "string") {
    return rawContent;
  }

  const STOP_PHRASES = [
    "For more such amazing content",
    "Your email address will not be published",
    "Add Comment",
    "Post Comment",
    "If you’ve been looking for a chatbot lately",
    "Why BeyondChats",
    "BeyondChats 2024",
    "BeyondChats 2025"
  ];

  let cutIndex = rawContent.length;

  for (const phrase of STOP_PHRASES) {
    const idx = rawContent.indexOf(phrase);
    if (idx !== -1 && idx < cutIndex) {
      cutIndex = idx;
    }
  }

  return rawContent.slice(0, cutIndex).trim();
}
