export const fetchApiRoute = async (requestUrl: string) => {
  const url = new URL(requestUrl);
  return await fetch(`${url.origin}/api${url.pathname}${url.search}`);
};