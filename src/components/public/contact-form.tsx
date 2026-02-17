"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Message sent");
      (document.getElementById("contact-form") as HTMLFormElement)?.reset();
    } else {
      toast.error("Unable to send message");
    }
  }

  return (
    <form id="contact-form" action={onSubmit} className="surface-card space-y-4 p-6 md:p-8">
      <Input name="name" placeholder="Your Name" required />
      <Input name="email" type="email" placeholder="Your Email" required />
      <Input name="subject" placeholder="Subject" required />
      <Textarea name="message" rows={6} placeholder="Message" required />
      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
