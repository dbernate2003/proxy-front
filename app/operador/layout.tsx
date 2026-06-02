"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { PhoneFrame } from "@/components/phone-frame"
import { ProxyLogo } from "@/components/proxy-logo"
import { cn } from "@/lib/utils"
import { Home, ClipboardList, Wallet, MessageSquare, User, ArrowLeft, Zap } from "lucide-react"
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

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8">
      {/* Desktop header */}
      <motion.div 
        className="w-full max-w-6xl mx-auto px-4 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ x: -3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </motion.div>
            <ProxyLogo size="small" />
          </Link>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <Zap className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm text-muted-foreground">Vista previa de la</span>
            <span className="text-sm font-medium text-primary">App de Operadores</span>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant="outline" size="sm" asChild>
              <Link href="/cliente">Ver Panel de Clientes</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Phone frame container */}
      <motion.div 
        className="flex-1 flex items-start justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <PhoneFrame>
          <div className="flex flex-col h-full">
            {/* Screen content */}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>

            {/* Bottom navigation - Optimized for thumb reach */}
            <nav className="flex-shrink-0 border-t border-border bg-background/95 backdrop-blur-lg px-2 py-2 safe-area-pb">
              <div className="flex items-center justify-around">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href || 
                    (item.href !== "/operador" && pathname.startsWith(item.href))
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 relative min-w-[56px]",
                          isActive 
                            ? "text-primary" 
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {/* Active background */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 bg-primary/10 rounded-xl"
                            layoutId="navActiveBackground"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="relative"
                        >
                          <item.icon className="w-5 h-5" />
                          {/* Notification dot for chat */}
                          {item.label === "Chat" && (
                            <motion.span
                              className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          )}
                        </motion.div>
                        <span className="text-[10px] font-medium relative">{item.label}</span>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </nav>
          </div>
        </PhoneFrame>
      </motion.div>
    </div>
  )
}
