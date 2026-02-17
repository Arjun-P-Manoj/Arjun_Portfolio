"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteProjectAction } from "@/actions/projects";

export function DeleteProjectButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      className="rounded-md border border-border px-2 py-1 text-xs"
      onClick={() => {
        const ok = window.confirm("Delete this project?");
        if (!ok) return;

        const formData = new FormData();
        formData.set("id", id);

        startTransition(async () => {
          try {
            await deleteProjectAction(formData);
            toast.success("Project deleted");
            router.refresh();
          } catch {
            toast.error("Delete failed");
          }
        });
      }}
      disabled={pending}
      type="button"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
