import { Linkedin, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 w-full border-t border-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-12 py-12 w-full gap-6 text-sm tracking-wide">
        <div className="text-lg font-bold text-slate-900 uppercase tracking-tighter font-headline">
          SARANG DEORE
        </div>
        <p className="text-slate-500 text-center">
          © 2024 Sarang Deore. Architectural Blueprint System.
        </p>
        <div className="flex gap-6 items-center">
          <a href="https://www.linkedin.com/in/sarangdeore/" title="LinkedIn" className="text-slate-400 hover:text-[#0047AB] transition-all hover:scale-110">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:sarangdeore2005@gmail.com" title="Email" className="text-slate-400 hover:text-[#0047AB] transition-all hover:scale-110">
            <Mail className="w-5 h-5" />
          </a>
          <a href="#" className="text-slate-500 hover:text-[#0047AB] transition-colors font-black uppercase text-[10px] tracking-widest flex items-center gap-1.5 group">
            <span>Portfolio</span>
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </footer>
  );
}
