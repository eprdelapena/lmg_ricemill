"use client"

import type React from "react"
import { type ReactNode, useState } from "react"
import { SessionProvider } from "next-auth/react"
import { signOut } from "next-auth/react"
import { EAdminRoutes } from "@/enum/main_enum"
import { Menu, X, LayoutDashboard, Package, ShoppingCart, FileText, LogOut, Wheat } from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = usePathname().split("/")

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev)
  }

  const navigationItems = [
    // {
    //   href: EAdminRoutes.DASHBOARDADMIN,
    //   label: "Admin List",
    //   icon: Users,
    //   isActive: router.includes("admin"),
    // },
    {
      href: EAdminRoutes.DASHBOARDSUMMARY,
      label: "Summary",
      icon: LayoutDashboard,
      isActive: router.includes("summary"),
    },
    {
      href: EAdminRoutes.DASHBOARDPRODUCT,
      label: "Product",
      icon: Package,
      isActive: router.includes("product"),
    },
    {
      href: EAdminRoutes.DASHBOARDPOSTORDER,
      label: "Cart",
      icon: ShoppingCart,
      isActive: router.includes("postorder"),
    },
    {
      href: EAdminRoutes.DASHBOARDORDERS,
      label: "Orders",
      icon: FileText,
      isActive: router.includes("orders"),
    },
  ]

  return (
    <SessionProvider>
      <header className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white shadow-2xl border-b-2 border-slate-600/30 relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%236b7280 fillOpacity=0.05%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Title */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg ring-2 ring-emerald-400/20">
                <Wheat className="w-5 h-5 text-slate-800" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-100 via-white to-slate-100 bg-clip-text text-transparent">
                  LMG Rice Mill
                </h1>
                <span className="text-xs text-slate-300/80 font-medium -mt-1">Admin Panel</span>
              </div>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-100 hover:bg-slate-600/50 hover:text-slate-200 transition-all duration-200 rounded-lg"
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-amber-800/40 hover:shadow-lg hover:scale-105 relative group",
                          item.isActive
                            ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg ring-2 ring-emerald-400/30"
                            : "text-slate-200 hover:text-white hover:bg-slate-600/40",
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                        {item.isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-lg blur-sm -z-10"></div>
                        )}
                      </a>
                    </li>
                  )
                })}
                <li className="ml-4 pl-4 border-l border-slate-500/50">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="text-slate-200 hover:text-white hover:bg-red-700/30 hover:shadow-lg transition-all duration-300 flex items-center space-x-2 rounded-lg group"
                  >
                    <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Logout</span>
                  </Button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-slate-600/30 backdrop-blur-sm">
              <nav className="py-4">
                <ul className="space-y-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className={cn(
                            "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg relative group",
                            item.isActive
                              ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg ring-2 ring-emerald-400/30"
                              : "text-slate-200 hover:text-white hover:bg-slate-600/40",
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{item.label}</span>
                          {item.isActive && (
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-lg blur-sm -z-10"></div>
                          )}
                        </a>
                      </li>
                    )
                  })}
                  <li className="pt-4 mt-4 border-t border-slate-600/30">
                    <Button
                      variant="ghost"
                      onClick={() => signOut()}
                      className="w-full justify-start text-slate-200 hover:text-white hover:bg-red-700/30 hover:shadow-lg transition-all duration-300 flex items-center space-x-3 px-4 py-3 rounded-lg group"
                    >
                      <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Logout</span>
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 relative">
        {/* Subtle background pattern for main content */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=100 height=100 viewBox=0 0 100 100 xmlns=http://www.w3.org/2000/svg%3E%3Cg fillRule=evenodd%3E%3Cg fill=%236b7280 fillOpacity=0.02%3E%3Cpath d=M50 50c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="relative z-10">{children}</div>
      </main>
    </SessionProvider>
  )
}

export default Layout
