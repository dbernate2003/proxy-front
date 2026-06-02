"use client"

import Link from "next/link"
import { ProxyLogo } from "@/components/proxy-logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, Monitor, Shield, Zap, Users, CheckCircle } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <ProxyLogo size="default" />
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Características
            </Link>
            <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cómo funciona
            </Link>
            <Link href="/cliente" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Para Empresas
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/cliente">Iniciar sesión</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/operador">Ser Operador</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-8">
            <Zap className="w-4 h-4" />
            Plataforma de operadores verificados
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
            Presencia humana,
            <br />
            <span className="text-primary">cuando la necesitas.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
            Conectamos agentes de IA con operadores humanos verificados para ejecutar tareas físicas en el mundo real. Entregas, verificaciones, inspecciones y más.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="min-w-[200px]" asChild>
              <Link href="/cliente">
                <Monitor className="w-5 h-5 mr-2" />
                Panel de Clientes
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="min-w-[200px]" asChild>
              <Link href="/operador">
                <Smartphone className="w-5 h-5 mr-2" />
                App de Operadores
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Todo lo que necesitas</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Una plataforma completa para gestionar tareas físicas con operadores verificados en toda Colombia.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <Shield className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Operadores Verificados</CardTitle>
                <CardDescription>
                  Verificación biométrica y documental de todos los operadores para máxima confianza.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <Zap className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Coordinación con IA</CardTitle>
                <CardDescription>
                  Agentes de IA optimizan la asignación de tareas y guían a los operadores en tiempo real.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <Users className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Cobertura Nacional</CardTitle>
                <CardDescription>
                  Red de operadores en las principales ciudades de Colombia disponibles 24/7.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <CheckCircle className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Evidencia Digital</CardTitle>
                <CardDescription>
                  Fotos, videos, firmas digitales y formularios como prueba de cada tarea completada.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <Monitor className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Seguimiento en Vivo</CardTitle>
                <CardDescription>
                  Visualiza la ubicación de tus operadores y el progreso de las tareas en tiempo real.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <Smartphone className="w-10 h-10 text-primary mb-2" />
                <CardTitle>App Móvil</CardTitle>
                <CardDescription>
                  Aplicación optimizada para operadores con interfaz intuitiva y uso con una mano.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Selection */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Elige tu plataforma</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Dos productos diseñados para diferentes necesidades.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Smartphone className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">App de Operadores</CardTitle>
                <CardDescription>
                  Para personas que quieren ganar dinero ejecutando tareas en la calle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Verificación de identidad
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Mapa de tareas disponibles
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Billetera digital
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Sistema de certificaciones
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/operador">Explorar App</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50 hover:border-primary/50 transition-colors group">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Monitor className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Panel de Clientes</CardTitle>
                <CardDescription>
                  Para empresas e individuos que necesitan ordenar tareas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Dashboard con métricas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Crear y programar tareas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Seguimiento en tiempo real
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Reportes y facturación
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/cliente">Explorar Panel</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <ProxyLogo size="small" />
            <p className="text-sm text-muted-foreground">
              © 2024 PROXY. Todos los derechos reservados. Bogota, Colombia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
