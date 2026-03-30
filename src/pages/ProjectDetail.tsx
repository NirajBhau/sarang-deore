import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Clock, 
  Target, 
  User, 
  LucideIcon, 
  HardHat, 
  Droplets, 
  Gauge, 
  Verified, 
  FileText, 
  Presentation, 
  FileSpreadsheet, 
  FileJson,
  Code,
  Radar,
  Beaker,
  Database,
  Loader2,
  Maximize2,
  Download,
  Calendar,
  ChevronRight,
  Ruler,
  BarChart3,
  Minimize2,
  Play
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { cn } from '../lib/utils';
import { getProjectBySlug, urlFor } from '../lib/sanity';

// Import New Technical Assets
import shmResults from '../assets/shm_lab_results.png';
import rwhResults from '../assets/rwh_lab_results.png';
import vsiResults from '../assets/vsi_lab_results.png';
import cityResults from '../assets/city_zoning_lab_results.png';
import structuralIno from '../assets/structural_profile.png';

// Dynamic Icon Mapping
const iconMap: Record<string, LucideIcon> = {
  HardHat, Droplets, Gauge, Verified, FileText, Presentation, FileSpreadsheet, FileJson, Code, Radar, Beaker, Database, Calendar, Ruler, BarChart3
};

const PROJECTS_DATA: Record<string, any> = {
  "hydrophobic-concrete": {
    title: "Hydrophobic Concrete for Water-Resistant Structures",
    category: "Material Science / Structural Engineering",
    shortDesc: "Advanced research into silane and siloxane-based admixtures to create moisture-repellent concrete matrices for high-durability infrastructure.",
    fullDesc: `This research project focused on investigating the effectiveness of specific chemical additives in creating hydrophobic concrete. Traditional concrete is naturally porous, allowing water ingress that leads to structural degradation, corrosion of reinforcement, and reduced lifespan of civil structures.

By experimenting with silane and siloxane-based admixtures, we analyzed how the internal capillary structure of the cement matrix could be altered to repel moisture while remaining breathable. The study provides a blueprint for high-durability infrastructure in high-moisture environments.`,
    impact: "82% Reduction",
    role: "Lead Researcher",
    researchSignificance: "This methodology reduces maintenance costs for marine and basement structures by preventing water-induced spalling and carbonation.",
    grade: "A+ Grade",
    statusTag: "COMPLETED",
    methodology: [
      { title: "Lab Testing", value: "24", unit: "DAYS CURING", icon: "Beaker", description: "Compressive strength and water absorption tests conducted per IS codes." },
      { title: "Absorption Rate", value: "82", unit: "% REDUCTION", icon: "Droplets", description: "Percentage reduction in capillary water absorption vs control mix." },
      { title: "Durability Index", value: "15+", unit: "YEARS EXTRA", icon: "Gauge", description: "Estimated increase in structural lifespan under saline conditions." }
    ],
    technicalTools: [
      { name: "MS EXCEL", description: "Used for regression analysis of curing stages and data visualization of absorption rates.", icon: "FileSpreadsheet" },
      { name: "LAB EQUIPMENT", description: "UTM (Universal Testing Machine) and Ve-Bee apparatus for material property validation.", icon: "HardHat" },
      { name: "AUTOCAD", description: "Structural detailing of concrete blocks and reinforced placement drawings.", icon: "Code" }
    ],
    galleryImages: [
        "/projects/1-hydrophobic-concrete/ChatGPT Image Mar 29, 2026, 01_27_23 PM.png",
        structuralIno,
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1517646281634-26a389e55d80?auto=format&fit=crop&q=80&w=1000"
    ],
    manualResources: [
      { name: "Research Report", type: "pdf", url: "/projects/1-hydrophobic-concrete/Hydrophobic_Concrete_Report.pdf" },
      { name: "Project Summary", type: "docx", url: "/projects/1-hydrophobic-concrete/Hydrophobic_Concrete_To display text.docx" }
    ]
  },
  "structural-health-monitoring-of-rc-columns": {
    title: "Structural Health Monitoring (SHM) using IoT Sensors",
    category: "Structural Engineering / IoT",
    shortDesc: "Real-time vibration analysis and strain monitoring of scale model bridges using accelerometer arrays.",
    fullDesc: `Development of a low-cost IoT framework for continuous monitoring of structural integrity. The project involved deploying strain gauges and accelerometers on a scale model bridge to detect anomalies in real-time.

By processing vibration data through FFT (Fast Fourier Transform), we successfully identified structural defects before visual signs appeared. This research offers a proactive approach to bridge maintenance and disaster prevention.`,
    impact: "95% Accuracy",
    role: "System Designer",
    researchSignificance: "Enables early warning systems for critical infrastructure, potentially saving lives and reducing emergency repair costs by 40%.",
    grade: "Ex Grade",
    statusTag: "COMPLETED",
    methodology: [
      { title: "Sensor Array", value: "12", unit: "NODES", icon: "Radar", description: "Distributed sensor mesh for multi-point strain and vibration capture." },
      { title: "Data Frequency", value: "100", unit: "HZ SAMPLES", icon: "Gauge", description: "High-frequency sampling rate for precise harmonic analysis." },
      { title: "Anomaly Detection", value: "95", unit: "% PRECISION", icon: "Verified", description: "Successful detection of simulated structural cracks and bolt loosening." }
    ],
    technicalTools: [
      { name: "MATLAB", description: "Signal processing and FFT analysis of vibration data.", icon: "Code" },
      { name: "ARDUINO IDE", description: "Microcontroller programming for real-time sensor data transmission.", icon: "Database" },
      { name: "ETABS", description: "Finite Element Modeling for theoretical comparison with sensor data.", icon: "HardHat" }
    ],
    galleryImages: [
        shmResults,
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1000"
    ],
    manualResources: [
      { name: "Axial Load Analysis", type: "docx", url: "/projects/2-structural-health-monitoring/SHM of a Reinforced Concrete Column Under Axial Load.docx" }
    ]
  },
  "smart-rainwater-harvesting-system": {
    title: "Smart Rainwater Harvesting & Greywater Reuse",
    category: "Sustainable Engineering",
    shortDesc: "Intelligent filtration and storage management system for urban residential complexes.",
    fullDesc: `Design of an automated rainwater Harvesting system that optimizes storage based on rainfall predictions and household usage patterns. The system includes dual-stage filtration and moisture sensors.

Through hydraulic modeling, we created a scalable solution for water-scarce urban regions. The project emphasizes sustainable urban drainage and reduction in municipal water reliance.`,
    impact: "30% Savings",
    role: "Hydraulic Analyst",
    researchSignificance: "Reduces peak municipal demand during summer months and prevents urban flooding through controlled storage.",
    grade: "A Grade",
    statusTag: "FIELD TESTED",
    methodology: [
      { title: "Filtration Efficiency", value: "98", unit: "% TSS REMOVAL", icon: "Droplets", description: "Removal of Total Suspended Solids through bio-sand filtration." },
      { title: "Storage Capacity", value: "5000", unit: "LITERS/DAY", icon: "Database", description: "Optimized tank sizing based on roof catchment area and runoff coefficients." },
      { title: "Water Savings", value: "30", unit: "% REDUCTION", icon: "Verified", description: "Reduction in monthly municipal water bill for a 4-person household." }
    ],
    technicalTools: [
      { name: "EPANET", description: "Hydraulic modeling for water distribution within the building.", icon: "Radar" },
      { name: "MS PROJECT", description: "Planning and phase-wise implementation scheduling.", icon: "Calendar" },
      { name: "GIS", description: "Catchment area analysis and runoff estimation for urban zones.", icon: "Code" }
    ],
    galleryImages: [
        rwhResults,
        "https://images.unsplash.com/photo-1544333346-633ca59372bd?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000"
    ],
    manualResources: [
      { name: "Harvesting Report", type: "pdf", url: "/projects/3-smart-rainwater-harvesting/RWH_Report.pdf" },
      { name: "Calculations Data", type: "docx", url: "/projects/3-smart-rainwater-harvesting/RWH_To display text.docx" }
    ]
  },
  "visual-structural-inspection-(g+6-building)": {
    title: "Visual Structural Inspection & Condition Mapping",
    category: "Structural Maintenance",
    shortDesc: "Comprehensive condition assessment of heritage structures using photogrammetry and ND testing.",
    fullDesc: `This project involved the detailed visual and non-destructive testing (NDT) of a 50-year-old reinforced concrete building. We mapped cracks, spalling, and moisture ingress zones.

The data was used to create a digital twin with priority zones for repair. This research bridges the gap between traditional inspection and modern digital asset management.`,
    impact: "40% Faster",
    role: "Site Inspector",
    researchSignificance: "Standardizes the reporting process for structural audits, ensuring objective grading of structural health.",
    grade: "A+ Grade",
    statusTag: "COMPLETED",
    methodology: [
      { title: "Inspection Area", value: "1200", unit: "SQ. METERS", icon: "Ruler", description: "Total surface area inspected and digitally mapped for defects." },
      { title: "NDT Tests", value: "45", unit: "POINTS", icon: "Verified", description: "Rebound hammer and ultrasonic pulse velocity tests conducted." },
      { title: "Reporting Time", value: "40", unit: "% REDUCTION", icon: "Clock", description: "Time saved using digital mapping vs traditional paper-based methods." }
    ],
    technicalTools: [
      { name: "NDT DEVICES", description: "Proceq Rebound Hammer and UPV tester for concrete quality.", icon: "HardHat" },
      { name: "AUTOCAD RECAP", description: "Processing site photos into point clouds for crack mapping.", icon: "Presentation" },
      { name: "BLUEBEAM", description: "Detailed markup and quantification of structural repairs.", icon: "FileText" }
    ],
    galleryImages: [
        vsiResults,
        "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
    ],
    manualResources: [
      { name: "Inspection Thesis", type: "docx", url: "/projects/4-visual-structural-inspection/SHM(P)_Report.docx" }
    ]
  },
  "pollution-aware-smart-city-zoning": {
    title: "Smart City Zoning & Transportation Planning",
    category: "Urban Planning / Infrastructure",
    shortDesc: "Data-driven zoning optimization for reduced traffic congestion and improved land use efficiency.",
    fullDesc: `Leveraging Geographic Information Systems (GIS) to analyze urban mobility patterns and propose zoning changes. The project focuses on transit-oriented development (TOD) and mixed-use efficiency.

By redistributing high-density zones near transit hubs, we simulated a significant reduction in average commute times. This study serves as a framework for sustainable urban expansion.`,
    impact: "25% Improved Flow",
    role: "Urban Planner",
    researchSignificance: "Provides city administrators with a data-backed blueprint for future-proof urban transit and residential development.",
    grade: "Ex Grade",
    statusTag: "ONGOING",
    methodology: [
      { title: "Land Analysis", value: "50", unit: "SECTORS", icon: "Radar", description: "Detailed analysis of land use patterns across 50 urban sectors." },
      { title: "Traffic Simulation", value: "25", unit: "% EFFICIENCY", icon: "BarChart3", description: "Increase in average vehicle speed through re-zoning strategies." },
      { title: "Greenspace Index", value: "15", unit: "% INCREASE", icon: "Droplets", description: "Optimization of public parks and green corridors within high-density zones." }
    ],
    technicalTools: [
      { name: "ARCGIS", description: "Primary tool for spatial analysis and urban land-use mapping.", icon: "Code" },
      { name: "PYTHON (PANDAS)", description: "Used for cleaning and analyzing demographic and mobility datasets.", icon: "Database" },
      { name: "SKETCHUP", description: "3D visualization of proposed mixed-use development blocks.", icon: "Presentation" }
    ],
    galleryImages: [
        cityResults,
        "https://images.unsplash.com/photo-1570126688035-1e6adbd6142c?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1000"
    ],
    manualResources: [
      { name: "Zoning Framework", type: "docx", url: "/projects/5-smart-city-zoning/Smart City Zoning to display text.docx" },
      { name: "City Design Report", type: "docx", url: "/projects/5-smart-city-zoning/Smart_City_Zoning_Project_Report.docx" }
    ]
  }
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPPTMaximized, setIsPPTMaximized] = useState(false);
  const pptContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProject() {
      if (!id) return;
      try {
        const data = await getProjectBySlug(id);
        const localData = PROJECTS_DATA[id];

        if (!data && !localData) {
          navigate('/');
          return;
        }

        setProject({
          ...data,
          ...(localData || {}),
          id: id,
          resources: (data?.resources || []).concat(localData?.manualResources || []).filter((r: any) => !r.type?.toLowerCase().includes('ppt'))
        });
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProject();
  }, [id, navigate]);

  const togglePPTFullscreen = () => {
    setIsPPTMaximized(!isPPTMaximized);
    if (!isPPTMaximized && pptContainerRef.current) {
        pptContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white border-none p-0">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Dark Hero Header */}
      <header className="bg-slate-900 pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="border-r border-white/10 h-full"></div>
            ))}
          </div>
        </div>
        
        <div className="w-full px-0 relative z-10">
          <div className="max-w-full px-6 md:px-16">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Back to Portfolio</span>
            </Link>

            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-4">
                 <span className="bg-yellow-400 text-slate-900 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm shadow-lg shadow-yellow-400/20">
                    {project.statusTag || "COMPLETED"}
                 </span>
                 <span className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">{project.category}</span>
              </div>
              
              <div className="max-w-4xl">
                <h1 className="text-5xl md:text-7xl font-headline font-bold text-white leading-[1.1] mb-8">
                  {project.title}
                </h1>
                <div className="w-24 h-1 bg-blue-600"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="w-full py-20 space-y-24 px-0">
        
        {/* Section 1: Overview & Downloads */}
        <section className="max-w-full px-6 md:px-16 grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-8">
             <div className="flex items-center gap-4">
                <div className="w-8 h-[2px] bg-blue-600"></div>
                <h2 className="text-2xl font-headline font-bold text-slate-900 tracking-tight">Project Overview</h2>
             </div>
             <div className="grid md:grid-cols-2 gap-12">
                <p className="text-slate-600 leading-relaxed font-medium">
                   {project.fullDesc?.split('\n')[0]}
                </p>
                <p className="text-slate-600 leading-relaxed font-medium">
                   {project.fullDesc?.split('\n').slice(1).join('\n')}
                </p>
             </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
             <h3 className="font-headline text-lg font-bold text-slate-900 tracking-tight">Resource Downloads</h3>
             <div className="space-y-4">
                {project.resources?.map((res: any, idx: number) => (
                   <a 
                    key={idx} 
                    href={res.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col gap-4 p-6 rounded-sm bg-slate-50 border border-slate-100 group hover:border-blue-400 transition-all shadow-sm"
                   >
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                           {res.type?.toLowerCase().includes('pdf') ? <FileText className="w-5 h-5 text-red-500 group-hover:text-white" /> : 
                            res.type?.toLowerCase().includes('doc') ? <FileText className="w-5 h-5 text-blue-500 group-hover:text-white" /> : 
                            <Download className="w-5 h-5 text-slate-500 group-hover:text-white" />}
                        </div>
                        <div>
                           <h4 className="font-bold text-slate-900 text-xs group-hover:text-blue-600 transition-colors uppercase tracking-tight line-clamp-1">{res.name}</h4>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{res.type || "Document"}</p>
                        </div>
                     </div>
                     <div className="flex items-center justify-center py-2 px-4 border border-blue-600/20 text-blue-600 text-[9px] font-black uppercase tracking-widest rounded-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Download className="w-3 h-3 mr-2" /> Download Document
                     </div>
                   </a>
                ))}
                {project.resources?.length === 0 && (
                  <p className="text-xs text-slate-400 italic">No additional research files available for this phase.</p>
                )}
             </div>
          </div>
        </section>

        {/* Section 2: PPT Viewer & Technical Detail */}
        <section 
          ref={pptContainerRef}
          className={cn(
            "max-w-full px-6 md:px-16 grid gap-16 transition-all duration-500",
            isPPTMaximized ? "lg:grid-cols-1" : "lg:grid-cols-12"
          )}
        >
          {/* PPT Viewer */}
          <div className={cn("space-y-8", isPPTMaximized ? "w-full" : "lg:col-span-8")}>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-[2px] bg-red-600"></div>
                    <h2 className="text-xl font-headline font-bold text-slate-900 uppercase tracking-widest">Technical Presentation Preview</h2>
                </div>
                <button 
                    onClick={togglePPTFullscreen}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                >
                    {isPPTMaximized ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                    <span className="text-[10px] font-black uppercase tracking-widest">{isPPTMaximized ? "Minimize View" : "Maximize View"}</span>
                </button>
             </div>

             <div className={cn(
                "relative rounded-sm overflow-hidden border border-slate-200 bg-slate-100 shadow-inner group",
                isPPTMaximized ? "h-[85vh] z-50 fixed inset-4 top-24 bg-white shadow-2xl" : "aspect-video"
             )}>
                {isPPTMaximized && (
                    <button 
                        onClick={() => setIsPPTMaximized(false)}
                        className="absolute top-4 right-4 z-[60] bg-slate-900 text-white p-3 rounded-full hover:bg-red-600 transition-all shadow-xl"
                    >
                        <Minimize2 className="w-6 h-6" />
                    </button>
                )}
                {project.pptUrl ? (
                    <iframe 
                      src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(project.pptUrl)}`}
                      className="w-full h-full"
                      frameBorder="0"
                      title="Project Presentation"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white p-12 text-center group relative cursor-pointer">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center mix-blend-overlay"></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform backdrop-blur-md border border-white/30">
                                <Play className="w-10 h-10 fill-white ml-1" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">View Technical Specification Slides</h3>
                            <p className="text-white/60 max-w-sm mx-auto text-sm leading-relaxed">Detailed structural engineering analysis, field testing parameters, and quantifiable research findings.</p>
                        </div>
                    </div>
                )}
             </div>
          </div>

          {!isPPTMaximized && (
            <div className="lg:col-span-4 space-y-12">
                <div className="space-y-8">
                    <h3 className="font-headline text-lg font-bold text-slate-900 tracking-tight uppercase tracking-widest">Technical Tools</h3>
                    <div className="space-y-6">
                        {project.technicalTools?.map((tool: any, idx: number) => {
                            const ToolIcon = iconMap[tool.icon] || Code;
                            return (
                                <div key={idx} className="flex gap-4 group">
                                    <div className="w-[3px] h-12 bg-blue-600 group-hover:w-2 transition-all"></div>
                                    <div>
                                        <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest">{tool.name}</h4>
                                        <p className="text-[10px] text-slate-500 leading-relaxed mt-1 font-medium">{tool.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="p-8 bg-[#0047AB] rounded-sm text-white shadow-xl shadow-blue-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/30 rounded-full -mr-12 -mt-12"></div>
                    <div className="relative z-10 space-y-6">
                        <h4 className="font-headline font-bold text-xl">Research Significance</h4>
                        <p className="text-blue-100 text-sm italic leading-relaxed">"{project.researchSignificance}"</p>
                        <div className="flex items-center justify-between pt-6 border-t border-blue-400/30">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-300">Final Result</p>
                                <p className="text-2xl font-black">{project.grade || "A+ Grade"}</p>
                            </div>
                            <Verified className="w-8 h-8 text-blue-300 transform rotate-12" />
                        </div>
                    </div>
                </div>
            </div>
          )}
        </section>

        {/* Section 3: Methodology Cards */}
        <section className="max-w-full px-6 md:px-16 space-y-12">
            <div className="flex items-center gap-4">
                <div className="w-8 h-[2px] bg-blue-600"></div>
                <h2 className="text-2xl font-headline font-bold text-slate-900 tracking-tight">Methodology & Lab Results</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {project.methodology?.map((item: any, idx: number) => {
                    const Icon = iconMap[item.icon] || Ruler;
                    return (
                        <div key={idx} className="relative overflow-hidden p-8 bg-slate-50 rounded-sm border border-slate-100 group hover:border-blue-400 transition-all shadow-sm">
                            <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none z-0 transition-opacity duration-700 group-hover:opacity-100"></div>
                            <div className="relative z-10">
                                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-slate-100 text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-tight">{item.title}</h4>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6 h-12 overflow-hidden">{item.description}</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-black text-slate-900 tracking-tighter">{item.value}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.unit}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>

        {/* Section 4: Image Gallery */}
        <section className="max-w-full px-6 md:px-16 space-y-12 pb-12">
             <div className="flex items-center gap-4">
                <div className="w-8 h-[2px] bg-blue-600"></div>
                <h2 className="text-2xl font-headline font-bold text-slate-900 tracking-tight">Project Visuals & Lab Findings</h2>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {(project.galleryImages || [
                    project.thumbnail || project.thumbnailUrl,
                    project.labResultsImage || project.labResultsUrl,
                    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000",
                    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1000",
                    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
                ]).filter(Boolean).map((img: any, idx: number) => {
                    const imgSrc = typeof img === 'string' 
                        ? img 
                        : (img?.asset ? urlFor(img).width(800).height(800).fit('crop').auto('format').url() : '');
                    
                    if (!imgSrc) return null;

                    return (
                    <div key={idx} className="aspect-square rounded-sm overflow-hidden border border-slate-200 group relative shadow-md">
                        <img 
                            src={imgSrc} 
                            alt={`Lab Result ${idx}`} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Maximize2 className="w-8 h-8 text-white scale-75 group-hover:scale-100 transition-transform" />
                        </div>
                    </div>
                )})}
             </div>
        </section>

      </main>

    </div>
  );
}
