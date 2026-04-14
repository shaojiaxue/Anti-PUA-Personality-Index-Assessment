import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlayCircle, HelpCircle, BarChart3, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: PlayCircle,
    number: '01',
    title: '开始测试',
    description: '点击开始，进入测试界面',
  },
  {
    icon: HelpCircle,
    number: '02',
    title: '回答问题',
    description: '回答20个职场情境问题',
  },
  {
    icon: BarChart3,
    number: '03',
    title: '获取结果',
    description: '获得你的反PUA指数',
  },
  {
    icon: Lightbulb,
    number: '04',
    title: '查看建议',
    description: '获取个性化改进方案',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 标题动画
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 时间线绘制动画
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 节点动画
      nodeRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              delay: 0.5 + index * 0.2,
              ease: 'elastic.out(1, 0.5)',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
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
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-medium text-red-500 tracking-wider mb-4">
            TEST PROCESS
          </span>
          <h2
            ref={titleRef}
            className="text-3xl lg:text-4xl font-bold text-black"
            style={{ opacity: 0 }}
          >
            测试流程
          </h2>
        </div>

        {/* 时间轴 */}
        <div className="relative">
          {/* 连接线 - 桌面端 */}
          <svg
            className="hidden lg:block absolute top-16 left-0 w-full h-2"
            preserveAspectRatio="none"
          >
            <path
              ref={lineRef}
              d="M 100 4 L 1100 4"
              stroke="#E5E5E5"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* 步骤卡片 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group"
              >
                {/* 节点 */}
                <div
                  ref={(el) => { nodeRefs.current[index] = el; }}
                  className="relative z-10 w-16 h-16 mx-auto mb-6 bg-white border-2 border-black flex items-center justify-center transition-all duration-300 group-hover:bg-black group-hover:scale-110"
                  style={{ opacity: 0 }}
                >
                  <step.icon
                    className="w-6 h-6 text-black transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.5}
                  />
                  {/* 发光效果 */}
                  <div className="absolute inset-0 bg-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* 内容 */}
                <div className="text-center">
                  <span className="inline-block text-xs font-medium text-neutral-400 mb-2">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-bold text-black mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-500">{step.description}</p>
                </div>

                {/* 连接线 - 移动端 */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute top-8 left-1/2 w-px h-8 bg-neutral-200 transform translate-x-8" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 提示文字 */}
        <div
          className="mt-16 text-center"
          style={{
            animation: 'fadeInUp 0.6s var(--ease-expo-out) 1.5s forwards',
            opacity: 0,
          }}
        >
          <p className="text-neutral-500 text-sm">
            整个测试约需 <span className="font-medium text-black">5-8 分钟</span>，请根据真实感受作答
          </p>
        </div>
      </div>
    </section>
  );
}
