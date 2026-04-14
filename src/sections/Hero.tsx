import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, Eye, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onStartClick: () => void;
}

export default function Hero({ onStartClick }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 背景动画
      gsap.fromTo(
        bgRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'expo.out' }
      );

      // 标题动画
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0, rotateX: -30 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, delay: 0.6, ease: 'expo.out' }
      );

      // 副标题动画
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.9, ease: 'expo.out' }
      );

      // 描述动画
      gsap.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 1.1, ease: 'expo.out' }
      );

      // CTA按钮动画
      gsap.fromTo(
        ctaRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, delay: 1.4, ease: 'elastic.out(1, 0.5)' }
      );

      // 滚动视差效果
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          if (bgRef.current) {
            gsap.set(bgRef.current, { y: self.progress * -100 });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 背景图片 */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* 暗色叠加层 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* 对角分割线 */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)',
          clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0 100%)',
        }}
      />

      {/* 内容 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* 标签 */}
          <div
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fadeIn"
            style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <Shield className="w-4 h-4 text-red-500" />
            <span className="text-xs text-white/80 tracking-wider">基于心理学研究 · 20题深度诊断</span>
          </div>

          {/* 主标题 */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 perspective-1000"
            style={{
              textShadow: '0 4px 30px rgba(0,0,0,0.5)',
              opacity: 0,
            }}
          >
            <span className="block">职场反PUA</span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
              性格指数诊断
            </span>
          </h1>

          {/* 副标题 */}
          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl text-white/90 font-medium mb-4"
            style={{ opacity: 0 }}
          >
            在职场中，你是否能识别那些隐形的操控？
          </p>

          {/* 描述 */}
          <p
            ref={descRef}
            className="text-base text-white/70 mb-10 max-w-lg leading-relaxed"
            style={{ opacity: 0 }}
          >
            基于心理学研究的职场操控识别能力测试，通过20个真实场景，
            评估你的防御能力和应对策略，测一测你的反PUA防御指数。
          </p>

          {/* CTA按钮 */}
          <button
            ref={ctaRef}
            onClick={onStartClick}
            className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-white text-black font-medium text-lg overflow-hidden transition-all duration-300 hover:bg-neutral-100"
            style={{ opacity: 0 }}
          >
            <span className="relative z-10">立即开始测试</span>
            <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* 特色标签 */}
          <div
            className="flex flex-wrap gap-4 mt-12"
            style={{
              animation: 'fadeInUp 0.6s var(--ease-expo-out) 1.6s forwards',
              opacity: 0,
            }}
          >
            {[
              { icon: Eye, text: '识别操控' },
              { icon: Brain, text: '心理防御' },
              { icon: Shield, text: '自我保护' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <item.icon className="w-4 h-4 text-white/60" />
                <span className="text-sm text-white/60">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 底部渐变 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
