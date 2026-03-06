// String utilities
export function truncateString(str: string, maxLength: number): string {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

// Normalize array values from various formats
export function normalizeArrayValue<T>(value: T | T[] | null | undefined): T[] {
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

// Normalize attachment format
export interface Attachment {
  name: string;
  url?: string;
  type?: string;
  size?: number;
}

export function normalizeAttachments(attachments: any): Attachment[] {
  if (!attachments) return [];
  if (Array.isArray(attachments)) {
    return attachments.map((a) => ({
      name: a.name || a.filename || 'Unknown',
      url: a.url || a.file_url,
      type: a.type || a.mime_type,
      size: a.size,
    }));
  }
  return [];
}

// Normalize filename to Unicode NFC form
export function normalizeFilenameToNFC(filename: string): string {
  if (!filename) return '';
  // Normalize to NFC form for consistent Unicode representation
  return filename.normalize('NFC');
}

// Normalize MIME type
export function normalizeMimeType(mimeType: string): string {
  if (!mimeType) return 'application/octet-stream';
  return mimeType.toLowerCase().trim();
}

// Auto-link URLs in text
export function autoLinkUrls(text: string): string {
  if (!text) return '';
  const urlRegex = /(https?:\/\/[^\s<>[\]()'"]+)/g;
  return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
}
