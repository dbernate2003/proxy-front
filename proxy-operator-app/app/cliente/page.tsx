"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPlaceholder } from "@/components/map-placeholder"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  ClipboardList, 
  CheckCircle, 
  TrendingUp, 
  Clock,
  Plus,
  Eye,
  MapPin
} from "lucide-react"

const kpiData = [
  { 
    title: "Tareas Activas", 
    value: "12", 
    change: "+3 hoy",
    icon: ClipboardList,
    color: "text-primary"
  },
  { 
    title: "Completadas este mes", 
    value: "156", 
    change: "+23% vs mes anterior",
    icon: CheckCircle,
    color: "text-emerald-400"
  },
  { 
    title: "Tasa de éxito", 
    value: "98.2%", 
    change: "+0.5%",
    icon: TrendingUp,
    color: "text-amber-400"
  },
  { 
    title: "Tiempo promedio", 
    value: "32 min", 
    change: "-5 min vs promedio",
    icon: Clock,
    color: "text-primary"
  },
]

const activeTasks = [
  {
    id: "TASK-001",
    description: "Entrega de documentos legales",
    operator: "Carlos Martínez",
    status: "active",
    progress: 65,
    elapsed: "18 min",
    location: "Usaquén"
  },
  {
    id: "TASK-002",
    description: "Verificación de dirección comercial",
    operator: "María López",
    status: "active",
    progress: 30,
    elapsed: "8 min",
    location: "Chapinero"
  },
  {
    id: "TASK-003",
    description: "Fotografía de inventario",
    operator: "Andrés García",
    status: "pending",
    progress: 0,
    elapsed: "Asignando...",
    location: "Fontibón"
  },
  {
    id: "TASK-004",
    description: "Entrega express - Zona T",
    operator: "Laura Rodríguez",
    status: "active",
    progress: 85,
    elapsed: "22 min",
    location: "Zona T"
  },
  {
    id: "TASK-005",
    description: "Acompañamiento a cita médica",
    operator: "Diego Hernández",
    status: "active",
    progress: 45,
    elapsed: "45 min",
    location: "Cedritos"
  },
]

const operatorPins = [
  { x: 20, y: 30, active: true, label: "Carlos" },
  { x: 45, y: 20, active: true, label: "María" },
  { x: 70, y: 50, active: true, label: "Laura" },
  { x: 35, y: 65, active: true, label: "Diego" },
  { x: 80, y: 35, active: false },
]

export default function ClienteDashboard() {
  const [animatedPins, setAnimatedPins] = useState(operatorPins)

  // Simulate real-time movement
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedPins(pins => pins.map(pin => ({
        ...pin,
        x: pin.active ? Math.max(10, Math.min(90, pin.x + (Math.random() - 0.5) * 3)) : pin.x,
        y: pin.active ? Math.max(10, Math.min(90, pin.y + (Math.random() - 0.5) * 3)) : pin.y,
      })))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Resumen de operaciones en tiempo real</p>
        </div>
        <Button asChild>
          <Link href="/cliente/nueva-tarea">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Tarea
          </Link>
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className={`text-2xl font-bold mt-1 ${kpi.color}`}>{kpi.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{kpi.change}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Operadores en tiempo real
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MapPlaceholder 
            className="h-64 lg:h-80" 
            pins={animatedPins}
            showOperator={false}
          />
        </CardContent>
      </Card>

      {/* Active Tasks Table */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Tareas Activas</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/cliente/tareas-activas">Ver todas</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Operador</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Progreso</TableHead>
                  <TableHead>Tiempo</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-mono text-xs">{task.id}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{task.description}</TableCell>
                    <TableCell>{task.operator}</TableCell>
                    <TableCell>
                      <StatusBadge status={task.status as "active" | "pending"}>
                        {task.status === "active" ? "En progreso" : "Pendiente"}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <Progress value={task.progress} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground w-8">{task.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{task.elapsed}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/cliente/tarea/${task.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
