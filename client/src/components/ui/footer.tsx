import { Link } from "wouter";
import { Atom, MapPin, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Atom className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold font-display text-white">
                Chemistry Rockers
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering students to master Chemistry with conceptual clarity and proven results in Boards, JEE, and NEET exams.
            </p>
            <div className="flex gap-4 pt-2">
              {[
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Youtube, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Payal Ma'am", href: "/about" },
                { name: "Our Courses", href: "/courses" },
                { name: "Student Results", href: "/results" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <span className="text-slate-400 hover:text-primary transition-colors cursor-pointer text-sm">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-white font-bold mb-6">Our Courses</h3>
            <ul className="space-y-3">
              <li className="text-slate-400 text-sm">Class 9 Chemistry Coaching</li>
              <li className="text-slate-400 text-sm">Class 10 Chemistry Coaching</li>
              <li className="text-slate-400 text-sm">Class 11 Chemistry Coaching</li>
              <li className="text-slate-400 text-sm">Class 12 Chemistry Coaching</li>
              <li className="text-slate-400 text-sm">NEET Chemistry Classes</li>
              <li className="text-slate-400 text-sm">JEE Chemistry Coaching</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">
                  Chemistry Rockers Center, Sector 14, <br /> Gurgaon, Haryana 122001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+917988418895" className="text-slate-400 text-sm hover:text-primary transition-colors">+91 7988418895</a>
              </li>
              <li className="flex items-center gap-3">
                <SiWhatsapp className="w-5 h-5 text-[#25D366] shrink-0" />
                <a 
                  href="https://wa.me/917988418895?text=Hello%20I%20want%20to%20join%20Chemistry%20Rockers%20Classes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 text-sm hover:text-primary transition-colors"
                >
                  Message on WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-slate-400 text-sm">payal@chemistryrockers.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Chemistry Rockers. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-slate-500 text-xs hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="text-slate-500 text-xs hover:text-slate-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
