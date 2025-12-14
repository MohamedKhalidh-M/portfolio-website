"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Menu,
  X,
  Download,
  Code2,
  Cpu,
  Wrench,
  Sparkles,
  Terminal,
  Zap,
  CheckCircle2,
} from "lucide-react"

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateXValue = ((y - centerY) / centerY) * -10
    const rotateYValue = ((x - centerX) / centerX) * 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function FloatingElement({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 64 // height of fixed nav
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setIsMenuOpen(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({ name: "", email: "", message: "" })

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("home")}
              className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
            >
              MK
            </motion.button>

            <div className="hidden md:flex items-center gap-6">
              {["About", "Skills", "Projects", "Experience", "Education", "Achievements", "Contact"].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-500 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle />
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2" aria-label="Toggle menu">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 border-t border-border/50 backdrop-blur-xl"
            >
              {["About", "Skills", "Projects", "Experience", "Education", "Achievements", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-3 text-sm font-medium hover:bg-accent/50 transition-colors"
                >
                  {item}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </motion.nav>

      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 pb-12 sm:pt-24 overflow-hidden"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Floating geometric shapes - hidden on mobile for performance */}
        <div className="hidden md:block">
          <FloatingElement delay={0}>
            <motion.div
              className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-lg"
              style={{
                transform: `translateX(${mousePosition.x}px) translateY(${mousePosition.y}px)`,
              }}
            />
          </FloatingElement>
          <FloatingElement delay={1}>
            <motion.div
              className="absolute top-40 right-20 w-16 h-16 border border-purple-500/20 rounded-full"
              style={{
                transform: `translateX(${-mousePosition.x}px) translateY(${-mousePosition.y}px)`,
              }}
            />
          </FloatingElement>
          <FloatingElement delay={2}>
            <motion.div
              className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-lg"
              style={{
                transform: `translateX(${mousePosition.x * 0.5}px) translateY(${mousePosition.y * 0.5}px)`,
              }}
            />
          </FloatingElement>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8 order-2 lg:order-1 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Frontend Developer</span>
              </motion.div>

              <div className="space-y-3 sm:space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
                >
                  <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                    Mohamed
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Khalidh
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed text-balance"
                >
                  Building <span className="text-foreground font-semibold">interactive</span>,{" "}
                  <span className="text-foreground font-semibold">responsive</span>, and{" "}
                  <span className="text-foreground font-semibold">visually engaging</span> web applications with modern
                  technologies.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    onClick={() => scrollToSection("projects")}
                    className="w-full sm:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/25 group"
                  >
                    <Terminal className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                    View Projects
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto backdrop-blur-sm border-primary/20 hover:bg-primary/10 group bg-transparent"
                    asChild
                  >
                    <a href="/resume/Mohamed_Khalidh_Resume.pdf" download="Mohamed_Khalidh_Resume.pdf">
                      <Download className="mr-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                      Download Resume
                    </a>
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4"
              >
                {[
                  { icon: Github, href: "https://github.com/MohamedKhalidh-M", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/mohamedkhalidh/", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:mdkhalidh2004@gmail.com", label: "Email" },
                ].map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="p-3 rounded-full bg-accent/50 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2 flex justify-center lg:justify-end"
            >
              <TiltCard className="relative">
                <motion.div
                  className="relative"
                  style={{
                    transform: `translateX(${mousePosition.x * 0.5}px) translateY(${mousePosition.y * 0.5}px)`,
                  }}
                >
                  {/* Glow effect behind image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-purple-500/40 to-pink-500/40 rounded-3xl blur-3xl opacity-60" />

                  {/* Glassmorphic frame */}
                  <div className="relative rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 shadow-2xl">
                    <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-background/40 to-background/60 p-0.5 sm:p-1">
                      <motion.img
                        src="/images/image.png"
                        alt="Mohamed Khalidh - Frontend Developer"
                        className="w-full h-auto max-w-[280px] sm:max-w-sm lg:max-w-md rounded-lg sm:rounded-xl"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                    </div>
                  </div>

                  <div className="hidden sm:block">
                    <FloatingElement delay={0}>
                      <motion.div
                        className="absolute -top-4 -right-4 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-primary to-purple-500 text-white text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-sm"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Code2 className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        React
                      </motion.div>
                    </FloatingElement>
                    <FloatingElement delay={1}>
                      <motion.div
                        className="absolute -bottom-4 -left-4 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-sm"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Zap className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        JavaScript
                      </motion.div>
                    </FloatingElement>
                    <FloatingElement delay={0.5}>
                      <motion.div
                        className="absolute top-1/2 -right-6 sm:-right-8 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-pink-500 to-primary text-white text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-sm"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Cpu className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        IoT
                      </motion.div>
                    </FloatingElement>
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      <Section id="about">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <SectionTitle>About Me</SectionTitle>
          <TiltCard>
            <div className="relative rounded-3xl p-8 bg-gradient-to-br from-accent/50 to-accent/30 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-3xl" />
              <p className="text-lg text-muted-foreground leading-relaxed relative z-10">
                I am a <span className="text-foreground font-semibold">Frontend Developer</span> specializing in
                building interactive, responsive, and visually engaging web applications. With a strong background in{" "}
                <span className="text-foreground font-semibold">Electronics and Communication Engineering</span>, I
                blend software and hardware knowledge to create innovative, real-world solutions. I enjoy solving
                problems through clean UI design and efficient code.
              </p>
            </div>
          </TiltCard>
        </motion.div>
      </Section>

      <Section id="skills" className="bg-muted/30">
        <SectionTitle>Skills & Technologies</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Frontend Development",
              icon: Code2,
              skills: [
                "HTML5",
                "CSS3",
                "JavaScript (ES6+)",
                "React",
                "Tailwind CSS",
                "Responsive Design",
                "REST API Integration",
              ],
              gradient: "from-blue-500/20 to-cyan-500/20",
            },
            {
              title: "Programming & Backend",
              icon: Wrench,
              skills: ["Python", "Node.js (Basic)", "Flask", "SQL"],
              gradient: "from-purple-500/20 to-pink-500/20",
            },
            {
              title: "Electronics & Embedded",
              icon: Cpu,
              skills: ["Arduino", "Embedded C", "IoT", "Sensors & Automation"],
              gradient: "from-pink-500/20 to-orange-500/20",
            },
          ].map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 lg:col-span-3"
          >
            <TiltCard>
              <div className="rounded-2xl p-6 bg-gradient-to-br from-accent/50 to-accent/30 backdrop-blur-xl border border-white/10 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Tools & Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {["Git & GitHub", "VS Code", "Google Cloud Platform"].map((skill) => (
                    <motion.div key={skill} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Badge
                        variant="outline"
                        className="px-4 py-2 text-sm bg-background/50 backdrop-blur-sm border-primary/20"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </Section>

      <Section id="projects">
        <SectionTitle>Featured Projects</SectionTitle>
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Frontend Projects */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-8 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
            >
              Frontend Projects
            </motion.h3>
            <div className="grid md:grid-cols-2 gap-8">
              <ProjectCard
                title="Tic-Tac-Toe Web Game"
                description="Interactive web-based Tic-Tac-Toe game featuring Player vs Player and Player vs AI modes. Includes Easy, Medium, and Hard (Minimax) difficulty levels with modern UI animations and keyboard controls."
                tech={["HTML", "CSS", "JavaScript"]}
                link="https://github.com/MohamedKhalidh-M"
                gradient="from-blue-500/10 to-cyan-500/10"
                index={0}
              />
              <ProjectCard
                title="User Registration Web App"
                description="Responsive user registration form with client-side validation and REST API integration. Displays real-time success and error feedback without page reload."
                tech={["HTML", "CSS", "JavaScript", "Fetch API"]}
                link="https://github.com/MohamedKhalidh-M"
                gradient="from-purple-500/10 to-pink-500/10"
                index={1}
              />
            </div>
          </div>

          {/* Electronics & Hybrid Projects */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-8 bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent"
            >
              Electronics & Hybrid Projects
            </motion.h3>
            <div className="grid md:grid-cols-2 gap-8">
              <ProjectCard
                title="Smart Attendance System"
                description="Face recognition-based attendance system using computer vision to automate student attendance and reduce proxy attendance."
                tech={["Python", "OpenCV", "Face Recognition"]}
                gradient="from-green-500/10 to-emerald-500/10"
                index={2}
              />
              <ProjectCard
                title="AI Chat Bot"
                description="Flask-based AI chatbot using NLP techniques to dynamically answer user queries and FAQs."
                tech={["Python", "Flask", "NLP"]}
                gradient="from-violet-500/10 to-purple-500/10"
                index={3}
              />
              <ProjectCard
                title="Rash Driving Alert System"
                description="Embedded system prototype designed to detect jerky movements and alert drivers to prevent accidents."
                tech={["Arduino", "Embedded C", "Sensors"]}
                gradient="from-orange-500/10 to-red-500/10"
                index={4}
              />
              <ProjectCard
                title="DTMF-Based Control Device"
                description="Hardware system that controls electronic devices remotely using DTMF signals via mobile phone without internet dependency."
                tech={["Arduino", "Communication Systems"]}
                gradient="from-cyan-500/10 to-blue-500/10"
                index={5}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section id="experience" className="bg-muted/30">
        <SectionTitle>Experience</SectionTitle>
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              title: "Part-Time Site Manager",
              company: "Express Logistics",
              points: [
                "Managed operations using digital tracking tools",
                "Coordinated 10+ staff members during peak hours",
                "Improved on-time delivery rate to 98%",
              ],
            },
            {
              title: "Intern + Student Ambassador",
              company: "Advanced Python (KnowledgeXchange)",
              points: [
                "Trained in Python, APIs, and scripting",
                "Promoted technical programs and enrolled 50+ students",
              ],
            },
            {
              title: "Hackathon Coordinator",
              company: "Techevo Hackathon",
              points: ["Organized 100+ participants", "Coordinated logistics and technical execution"],
            },
          ].map((exp, index) => (
            <ExperienceCard key={exp.title} experience={exp} index={index} />
          ))}
        </div>
      </Section>

      <Section id="education">
        <SectionTitle>Education</SectionTitle>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <TiltCard>
            <div className="relative rounded-3xl p-8 bg-gradient-to-br from-accent/50 to-accent/30 backdrop-blur-xl border-2 border-primary shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-3xl" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Bachelor of Engineering</h3>
                    <p className="text-lg text-primary font-semibold">Electronics and Communication Engineering</p>
                    <p className="text-muted-foreground">CGPA: 8.5 / 10.0</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground font-medium">2021 - 2025</p>
                    <p className="text-muted-foreground text-sm">Aalim Muhammed Salegh College of Engineering</p>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </Section>

      <Section id="achievements" className="bg-muted/30">
        <SectionTitle>Achievements</SectionTitle>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              title: "Conference Participation",
              description: "Attended IEEE CONECCT 2024 focusing on Emerging Technologies",
            },
            {
              title: "Workshop Participation",
              description: "Completed workshop on Data Science & Machine Learning by NPTEL SWAYAM",
            },
            {
              title: "Event Volunteer",
              description: "Coordinated and executed Techevo Hackathon with 100+ participants",
            },
            {
              title: "Problem Solver",
              description: "Built 6+ real-world projects combining frontend and electronics expertise",
            },
          ].map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TiltCard>
                <div className="rounded-2xl p-6 bg-gradient-to-br from-accent/50 to-accent/30 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 shrink-0">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="contact">
        <SectionTitle>Get In Touch</SectionTitle>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <TiltCard>
              <div className="rounded-2xl p-8 bg-gradient-to-br from-accent/50 to-accent/30 backdrop-blur-xl border border-white/10 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, text: "mdkhalidh2004@gmail.com", href: "mailto:mdkhalidh2004@gmail.com" },
                    { icon: Phone, text: "+91 8220670648", href: "tel:+918220670648" },
                    { icon: MapPin, text: "Levengipuram, Tamil Nadu, India" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      {item.href ? (
                        <a href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">{item.text}</span>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-8 mt-8 border-t border-border/50">
                  {[
                    { icon: Github, href: "https://github.com/MohamedKhalidh-M", label: "GitHub" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/mohamedkhalidh/", label: "LinkedIn" },
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 rounded-full bg-accent hover:bg-accent/80 transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <TiltCard>
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-8 bg-gradient-to-br from-accent/50 to-accent/30 backdrop-blur-xl border border-white/10 shadow-lg space-y-4"
              >
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Message sent successfully!</span>
                  </motion.div>
                )}

                <div>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    rows={5}
                    required
                    className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary resize-none"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </motion.div>
              </form>
            </TiltCard>
          </motion.div>
        </div>
      </Section>

      <footer className="relative py-12 px-4 mt-20 border-t border-border/50">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground"
          >
            Designed & Built by{" "}
            <span className="text-foreground font-semibold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Mohamed Khalidh
            </span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm text-muted-foreground mt-2"
          >
            © 2025 All rights reserved
          </motion.p>
        </div>
      </footer>
    </div>
  )
}

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={ref} id={id} className={`relative py-24 px-4 ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </section>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent"
    >
      {children}
    </motion.h2>
  )
}

function SkillCard({ category, index }: { category: any; index: number }) {
  const Icon = category.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <TiltCard>
        <div
          className={`rounded-2xl p-6 bg-gradient-to-br ${category.gradient} backdrop-blur-xl border border-white/10 shadow-lg h-full`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">{category.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill: string) => (
              <motion.div key={skill} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Badge variant="secondary" className="px-3 py-1 bg-background/50 backdrop-blur-sm">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

function ProjectCard({
  title,
  description,
  tech,
  link,
  gradient,
  index,
}: {
  title: string
  description: string
  tech: string[]
  link?: string
  gradient: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <TiltCard>
        <div
          className={`rounded-2xl p-6 bg-gradient-to-br ${gradient} backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-2xl transition-all h-full flex flex-col`}
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-bold text-balance pr-2">{title}</h3>
            {link && (
              <motion.a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-accent hover:bg-accent/80 transition-colors shrink-0"
                aria-label="View project"
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <Badge key={t} className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

function ExperienceCard({ experience, index }: { experience: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <TiltCard>
        <div className="relative rounded-2xl p-6 bg-gradient-to-br from-accent/50 to-accent/30 backdrop-blur-xl border-l-4 border-l-primary shadow-lg">
          <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
          <p className="text-primary font-semibold mb-4">{experience.company}</p>
          <ul className="space-y-2">
            {experience.points.map((point: string, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="flex items-start gap-2 text-muted-foreground"
              >
                <span className="text-primary mt-1.5 shrink-0">▹</span>
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </TiltCard>
    </motion.div>
  )
}
