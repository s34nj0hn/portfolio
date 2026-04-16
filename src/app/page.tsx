"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { TechStack } from "@/components/about/TechStack";
import { Timeline } from "@/components/about/Timeline";
import { SecurityArch } from "@/components/infra/SecurityArch";
import { InfraMap } from "@/components/infra/InfraMap";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative flex flex-col gap-24 pb-24 pt-28 overflow-hidden">
        {/* Hero ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 w-full h-[55vh] -z-10"
          style={{ background: "radial-gradient(ellipse 75% 55% at 12% 0%, rgba(0,212,255,0.07) 0%, transparent 65%)" }}
        />
        {/* About Section */}
        <motion.section
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6"
        >
          <motion.h1 variants={itemVariants} className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
            Sean Johnson
          </motion.h1>
          <motion.p variants={itemVariants} className="max-w-2xl text-lg text-muted">
            Platform Engineer & Cloud Security Specialist building zero-trust infrastructure at enterprise scale. 
            Currently securing multi-cloud delivery paths at F5.
          </motion.p>
          <motion.p variants={itemVariants} className="max-w-2xl text-sm leading-relaxed text-muted/80">
            This portfolio is a live window into my production K3s cluster. 
            Metrics are pulled in real-time through a Cloudflare Worker, demonstrating the observability 
            and security of my self-managed GitOps platform.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-4 flex flex-wrap gap-3">
            <a
              href="#dashboard"
              className="inline-flex items-center rounded-lg border border-accent/30 bg-accent/10 px-6 py-3 text-sm font-semibold text-accent transition-all hover:bg-accent/20 hover:scale-105 active:scale-95"
            >
              Live Signal
            </a>
            <a
              href="https://github.com/s34nj0hn/lab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
            >
              GitOps Source
            </a>
          </motion.div>
        </motion.section>

        {/* Dashboard */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <DashboardGrid />
        </motion.div>

        {/* Infrastructure & Security Section */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mx-auto w-full max-w-5xl px-6 flex flex-col gap-20"
        >
          <motion.div variants={itemVariants}>
            <InfraMap />
          </motion.div>
          <motion.div variants={itemVariants}>
            <SecurityArch />
          </motion.div>
        </motion.div>

        {/* Career & Skills Section */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mx-auto w-full max-w-5xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24"
        >
          <motion.div variants={itemVariants} className="lg:col-span-8">
            <Timeline />
          </motion.div>
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <h3 className="text-xl font-bold mb-8">Technical Stack</h3>
            <TechStack />
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
