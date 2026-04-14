import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Microscope, Users, Zap, FileCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Microscope,
    title: '科学基础',
    description: '基于心理学研究，涵盖煤气灯效应、情感操控等经典理论',
  },
  {
    icon: Users,
    title: '真实场景',
    description: '20个精心设计的职场情境，覆盖常见操控手段',
  },
  {
    icon: Zap,
    title: '即时结果',
    description: '快速获取诊断报告，五维雷达图直观展示',
  },
  {
    icon: FileCheck,
    title: '专业建议',
    description: '个性化改进方案，助你提升职场防御力',
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 介绍卡片动画
      gsap.fromTo(
        cardRef.current,
        { y: 100, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 特色卡片动画
      featureRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { rotateY: index % 2 === 0 ? -90 : 90, opacity: 0 },
            {
              rotateY: 0,
              opacity: 1,
              duration: 0.6,
              delay: 0.4 + index * 0.1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: ref,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-neutral-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* 左侧介绍卡片 */}
          <div
            ref={cardRef}
            className="bg-white p-8 lg:p-12 shadow-xl perspective-1000"
            style={{ opacity: 0 }}
          >
            <span className="inline-block text-xs font-medium text-red-500 tracking-wider mb-4">
              ABOUT THE TEST
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
              关于这个测试
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-6">
              职场PUA（Pick-Up Artist的引申义）指的是在职场环境中，通过心理操控、
              情感打压、边界侵犯等手段来控制他人的行为。这种操控往往隐蔽而渐进，
              让受害者在不知不觉中丧失自信和自我价值感。
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              本测试基于心理学研究，涵盖煤气灯效应、情感绑架、边界侵犯等经典理论，
              通过20个真实职场情境，从五个维度评估你的职场操控识别能力和防御水平。
            </p>
            <div className="flex items-center space-x-4 pt-6 border-t border-neutral-100">
              <div className="w-12 h-12 bg-black flex items-center justify-center">
                <span className="text-white font-bold text-lg">20</span>
              </div>
              <div>
                <p className="font-medium text-black">道精选题目</p>
                <p className="text-sm text-neutral-500">约需 5-8 分钟</p>
              </div>
            </div>
          </div>

          {/* 右侧特色卡片 */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={(el) => { featureRefs.current[index] = el; }}
                className="group bg-white p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-400 preserve-3d cursor-pointer"
                style={{
                  opacity: 0,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="mb-4 transition-transform duration-400 group-hover:scale-110">
                  <feature.icon className="w-8 h-8 text-black" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-black mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 h-0.5 bg-neutral-100 overflow-hidden">
                  <div className="h-full bg-black w-0 group-hover:w-full transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 统计数据 */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: '50,000+', label: '已完成测试' },
            { value: '4.8', label: '用户评分' },
            { value: '98%', label: '推荐率' },
            { value: '5', label: '评估维度' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center"
              style={{
                animation: `fadeInUp 0.6s var(--ease-expo-out) ${0.8 + index * 0.1}s forwards`,
                opacity: 0,
              }}
            >
              <p className="text-3xl lg:text-4xl font-bold text-black mb-2">{stat.value}</p>
              <p className="text-sm text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
