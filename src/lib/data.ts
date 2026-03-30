import structuralIno from '../assets/structural_profile.png';
import shmResults from '../assets/shm_lab_results.png';
import rwhResults from '../assets/rwh_lab_results.png';
import vsiResults from '../assets/vsi_lab_results.png';
import cityResults from '../assets/city_zoning_lab_results.png';
import { HardHat, Droplets, Gauge, Verified, FileText, Presentation, FileSpreadsheet, FileJson, Code, Radar, Beaker, Database, Calendar, Ruler, BarChart3, LucideIcon } from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
  HardHat, Droplets, Gauge, Verified, FileText, Presentation, FileSpreadsheet, FileJson, Code, Radar, Beaker, Database, Calendar, Ruler, BarChart3
};

// Convert the object into an array with 'id' added to each object for easier mapping
const PROJECTS_DATA_RAW: Record<string, any> = {
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
    ],
    tags: ["Material Science", "Concrete Core", "Silane Comp"],
    thumbnailUrl: "/projects/1-hydrophobic-concrete/ChatGPT Image Mar 29, 2026, 01_27_23 PM.png",
    pptUrl: "/projects/1-hydrophobic-concrete/Hydrophobic_Concrete_PPT.pptx"
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
    ],
    tags: ["IoT", "Sensor Array", "Monitoring"],
    thumbnailUrl: shmResults
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
    ],
    tags: ["Sustainable", "Water Grid", "Filtration"],
    thumbnailUrl: rwhResults,
    pptUrl: "/projects/3-smart-rainwater-harvesting/RWH_PPT.pptx"
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
    ],
    tags: ["NDT Testing", "Inspection", "Assessment"],
    thumbnailUrl: vsiResults
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
    ],
    tags: ["Zoning", "GIS Mapping", "Smart City"],
    thumbnailUrl: cityResults,
    pptUrl: "/projects/5-smart-city-zoning/Smart_City_Zoning_Project_PPT.pptx"
  }
};

export const PROJECTS_DATA = PROJECTS_DATA_RAW;

export const PROJECTS_LIST = Object.entries(PROJECTS_DATA_RAW).map(([id, project]) => ({
  id,
  _id: id,
  slug: { current: id },
  ...project
}));
