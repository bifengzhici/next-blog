export async function appFetch(query: string) {
  return fetch(`${STRAPI_URL}/api${query}`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  });
}

export const STRAPI_URL = `${process.env.STRAPI_PROTOCOL}://${process.env.STRAPI_HOSTNAME}:${process.env.STRAPI_PORT}`;
