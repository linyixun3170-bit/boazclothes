"use client";

import { useState } from "react";

export default function HoneypotForm({
  onSubmit,
  children,
}: {
  onSubmit: (e: React.FormEvent, honeypot: string) => void;
  children: React.ReactNode;
}) {
  const [honeypot, setHoneypot] = useState("");

  return (
    <form
      onSubmit={(e) => onSubmit(e, honeypot)}
      className="relative"
    >
      {/* Honeypot field — hidden from real users */}
      <div
        className="absolute opacity-0 pointer-events-none"
        style={{ position: "absolute", left: "-9999px" }}
        aria-hidden="true"
      >
        <input
          type="text"
          name="contact_url"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
      {children}
    </form>
  );
}
