import { AxiosError } from 'axios';
export function getToken() {
  return localStorage.getItem('ideos_token');
}

export function setToken(token: string) {
  return localStorage.setItem('ideos_token', token);
}

export function removeToken() {
  localStorage.removeItem('ideos_token');
}

interface ErrorResponse {
  error: string;
  type: string;
}

export function handleApiError(error: unknown): {
  message: string;
  type: string;
} {
  const err = error as AxiosError<ErrorResponse>;

  const message = err?.response?.data?.error || '';
  const type = err?.response?.data?.type || '';

  if (type === 'invalid_token') {
    removeToken();
  }
  return { message, type };
}

export function timeAgoToReadable(isoDate: string): string {
  const now = new Date();
  const past = new Date(isoDate);
  const diffMs = now.getTime() - past.getTime();

  if (isNaN(past.getTime()) || diffMs < 0) {
    return '0';
  }

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return `${seconds}s`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if (days > 0 && remainingHours > 0) {
    return `${days}d ${remainingHours}h`;
  } else if (days > 0) {
    return `${days}d`;
  } else {
    return `${remainingHours}h`;
  }
}

export function getReqTimeToRead(content: string): string {
  const AWPM = 180;
  const wordCount = content.trim().split(/\s+/).length;
  const totalMinutes = Math.ceil(wordCount / AWPM);
  return `${totalMinutes}minute(s) read`;
}

export function formatToReadableDate(isoString: string): string {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };

  return date.toLocaleDateString('en-GB', options);
}
