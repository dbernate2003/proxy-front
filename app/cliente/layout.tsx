"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
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
  Menu,
  Zap
} from "lucide-react"

const sidebarItems = [
  { href: "/cliente", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/cliente/nueva-tarea", icon: PlusCircle, label: "Nueva Tarea" },
  { href: "/cliente/tareas-activas", icon: ClipboardList, label: "Tareas Activas" },
  { href: "/cliente/historial", icon: History, label: "Historial" },
  { href: "/cliente/reportes", icon: BarChart3, label: "Reportes" },
  { href: "/cliente/facturacion", icon: CreditCard, label: "Facturacion" },
  { href: "/cliente/api-keys", icon: Key, label: "API Keys" },
  { href: "/cliente/configuracion", icon: Settings, label: "Configuracion" },
]

export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notifications] = useState(3)

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border",
          "hidden lg:flex"
        )}
        initial={false}
        animate={{ width: sidebarCollapsed ? 64 : 256 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Logo */}
        <div className={cn(
          "h-16 flex items-center border-b border-sidebar-border px-4",
          sidebarCollapsed ? "justify-center" : "justify-between"
        )}>
          <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ProxyLogo size="small" />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button 
              variant="ghost" 
              size="icon"
              className="w-8 h-8"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <motion.div
                animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.div>
            </Button>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {sidebarItems.map((item, index) => {
            const isActive = pathname === item.href || 
              (item.href !== "/cliente" && pathname.startsWith(item.href))
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative overflow-hidden group",
                    isActive 
                      ? "bg-sidebar-accent text-sidebar-primary" 
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                    sidebarCollapsed && "justify-center px-0"
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                  </motion.div>
                  <AnimatePresence mode="wait">
                    {!sidebarCollapsed && (
                      <motion.span 
                        className="text-sm font-medium"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Back to landing */}
        <div className="p-4 border-t border-sidebar-border">
          <Link href="/">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
            </motion.div>
          </Link>
        </div>
      </motion.aside>

      {/* Main content */}
      <div 
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        )}
      >
        {/* Top bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-6 bg-background/80 backdrop-blur-lg sticky top-0 z-40">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button 
                variant="ghost" 
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
            </motion.div>
            <div className="lg:hidden">
              <ProxyLogo size="small" />
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
              >
                <Zap className="w-5 h-5 text-primary" />
              </motion.div>
              <h1 className="font-semibold">Empresa Demo S.A.S</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <motion.div 
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20"
              whileHover={{ scale: 1.02 }}
            >
              <CreditCard className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">$2,450,000 COP</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <motion.span 
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-[10px] text-white flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {notifications}
                  </motion.span>
                )}
              </Button>
            </motion.div>
          </div>
        </header>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <motion.div 
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
              />
              <motion.aside 
                className="absolute inset-y-0 left-0 w-64 bg-sidebar border-r border-sidebar-border"
                initial={{ x: -256 }}
                animate={{ x: 0 }}
                exit={{ x: -256 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
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
                  {sidebarItems.map((item, index) => {
                    const isActive = pathname === item.href
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
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
                      </motion.div>
                    )
                  })}
                </nav>
              </motion.aside>
            </div>
          )}
        </AnimatePresence>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
