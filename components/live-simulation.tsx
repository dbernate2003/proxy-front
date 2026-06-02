"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Package, 
  Camera, 
  FileText, 
  Users, 
  Search,
  MapPin,
  CheckCircle,
  Clock,
  Zap,
  User
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Task {
  id: string
  title: string
  location: string
  status: "created" | "assigning" | "assigned" | "in-progress" | "completed"
  operator?: string
  icon: typeof Package
  progress: number
}

interface Operator {
  id: string
  name: string
  x: number
  y: number
  status: "idle" | "moving" | "working"
  targetX?: number
  targetY?: number
}

interface LiveSimulationProps {
  className?: string
  autoStart?: boolean
  speed?: "slow" | "normal" | "fast"
}

const taskTypes = [
  { title: "Entrega de documentos", icon: FileText, location: "Usaquen" },
  { title: "Verificacion comercial", icon: Search, location: "Chapinero" },
  { title: "Fotografia de producto", icon: Camera, location: "Fontibon" },
  { title: "Entrega express", icon: Package, location: "Zona T" },
  { title: "Acompanamiento", icon: Users, location: "Cedritos" },
]

const operatorNames = [
  "Carlos M.", "Maria L.", "Andres G.", "Laura R.", "Diego H.",
  "Sofia P.", "Juan D.", "Valentina S."
]

