"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPlaceholder } from "@/components/map-placeholder"
import { StatusBadge } from "@/components/status-badge"
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Star,
  CheckCircle,
  Navigation,
  Play,
  Send,
  Image,
  XCircle,
  Bot
} from "lucide-react"

const taskSteps = [
  { id: "asignada", label: "Asignada", completed: true },
  { id: "en-camino", label: "Operador en camino", completed: true },
  { id: "en-ubicacion", label: "En ubicación", completed: true },
  { id: "ejecutando", label: "Ejecutando", completed: false },
  { id: "completada", label: "Completada", completed: false },
]

const chatMessages = [
  { role: "system", content: "Tarea asignada a Carlos Martínez", time: "10:30" },
  { role: "system", content: "Operador en camino al destino", time: "10:35" },
  { role: "assistant", content: "El operador está a 5 minutos del destino. ETA: 10:42", time: "10:37" },
  { role: "system", content: "Operador llegó a la ubicación", time: "10:41" },
  { role: "assistant", content: "Carlos ha iniciado la ejecución de la tarea. Te notificaré cuando complete cada paso.", time: "10:43" },
]

const evidenceImages = [
  { id: 1, label: "Fachada del local" },
  { id: 2, label: "Documento recibido" },
]

export default function TaskTrackingPage() {
  const router = useRouter()
  const params = useParams()
  const [operatorPosition, setOperatorPosition] = useState({ x: 60, y: 45 })
  const [chatInput, setChatInput] = useState("")

  // Simulate operator movement
  useEffect(() => {
    const interval = setInterval(() => {
      setOperatorPosition(pos => ({
        x: Math.max(40, Math.min(70, pos.x + (Math.random() - 0.5) * 2)),
        y: Math.max(35, Math.min(55, pos.y + (Math.random() - 0.5) * 2)),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Seguimiento de Tarea</h1>
          <p className="text-muted-foreground">TASK-{params.id} - Entrega de documentos legales</p>
        </div>
        <Button variant="destructive" size="sm">
          <XCircle className="w-4 h-4 mr-2" />
          Cancelar tarea
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column - Map and operator */}
        <div className="lg:col-span-2 space-y-6">
          {/* Real-time map */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Ubicación en tiempo real
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MapPlaceholder 
                className="h-64" 
                pins={[{ x: 50, y: 50, active: true, label: "Destino" }]}
                showOperator
                operatorPosition={operatorPosition}
              />
            </CardContent>
          </Card>

          {/* Operator card */}
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 border-2 border-primary">
                  <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                    CM
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Carlos Martínez</h3>
                    <StatusBadge status="active">Nivel 3</StatusBadge>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${star <= 4 ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">4.8 (156 tareas)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-primary">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold">ETA: 5 min</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Tiempo transcurrido: 12 min</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress timeline */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Progreso de la tarea</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                {taskSteps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center flex-1">
                    <div className="relative w-full flex items-center justify-center">
                      {index > 0 && (
                        <div className={`absolute left-0 right-1/2 h-0.5 -translate-y-1/2 top-1/2 ${
                          step.completed ? "bg-emerald-500" : "bg-border"
                        }`} />
                      )}
                      {index < taskSteps.length - 1 && (
                        <div className={`absolute left-1/2 right-0 h-0.5 -translate-y-1/2 top-1/2 ${
                          taskSteps[index + 1]?.completed ? "bg-emerald-500" : "bg-border"
                        }`} />
                      )}
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? "bg-emerald-500 text-white" 
                          : index === taskSteps.findIndex(s => !s.completed)
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : index === 1 ? (
                          <Navigation className="w-4 h-4" />
                        ) : index === 2 ? (
                          <MapPin className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                    <span className={`text-xs mt-2 text-center ${
                      step.completed ? "text-emerald-400" : "text-muted-foreground"
                    }`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Evidence received */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Image className="w-5 h-5 text-primary" />
                Evidencia recibida
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                {evidenceImages.map((img) => (
                  <div key={img.id} className="space-y-1">
                    <div className="w-24 h-24 rounded-lg bg-secondary flex items-center justify-center">
                      <Image className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">{img.label}</p>
                  </div>
                ))}
                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                  <span className="text-xs text-muted-foreground text-center px-2">Esperando más...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Chat */}
        <div className="space-y-6">
          <Card className="bg-card/50 border-border/50 h-[600px] flex flex-col">
            <CardHeader className="pb-2 border-b border-border">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                Chat con coordinador IA
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`${msg.role === "system" ? "text-center" : ""}`}>
                  {msg.role === "system" ? (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3" />
                      {msg.content}
                      <span className="text-[10px]">{msg.time}</span>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-primary/20 text-primary text-[10px]">
                          <Bot className="w-3 h-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Card className="bg-secondary border-0">
                          <CardContent className="p-2">
                            <p className="text-sm">{msg.content}</p>
                          </CardContent>
                        </Card>
                        <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="bg-secondary border-0"
                />
                <Button size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
