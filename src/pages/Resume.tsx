import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Download, Printer, Mail, Phone, Linkedin, MapPin, Award, ChevronRight, ExternalLink, Target, ShieldCheck } from 'lucide-react';
import { getActiveResume, getProjects } from '../lib/sanity';
import { PROJECTS_LIST } from '../lib/data';

export default function Resume() {
  const [resumeUrl, setResumeUrl] = useState<string>('/Sarang_Deore_Resume.pdf');
  const [projectsData, setProjectsData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resumeData, projects] = await Promise.all([
          getActiveResume(),
          getProjects()
        ]);
        
        if (resumeData?.url) {
          setResumeUrl(resumeData.url);
        }
        setProjectsData(projects && projects.length > 0 ? projects : PROJECTS_LIST);
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
        setProjectsData(PROJECTS_LIST);
      }
    }
    fetchData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white pt-24 sm:pt-32 pb-24 font-sans text-slate-900 selection:bg-blue-100 overflow-x-hidden">
      {/* Blueprint Background Pattern */}
      <div className="fixed inset-0 blueprint-grid opacity-50 pointer-events-none z-0"></div>

      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-[0.5in] relative z-10">
        {/* Print / Export Actions */}
        <div className="flex justify-end items-center mb-12 no-print">
          <div className="flex gap-3">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-sm text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:border-slate-900 transition-all"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <a 
              href={resumeUrl}
              download
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#0047AB] text-white rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/20 no-underline"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        </div>

        {/* Main Resume Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-slate-200 border border-slate-200 overflow-hidden rounded-sm shadow-2xl print:shadow-none print:border-slate-900 print:bg-white"
        >
          {/* Section: Header / Profile */}
          <div className="lg:col-span-8 bg-white p-6 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-200 print:border-slate-900">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0047AB] text-[10px] font-black uppercase tracking-widest mb-6 rounded-sm">
                <ShieldCheck className="w-3 h-3" />
                Verified Civil Engineer
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-9xl font-serif font-bold text-slate-900 mb-8 leading-[0.85] tracking-tighter">
                Sarang<br />Deore
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl leading-relaxed">
                Specializing in <span className="text-slate-900 underline decoration-blue-500 underline-offset-4">Construction Management</span> and <span className="text-slate-900 underline decoration-blue-500 underline-offset-4">Structural Analysis</span>. 
                Integrating data-driven methodologies into modern infrastructure.
              </p>
            </motion.div>
          </div>

          {/* Section: Contact Info */}
          <div className="lg:col-span-4 bg-slate-50 p-6 md:p-12 flex flex-col justify-between print:bg-white">
            <div className="space-y-8">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Communication Node</h3>
              <div className="space-y-6">
                <ContactItem icon={<Mail className="w-4 h-4" />} label="Email" value="sarangdeore2005@gmail.com" href="mailto:sarangdeore2005@gmail.com" />
                <ContactItem icon={<Phone className="w-4 h-4" />} label="Phone" value="+91 86900 16890" />
                <ContactItem icon={<Linkedin className="w-4 h-4" />} label="LinkedIn" value="sarangdeore" href="https://www.linkedin.com/in/sarangdeore/" />
                <ContactItem icon={<MapPin className="w-4 h-4" />} label="Location" value="Pune, Maharashtra" />
              </div>
            </div>
            <div className="mt-12 pt-12 border-t border-slate-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-slate-100 rounded-sm">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Availability</p>
                  <p className="text-xs font-bold text-green-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Open for Internships
                  </p>
                </div>
                <div className="p-4 bg-white border border-slate-100 rounded-sm">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Experience</p>
                  <p className="text-xs font-bold text-slate-900">Undergraduate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Summary / Mission */}
          <div className="lg:col-span-12 bg-slate-900 p-6 md:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="max-w-5xl relative z-10">
              <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                <Target className="w-4 h-4" />
                Professional Summary
              </h3>
              <p className="text-xl sm:text-2xl md:text-3xl font-serif leading-[1.4] opacity-95">
                "Civil Engineering undergraduate with interests in <span className="text-blue-400 font-bold italic">Construction Management</span> and <span className="text-blue-400 font-bold italic">Structural Engineering</span>. Completed Project Management in Construction Specialization by L&T EduTech, with practical knowledge of planning, scheduling, and cost control. Currently learning GIS, Remote Sensing, and Drone Surveying."
              </p>
            </div>
          </div>

          {/* Section: Experience */}
          <div className="lg:col-span-12 bg-white p-6 md:p-16 border-b border-slate-200 print:border-slate-900">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Professional Experience</h3>
            <div className="space-y-16">
              <ExperienceItem 
                title="Committee Member"
                company="ICI Student Chapter NICMAR University Pune"
                date="Jan 2024 — Present"
                location="Pune, Maharashtra"
                type="Full-time"
                desc="Contributing to the growth of the student chapter through event organization and technical knowledge dissemination."
                skills={["Public Speaking", "Event Management"]}
              />
              <ExperienceItem 
                title="Civil Engineering Trainee"
                company="NICMAR University"
                date="Aug 2023 — Present"
                location="Pune, Maharashtra"
                type="Self-employed"
                desc="Practical training focused on the integration of structural theory with site execution and project planning."
                bullets={[
                  "Developing a system-level understanding of civil engineering by integrating structural fundamentals, construction planning, and site execution concepts.",
                  "Practicing quantity takeoff and basic BOQ preparation from our subjects.",
                  "Studying how structural design decisions affect constructability, sequencing, and on-site coordination.",
                  "Analyzing real construction workflows and execution challenges to build engineering judgment beyond theoretical solutions."
                ]}
              />
            </div>
          </div>

          {/* Section: Technical Stats */}
          <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border-b border-slate-200 print:border-slate-900">
            <StatItem label="CGPA" value="8.8/10" sub="NICMAR University" />
            <StatItem label="Projects" value="12+" sub="Academic & Research" />
            <StatItem label="Certifications" value="05" sub="Industry Recognized" />
            <StatItem label="Software" value="08+" sub="Engineering Tools" />
          </div>

          {/* Section: Skills Grid */}
          <div className="lg:col-span-5 bg-white p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-200 print:border-slate-900">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Technical Stack</h3>
            <div className="space-y-12">
              <SkillCategory 
                title="Construction & Management" 
                skills={["Project Planning", "MS Project, Primavera", "Cost Estimation", "BOQ Preparation", "BBS Analysis"]} 
              />
              <SkillCategory 
                title="Structural & Design" 
                skills={["AutoCAD", "STAAD.Pro", "Structural Analysis", "Visual Inspection"]} 
              />
              <SkillCategory 
                title="Programming & Tools" 
                skills={["Python (Basic)", "MATLAB (Basic)", "MS Excel (Analysis)", "GIS & Remote Sensing"]} 
              />
            </div>
          </div>

          {/* Section: Projects List */}
          <div className="lg:col-span-7 bg-slate-50 p-6 md:p-16 print:bg-white">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Project Portfolio</h3>
            <div className="space-y-16">
              {projectsData.map((project) => (
                <ProjectItem 
                  key={project._id || project.id}
                  title={project.title}
                  role={project.role || project.category}
                  desc={project.shortDesc}
                  tags={project.tags}
                  impact={project.impact}
                />
              ))}
            </div>
          </div>

          {/* Section: Education & Certs */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border-t border-slate-200 print:border-slate-900">
            <div className="bg-white p-6 md:p-16">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Academic Trajectory</h3>
              <div className="space-y-12">
                <div className="group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-2xl font-bold group-hover:text-[#0047AB] transition-colors">B.Tech Civil Engineering</h4>
                      <p className="text-slate-500 font-medium">NICMAR University, Pune</p>
                    </div>
                    <span className="text-[10px] font-black bg-slate-100 px-3 py-1.5 rounded-sm uppercase tracking-widest">2023 — 2027</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-3 flex-grow bg-slate-100 rounded-sm overflow-hidden">
                      <div className="h-full bg-[#0047AB] w-[88%] relative">
                        <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                      </div>
                    </div>
                    <span className="text-lg font-black text-[#0047AB]">8.8 CGPA</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-12 pt-12 border-t border-slate-100">
                  <div>
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Class XII • MSB</h5>
                    <p className="text-3xl font-bold text-slate-900">81.83%</p>
                    <p className="text-xs text-slate-500 mt-1">Science Stream</p>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Class X • CBSE</h5>
                    <p className="text-3xl font-bold text-slate-900">79.00%</p>
                    <p className="text-xs text-slate-500 mt-1">Secondary Education</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 md:p-16">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Industry Accreditations</h3>
              <div className="space-y-6">
                <CertCard title="Project Management in Construction" org="L&T EduTech" date="2024" />
                <CertCard title="Marketing Management-I" org="NPTEL" date="2023" />
                <CertCard title="Material Selection Matters & UHPC" org="PCI" date="2023" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ContactItem({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href?: string }) {
  const Content = (
    <div className="flex items-center gap-5 group cursor-pointer">
      <div className="w-10 h-10 rounded-sm bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-[#0047AB] group-hover:text-[#0047AB] group-hover:shadow-lg group-hover:shadow-blue-100 transition-all">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
        <p className="text-sm font-bold text-slate-700 group-hover:text-[#0047AB] transition-colors">{value}</p>
      </div>
    </div>
  );

  return href ? <a href={href}>{Content}</a> : Content;
}

function StatItem({ label, value, sub }: { label: string, value: string, sub: string }) {
  return (
    <div className="bg-white p-8 group hover:bg-slate-50 transition-colors">
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{label}</p>
      <p className="text-3xl font-serif font-bold text-slate-900 group-hover:text-[#0047AB] transition-colors">{value}</p>
      <p className="text-[10px] font-medium text-slate-500 mt-1">{sub}</p>
    </div>
  );
}

function SkillCategory({ title, skills }: { title: string, skills: string[] }) {
  return (
    <div>
      <h4 className="text-[10px] font-black text-[#0047AB] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
        <ChevronRight className="w-3 h-3" />
        {title}
      </h4>
      <div className="flex flex-wrap gap-3">
        {skills.map(skill => (
          <span key={skill} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-sm text-xs font-bold text-slate-600 hover:border-blue-200 hover:text-[#0047AB] hover:bg-white transition-all">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectItem({ title, role, desc, tags, impact }: { title: string, role: string, desc: string, tags: string[], impact: string, key?: string }) {
  return (
    <div className="group">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h4 className="text-2xl font-bold group-hover:text-[#0047AB] transition-colors mb-1">{title}</h4>
          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{role}</p>
        </div>
        <div className="px-4 py-2 bg-white border border-slate-200 rounded-sm text-center">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Impact</p>
          <p className="text-xs font-bold text-slate-900">{impact}</p>
        </div>
      </div>
      <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-3xl">
        {desc}
      </p>
      <div className="flex flex-wrap gap-6">
        {tags.map(tag => (
          <div key={tag} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CertCard({ title, org, date }: { title: string, org: string, date: string }) {
  return (
    <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-sm hover:border-blue-200 hover:bg-white transition-all group">
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 rounded-sm bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-[#0047AB] transition-colors shadow-sm">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 group-hover:text-[#0047AB] transition-colors">{title}</h4>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{org} • {date}</p>
        </div>
      </div>
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 group-hover:text-[#0047AB] transition-colors">
        <ExternalLink className="w-4 h-4" />
      </div>
    </div>
  );
}

function ExperienceItem({ title, company, date, location, type, desc, bullets, skills }: { title: string, company: string, date: string, location: string, type: string, desc: string, bullets?: string[], skills?: string[] }) {
  return (
    <div className="group">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
        <div>
          <h4 className="text-2xl font-bold group-hover:text-[#0047AB] transition-colors mb-1">{title}</h4>
          <p className="text-sm font-bold text-slate-700">{company} • <span className="text-blue-600 uppercase text-[10px] tracking-widest">{type}</span></p>
        </div>
        <div className="text-left md:text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{date}</p>
          <p className="text-xs text-slate-500 font-medium">{location}</p>
        </div>
      </div>
      <p className="text-slate-500 text-base leading-relaxed mb-6 max-w-4xl italic">
        "{desc}"
      </p>
      {bullets && (
        <ul className="space-y-4 mb-8">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex gap-4 items-start text-slate-600 leading-relaxed text-sm">
              <div className="w-1.5 h-1.5 bg-blue-600/40 rounded-full mt-2 shrink-0"></div>
              {bullet}
            </li>
          ))}
        </ul>
      )}
      {skills && (
        <div className="flex flex-wrap gap-3">
          {skills.map(skill => (
            <span key={skill} className="px-3 py-1 bg-white border border-slate-200 rounded-sm text-[10px] font-black uppercase tracking-widest text-[#0047AB]">
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
