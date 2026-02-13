import { Helmet } from "react-helmet";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { motion } from "framer-motion";

export default function Results() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Helmet>
        <title>Devanshu - Chemistry Result</title>
      </Helmet>

      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-4 flex justify-center">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-sm w-full"
        >
          {/* Image */}
          <div className="relative h-96">
            <img
              src="/devanshu%20photo.jpeg"

              alt="Devanshu"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-bold text-white">
                Devanshu
              </h3>
              <p className="text-white/80 text-sm">
                Class 12th • 2024
              </p>
            </div>
          </div>

          {/* Marks */}
          <div className="p-6 text-center bg-white">
            <p className="text-sm text-slate-500 mb-2">
              Chemistry Marks
            </p>
            <p className="text-4xl font-bold text-primary">
              90 / 100
            </p>
          </div>
        </motion.div>

      </div>

      <Footer />
    </div>
  );
}
