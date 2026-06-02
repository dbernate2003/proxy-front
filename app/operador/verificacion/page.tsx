"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft,
  Camera,
  FileText,
  CheckCircle,
  Upload,
  Loader2,
  Shield,
  User,
  CreditCard
} from "lucide-react"

const verificationSteps = [
  { id: 1, title: "Selfie biométrica", icon: Camera, completed: true },
  { id: 2, title: "Documento frontal", icon: CreditCard, completed: true },
  { id: 3, title: "Documento reverso", icon: CreditCard, completed: true },
  { id: 4, title: "Comprobante de dirección", icon: FileText, completed: false },
  { id: 5, title: "Verificación final", icon: Shield, completed: false },
]

export default function VerificacionPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(3)
  const [isUploading, setIsUploading] = useState(false)

  const completedSteps = verificationSteps.filter(s => s.completed).length
  const progress = (completedSteps / verificationSteps.length) * 100

  const handleUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setCurrentStep(currentStep + 1)
    }, 2000)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-8 h-8"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-semibold">Verificación de identidad</h1>
          <p className="text-xs text-muted-foreground">Paso {currentStep + 1} de 5</p>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 pb-4">
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2 text-center">
          {completedSteps} de {verificationSteps.length} pasos completados
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {/* Steps list */}
        <div className="space-y-2">
          {verificationSteps.map((step, index) => (
            <Card 
              key={step.id}
              className={`${
                step.completed 
                  ? "bg-emerald-500/10 border-emerald-500/20" 
                  : index === currentStep 
                    ? "bg-primary/10 border-primary/20"
                    : "bg-card/30 border-border/30"
              }`}
            >
              <CardContent className="p-3 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.completed 
                    ? "bg-emerald-500 text-white"
                    : index === currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                }`}>
                  {step.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    !step.completed && index !== currentStep ? "text-muted-foreground" : ""
                  }`}>
                    {step.title}
                  </p>
                  {step.completed && (
                    <p className="text-[10px] text-emerald-400">Completado</p>
                  )}
                  {index === currentStep && !step.completed && (
                    <p className="text-[10px] text-primary">En progreso</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Current step action */}
        {currentStep < verificationSteps.length && !verificationSteps[currentStep].completed && (
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                {(() => {
                  const IconComponent = verificationSteps[currentStep].icon
                  return IconComponent ? <IconComponent className="w-8 h-8 text-primary" /> : null
                })()}
              </div>
              <h3 className="font-semibold mb-2">{verificationSteps[currentStep].title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {currentStep === 3 
                  ? "Sube un recibo de servicios públicos o extracto bancario reciente"
                  : "Verificaremos tu identidad con los documentos proporcionados"}
              </p>
              
              {currentStep === 3 ? (
                <div 
                  className="border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:border-primary/50 transition-colors mb-4"
                  onClick={handleUpload}
                >
                  {isUploading ? (
                    <Loader2 className="w-8 h-8 text-primary mx-auto animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Toca para subir documento</p>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm">Verificando identidad...</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {completedSteps === verificationSteps.length && (
          <Card className="bg-emerald-500/10 border-emerald-500/20">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-1">Verificación Completa</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tu identidad ha sido verificada exitosamente. Ya puedes aceptar tareas.
              </p>
              <Button onClick={() => router.push("/operador")}>
                Ir al inicio
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
