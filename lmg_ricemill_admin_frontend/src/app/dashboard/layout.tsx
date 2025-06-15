"use client"

import type React from "react"
import { type ReactNode, useState } from "react"
import { SessionProvider } from "next-auth/react"
import { signOut } from "next-auth/react"
import { EAdminRoutes } from "@/enum/main_enum"
import { Menu, X, LayoutDashboard, Package, ShoppingCart, FileText, Users, LogOut } from "lucide-react"
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
    <>
      <SessionProvider>
        <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg border-b border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo/Title */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-slate-700"
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
                            "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-slate-700",
                            item.isActive ? "bg-emerald-600 text-white shadow-md" : "text-slate-300 hover:text-white",
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </a>
                      </li>
                    )
                  })}
                  <li className="ml-4 pl-4 border-l border-slate-600">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => signOut()}
                      className="text-slate-300 hover:text-white hover:bg-slate-700 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </Button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
              <div className="md:hidden border-t border-slate-700">
                <nav className="py-4">
                  <ul className="space-y-1">
                    {navigationItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            className={cn(
                              "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                              item.isActive
                                ? "bg-emerald-600 text-white shadow-md"
                                : "text-slate-300 hover:text-white hover:bg-slate-700",
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                          </a>
                        </li>
                      )
                    })}
                    <li className="pt-4 mt-4 border-t border-slate-700">
                      <Button
                        variant="ghost"
                        onClick={() => signOut()}
                        className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700 flex items-center space-x-3 px-4 py-3"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </Button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </header>

        <main className="min-h-screen bg-slate-50">{children}</main>
      </SessionProvider>
    </>
  )
}

export default Layout
