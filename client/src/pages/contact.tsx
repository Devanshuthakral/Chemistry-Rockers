import { Helmet } from "react-helmet";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactInquirySchema } from "@shared/schema";
import { useCreateContact, type InsertContactInquiry } from "@/hooks/use-contact";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function Contact() {
  const { mutate, isPending } = useCreateContact();
  const whatsappUrl = "https://wa.me/917988418895?text=Hello%20I%20want%20to%20join%20Chemistry%20Rockers%20Classes";

  const form = useForm<InsertContactInquiry>({
    resolver: zodResolver(insertContactInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      classInterested: "",
      mode: "",
    },
  });

  const onSubmit = (data: InsertContactInquiry) => {
    mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Contact Us | Chemistry Rockers - Specialized Chemistry Coaching</title>
        <meta name="description" content="Get in touch with Chemistry Rockers for admissions, queries, and demo classes. Specialized Only in Chemistry Coaching." />
      </Helmet>
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6 text-slate-900">Get in Touch</h1>
            <p className="text-slate-600 text-lg mb-12">
              Have questions about our chemistry courses? Specialized Only in Chemistry Coaching. Reach out via form or WhatsApp.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Visit Us</h3>
                  <p className="text-slate-600">Chemistry Rockers Center, Sector 14, Gurgaon, Haryana 122001</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Call Us</h3>
                  <p className="text-slate-600">+91 7988418895</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center shrink-0">
                  <SiWhatsapp className="w-6 h-6 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">WhatsApp</h3>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Message us on WhatsApp</a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Email Us</h3>
                  <p className="text-slate-600">payal@chemistryrockers.com</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-12 rounded-2xl overflow-hidden border border-white/10 h-64">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d76.82493635950898!3d28.52758200617606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1715424000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-70 hover:opacity-100 transition-opacity"
              ></iframe>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-white border-slate-200" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+91..." {...field} className="bg-white border-slate-200" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" type="email" {...field} className="bg-white border-slate-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                   <FormField
                    control={form.control}
                    name="classInterested"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Class</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white border-slate-200">
                              <SelectValue placeholder="Select Class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border-slate-200 text-slate-900">
                            <SelectItem value="9">Class 9</SelectItem>
                            <SelectItem value="10">Class 10</SelectItem>
                            <SelectItem value="11">Class 11</SelectItem>
                            <SelectItem value="12">Class 12</SelectItem>
                            <SelectItem value="JEE">JEE</SelectItem>
                            <SelectItem value="NEET">NEET</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Preferred Mode</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white border-slate-200">
                              <SelectValue placeholder="Select Mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border-slate-200 text-slate-900">
                            <SelectItem value="Offline">Offline</SelectItem>
                            <SelectItem value="Online">Online</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any specific queries?" {...field} className="bg-white border-slate-200 h-32" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-12" disabled={isPending}>
                  {isPending ? "Sending..." : "Submit Inquiry"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
