"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPlaceholder } from "@/components/map-placeholder"
import { StatusBadge } from "@/components/status-badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, Package, Camera, FileText, Users, Search, MapPin, Clock, DollarSign } from "lucide-react"

const availableTasks = [
  {
    id: "1",
    title: "Entrega de documentos",
    description: "Recoger y entregar sobre en zona norte",
    location: "Usaquén, Bogotá",
    distance: "2.3 km",
    payout: 18500,
    urgency: "normal",
    icon: FileText,
  },
  {
    id: "2",
    title: "Verificación de dirección",
    description: "Confirmar existencia de local comercial",
    location: "Chapinero, Bogotá",
    distance: "1.8 km",
    payout: 25000,
    urgency: "urgent",
    icon: Search,
  },
  {
    id: "3",
    title: "Fotografía de producto",
    description: "Tomar fotos de inventario en bodega",
    location: "Fontibón, Bogotá",
    distance: "5.2 km",
    payout: 45000,
    urgency: "normal",
    icon: Camera,
  },
  {
    id: "4",
    title: "Entrega express",
    description: "Llevar paquete pequeño urgente",
    location: "Zona T, Bogotá",
    distance: "3.1 km",
    payout: 32000,
    urgency: "urgent",
    icon: Package,
  },
  {
    id: "5",
    title: "Acompañamiento",
    description: "Acompañar a persona mayor a cita médica",
    location: "Cedritos, Bogotá",
    distance: "4.5 km",
    payout: 55000,
    urgency: "normal",
    icon: Users,
  },
]

const mapPins = [
  { x: 25, y: 30, active: true },
  { x: 45, y: 45, active: true },
  { x: 70, y: 25, active: false },
  { x: 60, y: 60, active: true },
  { x: 30, y: 70, active: false },
]

export default function OperadorDashboard() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-primary">
              <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                CM
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-foreground">Carlos Martínez</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${star <= 4 ? "text-amber-400 fill-amber-400" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">4.8</span>
              </div>
            </div>
          </div>
          <StatusBadge status="active">Nivel 3</StatusBadge>
        </div>
      </div>

      {/* Map */}
      <div className="px-4 pb-3">
        <MapPlaceholder 
          className="h-40 rounded-xl" 
          pins={mapPins}
          showOperator
          operatorPosition={{ x: 50, y: 50 }}
        />
      </div>

      {/* Tasks header */}
      <div className="px-4 py-2 flex items-center justify-between">
        <h2 className="font-semibold text-sm">Tareas disponibles</h2>
        <span className="text-xs text-muted-foreground">{availableTasks.length} cerca de ti</span>
      </div>

      {/* Tasks list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {availableTasks.map((task) => (
          <Link key={task.id} href={`/operador/tarea/${task.id}`}>
            <Card className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <task.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium text-sm truncate">{task.title}</h3>
                      {task.urgency === "urgent" && (
                        <StatusBadge status="urgent">Urgente</StatusBadge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {task.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {task.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        ~30 min
                      </span>
                      <span className="flex items-center gap-1 text-primary font-medium">
                        <DollarSign className="w-3 h-3" />
                        {task.payout.toLocaleString("es-CO")} COP
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
