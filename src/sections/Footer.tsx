import { Shield, MessageCircle, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo和描述 */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-red-500" />
              <span className="text-xl font-bold tracking-wider">危险关系</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              职场反PUA性格指数诊断，基于心理学研究，帮助你识别职场操控行为，提升自我保护能力。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="font-medium mb-4">快速链接</h4>
            <ul className="space-y-2">
              {[
                { label: '开始测试', href: '#quiz' },
                { label: '关于测试', href: '#about' },
                { label: '测试流程', href: '#process' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 text-sm hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h4 className="font-medium mb-4">联系我们</h4>
            <div className="flex items-center space-x-2 text-white/60 text-sm mb-4">
              <MessageCircle className="w-4 h-4" />
              <span>微信号：xuelovexiao</span>
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-4">
              <Link
                to="/admin"
                className="text-white/30 text-xs hover:text-white/60 transition-colors"
              >
                数据统计
              </Link>
            </div>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © 2025 危险关系. 保留所有权利.
            </p>
            <p className="text-white/40 text-sm">
              创作者：<span className="text-white/60">互联网职场老司机薛少佳</span>
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/40 text-sm hover:text-white transition-colors duration-300">
                隐私政策
              </a>
              <a href="#" className="text-white/40 text-sm hover:text-white transition-colors duration-300">
                使用条款
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