export function LiveSimulation({ 
  className = "", 
  autoStart = true,
  speed = "normal" 
}: LiveSimulationProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [operators, setOperators] = useState<Operator[]>([])
  const [stats, setStats] = useState({ created: 0, completed: 0, active: 0 })
  const [isRunning, setIsRunning] = useState(autoStart)

  const speedMultiplier = { slow: 2, normal: 1, fast: 0.5 }[speed]

  // Initialize operators
  useEffect(() => {
    const initialOperators: Operator[] = operatorNames.slice(0, 5).map((name, i) => ({
      id: `op-${i}`,
      name,
      x: 60 + Math.random() * 30,
      y: 20 + (i * 15) + Math.random() * 10,
      status: "idle",
    }))
    setOperators(initialOperators)
  }, [])

  // Create new task
  const createTask = useCallback(() => {
    const taskType = taskTypes[Math.floor(Math.random() * taskTypes.length)]
    const newTask: Task = {
      id: `task-${Date.now()}`,
      ...taskType,
      status: "created",
      progress: 0,
    }
    setTasks(prev => [...prev.slice(-8), newTask])
    setStats(prev => ({ ...prev, created: prev.created + 1 }))
    return newTask.id
  }, [])

  // Assign task to operator
  const assignTask = useCallback((taskId: string) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, status: "assigning" } : t
    ))

    setTimeout(() => {
      const availableOperator = operators.find(o => o.status === "idle")
      if (availableOperator) {
        setTasks(prev => prev.map(t => 
          t.id === taskId 
            ? { ...t, status: "assigned", operator: availableOperator.name } 
            : t
        ))
        setOperators(prev => prev.map(o =>
          o.id === availableOperator.id 
            ? { ...o, status: "moving", targetX: 20 + Math.random() * 20, targetY: 20 + Math.random() * 60 }
            : o
        ))
        setStats(prev => ({ ...prev, active: prev.active + 1 }))
      }
    }, 800 * speedMultiplier)
  }, [operators, speedMultiplier])

  // Progress task
  const progressTask = useCallback((taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t
      if (t.status === "assigned") {
        return { ...t, status: "in-progress", progress: 25 }
      }
      if (t.status === "in-progress" && t.progress < 100) {
        const newProgress = Math.min(t.progress + 25, 100)
        if (newProgress === 100) {
          setStats(s => ({ ...s, completed: s.completed + 1, active: Math.max(0, s.active - 1) }))
          // Free up operator
          setOperators(ops => ops.map(o =>
            o.name === t.operator
              ? { ...o, status: "idle", targetX: 60 + Math.random() * 30, targetY: o.y }
              : o
          ))
          return { ...t, status: "completed", progress: 100 }
        }
        return { ...t, progress: newProgress }
      }
      return t
    }))
  }, [])

  // Main simulation loop
  useEffect(() => {
    if (!isRunning) return

    // Create tasks periodically
    const createInterval = setInterval(() => {
      if (tasks.filter(t => t.status !== "completed").length < 4) {
        createTask()
      }
    }, 3000 * speedMultiplier)

    // Process tasks
    const processInterval = setInterval(() => {
      setTasks(prev => {
        const unassigned = prev.find(t => t.status === "created")
        if (unassigned && operators.some(o => o.status === "idle")) {
          assignTask(unassigned.id)
        }

        const inProgress = prev.filter(t => t.status === "assigned" || t.status === "in-progress")
        inProgress.forEach(t => progressTask(t.id))

        return prev
      })
    }, 1500 * speedMultiplier)

    // Move operators
    const moveInterval = setInterval(() => {
      setOperators(prev => prev.map(o => {
        if (o.status === "idle" && o.targetX) {
          const dx = (o.targetX - o.x) * 0.1
          const dy = (o.targetY! - o.y) * 0.1
          if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
            return { ...o, targetX: undefined, targetY: undefined }
          }
          return { ...o, x: o.x + dx, y: o.y + dy }
        }
        if (o.status === "moving" && o.targetX) {
          const dx = (o.targetX - o.x) * 0.15
          const dy = (o.targetY! - o.y) * 0.15
          if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
            return { ...o, status: "working", x: o.targetX, y: o.targetY! }
          }
          return { ...o, x: o.x + dx, y: o.y + dy }
        }
        return o
      }))
    }, 100)

    return () => {
      clearInterval(createInterval)
      clearInterval(processInterval)
      clearInterval(moveInterval)
    }
  }, [isRunning, tasks, operators, createTask, assignTask, progressTask, speedMultiplier])

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "created": return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "assigning": return "bg-primary/20 text-primary border-primary/30"
      case "assigned": return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "in-progress": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "completed": return "bg-muted text-muted-foreground border-border"
    }
  }

  const getStatusText = (status: Task["status"]) => {
    switch (status) {
      case "created": return "Nueva"
      case "assigning": return "IA asignando..."
      case "assigned": return "Asignada"
      case "in-progress": return "En progreso"
      case "completed": return "Completada"
    }
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-background via-card/50 to-background border border-border/50 ${className}`}>
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-xs font-medium text-muted-foreground">
            Simulacion en vivo
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-muted-foreground">
            <span className="text-amber-400 font-semibold">{stats.created}</span> creadas
          </span>
          <span className="text-muted-foreground">
            <span className="text-primary font-semibold">{stats.active}</span> activas
          </span>
          <span className="text-muted-foreground">
            <span className="text-emerald-400 font-semibold">{stats.completed}</span> completadas
          </span>
        </div>
      </div>

      {/* Map area */}
      <div className="h-full min-h-[400px] relative">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="sim-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sim-grid)" />
          </svg>
        </div>

        {/* AI Core */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <motion.div
            className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center"
            animate={{
              boxShadow: [
                "0 0 20px oklch(0.75 0.15 195 / 0.3)",
                "0 0 40px oklch(0.75 0.15 195 / 0.5)",
                "0 0 20px oklch(0.75 0.15 195 / 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="w-8 h-8 text-primary" />
          </motion.div>
          <p className="text-[10px] text-primary font-semibold text-center mt-2">PROXY AI</p>
        </motion.div>

        {/* Connection lines to operators */}
        <svg className="absolute inset-0 pointer-events-none" style={{ overflow: "visible" }}>
          {operators.map((op) => (
            <motion.line
              key={`line-${op.id}`}
              x1="50%"
              y1="50%"
              x2={`${op.x}%`}
              y2={`${op.y}%`}
              stroke={op.status === "working" ? "oklch(0.7 0.18 145 / 0.5)" : "oklch(0.3 0.02 250)"}
              strokeWidth={op.status === "working" ? 2 : 1}
              strokeDasharray={op.status === "moving" ? "5,5" : "none"}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </svg>

        {/* Operators */}
        {operators.map((op) => (
          <motion.div
            key={op.id}
            className="absolute flex flex-col items-center"
            style={{ left: `${op.x}%`, top: `${op.y}%` }}
            animate={{ x: "-50%", y: "-50%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                op.status === "working" 
                  ? "bg-emerald-500/20 border-emerald-400" 
                  : op.status === "moving"
                  ? "bg-primary/20 border-primary"
                  : "bg-muted border-border"
              }`}
              animate={op.status === "working" ? {
                scale: [1, 1.1, 1],
              } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <User className={`w-5 h-5 ${
                op.status === "working" 
                  ? "text-emerald-400" 
                  : op.status === "moving"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`} />
            </motion.div>
            <span className="text-[10px] text-muted-foreground mt-1 whitespace-nowrap">
              {op.name}
            </span>
          </motion.div>
        ))}

        {/* Task feed */}
        <div className="absolute left-4 top-14 bottom-4 w-56 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {tasks.slice(-5).reverse().map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="mb-2"
              >
                <Card className={`bg-card/80 backdrop-blur-sm border-border/50 ${index === 0 ? "ring-1 ring-primary/30" : ""}`}>
                  <CardContent className="p-3">
                    <div className="flex items-start gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        task.status === "completed" ? "bg-muted" : "bg-primary/10"
                      }`}>
                        <task.icon className={`w-4 h-4 ${
                          task.status === "completed" ? "text-muted-foreground" : "text-primary"
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium truncate ${
                          task.status === "completed" ? "text-muted-foreground" : ""
                        }`}>
                          {task.title}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-[10px] text-muted-foreground">{task.location}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1.5">
                          <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getStatusColor(task.status)}`}>
                            {getStatusText(task.status)}
                          </Badge>
                          {task.operator && (
                            <span className="text-[10px] text-muted-foreground">{task.operator}</span>
                          )}
                        </div>
                        {task.status === "in-progress" && (
                          <div className="mt-1.5">
                            <div className="h-1 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-emerald-400 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${task.progress}%` }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 flex items-center gap-4 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Cliente</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>IA</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Operador</span>
          </div>
        </div>
      </div>
    </div>
  )
}
