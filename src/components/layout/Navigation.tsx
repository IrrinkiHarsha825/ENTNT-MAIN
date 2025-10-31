import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Briefcase, Users, FileText, Home, Menu, X } from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Candidates", href: "/candidates", icon: Users },
  { name: "Assessments", href: "/assessments", icon: FileText },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="backdrop-blur-md bg-card/80 border-b border-border/50 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-white font-bold text-sm">TF</span>
            </div>
            <span className="font-bold text-xl text-foreground bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              TalentFlow
            </span>
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center p-2 rounded-xl text-foreground hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex md:space-x-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden",
                  isActive
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/10 hover:shadow-md"
                )
              }
              end={item.href === "/"}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </NavLink>
              );
            })}
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-4 right-4 bg-card/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl z-10 animate-in slide-in-from-top-2 duration-300">
              <div className="flex flex-col space-y-1 p-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                          isActive
                            ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                        )
                      }
                      end={item.href === "/"}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}