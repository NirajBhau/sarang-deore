import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll Spy Logic
  useEffect(() => {
    const sections = ['hero', 'projects', 'journey', 'skills', 'contact'];
    
    // If not on Home page, handle active state via path
    if (location.pathname !== '/') {
      if (location.pathname.startsWith('/project')) {
        setActiveSection('projects');
      } else if (location.pathname === '/resume') {
        setActiveSection('resume');
      } else {
        setActiveSection('');
      }
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Adjusted to trigger when section is in the upper area
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', to: '/', id: 'hero' },
    { name: 'Projects', to: '/#projects', id: 'projects' },
    { name: 'Journey', to: '/#journey', id: 'journey' },
    { name: 'Skills', to: '/#skills', id: 'skills' },
    { name: 'Contact', to: '/#contact', id: 'contact' },
    { name: 'Resume', to: '/resume', id: 'resume' },
  ];

  const getLinkStyles = (id: string) => {
    const isActive = activeSection === id;
    return cn(
      "text-xs font-black uppercase tracking-widest transition-all py-1 relative group",
      isActive 
        ? "text-blue-600" 
        : "text-slate-500 hover:text-slate-900"
    );
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (to.startsWith('/#') && location.pathname === '/') {
      e.preventDefault();
      const id = to.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', to);
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-full px-6 md:px-16 flex justify-between items-center py-5">
        <Link 
          to="/" 
          onClick={(e) => handleLinkClick(e, '/#hero')}
          className="text-xl font-headline font-black tracking-tighter text-slate-900"
        >
          SARANG DEORE
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              onClick={(e) => handleLinkClick(e, link.to)}
              className={getLinkStyles(link.id)}
            >
              {link.name}
              <span className={cn(
                "absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 transition-transform duration-300 origin-left",
                activeSection === link.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
              )}></span>
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-slate-900 flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-50 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl p-6 py-10 space-y-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={(e) => handleLinkClick(e, link.to)}
                className="block text-xl font-headline font-black text-slate-900 tracking-tight"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
