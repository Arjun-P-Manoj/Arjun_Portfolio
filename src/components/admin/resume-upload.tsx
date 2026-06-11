"use client";

import { useState } from "react";
import { toast } from "sonner";

export function ResumeUpload() {
  const [loading, setLoading] = useState(false);

  async function upload(file: File) {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload/resume", { method: "POST", body: formData });
    setLoading(false);

    if (res.ok) {
      toast.success("Resume uploaded");
      window.location.reload();
    } else {
      toast.error("Upload failed");
    }
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="application/pdf"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void upload(file);
        }}
      />
      {loading && <p className="text-xs text-muted-foreground">Uploading resume...</p>}
    </div>
  );
}