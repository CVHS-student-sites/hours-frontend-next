"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { QRScanner } from "@/components/ui/qr-scanner"
import { PageTransition } from "@/components/ui/page-transition"
import { QrCode, Camera, AlertCircle, CheckCircle, Info, Plus } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function StudentScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<"success" | "error" | null>(null)
  const [scannedData, setScannedData] = useState<any>(null)

  const handleStartScan = () => {
    setIsScanning(true)
  }

  const handleScanResult = (data: string) => {
    console.log("[v0] QR scan result:", data)

    // Mock event data based on scanned QR code
    const mockEventData = {
      id: data,
      name: "Community Food Drive",
      organization: "Local Food Bank",
      date: "January 20, 2024",
      hours: 4,
      supervisor: "Jane Smith",
      description: "Help sort and distribute food to families in need",
    }

    setScannedData(mockEventData)
    setScanResult("success")
    setIsScanning(false)
  }

  const handleConfirmHours = () => {
    console.log("[v0] Confirming hours for event:", scannedData)
    // In real app, would make API call to log hours
    setScanResult(null)
    setScannedData(null)
  }

  return (
    <AppShell showBottomTabs userRole="student">
      <PageTransition>
        <div className="container mx-auto px-4 py-6 max-w-2xl">
          <PageHeader title="QR Code Scanner" subtitle="Scan QR codes at events to instantly log your service hours" />

          {/* Scanner Interface */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-muted/30 rounded-t-lg overflow-hidden">
                  {!isScanning && !scanResult && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          <QrCode className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                        </motion.div>
                        <p className="text-lg font-medium mb-2">Ready to Scan</p>
                        <p className="text-sm text-muted-foreground text-pretty">
                          Point your camera at a QR code to get started
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {scanResult === "error" && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-red-500/90"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      <div className="text-center text-white">
                        <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>
                          <AlertCircle className="mx-auto h-16 w-16 mb-4" />
                        </motion.div>
                        <p className="text-xl font-bold mb-2">QR Code Not Found</p>
                        <p className="text-sm">Make sure the code is clear and well-lit</p>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={handleStartScan}
                        disabled={isScanning}
                        className="bg-[#0084ff] hover:bg-[#0070e6] text-white px-8"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        {isScanning ? "Scanning..." : "Start Scanning"}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Success Result */}
          <AnimatePresence>
            {scanResult === "success" && scannedData && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="mb-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }}>
                        <CheckCircle className="h-5 w-5" />
                      </motion.div>
                      Event Found
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-green-800 dark:text-green-200">{scannedData.name}</h3>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          {scannedData.organization} • {scannedData.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        >
                          {scannedData.hours} hours
                        </Badge>
                        <span className="text-green-600 dark:text-green-400">Supervisor: {scannedData.supervisor}</span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={handleConfirmHours}
                          >
                            Confirm & Log Hours
                          </Button>
                        </motion.div>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-[#0084ff]" />
                  How to Use QR Scanner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: "Find the QR Code",
                      description: "Look for QR codes displayed by supervisors at volunteer events or activities.",
                    },
                    {
                      step: 2,
                      title: "Scan the Code",
                      description:
                        'Tap "Start Scanning" and point your camera at the QR code. Hold steady until detected.',
                    },
                    {
                      step: 3,
                      title: "Confirm Details",
                      description: "Review the event information and confirm to automatically log your hours.",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.step}
                      className="flex gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    >
                      <motion.div
                        className="flex-shrink-0 w-6 h-6 bg-[#0084ff] text-white rounded-full flex items-center justify-center text-sm font-bold"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {item.step}
                      </motion.div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground text-pretty">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Manual Entry Option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Alert className="mt-6">
              <Info className="h-4 w-4" />
              <AlertDescription className="text-pretty">
                <strong>No QR code available?</strong> You can still manually log your hours using the regular entry
                form.
                <Button asChild variant="link" className="p-0 h-auto ml-2 text-[#0084ff]">
                  <Link href="/student/hours/add">
                    <Plus className="mr-1 h-3 w-3" />
                    Add hours manually
                  </Link>
                </Button>
              </AlertDescription>
            </Alert>
          </motion.div>

          {/* QR Scanner Modal */}
          <QRScanner isOpen={isScanning} onClose={() => setIsScanning(false)} onScan={handleScanResult} />
        </div>
      </PageTransition>
    </AppShell>
  )
}
