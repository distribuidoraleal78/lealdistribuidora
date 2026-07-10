"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Package, LogOut } from "lucide-react";
import { signOut } from "@/app/actions/auth.actions";
import { cn } from "@/lib/utils";

export function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const isProdutos = pathname.startsWith("/admin/produtos") || pathname === "/admin";

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-ink-border bg-ink-soft">
      <div className="flex items-center gap-2 border-b border-ink-border px-4 py-4">
        <Image src="/images/logo-mark.svg" alt="" width={28} height={28} />
        <span className="text-sm font-semibold text-white">Admin</span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        <Link
          href="/admin"
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-ink-muted hover:bg-ink-900 hover:text-white",
            isProdutos && "bg-ink-900 text-white"
          )}
        >
          <Package size={16} aria-hidden="true" />
          Produtos
        </Link>
      </nav>

      <div className="border-t border-ink-border p-3">
        <p className="truncate px-1 text-xs text-ink-muted">{userEmail}</p>
        <form action={signOut}>
          <button
            type="submit"
            className="mt-2 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-ink-muted hover:bg-ink-900 hover:text-white"
          >
            <LogOut size={16} aria-hidden="true" />
            Sair
          </button>
        </form>
      </div>
    </aside>
  );
}
