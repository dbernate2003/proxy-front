"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ProxyLogo } from "@/components/proxy-logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  PlusCircle, 
  ClipboardList, 
  History, 
  BarChart3, 
  CreditCard,
  Key,
  Settings,
  Bell,
  ChevronLeft,
  Menu
} from "lucide-react"

const sidebarItems = [
  { href: "/cliente", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/cliente/nueva-tarea", icon: PlusCircle, label: "Nueva Tarea" },
  { href: "/cliente/tareas-activas", icon: ClipboardList, label: "Tareas Activas" },
  { href: "/cliente/historial", icon: History, label: "Historial" },
  { href: "/cliente/reportes", icon: BarChart3, label: "Reportes" },
  { href: "/cliente/facturacion", icon: CreditCard, label: "Facturación" },
  { href: "/cliente/api-keys", icon: Key, label: "API Keys" },
  { href: "/cliente/configuracion", icon: Settings, label: "Configuración" },
]

export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64",
        "hidden lg:flex"
      )}>
        {/* Logo */}
        <div className={cn(
          "h-16 flex items-center border-b border-sidebar-border px-4",
          sidebarCollapsed ? "justify-center" : "justify-between"
        )}>
          {!sidebarCollapsed && <ProxyLogo size="small" />}
          <Button 
            variant="ghost" 
            size="icon"
            className="w-8 h-8"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <ChevronLeft className={cn(
              "w-4 h-4 transition-transform",
              sidebarCollapsed && "rotate-180"
            )} />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/cliente" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-primary" 
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  sidebarCollapsed && "justify-center px-0"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Back to landing */}
        <div className="p-4 border-t border-sidebar-border">
          <Link href="/">
            <Button 
              variant="outline" 
              className={cn(
                "w-full",
                sidebarCollapsed && "px-0"
              )}
              size={sidebarCollapsed ? "icon" : "default"}
            >
              {sidebarCollapsed ? (
                <ChevronLeft className="w-4 h-4" />
              ) : (
                "Volver al inicio"
              )}
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
      )}>
        {/* Top bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-6 bg-background sticky top-0 z-40">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="lg:hidden">
              <ProxyLogo size="small" />
            </div>
            <div className="hidden lg:block">
              <h1 className="font-semibold">Empresa Demo S.A.S</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
              <CreditCard className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">$2,450,000 COP</span>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
        </header>

        {/* Mobile sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <aside className="absolute inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border">
              <div className="h-16 flex items-center justify-between border-b border-sidebar-border px-4">
                <ProxyLogo size="small" />
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </div>
              <nav className="py-4 px-2 space-y-1">
                {sidebarItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                        isActive 
                          ? "bg-sidebar-accent text-sidebar-primary" 
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </aside>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
