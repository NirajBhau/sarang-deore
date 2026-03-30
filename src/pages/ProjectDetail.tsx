import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Download,
  Loader2,
  Maximize2,
  Minimize2,
  Play,
  Ruler,
  FileText,
  Code,
  Verified,
  ChevronRight,
  ExternalLink,
  Clock,
  Target,
  User,
  Calendar
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { cn } from '../lib/utils';
import { getProjectBySlug, urlFor } from '../lib/sanity';

import { PROJECTS_DATA, iconMap } from '../lib/data';

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
        let data = null;
        try {
          data = await getProjectBySlug(id);
        } catch (err) {
          console.error("Sanity fetch failed, falling back to local data:", err);
        }
        
        const localData = PROJECTS_DATA[id];

        if (!data && !localData) {
          navigate('/');
          return;
        }

        const mergedProject = {
          ...(data || {}),
          ...(localData || {}),
          id: id,
          // If we have both, we need to carefully merge Sanity fields onto local data
          // but ensure local fields (like fullDesc, methodology) take precedence if Sanity is empty
          ...data, 
          // Ensure local descriptive fields are always present if Sanity lacks them
          fullDesc: data?.fullDesc || localData?.fullDesc,
          category: data?.category || localData?.category,
          title: data?.title || localData?.title,
          statusTag: data?.statusTag || localData?.statusTag,
          grade: data?.grade || localData?.grade,
          researchSignificance: data?.researchSignificance || localData?.researchSignificance,
          pptUrl: data?.pptUrl || localData?.pptUrl,
          // Robust resource merging
          resources: [
            ...(data?.resources || []),
            ...(localData?.manualResources || [])
          ].filter(r => r && r.url && r.type?.toLowerCase().includes('ppt') === false),
          technicalTools: data?.technicalTools || localData?.technicalTools,
          methodology: data?.methodology || localData?.methodology,
          galleryImages: data?.galleryImages || localData?.galleryImages || []
        };

        setProject(mergedProject);
      } catch (error) {
        console.error("Final catch in fetchProject:", error);
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
                   {project?.fullDesc?.split('\n')[0] || "Overview details for this phase of the project are being finalized."}
                </p>
                <p className="text-slate-600 leading-relaxed font-medium">
                   {project?.fullDesc?.split('\n').slice(1).join('\n') || ""}
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
                <div className="flex items-center gap-3">
                    {project.pptUrl && (
                      <a 
                        href={project.pptUrl.startsWith('http') ? project.pptUrl : `${window.location.origin}${project.pptUrl}`}
                        download
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors border border-blue-100"
                        title="Download Presentation"
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Download PPT</span>
                      </a>
                    )}
                    <button 
                        onClick={togglePPTFullscreen}
                        className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                        {isPPTMaximized ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                        <span className="text-[10px] font-black uppercase tracking-widest">{isPPTMaximized ? "Minimize View" : "Maximize View"}</span>
                    </button>
                </div>
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
                      src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                        project.pptUrl.startsWith('http') ? project.pptUrl : `${window.location.origin}${project.pptUrl}`
                      )}&wdAr=1.77&wdStartOn=1`}
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
