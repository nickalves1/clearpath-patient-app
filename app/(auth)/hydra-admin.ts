const HYDRA_ADMIN_URL = process.env.HYDRA_ADMIN_URL;
const HYDRA_ADMIN_SECRET = process.env.HYDRA_ADMIN_SECRET;

export function hydraAdminFetch(path: string, init: RequestInit = {}) {
  return fetch(`${HYDRA_ADMIN_URL}${path}`, {
    ...init,
    headers: { ...init.headers, "X-Admin-Secret": HYDRA_ADMIN_SECRET ?? "" },
  });
}
