"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { submitContact } from "@/app/actions/contact";
import { Send, Loader2, CheckCircle2, XCircle, Mail, Phone, MapPin } from "lucide-react";
import { profile } from "@/lib/data/profile";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function clientAction(formData: FormData) {
    setStatus("loading");
    const result = await submitContact(formData);
    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  }

  return (
    <section id="contact" className="py-32 px-6 bg-[#0a0510]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-8">
          
          {/* Left Column: Info & Details */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-xs font-mono text-primary tracking-widest mb-4">
                INITIATE COMMUNICATION
              </div>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
                Let&apos;s build something.
              </h2>
              <p className="text-muted font-light leading-relaxed">
                Have a project in mind, want to discuss machine learning, or just want to say hi? I&apos;m currently open to new opportunities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted mb-1">EMAIL</p>
                  <a href={`mailto:${profile.email}`} className="text-white hover:text-primary transition-colors block">
                    {profile.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted mb-1">PHONE</p>
                  <a href={`tel:${profile.phone}`} className="text-white hover:text-primary transition-colors block">
                    {profile.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-mono text-muted mb-1">LOCATION</p>
                  <span className="text-white block">
                    {profile.location}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl"
            >
              {status === "success" ? (
                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 text-center flex flex-col items-center gap-4 py-16">
                  <CheckCircle2 className="w-16 h-16 text-primary" />
                  <h3 className="text-2xl font-medium">Message received.</h3>
                  <p className="text-muted text-sm max-w-sm mx-auto">
                    Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 px-6 py-3 rounded-full border border-white/10 text-sm hover:bg-white/5 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form action={clientAction} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-mono text-muted pl-1">NAME</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        disabled={status === "loading"}
                        className="w-full bg-[#0a0510] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-mono text-muted pl-1">EMAIL</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        disabled={status === "loading"}
                        className="w-full bg-[#0a0510] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-mono text-muted pl-1">SUBJECT</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      disabled={status === "loading"}
                      className="w-full bg-[#0a0510] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-mono text-muted pl-1">MESSAGE</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      disabled={status === "loading"}
                      className="w-full bg-[#0a0510] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none disabled:opacity-50"
                    ></textarea>
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-400 text-sm p-3 bg-red-400/10 rounded-lg border border-red-400/20">
                      <XCircle className="w-4 h-4" />
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full group relative flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
