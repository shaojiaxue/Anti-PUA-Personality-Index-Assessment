import { useEffect, useRef, useState, useCallback } from 'react';
import { 
  RefreshCw, 
  Share2, 
  Eye, 
  Shield, 
  Star, 
  Lock, 
  Users,
  CheckCircle,
  AlertTriangle,
  Download
} from 'lucide-react';
import { resultLevels, dimensionInfo, type Option } from '../data/questions';

interface ResultProps {
  answers: Option[];
  onRestart: () => void;
}

export default function Result({ answers, onRestart }: ResultProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [dimensionScores, setDimensionScores] = useState({
    recognition: 0,
    response: 0,
    confidence: 0,
    boundary: 0,
    support: 0,
  });
  const [resultLevel, setResultLevel] = useState(resultLevels[0]);
  const [isReady, setIsReady] = useState(false);
  const [canvasUrl, setCanvasUrl] = useState<string>('');

  // 计算分数
  useEffect(() => {
    const totals = {
      recognition: 0,
      response: 0,
      confidence: 0,
      boundary: 0,
      support: 0,
    };

    answers.forEach((answer) => {
      totals.recognition += answer.scores.recognition;
      totals.response += answer.scores.response;
      totals.confidence += answer.scores.confidence;
      totals.boundary += answer.scores.boundary;
      totals.support += answer.scores.support;
    });

    const maxPerDimension = 20 * 5;
    const normalizedScores = {
      recognition: Math.round((totals.recognition / maxPerDimension) * 100),
      response: Math.round((totals.response / maxPerDimension) * 100),
      confidence: Math.round((totals.confidence / maxPerDimension) * 100),
      boundary: Math.round((totals.boundary / maxPerDimension) * 100),
      support: Math.round((totals.support / maxPerDimension) * 100),
    };

    setDimensionScores(normalizedScores);

    const totalScore = Math.round(
      (normalizedScores.recognition +
        normalizedScores.response +
        normalizedScores.confidence +
        normalizedScores.boundary +
        normalizedScores.support) / 5
    );

    // 分数动画
    const duration = 1500;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentScore = Math.floor(totalScore * easeProgress);
      setScore(currentScore);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsReady(true);
      }
    };
    requestAnimationFrame(animate);

    const level = resultLevels.find(
      (l) => totalScore >= l.minScore && totalScore <= l.maxScore
    );
    if (level) {
      setResultLevel(level);
    }
  }, [answers]);

  // 绘制雷达图
  const drawRadarChart = useCallback((ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
    const radarData = [
      { value: dimensionScores.recognition, angle: -90, name: '识别力' },
      { value: dimensionScores.response, angle: -18, name: '应对力' },
      { value: dimensionScores.confidence, angle: 54, name: '自信度' },
      { value: dimensionScores.boundary, angle: 126, name: '边界感' },
      { value: dimensionScores.support, angle: 198, name: '支持网' },
    ];

    // 绘制背景网格
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    [20, 40, 60, 80, 100].forEach((level) => {
      ctx.beginPath();
      radarData.forEach((d, i) => {
        const rad = (d.angle * Math.PI) / 180;
        const r = (level / 100) * radius;
        const x = centerX + r * Math.cos(rad);
        const y = centerY + r * Math.sin(rad);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.stroke();
    });

    // 绘制轴线
    radarData.forEach((d) => {
      const rad = (d.angle * Math.PI) / 180;
      const x = centerX + radius * Math.cos(rad);
      const y = centerY + radius * Math.sin(rad);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
    });

    // 绘制数据多边形
    ctx.beginPath();
    radarData.forEach((d, i) => {
      const rad = (d.angle * Math.PI) / 180;
      const r = (d.value / 100) * radius;
      const x = centerX + r * Math.cos(rad);
      const y = centerY + r * Math.sin(rad);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = resultLevel.color + '4D'; // 30% opacity
    ctx.fill();
    ctx.strokeStyle = resultLevel.color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 绘制数据点
    radarData.forEach((d) => {
      const rad = (d.angle * Math.PI) / 180;
      const r = (d.value / 100) * radius;
      const x = centerX + r * Math.cos(rad);
      const y = centerY + r * Math.sin(rad);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = resultLevel.color;
      ctx.fill();
    });

    // 绘制标签
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    radarData.forEach((d) => {
      const rad = (d.angle * Math.PI) / 180;
      const labelRadius = radius + 25;
      const x = centerX + labelRadius * Math.cos(rad);
      const y = centerY + labelRadius * Math.sin(rad);
      ctx.fillText(d.name, x, y - 5);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(String(d.value), x, y + 8);
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = '10px sans-serif';
    });
  }, [dimensionScores, resultLevel.color]);

  // 生成Canvas图片
  useEffect(() => {
    if (!isReady || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布尺寸 (2x for retina)
    const width = 800;
    const height = 900;
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    // 缩放以匹配 retina
    ctx.scale(2, 2);

    // 白色背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // 黑色头部区域
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, 280);

    // 标题
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('职场反PUA性格指数诊断', 40, 50);

    // 分数
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 100px sans-serif';
    ctx.fillText(String(score), 40, 160);
    ctx.font = '24px sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.fillText('/100', 180, 160);

    // 等级标签
    const tagWidth = 140;
    const tagHeight = 36;
    ctx.fillStyle = resultLevel.color;
    ctx.fillRect(40, 200, tagWidth, tagHeight);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(resultLevel.title, 40 + tagWidth / 2, 223);

    // 雷达图
    drawRadarChart(ctx, 580, 140, 90);

    // 内容区域
    let y = 320;

    // 等级说明
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(resultLevel.subtitle, 40, y);
    y += 35;

    ctx.fillStyle = '#666666';
    ctx.font = '16px sans-serif';
    const descLines = wrapText(ctx, resultLevel.description, width - 80, 16);
    descLines.forEach((line) => {
      ctx.fillText(line, 40, y);
      y += 24;
    });
    y += 20;

    // 五维得分
    const dimData = [
      { name: '识别力', value: dimensionScores.recognition, icon: '👁' },
      { name: '应对力', value: dimensionScores.response, icon: '🛡' },
      { name: '自信度', value: dimensionScores.confidence, icon: '⭐' },
      { name: '边界感', value: dimensionScores.boundary, icon: '🔒' },
      { name: '支持网', value: dimensionScores.support, icon: '👥' },
    ];

    const boxWidth = (width - 100) / 5;
    dimData.forEach((dim, i) => {
      const x = 40 + i * (boxWidth + 5);
      ctx.fillStyle = '#f5f5f5';
      ctx.fillRect(x, y, boxWidth, 80);
      ctx.fillStyle = '#999999';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(dim.icon, x + boxWidth / 2, y + 25);
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText(String(dim.value), x + boxWidth / 2, y + 55);
      ctx.fillStyle = '#666666';
      ctx.font = '11px sans-serif';
      ctx.fillText(dim.name, x + boxWidth / 2, y + 72);
    });
    y += 110;

    // 改进建议
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('改进建议', 40, y);
    y += 30;

    resultLevel.advice.slice(0, 3).forEach((advice) => {
      ctx.fillStyle = '#22c55e';
      ctx.font = '16px sans-serif';
      ctx.fillText('✓', 40, y);
      ctx.fillStyle = '#666666';
      ctx.font = '14px sans-serif';
      const adviceLines = wrapText(ctx, advice, width - 80, 14);
      adviceLines.forEach((line) => {
        ctx.fillText(line, 65, y);
        y += 20;
      });
      y += 8;
    });
    y += 15;

    // 创作者信息
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(40, y, width - 80, 50);
    ctx.fillStyle = '#666666';
    ctx.font = '12px sans-serif';
    ctx.fillText('创作者：', 55, y + 22);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('互联网职场老司机薛少佳', 105, y + 22);

    // 生成图片URL
    const url = canvas.toDataURL('image/png', 1.0);
    setCanvasUrl(url);
  }, [isReady, score, dimensionScores, resultLevel, drawRadarChart]);

  // 文本换行辅助函数
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number, _fontSize: number): string[] => {
    const words = text.split('');
    const lines: string[] = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine !== '') {
        lines.push(currentLine);
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  // 下载图片
  const handleDownload = () => {
    if (!canvasUrl) return;
    
    const link = document.createElement('a');
    link.download = `职场反PUA诊断报告_${new Date().toLocaleDateString().replace(/\//g, '-')}.png`;
    link.href = canvasUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 分享功能
  const handleShare = async () => {
    const shareData = {
      title: '职场反PUA性格指数诊断',
      text: `我的职场反PUA指数是 ${score} 分，${resultLevel.subtitle}！快来测测你的防御力吧！`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('分享失败:', error);
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      alert('已复制到剪贴板');
    }
  };

  // 雷达图数据（用于显示）
  const radarData = [
    { key: 'recognition', value: dimensionScores.recognition, angle: -90 },
    { key: 'response', value: dimensionScores.response, angle: -18 },
    { key: 'confidence', value: dimensionScores.confidence, angle: 54 },
    { key: 'boundary', value: dimensionScores.boundary, angle: 126 },
    { key: 'support', value: dimensionScores.support, angle: 198 },
  ];

  const centerX = 150;
  const centerY = 150;
  const radius = 100;

  const getPoint = (value: number, angle: number) => {
    const rad = (angle * Math.PI) / 180;
    const r = (value / 100) * radius;
    return {
      x: centerX + r * Math.cos(rad),
      y: centerY + r * Math.sin(rad),
    };
  };

  const polygonPoints = radarData
    .map((d) => {
      const point = getPoint(d.value, d.angle);
      return `${point.x},${point.y}`;
    })
    .join(' ');

  const dimensionIcons: Record<string, React.ElementType> = {
    recognition: Eye,
    response: Shield,
    confidence: Star,
    boundary: Lock,
    support: Users,
  };

  return (
    <section className="relative py-24 lg:py-32 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 隐藏的画布用于生成图片 */}
        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
        />

        {/* 用于显示的结果卡片 */}
        <div className="bg-white shadow-2xl overflow-hidden">
          {/* 头部 */}
          <div className="bg-black text-white p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* 分数展示 */}
              <div className="text-center lg:text-left">
                <p className="text-white/60 text-sm mb-1">职场反PUA性格指数诊断</p>
                <div className="flex items-baseline justify-center lg:justify-start space-x-2">
                  <span className="text-6xl lg:text-7xl font-bold">{score}</span>
                  <span className="text-xl text-white/60">/100</span>
                </div>
                <div
                  className="inline-flex items-center space-x-2 mt-3 px-3 py-1.5 text-sm"
                  style={{ backgroundColor: resultLevel.color }}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span className="font-medium">{resultLevel.title}</span>
                </div>
              </div>

              {/* 雷达图 */}
              <div className="relative" style={{ width: 200, height: 200 }}>
                <svg width="200" height="200" viewBox="0 0 300 300">
                  {[20, 40, 60, 80, 100].map((level) => (
                    <polygon
                      key={level}
                      points={radarData
                        .map((d) => {
                          const point = getPoint(level, d.angle);
                          return `${point.x},${point.y}`;
                        })
                        .join(' ')}
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                    />
                  ))}
                  {radarData.map((d, i) => {
                    const end = getPoint(100, d.angle);
                    return (
                      <line
                        key={i}
                        x1={centerX}
                        y1={centerY}
                        x2={end.x}
                        y2={end.y}
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1"
                      />
                    );
                  })}
                  <polygon
                    points={polygonPoints}
                    fill={resultLevel.color}
                    fillOpacity="0.3"
                    stroke={resultLevel.color}
                    strokeWidth="2"
                  />
                  {radarData.map((d, i) => {
                    const point = getPoint(d.value, d.angle);
                    return (
                      <circle
                        key={i}
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        fill={resultLevel.color}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 pointer-events-none">
                  {radarData.map((d, i) => {
                    const labelRadius = radius + 35;
                    const rad = (d.angle * Math.PI) / 180;
                    const x = centerX + labelRadius * Math.cos(rad);
                    const y = centerY + labelRadius * Math.sin(rad);
                    const info = dimensionInfo[d.key as keyof typeof dimensionInfo];
                    return (
                      <div
                        key={i}
                        className="absolute flex flex-col items-center"
                        style={{
                          left: `${(x / 300) * 100}%`,
                          top: `${(y / 300) * 100}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <span className="text-[10px] text-white/50">{info.name}</span>
                        <span className="text-xs font-medium text-white">{d.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 内容区 */}
          <div className="p-6 lg:p-8">
            {/* 等级说明 */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-black mb-2">
                {resultLevel.subtitle}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {resultLevel.description}
              </p>
            </div>

            {/* 五维得分 */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {radarData.map((d, i) => {
                const Icon = dimensionIcons[d.key];
                const info = dimensionInfo[d.key as keyof typeof dimensionInfo];
                return (
                  <div key={i} className="text-center p-3 bg-neutral-50">
                    <Icon className="w-4 h-4 mx-auto mb-1 text-neutral-400" />
                    <p className="text-lg font-bold text-black">{d.value}</p>
                    <p className="text-[10px] text-neutral-500">{info.name}</p>
                  </div>
                );
              })}
            </div>

            {/* 改进建议 */}
            <div className="mb-4">
              <h4 className="text-sm font-bold text-black mb-2">改进建议</h4>
              <ul className="space-y-2">
                {resultLevel.advice.slice(0, 3).map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 创作者信息 */}
            <div className="p-3 bg-neutral-50 border-l-4 border-black">
              <p className="text-xs text-neutral-500">
                创作者：<span className="font-medium text-black">互联网职场老司机薛少佳</span>
              </p>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          <button
            onClick={handleDownload}
            disabled={!canvasUrl}
            className="flex items-center space-x-2 px-6 py-3 bg-black text-white font-medium hover:bg-neutral-800 transition-colors duration-300 disabled:opacity-50"
          >
            {!canvasUrl ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>生成中...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>保存结果</span>
              </>
            )}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-6 py-3 border-2 border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            <Share2 className="w-5 h-5" />
            <span>分享</span>
          </button>

          <button
            onClick={onRestart}
            className="flex items-center space-x-2 px-6 py-3 border-2 border-neutral-300 text-neutral-600 font-medium hover:border-black hover:text-black transition-all duration-300"
          >
            <RefreshCw className="w-5 h-5" />
            <span>重新测试</span>
          </button>
        </div>

        {/* 预览生成的图片 */}
        {canvasUrl && (
          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-500 mb-4">预览（长按可保存）：</p>
            <img 
              src={canvasUrl} 
              alt="诊断报告" 
              className="max-w-md mx-auto border shadow-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}
