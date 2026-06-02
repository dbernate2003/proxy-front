"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ProxyLogo } from "@/components/proxy-logo"
import { AINetwork } from "@/components/ai-network"
import { LiveSimulation } from "@/components/live-simulation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover, AnimatedCounter, GlowButton, Floating } from "@/components/motion-primitives"
import { Smartphone, Monitor, Shield, Zap, Users, CheckCircle, ArrowRight, Play } from "lucide-react"
import { useState } from "react"

const features = [
  {
    icon: Shield,
    title: "Operadores Verificados",
    description: "Verificacion biometrica y documental de todos los operadores para maxima confianza.",
  },
  {
    icon: Zap,
    title: "Coordinacion con IA",
    description: "Agentes de IA optimizan la asignacion de tareas y guian a los operadores en tiempo real.",
  },
  {
    icon: Users,
    title: "Cobertura Nacional",
    description: "Red de operadores en las principales ciudades de Colombia disponibles 24/7.",
  },
  {
    icon: CheckCircle,
    title: "Evidencia Digital",
    description: "Fotos, videos, firmas digitales y formularios como prueba de cada tarea completada.",
  },
  {
    icon: Monitor,
    title: "Seguimiento en Vivo",
    description: "Visualiza la ubicacion de tus operadores y el progreso de las tareas en tiempo real.",
  },
  {
    icon: Smartphone,
    title: "App Movil",
    description: "Aplicacion optimizada para operadores con interfaz intuitiva y uso con una mano.",
  },
]

const stats = [
  { value: 1247, label: "Operadores verificados", suffix: "+" },
  { value: 98.5, label: "Tasa de exito", suffix: "%", decimals: 1 },
  { value: 15000, label: "Tareas completadas", suffix: "+" },
  { value: 32, label: "Tiempo promedio", suffix: " min" },
]

export default function LandingPage() {
  const [showSimulation, setShowSimulation] = useState(false)

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <motion.header 
        className="border-b border-border/50 sticky top-0 z-50 bg-background/80 backdrop-blur-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <ProxyLogo size="default" />
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Caracteristicas
            </Link>
            <Link href="#demo" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Demo en vivo
            </Link>
            <Link href="/cliente" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Para Empresas
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/cliente">Iniciar sesion</Link>
            </Button>
            <GlowButton>
              <Button size="sm" asChild>
                <Link href="/operador">Ser Operador</Link>
              </Button>
            </GlowButton>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="py-16 md:py-24 relative">
        {/* Background AI Network */}
        <div className="absolute inset-0 opacity-30">
          <AINetwork className="w-full h-full" density="low" interactive={false} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <FadeIn delay={0.1}>
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-4 h-4" />
              </motion.div>
              Plataforma de operadores verificados
            </motion.div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
              Presencia humana,
              <br />
              <span className="text-primary relative">
                cuando la necesitas.
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/50 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
              Conectamos agentes de IA con operadores humanos verificados para ejecutar tareas fisicas en el mundo real. Entregas, verificaciones, inspecciones y mas.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlowButton>
                <Button size="lg" className="min-w-[200px] group" asChild>
                  <Link href="/cliente">
                    <Monitor className="w-5 h-5 mr-2" />
                    Panel de Clientes
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </GlowButton>
              <Button size="lg" variant="outline" className="min-w-[200px] group" asChild>
                <Link href="/operador">
                  <Smartphone className="w-5 h-5 mr-2" />
                  App de Operadores
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border/50 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <FadeIn key={stat.label} delay={0.1 * index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix} 
                    decimals={stat.decimals || 0}
                    duration={2}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="py-20 border-b border-border/50">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mira la IA en accion</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Observa como PROXY coordina operadores en tiempo real. Clientes crean tareas, la IA asigna al mejor operador, y las tareas se completan.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-5xl mx-auto">
              {showSimulation ? (
                <LiveSimulation className="h-[500px]" speed="normal" />
              ) : (
                <motion.div 
                  className="h-[500px] rounded-2xl bg-gradient-to-br from-card via-card/50 to-background border border-border/50 flex items-center justify-center cursor-pointer group"
                  onClick={() => setShowSimulation(true)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors"
                      animate={{
                        boxShadow: [
                          "0 0 20px oklch(0.75 0.15 195 / 0.3)",
                          "0 0 40px oklch(0.75 0.15 195 / 0.5)",
                          "0 0 20px oklch(0.75 0.15 195 / 0.3)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Play className="w-8 h-8 text-primary ml-1" />
                    </motion.div>
                    <p className="text-lg font-semibold mb-1">Iniciar simulacion</p>
                    <p className="text-sm text-muted-foreground">Haz clic para ver la plataforma en accion</p>
                  </div>
                </motion.div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 border-b border-border/50">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Todo lo que necesitas</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Una plataforma completa para gestionar tareas fisicas con operadores verificados en toda Colombia.
            </p>
          </FadeIn>
          
          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <ScaleOnHover>
                  <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 h-full group">
                    <CardHeader>
                      <motion.div
                        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <feature.icon className="w-6 h-6 text-primary" />
                      </motion.div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Product Selection */}
      <section className="py-20 border-b border-border/50">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Elige tu plataforma</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Dos productos disenados para diferentes necesidades.
            </p>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FadeIn delay={0.1} direction="left">
              <ScaleOnHover scale={1.03}>
                <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 group h-full">
                  <CardHeader className="text-center pb-4">
                    <Floating amplitude={5}>
                      <motion.div 
                        className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors"
                        whileHover={{ rotate: 5 }}
                      >
                        <Smartphone className="w-8 h-8 text-primary" />
                      </motion.div>
                    </Floating>
                    <CardTitle className="text-xl">App de Operadores</CardTitle>
                    <CardDescription>
                      Para personas que quieren ganar dinero ejecutando tareas en la calle
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {["Verificacion de identidad", "Mapa de tareas disponibles", "Billetera digital", "Sistema de certificaciones"].map((item, i) => (
                        <motion.li 
                          key={item}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                    <GlowButton className="w-full">
                      <Button className="w-full group" asChild>
                        <Link href="/operador">
                          Explorar App
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </GlowButton>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </FadeIn>
            
            <FadeIn delay={0.2} direction="right">
              <ScaleOnHover scale={1.03}>
                <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 group h-full">
                  <CardHeader className="text-center pb-4">
                    <Floating amplitude={5}>
                      <motion.div 
                        className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors"
                        whileHover={{ rotate: -5 }}
                      >
                        <Monitor className="w-8 h-8 text-primary" />
                      </motion.div>
                    </Floating>
                    <CardTitle className="text-xl">Panel de Clientes</CardTitle>
                    <CardDescription>
                      Para empresas e individuos que necesitan ordenar tareas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {["Dashboard con metricas", "Crear y programar tareas", "Seguimiento en tiempo real", "Reportes y facturacion"].map((item, i) => (
                        <motion.li 
                          key={item}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                    <GlowButton className="w-full">
                      <Button className="w-full group" asChild>
                        <Link href="/cliente">
                          Explorar Panel
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </GlowButton>
                  </CardContent>
                </Card>
              </ScaleOnHover>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <ProxyLogo size="small" />
            <p className="text-sm text-muted-foreground">
              2024 PROXY. Todos los derechos reservados. Bogota, Colombia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
