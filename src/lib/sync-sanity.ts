import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env
dotenv.config();

const client = createClient({
  projectId: 'n2iakfs0',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: process.env.SANITY_AUTH_TOKEN, // Requires a token with WRITE access
  useCdn: false,
});

const projectsToSync = [
  {
    _id: "hydrophobic-concrete",
    _type: "project",
    title: "Hydrophobic Concrete for Water-Resistant Structures",
    slug: { _type: 'slug', current: "hydrophobic-concrete" },
    category: "Material Science / Structural Engineering",
    shortDesc: "Advanced research into silane and siloxane-based admixtures to create moisture-repellent concrete matrices for high-durability infrastructure.",
    fullDesc: `This research project focused on investigating the effectiveness of specific chemical additives in creating hydrophobic concrete. Traditional concrete is naturally porous, allowing water ingress that leads to structural degradation, corrosion of reinforcement, and reduced lifespan of civil structures.\n\nBy experimenting with silane and siloxane-based admixtures, we analyzed how the internal capillary structure of the cement matrix could be altered to repel moisture while remaining breathable. The study provides a blueprint for high-durability infrastructure in high-moisture environments.`,
    impact: "82% Reduction",
    role: "Lead Researcher",
    researchSignificance: "This methodology reduces maintenance costs for marine and basement structures by preventing water-induced spalling and carbonation.",
    grade: "A+ Grade",
    statusTag: "COMPLETED",
    methodology: [
      { _key: 'm1', title: "Lab Testing", value: "24", unit: "DAYS CURING", icon: "Beaker", description: "Compressive strength and water absorption tests conducted per IS codes." },
      { _key: 'm2', title: "Absorption Rate", value: "82", unit: "% REDUCTION", icon: "Droplets", description: "Percentage reduction in capillary water absorption vs control mix." },
      { _key: 'm3', title: "Durability Index", value: "15+", unit: "YEARS EXTRA", icon: "Gauge", description: "Estimated increase in structural lifespan under saline conditions." }
    ],
    technicalTools: [
      { _key: 't1', name: "MS EXCEL", description: "Used for regression analysis of curing stages and data visualization of absorption rates.", icon: "FileSpreadsheet" },
      { _key: 't2', name: "LAB EQUIPMENT", description: "UTM (Universal Testing Machine) and Ve-Bee apparatus for material property validation.", icon: "HardHat" },
      { _key: 't3', name: "AUTOCAD", description: "Structural detailing of concrete blocks and reinforced placement drawings.", icon: "Code" }
    ],
    tags: ["Material Science", "Concrete Core", "Silane Comp"],
  },
  {
    _id: "structural-health-monitoring-of-rc-columns",
    _type: "project",
    title: "Structural Health Monitoring (SHM) using IoT Sensors",
    slug: { _type: 'slug', current: "structural-health-monitoring-of-rc-columns" },
    category: "Structural Engineering / IoT",
    shortDesc: "Real-time vibration analysis and strain monitoring of scale model bridges using accelerometer arrays.",
    fullDesc: `Development of a low-cost IoT framework for continuous monitoring of structural integrity. The project involved deploying strain gauges and accelerometers on a scale model bridge to detect anomalies in real-time.\n\nBy processing vibration data through FFT (Fast Fourier Transform), we successfully identified structural defects before visual signs appeared. This research offers a proactive approach to bridge maintenance and disaster prevention.`,
    impact: "95% Accuracy",
    role: "System Designer",
    researchSignificance: "Enables early warning systems for critical infrastructure, potentially saving lives and reducing emergency repair costs by 40%.",
    grade: "Ex Grade",
    statusTag: "COMPLETED",
    methodology: [
      { _key: 'm1', title: "Sensor Array", value: "12", unit: "NODES", icon: "Radar", description: "Distributed sensor mesh for multi-point strain and vibration capture." },
      { _key: 'm2', title: "Data Frequency", value: "100", unit: "HZ SAMPLES", icon: "Gauge", description: "High-frequency sampling rate for precise harmonic analysis." },
      { _key: 'm3', title: "Anomaly Detection", value: "95", unit: "% PRECISION", icon: "Verified", description: "Successful detection of simulated structural cracks and bolt loosening." }
    ],
    technicalTools: [
      { _key: 't1', name: "MATLAB", description: "Signal processing and FFT analysis of vibration data.", icon: "Code" },
      { _key: 't2', name: "ARDUINO IDE", description: "Microcontroller programming for real-time sensor data transmission.", icon: "Database" },
      { _key: 't3', name: "ETABS", description: "Finite Element Modeling for theoretical comparison with sensor data.", icon: "HardHat" }
    ],
    tags: ["IoT", "Sensor Array", "Monitoring"],
  },
  {
    _id: "smart-rainwater-harvesting-system",
    _type: "project",
    title: "Smart Rainwater Harvesting & Greywater Reuse",
    slug: { _type: 'slug', current: "smart-rainwater-harvesting-system" },
    category: "Sustainable Engineering",
    shortDesc: "Intelligent filtration and storage management system for urban residential complexes.",
    fullDesc: `Design of an automated rainwater Harvesting system that optimizes storage based on rainfall predictions and household usage patterns. The system includes dual-stage filtration and moisture sensors.\n\nThrough hydraulic modeling, we created a scalable solution for water-scarce urban regions. The project emphasizes sustainable urban drainage and reduction in municipal water reliance.`,
    impact: "30% Savings",
    role: "Hydraulic Analyst",
    researchSignificance: "Reduces peak municipal demand during summer months and prevents urban flooding through controlled storage.",
    grade: "A Grade",
    statusTag: "FIELD TESTED",
    methodology: [
      { _key: 'm1', title: "Filtration Efficiency", value: "98", unit: "% TSS REMOVAL", icon: "Droplets", description: "Removal of Total Suspended Solids through bio-sand filtration." },
      { _key: 'm2', title: "Storage Capacity", value: "5000", unit: "LITERS/DAY", icon: "Database", description: "Optimized tank sizing based on roof catchment area and runoff coefficients." },
      { _key: 'm3', title: "Water Savings", value: "30", unit: "% REDUCTION", icon: "Verified", description: "Reduction in monthly municipal water bill for a 4-person household." }
    ],
    technicalTools: [
      { _key: 't1', name: "EPANET", description: "Hydraulic modeling for water distribution within the building.", icon: "Radar" },
      { _key: 't2', name: "MS PROJECT", description: "Planning and phase-wise implementation scheduling.", icon: "Calendar" },
      { _key: 't3', name: "GIS", description: "Catchment area analysis and runoff estimation for urban zones.", icon: "Code" }
    ],
    tags: ["Sustainable", "Water Grid", "Filtration"],
  },
  {
    _id: "visual-structural-inspection-(g+6-building)",
    _type: "project",
    title: "Visual Structural Inspection & Condition Mapping",
    slug: { _type: 'slug', current: "visual-structural-inspection-(g+6-building)" },
    category: "Structural Maintenance",
    shortDesc: "Comprehensive condition assessment of heritage structures using photogrammetry and ND testing.",
    fullDesc: `This project involved the detailed visual and non-destructive testing (NDT) of a 50-year-old reinforced concrete building. We mapped cracks, spalling, and moisture ingress zones.\n\nThe data was used to create a digital twin with priority zones for repair. This research bridges the gap between traditional inspection and modern digital asset management.`,
    impact: "40% Faster",
    role: "Site Inspector",
    researchSignificance: "Standardizes the reporting process for structural audits, ensuring objective grading of structural health.",
    grade: "A+ Grade",
    statusTag: "COMPLETED",
    methodology: [
      { _key: 'm1', title: "Inspection Area", value: "1200", unit: "SQ. METERS", icon: "Ruler", description: "Total surface area inspected and digitally mapped for defects." },
      { _key: 'm2', title: "NDT Tests", value: "45", unit: "POINTS", icon: "Verified", description: "Rebound hammer and ultrasonic pulse velocity tests conducted." },
      { _key: 'm3', title: "Reporting Time", value: "40", unit: "% REDUCTION", icon: "Clock", description: "Time saved using digital mapping vs traditional paper-based methods." }
    ],
    technicalTools: [
      { _key: 't1', name: "NDT DEVICES", description: "Proceq Rebound Hammer and UPV tester for concrete quality.", icon: "HardHat" },
      { _key: 't2', name: "AUTOCAD RECAP", description: "Processing site photos into point clouds for crack mapping.", icon: "Presentation" },
      { _key: 't3', name: "BLUEBEAM", description: "Detailed markup and quantification of structural repairs.", icon: "FileText" }
    ],
    tags: ["NDT Testing", "Inspection", "Assessment"],
  },
  {
    _id: "pollution-aware-smart-city-zoning",
    _type: "project",
    title: "Smart City Zoning & Transportation Planning",
    slug: { _type: 'slug', current: "pollution-aware-smart-city-zoning" },
    category: "Urban Planning / Infrastructure",
    shortDesc: "Data-driven zoning optimization for reduced traffic congestion and improved land use efficiency.",
    fullDesc: `Leveraging Geographic Information Systems (GIS) to analyze urban mobility patterns and propose zoning changes. The project focuses on transit-oriented development (TOD) and mixed-use efficiency.\n\nBy redistributing high-density zones near transit hubs, we simulated a significant reduction in average commute times. This study serves as a framework for sustainable urban expansion.`,
    impact: "25% Improved Flow",
    role: "Urban Planner",
    researchSignificance: "Provides city administrators with a data-backed blueprint for future-proof urban transit and residential development.",
    grade: "Ex Grade",
    statusTag: "ONGOING",
    methodology: [
      { _key: 'm1', title: "Land Analysis", value: "50", unit: "SECTORS", icon: "Radar", description: "Detailed analysis of land use patterns across 50 urban sectors." },
      { _key: 'm2', title: "Traffic Simulation", value: "25", unit: "% EFFICIENCY", icon: "BarChart3", description: "Increase in average vehicle speed through re-zoning strategies." },
      { _key: 'm3', title: "Greenspace Index", value: "15", unit: "% INCREASE", icon: "Droplets", description: "Optimization of public parks and green corridors within high-density zones." }
    ],
    technicalTools: [
      { _key: 't1', name: "ARCGIS", description: "Primary tool for spatial analysis and urban land-use mapping.", icon: "Code" },
      { _key: 't2', name: "PYTHON (PANDAS)", description: "Used for cleaning and analyzing demographic and mobility datasets.", icon: "Database" },
      { _key: 't3', name: "SKETCHUP", description: "3D visualization of proposed mixed-use development blocks.", icon: "Presentation" }
    ],
    tags: ["Zoning", "GIS Mapping", "Smart City"],
  }
];

async function sync() {
  console.log("Starting Sanity Synchronization...");
  
  if (!process.env.SANITY_AUTH_TOKEN) {
    console.error("ERROR: SANITY_AUTH_TOKEN is missing from .env");
    process.exit(1);
  }

  for (const project of projectsToSync) {
    try {
      console.log(`Syncing: ${project.title} (${project._id})...`);
      
      // We use createOrReplace and patch to ensure we don't overwrite existing images if they exist
      // But for a simple sync, we'll patch the specific fields
      await client.createIfNotExists({
        _id: project._id,
        _type: 'project',
        title: project.title,
        slug: project.slug
      });

      await client.patch(project._id)
        .set({
          category: project.category,
          shortDesc: project.shortDesc,
          fullDesc: project.fullDesc,
          impact: project.impact,
          role: project.role,
          researchSignificance: project.researchSignificance,
          grade: project.grade,
          statusTag: project.statusTag,
          methodology: project.methodology,
          technicalTools: project.technicalTools,
          tags: project.tags,
        })
        .commit();
        
      console.log(`✅ Successfully synced ${project._id}`);
    } catch (err) {
      console.error(`❌ Failed to sync ${project._id}:`, err);
    }
  }
  
  console.log("Synchronization process completed.");
}

sync();
