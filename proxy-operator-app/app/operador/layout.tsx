"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { PhoneFrame } from "@/components/phone-frame"
import { ProxyLogo } from "@/components/proxy-logo"
import { cn } from "@/lib/utils"
import { Home, ClipboardList, Wallet, MessageSquare, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/operador", icon: Home, label: "Inicio" },
  { href: "/operador/tareas", icon: ClipboardList, label: "Tareas" },
  { href: "/operador/billetera", icon: Wallet, label: "Billetera" },
  { href: "/operador/chat", icon: MessageSquare, label: "Chat" },
  { href: "/operador/perfil", icon: User, label: "Perfil" },
]

export default function OperadorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [currentScreen, setCurrentScreen] = useState("dashboard")

  // Determine if we're on a sub-screen that should show back button
  const isSubScreen = pathname.includes("/tarea/") || pathname.includes("/verificacion")

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8">
      {/* Desktop header */}
      <div className="w-full max-w-6xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            <ProxyLogo size="small" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Vista previa de la</span>
            <span className="text-sm font-medium text-primary">App de Operadores</span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/cliente">Ver Panel de Clientes</Link>
          </Button>
        </div>
      </div>

      {/* Phone frame container */}
      <div className="flex-1 flex items-start justify-center">
        <PhoneFrame>
          <div className="flex flex-col h-full">
            {/* Screen content */}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>

            {/* Bottom navigation */}
            <nav className="flex-shrink-0 border-t border-border bg-background px-2 py-2 safe-area-pb">
              <div className="flex items-center justify-around">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== "/operador" && pathname.startsWith(item.href))
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors",
                        isActive 
                          ? "text-primary" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-[10px] font-medium">{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </nav>
          </div>
        </PhoneFrame>
      </div>
    </div>
  )
}
