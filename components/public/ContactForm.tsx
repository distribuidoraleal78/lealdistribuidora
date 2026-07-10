"use client";

// Formulário simples que não grava em banco — monta a mensagem e abre o WhatsApp
// já preenchido. Evita precisar de backend/tabela extra só para recado de contato.

import { useState } from "react";
import { siteConfig } from "@/lib/site.config";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const text = encodeURIComponent(
      `Olá! Meu nome é ${name}.\n\n${message}`
    );
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${text}`, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-ink-muted">
          Nome
        </label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Seu nome"
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm text-ink-muted">
          Mensagem
        </label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Como podemos ajudar?"
          rows={4}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Enviar pelo WhatsApp
      </Button>
    </form>
  );
}
