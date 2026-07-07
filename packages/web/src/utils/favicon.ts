export const DEFAULT_FAVICON_URL = "/favicon.ico";

export const FAVICON_LINK_SELECTOR = 'link[rel="icon"]';

export function getFaviconLink(): HTMLLinkElement | null {
  return document.querySelector<HTMLLinkElement>(FAVICON_LINK_SELECTOR);
}

export function setFavicon(url: string): string | null {
  const link = getFaviconLink();
  if (!link) {
    return null;
  }
  const previousUrl = link.getAttribute("href");
  link.setAttribute("href", url);
  return previousUrl;
}

export function restoreFavicon(url: string | null): void {
  if (!url) {
    return;
  }
  const link = getFaviconLink();
  if (!link) {
    return;
  }
  link.setAttribute("href", url);
}
