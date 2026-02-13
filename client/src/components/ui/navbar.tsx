import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Atom } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Results link removed
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-lg border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Atom className="w-8 h-8 text-primary animate-[spin_10s_linear_infinite]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold font-display text-slate-900 tracking-tight leading-none">
                Chemistry
              </span>
              <span className="text-xl font-bold font-display text-primary tracking-tight leading-none">
                Rockers
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href}>
                <span
                  className={`text-sm font-semibold transition-colors hover:text-primary cursor-pointer ${
                    location === link.href
                      ? "text-primary"
                      : "text-slate-600"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            ))}

            {isAuthenticated && (
              <Link href="/admin">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/50 text-primary hover:bg-primary hover:text-white"
                >
                  Admin
                </Button>
              </Link>
            )}

            {!isAuthenticated && (
              <Button
                asChild
                size="sm"
                className="bg-primary text-white hover:bg-primary/90 font-bold shadow-md"
              >
                <Link href="/contact">Enroll Now</Link>
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <span
                    onClick={() => setIsOpen(false)}
                    className={`block text-lg font-semibold py-2 ${
                      location === link.href
                        ? "text-primary"
                        : "text-slate-600"
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}

              {isAuthenticated && (
                <Link href="/admin">
                  <span
                    onClick={() => setIsOpen(false)}
                    className="block text-lg font-semibold py-2 text-primary"
                  >
                    Admin Dashboard
                  </span>
                </Link>
              )}

              <Button
                className="w-full bg-primary text-white mt-4 font-bold"
                onClick={() => setIsOpen(false)}
              >
                Enroll Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
