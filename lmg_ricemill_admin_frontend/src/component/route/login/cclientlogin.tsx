"use client"

import useV1Login from "@/hooks/api_hooks/usev1login"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { User, Lock, Wheat, Shield, Leaf, Factory, Sprout, ChevronRight, Sparkles } from "lucide-react"

const CClientLogin = () => {
  const { credentials, setCredentials, getV1Login } = useV1Login()

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-green-950 to-yellow-950 flex justify-center items-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Wheat className="absolute top-20 left-20 w-6 h-6 text-amber-400/20 animate-bounce delay-300" />
        <Factory className="absolute top-40 right-32 w-5 h-5 text-green-400/20 animate-bounce delay-700" />
        <Sprout className="absolute bottom-32 left-16 w-4 h-4 text-yellow-400/20 animate-bounce delay-1000" />
        <Leaf className="absolute bottom-20 right-20 w-5 h-5 text-amber-400/20 animate-bounce delay-500" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-yellow-500 to-green-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-amber-600 via-yellow-500 to-green-600 p-4 rounded-full shadow-2xl">
              <Wheat className="w-8 h-8 text-white" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-300 animate-spin" />
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-100 via-yellow-100 to-green-100 bg-clip-text text-transparent mb-2">
            LMG Rice Mill
          </h1>
          <div className="flex items-center justify-center gap-2 text-amber-300">
            <Shield className="w-4 h-4" />
            <p className="text-sm">Rice Mill Management Portal</p>
            <Shield className="w-4 h-4" />
          </div>
        </div>

        {/* Login Card */}
        <Card className="bg-amber-50/5 backdrop-blur-xl border-amber-200/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/5 via-transparent to-green-50/5"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-green-500"></div>

          <CardHeader className="relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-lg">
                <User className="w-5 h-5 text-amber-300" />
              </div>
              <h2 className="text-2xl font-bold text-amber-50">Admin System</h2>
              <div className="p-2 bg-gradient-to-r from-yellow-500/20 to-green-500/20 rounded-lg">
                <Lock className="w-5 h-5 text-yellow-300" />
              </div>
            </div>
            <p className="text-center text-amber-200 text-sm">Access your rice mill operations dashboard</p>
          </CardHeader>

          <CardContent className="space-y-6 relative">
            {/* User ID Field */}
            <div className="space-y-3">
              <Label htmlFor="username" className="text-amber-100 font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-amber-300" />
                Username
              </Label>
              <div className="relative group">
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => {
                    setCredentials((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }}
                  required
                  placeholder="Enter your Manager ID"
                  className="bg-amber-50/10 border-amber-200/20 text-amber-50 placeholder-amber-300 h-12 pl-4 pr-12 rounded-xl focus:bg-amber-50/15 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 group-hover:bg-amber-50/15"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="p-1 bg-amber-500/20 rounded-md">
                    <User className="w-4 h-4 text-amber-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-3">
              <Label htmlFor="password" className="text-amber-100 font-medium flex items-center gap-2">
                <Lock className="w-4 h-4 text-yellow-300" />
                Password
              </Label>
              <div className="relative group">
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => {
                    setCredentials((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }}
                  required
                  placeholder="Enter your security code"
                  className="bg-amber-50/10 border-amber-200/20 text-amber-50 placeholder-amber-300 h-12 pl-4 pr-12 rounded-xl focus:bg-amber-50/15 focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 group-hover:bg-amber-50/15"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="p-1 bg-yellow-500/20 rounded-md">
                    <Lock className="w-4 h-4 text-yellow-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Login Button */}
            <div className="pt-4">
              <Button
                onClick={() => {
                  getV1Login()
                }}
                className="w-full h-12 bg-gradient-to-r from-amber-600 via-yellow-500 to-green-600 hover:from-amber-700 hover:via-yellow-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-amber-900 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="flex items-center justify-center gap-2 relative z-10">
                  <Factory className="w-5 h-5" />
                  <span>Enter Mill Dashboard</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Button>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 pt-4 border-t border-amber-200/10">
              <div className="flex items-center gap-1 px-3 py-1 bg-green-500/20 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-300 font-medium">Secure Mill Network</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <div className="flex items-center justify-center gap-2 text-amber-400">
            <Wheat className="w-4 h-4" />
            <p className="text-sm">LMG Rice Mill</p>
            <Sprout className="w-4 h-4" />
          </div>
          <p className="text-xs text-amber-500">© 2024 LMG Rice mill. Harvesting excellence.</p>
        </div>
      </div>
    </div>
  )
}

export default CClientLogin
