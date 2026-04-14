import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { questions, type Option } from '../data/questions';

interface QuizProps {
  onComplete: (answers: Option[]) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  
  const questionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  useEffect(() => {
    // 恢复之前的选择
    if (answers[currentQuestion]) {
      setSelectedOption(answers[currentQuestion].id);
    } else {
      setSelectedOption(null);
    }
  }, [currentQuestion, answers]);

  useEffect(() => {
    // 问题切换动画
    if (questionRef.current) {
      gsap.fromTo(
        questionRef.current,
        { 
          x: direction === 'next' ? 50 : -50, 
          opacity: 0 
        },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.4, 
          ease: 'expo.out' 
        }
      );
    }
  }, [currentQuestion, direction]);

  useEffect(() => {
    // 进度条动画
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.4,
        ease: 'expo.out',
      });
    }
  }, [progress]);

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option.id);
    
    // 更新答案
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);

    // 自动进入下一题（如果不是最后一题）
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setDirection('next');
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setDirection('prev');
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (selectedOption && currentQuestion < questions.length - 1) {
      setDirection('next');
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    if (answers.length === questions.length) {
      onComplete(answers);
    }
  };

  const isComplete = answers.length === questions.length;

  return (
    <section id="quiz" className="relative py-24 lg:py-32 bg-neutral-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 头部信息 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60 text-sm">
              问题 <span className="text-white font-medium">{currentQuestion + 1}</span> / {questions.length}
            </span>
            <span className="text-white/60 text-sm">
              {question.category}
            </span>
          </div>
          
          {/* 进度条 */}
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-white progress-animated"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 问题卡片 */}
        <div
          ref={questionRef}
          className="bg-white rounded-lg p-6 lg:p-10 shadow-2xl"
        >
          {/* 问题文本 */}
          <h3 className="text-xl lg:text-2xl font-medium text-black mb-8 leading-relaxed">
            {question.text}
          </h3>

          {/* 选项 */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option)}
                className={`w-full text-left p-4 lg:p-5 border-2 transition-all duration-300 group ${
                  selectedOption === option.id
                    ? 'border-black bg-black text-white'
                    : 'border-neutral-200 hover:border-black hover:bg-neutral-50'
                }`}
                style={{
                  animation: `fadeInUp 0.3s var(--ease-expo-out) ${index * 50}ms forwards`,
                  opacity: 0,
                }}
              >
                <div className="flex items-start space-x-4">
                  <span
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center border-2 text-sm font-medium transition-all duration-300 ${
                      selectedOption === option.id
                        ? 'border-white bg-white text-black'
                        : 'border-neutral-300 text-neutral-400 group-hover:border-black group-hover:text-black'
                    }`}
                  >
                    {option.id}
                  </span>
                  <span className="text-base leading-relaxed pt-0.5">{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          {/* 导航按钮 */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-100">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all duration-300 ${
                currentQuestion === 0
                  ? 'text-neutral-300 cursor-not-allowed'
                  : 'text-black hover:bg-neutral-100'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>上一题</span>
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!isComplete}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  isComplete
                    ? 'bg-black text-white hover:bg-neutral-800'
                    : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }`}
              >
                <span>查看结果</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!selectedOption}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  selectedOption
                    ? 'text-black hover:bg-neutral-100'
                    : 'text-neutral-300 cursor-not-allowed'
                }`}
              >
                <span>下一题</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 提示 */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-white/40 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>请根据真实感受作答，没有标准答案</span>
        </div>

        {/* 题目导航点 */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentQuestion ? 'next' : 'prev');
                setCurrentQuestion(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentQuestion
                  ? 'bg-white w-6'
                  : answers[index]
                  ? 'bg-white/60'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
