"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  MessageSquare, 
  Send, 
  Bot,
  User
} from "lucide-react"
import { useState } from "react"

const initialMessages = [
  {
    id: "1",
    role: "assistant",
    content: "¡Hola Carlos! Soy tu coordinador IA. ¿En qué puedo ayudarte hoy?",
    timestamp: "10:30"
  },
  {
    id: "2",
    role: "user",
    content: "Tengo una pregunta sobre la tarea de entrega",
    timestamp: "10:32"
  },
  {
    id: "3",
    role: "assistant",
    content: "Claro, estoy aquí para ayudarte. ¿Cuál es tu pregunta sobre la tarea de entrega?",
    timestamp: "10:32"
  },
  {
    id: "4",
    role: "user",
    content: "El cliente no está en la dirección, ¿qué hago?",
    timestamp: "10:35"
  },
  {
    id: "5",
    role: "assistant",
    content: "Entiendo la situación. Aquí tienes los pasos a seguir:\n\n1. Intenta contactar al cliente por teléfono (número en la app)\n2. Espera 10 minutos en la ubicación\n3. Si no hay respuesta, toma una foto de la fachada\n4. Reporta la situación en la app\n\nYo notificaré al cliente automáticamente. ¿El cliente responde?",
    timestamp: "10:35"
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    
    const newMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: input,
      timestamp: new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })
    }
    
    setMessages([...messages, newMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: "Gracias por tu mensaje. Estoy procesando tu solicitud y te responderé en breve. Si es una emergencia, usa el botón de pánico en la pantalla de ejecución de tarea.",
        timestamp: new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold">Coordinador IA</h1>
            <p className="text-xs text-emerald-400">En línea</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarFallback className={
                message.role === "assistant" 
                  ? "bg-primary/20 text-primary" 
                  : "bg-secondary"
              }>
                {message.role === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </AvatarFallback>
            </Avatar>
            <div className={`max-w-[75%] ${message.role === "user" ? "items-end" : ""}`}>
              <Card className={`${
                message.role === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card/50 border-border/50"
              }`}>
                <CardContent className="p-3">
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </CardContent>
              </Card>
              <span className={`text-[10px] text-muted-foreground mt-1 block ${
                message.role === "user" ? "text-right" : ""
              }`}>
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-secondary border-0"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
