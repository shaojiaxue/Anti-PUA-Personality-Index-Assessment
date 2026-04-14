import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Process from './sections/Process';
import Quiz from './sections/Quiz';
import Result from './sections/Result';
import Footer from './sections/Footer';
import Admin from './sections/Admin';
import { type Option } from './data/questions';
import { recordVisit, recordTestResult } from './hooks/useAnalytics';

gsap.registerPlugin(ScrollTrigger);

// 主页组件
function HomePage() {
  const [view, setView] = useState<'home' | 'quiz' | 'result'>('home');
  const [answers, setAnswers] = useState<Option[]>([]);
  const quizSectionRef = useRef<HTMLDivElement>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);

  // 记录访问
  useEffect(() => {
    recordVisit();
  }, []);

  // 开始测试
  const handleStart = () => {
    setView('quiz');
    setTimeout(() => {
      quizSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // 测试完成
  const handleComplete = (newAnswers: Option[]) => {
    setAnswers(newAnswers);
    
    // 计算分数并保存
    const totals = {
      recognition: 0,
      response: 0,
      confidence: 0,
      boundary: 0,
      support: 0,
    };

    newAnswers.forEach((answer) => {
      totals.recognition += answer.scores.recognition;
      totals.response += answer.scores.response;
      totals.confidence += answer.scores.confidence;
      totals.boundary += answer.scores.boundary;
      totals.support += answer.scores.support;
    });

    const maxPerDimension = 20 * 5;
    const dimensionScores = {
      recognition: Math.round((totals.recognition / maxPerDimension) * 100),
      response: Math.round((totals.response / maxPerDimension) * 100),
      confidence: Math.round((totals.confidence / maxPerDimension) * 100),
      boundary: Math.round((totals.boundary / maxPerDimension) * 100),
      support: Math.round((totals.support / maxPerDimension) * 100),
    };

    const totalScore = Math.round(
      (dimensionScores.recognition +
        dimensionScores.response +
        dimensionScores.confidence +
        dimensionScores.boundary +
        dimensionScores.support) / 5
    );

    // 确定等级
    let level = '危险预警';
    if (totalScore > 80) level = '反PUA大师';
    else if (totalScore > 60) level = '防御高手';
    else if (totalScore > 40) level = '需要警惕';

    // 记录结果
    recordTestResult(
      totalScore,
      level,
      dimensionScores,
      newAnswers.map(a => a.scores.recognition + a.scores.response + a.scores.confidence + a.scores.boundary + a.scores.support)
    );

    setView('result');
    setTimeout(() => {
      resultSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // 重新测试
  const handleRestart = () => {
    setAnswers([]);
    setView('home');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  // 初始化ScrollTrigger
  useEffect(() => {
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [view]);

  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 - 仅在首页显示 */}
      {view === 'home' && <Navigation onStartClick={handleStart} />}

      {/* 主内容 */}
      <main>
        {view === 'home' && (
          <>
            <Hero onStartClick={handleStart} />
            <div id="about">
              <About />
            </div>
            <div id="process">
              <Process />
            </div>
            {/* 预览测试区域 */}
            <div ref={quizSectionRef} id="quiz">
              <section className="py-24 lg:py-32 bg-neutral-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                    准备好开始了吗？
                  </h2>
                  <p className="text-white/60 mb-8 max-w-lg mx-auto">
                    20道精选题目，约需5-8分钟。请根据真实感受作答，没有标准答案。
                  </p>
                  <button
                    onClick={handleStart}
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-black font-medium text-lg hover:bg-neutral-100 transition-colors duration-300"
                  >
                    <span>立即开始测试</span>
                  </button>
                </div>
              </section>
            </div>
          </>
        )}

        {view === 'quiz' && (
          <div ref={quizSectionRef}>
            <Quiz onComplete={handleComplete} />
          </div>
        )}

        {view === 'result' && (
          <div ref={resultSectionRef}>
            <Result answers={answers} onRestart={handleRestart} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// 主应用组件
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
