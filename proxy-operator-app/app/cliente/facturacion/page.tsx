"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/status-badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  CreditCard, 
  Plus, 
  Download, 
  Receipt,
  TrendingUp,
  FileText
} from "lucide-react"

const invoices = [
  {
    id: "INV-2024-001",
    date: "Jun 30, 2024",
    amount: 1250000,
    tasksCount: 45,
    status: "paid",
  },
  {
    id: "INV-2024-002",
    date: "May 31, 2024",
    amount: 980000,
    tasksCount: 38,
    status: "paid",
  },
  {
    id: "INV-2024-003",
    date: "Abr 30, 2024",
    amount: 1100000,
    tasksCount: 42,
    status: "paid",
  },
  {
    id: "INV-2024-004",
    date: "Mar 31, 2024",
    amount: 850000,
    tasksCount: 32,
    status: "paid",
  },
  {
    id: "INV-2024-005",
    date: "Feb 29, 2024",
    amount: 720000,
    tasksCount: 28,
    status: "paid",
  },
]

export default function FacturacionPage() {
  const currentBalance = 2450000
  const usedThisMonth = 850000
  const tasksThisMonth = 32

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Facturación</h1>
          <p className="text-muted-foreground">Gestiona tus créditos y facturas</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Agregar créditos
        </Button>
      </div>

      {/* Balance and stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Current balance */}
        <Card className="bg-primary/10 border-primary/20 sm:col-span-2 lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Saldo disponible</p>
                <p className="text-4xl font-bold text-primary mt-2">
                  ${currentBalance.toLocaleString("es-CO")}
                </p>
                <p className="text-sm text-muted-foreground mt-1">COP</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
            </div>
            <Button className="w-full mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Recargar saldo
            </Button>
          </CardContent>
        </Card>

        {/* Used this month */}
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Consumo este mes</p>
                <p className="text-2xl font-bold mt-2">
                  ${usedThisMonth.toLocaleString("es-CO")}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  +15% vs mes anterior
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks this month */}
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tareas este mes</p>
                <p className="text-2xl font-bold mt-2">{tasksThisMonth}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Promedio: $26,562 COP/tarea
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Receipt className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription plan */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Plan actual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Plan Enterprise</h3>
                <p className="text-sm text-muted-foreground">
                  Acceso ilimitado a todas las funciones + API + soporte prioritario
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">$500,000</p>
              <p className="text-sm text-muted-foreground">COP / mes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices table */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Historial de facturas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Factura</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Tareas</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-mono text-sm">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.tasksCount} tareas</TableCell>
                  <TableCell className="font-medium">
                    ${invoice.amount.toLocaleString("es-CO")} COP
                  </TableCell>
                  <TableCell>
                    <StatusBadge status="completed">Pagada</StatusBadge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
