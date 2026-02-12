import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";

export function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/917988418895?text=Hello%20I%20want%20to%20join%20Chemistry%20Rockers%20Classes";

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] bg-[#25D366] text-white p-4 rounded-full shadow-2xl whatsapp-pulse hover:scale-110 transition-transform flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Contact on WhatsApp"
    >
      <SiWhatsapp className="w-8 h-8" />
    </motion.a>
  );
}
