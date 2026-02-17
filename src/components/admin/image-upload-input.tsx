"use client";

import { useState } from "react";
import Image from "next/image";

export function ImageUploadInput({
  initialUrl,
  onUploaded
}: {
  initialUrl?: string | null;
  onUploaded: (url: string) => void;
}) {
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
  const [loading, setLoading] = useState(false);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload/image", { method: "POST", body: formData });
    const data = await response.json();
    setLoading(false);

    if (data.url) {
      onUploaded(data.url);
      setPreview(data.url);
    }
  }

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleChange} />
      {loading && <p className="text-xs text-muted-foreground">Uploading...</p>}
      {preview && (
        <div className="relative h-40 w-full overflow-hidden rounded-lg border border-border">
          <Image src={preview} alt="Preview" fill className="object-cover" />
        </div>
      )}
    </div>
  );
}
