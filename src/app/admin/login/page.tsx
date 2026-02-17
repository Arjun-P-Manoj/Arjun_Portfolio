import { loginAction } from "@/actions/auth";

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <form action={loginAction} className="w-full max-w-sm space-y-4 rounded-xl border border-border bg-card p-6">
        <h1 className="text-xl font-semibold">Admin Login</h1>
        {params.error === "invalid" && (
          <p className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            Invalid email or password
          </p>
        )}
        <div>
          <label className="mb-1 block text-sm">Email</label>
          <input name="email" type="email" required className="w-full rounded-lg border border-border px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full rounded-lg border border-border px-3 py-2"
          />
        </div>
        <button type="submit" className="w-full rounded-lg bg-primary py-2 text-background">
          Sign in
        </button>
      </form>
    </main>
  );
}
