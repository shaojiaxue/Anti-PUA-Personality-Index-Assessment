import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onStartClick: () => void;
}

export default function Navigation({ onStartClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
      style={{
        transitionTimingFunction: 'var(--ease-expo-out)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => scrollToSection('hero')}
          >
            <span
              className={`text-xl font-bold tracking-wider transition-all duration-300 group-hover:tracking-widest ${
                isScrolled ? 'text-black' : 'text-white'
              }`}
            >
              危险关系
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { label: '首页', id: 'hero' },
              { label: '测试', id: 'quiz' },
              { label: '关于', id: 'about' },
            ].map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  isScrolled
                    ? 'text-neutral-600 hover:text-black'
                    : 'text-white/80 hover:text-white'
                }`}
                style={{
                  animation: `fadeInDown 0.4s var(--ease-expo-out) ${index * 100}ms forwards`,
                  opacity: 0,
                }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-current transition-all duration-300 -translate-x-1/2 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={onStartClick}
              className={`px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                isScrolled
                  ? 'bg-black text-white hover:bg-neutral-800'
                  : 'bg-white text-black hover:bg-white/90'
              }`}
              style={{
                animation: 'scaleIn 0.5s var(--ease-spring) 400ms forwards',
                opacity: 0,
              }}
            >
              开始诊断
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? 'text-black' : 'text-white'} size={24} />
            ) : (
              <Menu className={isScrolled ? 'text-black' : 'text-white'} size={24} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden mt-4 py-4 border-t border-neutral-200/20 animate-fadeIn"
          >
            <div className="flex flex-col space-y-4">
              {[
                { label: '首页', id: 'hero' },
                { label: '测试', id: 'quiz' },
                { label: '关于', id: 'about' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-sm font-medium ${
                    isScrolled ? 'text-neutral-600' : 'text-white/80'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={onStartClick}
                className={`w-full py-3 text-sm font-medium ${
                  isScrolled
                    ? 'bg-black text-white'
                    : 'bg-white text-black'
                }`}
              >
                开始诊断
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
