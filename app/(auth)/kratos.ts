const KRATOS_URL = process.env.NEXT_PUBLIC_KRATOS_URL;

export async function createLoginFlow() {
  const res = await fetch(`${KRATOS_URL}/self-service/login/browser`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to start login flow");
  return res.json();
}

export async function submitLoginFlow(
  flowId: string,
  csrfToken: string,
  identifier: string,
  password: string
) {
  const res = await fetch(`${KRATOS_URL}/self-service/login?flow=${flowId}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ method: "password", identifier, password, csrf_token: csrfToken }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.ui?.messages?.[0]?.text ?? "Login failed");
  }
  return data;
}

export async function createRegistrationFlow() {
  const res = await fetch(`${KRATOS_URL}/self-service/registration/browser`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to start registration flow");
  return res.json();
}

export async function submitRegistrationFlow(
  flowId: string,
  csrfToken: string,
  email: string,
  name: string,
  password: string
) {
  const res = await fetch(`${KRATOS_URL}/self-service/registration?flow=${flowId}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      method: "password",
      password,
      traits: { email, name },
      csrf_token: csrfToken,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.ui?.messages?.[0]?.text ?? "Registration failed");
  }
  return data;
}

export async function whoAmI() {
  const res = await fetch(`${KRATOS_URL}/sessions/whoami`, {
    credentials: "include",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return null;
  return res.json();
}