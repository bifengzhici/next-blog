export async function appFetch(query: string) {
  return fetch(`${process.env.STRAPI_URL}/api${query}`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  });
}
