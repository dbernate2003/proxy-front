"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StatusBadge } from "@/components/status-badge"
import { 
  Key, 
  Plus, 
  Copy, 
  Eye, 
  EyeOff,
  Trash2,
  AlertTriangle,
  Code,
  ExternalLink
} from "lucide-react"

const apiKeys = [
  {
    id: "1",
    name: "Producción",
    key: "pk_live_************************",
    fullKey: "pk_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    created: "Jun 15, 2024",
    lastUsed: "Hace 2 horas",
    status: "active",
  },
  {
    id: "2",
    name: "Desarrollo",
    key: "pk_test_************************",
    fullKey: "pk_test_x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6",
    created: "Jun 10, 2024",
    lastUsed: "Hace 5 min",
    status: "active",
  },
  {
    id: "3",
    name: "Staging (antigua)",
    key: "pk_test_************************",
    fullKey: "pk_test_old_deprecated_key_12345",
    created: "Ene 20, 2024",
    lastUsed: "Hace 30 días",
    status: "inactive",
  },
]

export default function ApiKeysPage() {
  const [visibleKeys, setVisibleKeys] = useState<string[]>([])
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const toggleKeyVisibility = (keyId: string) => {
    if (visibleKeys.includes(keyId)) {
      setVisibleKeys(visibleKeys.filter(id => id !== keyId))
    } else {
      setVisibleKeys([...visibleKeys, keyId])
    }
  }

  const copyToClipboard = (key: string, keyId: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(keyId)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">API Keys</h1>
          <p className="text-muted-foreground">Gestiona tus claves de acceso a la API de PROXY</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Crear nueva API Key
        </Button>
      </div>

      {/* Warning */}
      <Card className="bg-amber-500/10 border-amber-500/20">
        <CardContent className="p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-400">Mantén tus API Keys seguras</p>
            <p className="text-sm text-muted-foreground mt-1">
              Nunca compartas tus claves de producción ni las expongas en código del lado del cliente.
              Usa variables de entorno para almacenarlas de forma segura.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* API Keys list */}
      <div className="space-y-4">
        {apiKeys.map((apiKey) => (
          <Card key={apiKey.id} className={`bg-card/50 border-border/50 ${apiKey.status === "inactive" ? "opacity-60" : ""}`}>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Key className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{apiKey.name}</h3>
                      <StatusBadge status={apiKey.status === "active" ? "active" : "cancelled"}>
                        {apiKey.status === "active" ? "Activa" : "Inactiva"}
                      </StatusBadge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-sm font-mono bg-secondary px-2 py-0.5 rounded">
                        {visibleKeys.includes(apiKey.id) ? apiKey.fullKey : apiKey.key}
                      </code>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-7 h-7"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                      >
                        {visibleKeys.includes(apiKey.id) ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-7 h-7"
                        onClick={() => copyToClipboard(apiKey.fullKey, apiKey.id)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      {copiedKey === apiKey.id && (
                        <span className="text-xs text-emerald-400">Copiada!</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Creada: {apiKey.created} · Último uso: {apiKey.lastUsed}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* API Documentation */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            Documentación de la API
          </CardTitle>
          <CardDescription>
            Aprende a integrar PROXY en tus aplicaciones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-secondary rounded-lg p-4 font-mono text-sm">
            <p className="text-muted-foreground"># Crear una nueva tarea</p>
            <p className="mt-2">
              <span className="text-emerald-400">curl</span> -X POST https://api.proxy.co/v1/tasks \
            </p>
            <p className="pl-4">
              -H <span className="text-amber-400">&quot;Authorization: Bearer YOUR_API_KEY&quot;</span> \
            </p>
            <p className="pl-4">
              -H <span className="text-amber-400">&quot;Content-Type: application/json&quot;</span> \
            </p>
            <p className="pl-4">
              -d <span className="text-primary">{`'{"type": "delivery", "address": "..."}'`}</span>
            </p>
          </div>
          <Button variant="outline" className="w-full sm:w-auto">
            <ExternalLink className="w-4 h-4 mr-2" />
            Ver documentación completa
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
