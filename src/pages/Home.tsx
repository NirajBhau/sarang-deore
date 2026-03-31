import {
  ArrowRight, School, HardHat, Calendar, Flag, BarChart3, Ruler, Code,
  Radar, Verified, Mail, MapPin, Loader2, Linkedin,
  Presentation, GraduationCap, Target, Settings, Building2, Map, Plane
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { getProjects, urlFor } from '../lib/sanity';

import sarangImg from '../assets/sarang.jfif?v=1';

import { PROJECTS_LIST } from '../lib/data';

export default function Home() {
  const location = useLocation();
  const [projectsData, setProjectsData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [proj] = await Promise.all([
          getProjects()
        ]);
        setProjectsData(proj && proj.length > 0 ? proj : PROJECTS_LIST);
      } catch (error) {
        console.error("Failed to fetch Sanity data, using local fallback:", error);
        setProjectsData(PROJECTS_LIST);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xwvwlabl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrors({ submit: "There was a problem sending your proposal. Please try again." });
      }
    } catch (error) {
      setErrors({ submit: "A network error occurred. Please try again later." });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-[95vh] flex items-center overflow-hidden py-20 lg:py-0">
        <div className="absolute inset-0 blueprint-grid z-0 opacity-60"></div>
        <div className="w-full px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 mb-8 bg-[#F2E8CF] px-4 py-1.5 rounded-full border border-[#DBC8A0] self-center lg:self-start">
              <span className="w-2 h-2 bg-[#8B7355] rounded-full"></span>
              <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-[#8B7355]">SEEKING INTERNSHIP OPPORTUNITIES</span>
            </div>
            <h1
              className="font-serif font-bold tracking-tighter text-slate-900 mb-8 leading-[1.1]"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)' }}
            >
              <span className="text-[#0047AB]">Civil</span><br />
              <span className="text-[#0047AB]">Engineering</span> Undergraduate.
            </h1>
            <p className="font-sans text-lg md:text-xl text-slate-600 max-w-xl mb-12 leading-relaxed">
              Interests in Construction Management and Structural Engineering. Passionate about integrating data-driven methodologies and sustainable practices into modern infrastructure.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <a href="#projects" className="bg-[#0047AB] text-white px-10 py-4 rounded-sm font-bold flex items-center gap-3 hover:bg-blue-800 transition-all text-sm uppercase tracking-wider">
                Explore Projects
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/Sarang_Deore.pdf"
                download
                className="bg-[#E5E5E5] text-slate-700 px-10 py-4 rounded-sm font-bold hover:bg-slate-200 transition-all text-sm uppercase tracking-wider flex items-center gap-3"
              >
                Download Resume
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 relative flex justify-center lg:justify-end items-center mb-12 lg:mb-0 lg:ml-auto w-full"
          >
            {/* Animated Rings Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full max-w-[450px] aspect-square rounded-full border border-blue-100 animate-[spin_20s_linear_infinite] opacity-50"></div>
              <div className="absolute w-full max-w-[400px] aspect-square rounded-full border border-blue-200 animate-[spin_15s_linear_infinite_reverse] opacity-30"></div>
              <div className="absolute w-[110%] aspect-square rounded-full bg-blue-50/30 blur-3xl"></div>
            </div>

            {/* Profile Photo Container */}
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[360px] xl:max-w-[420px] aspect-square p-2 sm:p-4">
              <div className="absolute inset-0 rounded-full border-[6px] sm:border-[10px] border-[#0047AB] shadow-[0_0_40px_rgba(0,71,171,0.2)]"></div>
              <div className="absolute inset-2 rounded-full border-[1px] border-blue-200/50"></div>
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 relative shadow-inner">
                <img
                  src={sarangImg}
                  alt="Sarang Deore Profile"
                  className="w-full h-full object-cover transform scale-110 transition-transform duration-700 hover:scale-120"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-slate-50/50" id="profile">
        <div className="w-full px-6 md:px-16 lg:px-[2in]">
          <div className="grid lg:grid-cols-12 gap-12 items-start">

            {/* Left Column: Education & Objective */}
            <div className="lg:col-span-7 space-y-12">
              <div>
                <h2 className="font-headline text-4xl font-bold text-slate-900 mb-8">Structural Profile</h2>

                <div className="space-y-8">
                  {/* NICMAR Education */}
                  <div className="flex gap-6 group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-headline text-xl font-bold text-slate-900">NICMAR University, Pune</h3>
                      <p className="text-slate-600 font-medium">B.Tech Civil Engineering (2023–2027)</p>
                    </div>
                  </div>

                  {/* Career Objective */}
                  <div className="flex gap-6 group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <Target className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-headline text-xl font-bold text-slate-900">Career Objective</h3>
                      <p className="text-slate-600 leading-relaxed max-w-2xl">
                        Determined to secure an internship where I can apply my analytical skills in Project Planning,
                        Cost Estimation, and Structural Analysis. Enthusiastic about the integration of GIS and
                        Drone technology in modern construction.
                      </p>
                    </div>
                  </div>

                  {/* New Stats Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 pt-4 border-t border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-4xl font-headline font-black text-slate-900 leading-none"></span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2"></span>
                    </div>

                    <div className="hidden sm:block w-[1px] h-12 bg-slate-200"></div>

                    <div className="flex flex-col">
                      <span className="text-xl font-headline font-bold text-slate-900 leading-none"></span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interests & Visual */}
            <div className="lg:col-span-5 space-y-8">
              {/* Interests Card */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150"></div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <h3 className="font-headline text-lg font-bold text-slate-900 tracking-tight">Interests</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: "Construction Management", icon: <Settings className="w-4 h-4" /> },
                      { name: "Structural Engineering", icon: <Building2 className="w-4 h-4" /> },
                      { name: "GIS & Remote Sensing", icon: <Map className="w-4 h-4" /> },
                      { name: "Drone Surveying", icon: <Plane className="w-4 h-4" /> }
                    ].map((interest) => (
                      <div key={interest.name} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors group/item">
                        <div className="text-blue-600 group-hover/item:scale-110 transition-transform">
                          {interest.icon}
                        </div>
                        <span className="text-xs font-bold text-slate-700">{interest.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>


            </div>

          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-24 bg-white" id="journey">
        <div className="w-full px-4 md:px-12">
          <div className="w-full">
            <div className="text-center mb-16">
              <span className="font-sans text-xs uppercase tracking-widest text-blue-600 font-bold">Academic Milestones</span>
              <h2 className="font-headline text-4xl font-bold mt-2">College Journey</h2>
            </div>
            <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-200">
              {[
                {
                  title: "Certifications & Training",
                  desc: "Completed Project Management in Construction specialization. Currently exploring GIS, Remote Sensing, and Drone technology for engineering surveys.",
                  icon: <Calendar className="w-5 h-5" />
                },
                {
                  title: "NICMAR University Pune",
                  date: "2023 - 2027",
                  desc: "B.Tech Civil Engineering.",
                  icon: <School className="w-5 h-5" />
                },
                {
                  title: "Secondary Education",
                  date: "May 2023",
                  desc: "Completed Class XII with 81.83% demonstrating consistent academic excellence in science and engineering fundamentals.",
                  icon: <Flag className="w-5 h-5" />
                },
                {
                  title: "Primary Education",
                  date: "May 2021",
                  desc: "Completed Class X with 79% demonstrating consistent academic excellence in science and engineering fundamentals.",
                  icon: <Flag className="w-5 h-5" />
                }
              ].map((item, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    {item.icon}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-headline font-bold text-slate-900">{item.title}</div>
                      <time className="font-sans text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{item.date}</time>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-slate-50" id="skills">
        <div className="w-full px-4 md:px-12">
          <div className="mb-16">
            <span className="font-sans text-xs uppercase tracking-widest text-blue-600 font-bold">Tech Stack</span>
            <h2 className="font-headline text-4xl font-bold mt-2">Technical Competencies</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Construction & Management",
                icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
                skills: ["Project Planning & Scheduling", "MS Project, Primavera", "Cost Estimation & BOQ", "Bar Bending Schedule (BBS)"]
              },
              {
                title: "Structural & Design",
                icon: <Ruler className="w-8 h-8 text-blue-600" />,
                skills: ["AutoCAD (2D & 3D)", "STAAD.Pro Analysis", "Structural Health Monitoring"]
              },
              {
                title: "Programming & Analysis",
                icon: <Code className="w-8 h-8 text-blue-600" />,
                skills: ["Python (Hydrology)", "MATLAB (Urban Planning)", "MS Excel (Data Analysis)"]
              },
              {
                title: "Emerging Domain",
                icon: <Radar className="w-8 h-8 text-yellow-600" />,
                skills: ["GIS & Mapping", "Remote Sensing", "Drone Surveying"]
              }
            ].map((skill, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full border border-slate-50">
                <div className="mb-4">{skill.icon}</div>
                <h3 className="font-headline text-lg font-bold mb-4">{skill.title}</h3>
                <ul className="space-y-3 flex-grow">
                  {skill.skills.map((s) => (
                    <li key={s} className="text-sm font-medium flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-600/40 rounded-full"></div>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-white" id="experience">
        <div className="w-full px-4 md:px-12">
          <div className="mb-16 text-center md:text-left">
            <span className="font-sans text-xs uppercase tracking-widest text-blue-600 font-bold">Career Progression</span>
            <h2 className="font-headline text-4xl font-bold mt-2">Professional Experience</h2>
          </div>
          <div className="space-y-12 max-w-6xl mx-auto">
            {[
              {
                title: "Committee Member",
                company: "ICI Student Chapter NICMAR University Pune",
                type: "Full-time",
                date: "Jan 2024 - Present",
                location: "Pune, Maharashtra",
                skills: ["Public Speaking", "Event Management"],
                icon: <Verified className="w-6 h-6 text-blue-600" />
              },
              {
                title: "Civil Engineering Trainee",
                company: "NICMAR University",
                type: "Self-employed",
                date: "Aug 2023 - Present",
                location: "Pune, Maharashtra • On-site",
                bullets: [
                  "Developing a system-level understanding of civil engineering by integrating structural fundamentals, construction planning, and site execution concepts.",
                  "Practicing quantity takeoff and basic BOQ preparation from our subjects.",
                  "Studying how structural design decisions affect constructability, sequencing, and on-site coordination.",
                  "Analyzing real construction workflows and execution challenges to build engineering judgment beyond theoretical solutions."
                ],
                icon: <HardHat className="w-6 h-6 text-blue-600" />
              }
            ].map((exp, idx) => (
              <div key={idx} className="group relative bg-slate-50 p-8 md:p-12 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all hover:shadow-xl hover:shadow-blue-900/5">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 border border-slate-100 group-hover:scale-110 transition-transform">
                    {exp.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                      <div>
                        <h3 className="font-headline text-2xl font-bold text-slate-900">{exp.title}</h3>
                        <p className="text-blue-600 font-sans font-bold text-sm tracking-wide mt-1">{exp.company} • {exp.type}</p>
                      </div>
                      <div className="text-left md:text-right">
                        <time className="block text-sm font-black text-slate-400 uppercase tracking-widest">{exp.date}</time>
                        <span className="block text-xs text-slate-500 font-sans mt-1">{exp.location}</span>
                      </div>
                    </div>

                    {exp.bullets && (
                      <ul className="space-y-4 mb-8">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="flex gap-4 items-start text-slate-600 leading-relaxed text-sm">
                            <div className="w-1.5 h-1.5 bg-blue-600/40 rounded-full mt-2 shrink-0"></div>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.skills && (
                      <div className="flex flex-wrap gap-3">
                        {exp.skills.map(skill => (
                          <span key={skill} className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-[#0047AB] group-hover:border-blue-400 transition-colors">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 bg-white" id="projects">
        <div className="w-full px-6 sm:px-12 md:px-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8B7355] font-bold">PORTFOLIO</span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold mt-4">Selected Works</h2>
            </div>
            <p className="max-w-xs text-slate-500 text-sm leading-relaxed font-sans">
              A curation of academic research, design competitions, and technical drafting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {projectsData.map((project, idx) => (
              <Link
                key={project._id || project.id}
                to={`/project/${project.slug?.current || project.id}`}
                className={cn(
                  "group relative overflow-hidden rounded-sm bg-slate-900 w-full",
                  idx === 0 ? "md:col-span-8 aspect-[16/10]" :
                    idx === 1 ? "md:col-span-4 aspect-[10/16] md:aspect-auto" :
                      idx === 4 ? "md:col-span-12 aspect-[21/9]" :
                        "md:col-span-6 aspect-video"
                )}
              >
                {project.thumbnailUrl || project.thumbnail ? (
                  <img
                    src={project.thumbnail ? urlFor(project.thumbnail).width(1200).height(800).fit('crop').auto('format').url() : project.thumbnailUrl}
                    className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    alt={project.title || "Project Thumbnail"}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="blueprint-grid absolute inset-0 opacity-10"></div>
                    <Presentation className="w-12 h-12 text-white/20" />
                  </div>
                )}
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.tags || []).slice(0, 2).map((tag: string) => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-white/60 border border-white/20 px-3 py-1 rounded-full whitespace-nowrap">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className={cn(
                    "font-headline font-bold text-white mb-4",
                    idx === 0 ? "text-3xl" : "text-2xl"
                  )}>
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-sm max-w-xl mb-6 line-clamp-2">
                    {project.shortDesc}
                  </p>

                  {(project.keyHighlights || []).length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-6">
                      {(project.keyHighlights || []).slice(0, 3).map((highlight: string) => (
                        <div key={highlight} className="flex flex-col gap-1.5">
                          <div className="h-[1px] w-4 bg-blue-400/50"></div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-white/50">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mt-auto">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                      <span>{project.category}</span>
                      <span className="text-blue-400/50">•</span>
                      <span>{project.impact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/40 text-[9px] font-black uppercase tracking-widest sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View Project Detail</span>
                      <ArrowRight className="w-3 h-3 translate-y-[-0.5px]" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-24 bg-slate-50">
        <div className="w-full px-6 md:px-16 lg:px-[2in]">
          <div className="text-center mb-16 px-4">
            <span className="font-sans text-xs uppercase tracking-widest text-blue-600 font-bold">Expertise</span>
            <h2 className="font-headline text-3xl font-bold mt-2">Professional Certifications</h2>
          </div>
          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200">
            {[
              {
                title: "Project Management in Construction",
                org: "L&T EduTech (via Coursera)",
                type: "Verified Credential"
              },
              {
                title: "Marketing Management",
                org: "NPTEL",
                type: "Verified Credential"
              },
              {
                title: "Material Selection Matters & UHPC",
                org: "Precast/Prestressed Concrete Institute (PCI)",
                type: "Technical Series",
                isTechnical: true
              }
            ].map((cert, idx) => (
              <div key={idx} className="relative flex items-start gap-8 group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-50 bg-blue-600 text-white shadow shrink-0 z-10">
                  <Verified className="w-4 h-4" />
                </div>
                <div className="flex-grow p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-headline text-lg font-bold text-slate-900">{cert.title}</h4>
                      <p className="text-slate-600 text-sm">{cert.org}</p>
                    </div>
                    <span className={cn(
                      "px-3 py-1 text-[10px] font-black uppercase rounded-lg border self-start md:self-center",
                      cert.isTechnical ? "bg-yellow-400 text-slate-900 border-yellow-500" : "bg-blue-50 text-blue-600 border-blue-100"
                    )}>
                      {cert.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-white relative overflow-hidden" id="contact">
        <div className="w-full px-4 md:px-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#8B7355] font-bold">INQUIRY</span>
              <h2 className="font-serif text-5xl md:text-6xl font-bold mt-8 mb-16 leading-tight">Let's build something<br />enduring together.</h2>

              <div className="space-y-10">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center">
                    <Mail className="text-[#0047AB] w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-sm">Email Me</p>
                    <p className="text-slate-500 text-sm">sarangdeore2005@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center">
                    <MapPin className="text-[#0047AB] w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-sm">Location</p>
                    <p className="text-slate-500 text-sm">Pune, Maharashtra</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center">
                    <Linkedin className="text-[#0047AB] w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-sm">Social Presence</p>
                    <div className="flex gap-4 mt-1">
                      <a href="https://www.linkedin.com/in/sarangdeore/" className="text-[#0047AB] text-xs font-bold hover:underline">LinkedIn</a>
                      <a href="#" className="text-[#0047AB] text-xs font-bold hover:underline">Portfolio</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-12 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50">
              <form className="space-y-10" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">FULL NAME</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border-b border-slate-200 py-2 text-sm focus:border-[#0047AB] transition-all outline-none placeholder:text-slate-200"
                    placeholder="John Doe"
                    type="text"
                  />
                  {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">EMAIL ADDRESS</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-b border-slate-200 py-2 text-sm focus:border-[#0047AB] transition-all outline-none placeholder:text-slate-200"
                    placeholder="john@company.com"
                    type="email"
                  />
                  {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">SUBJECT</label>
                  <div className="relative">
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e as any)}
                      className="w-full border-b border-slate-200 py-2 text-sm focus:border-[#0047AB] transition-all outline-none appearance-none bg-transparent"
                    >
                      <option value="">Select Subject</option>
                      <option value="Internship Opportunity">Internship Opportunity</option>
                      <option value="Project Collaboration">Project Collaboration</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                      <ArrowRight className="w-4 h-4 rotate-90 text-slate-400" />
                    </div>
                  </div>
                  {errors.subject && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">MESSAGE</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border-b border-slate-200 py-2 text-sm focus:border-[#0047AB] transition-all outline-none placeholder:text-slate-200 min-h-[100px] resize-none"
                    placeholder="How can I help with your next project?"
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-[10px] font-bold uppercase">{errors.message}</p>}
                </div>

                <button
                  disabled={isSubmitting}
                  className="w-full bg-[#0047AB] text-white font-bold py-5 rounded-sm hover:bg-blue-800 transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-xs uppercase tracking-widest"
                  type="submit"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Proposal'}
                </button>

                <AnimatePresence>
                  {errors.submit && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-[10px] font-black uppercase text-center mb-4"
                    >
                      {errors.submit}
                    </motion.div>
                  )}
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-green-600 text-xs font-bold text-center"
                    >
                      Proposal sent successfully!
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
