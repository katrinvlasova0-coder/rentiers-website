export function shouldHideSiteChrome(pathname: string | null): boolean {
  if (!pathname) return false;

  return (
    pathname === '/account' ||
    pathname.startsWith('/account/') ||
    pathname === '/payment-success' ||
    pathname.startsWith('/payment-success/')
  );
}
