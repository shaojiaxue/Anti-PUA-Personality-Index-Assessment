import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';
import { 
  Users, 
  ClipboardCheck, 
  TrendingUp, 
  BarChart3, 
  Lock,
  LogOut,
  RefreshCw,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Award,
  Target,
  Activity
} from 'lucide-react';
import { useAnalytics, exportData } from '../hooks/useAnalytics';

const COLORS = ['#FF4444', '#FF8800', '#44AA44', '#4488FF', '#888888'];

export default function Admin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'distribution' | 'trends' | 'details'>('overview');
  
  const { 
    stats, 
    isAuthenticated, 
    login, 
    logout, 
    refreshData, 
    clearData 
  } = useAnalytics();

  // 自动刷新数据
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(refreshData, 5000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, refreshData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setError('');
    } else {
      setError('密码错误');
    }
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics_data_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm('确定要清除所有数据吗？此操作不可恢复。')) {
      clearData();
    }
  };

  // 准备图表数据
  const scoreDistributionData = [
    { name: '危险预警\n(0-40)', value: stats.scoreDistribution['0-40'], color: '#FF4444' },
    { name: '需要警惕\n(41-60)', value: stats.scoreDistribution['41-60'], color: '#FF8800' },
    { name: '防御高手\n(61-80)', value: stats.scoreDistribution['61-80'], color: '#44AA44' },
    { name: '反PUA大师\n(81-100)', value: stats.scoreDistribution['81-100'], color: '#4488FF' },
  ];

  const levelDistributionData = Object.entries(stats.levelDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  const dimensionData = [
    { name: '识别力', value: stats.averageDimensions.recognition, fullMark: 100 },
    { name: '应对力', value: stats.averageDimensions.response, fullMark: 100 },
    { name: '自信度', value: stats.averageDimensions.confidence, fullMark: 100 },
    { name: '边界感', value: stats.averageDimensions.boundary, fullMark: 100 },
    { name: '支持网', value: stats.averageDimensions.support, fullMark: 100 },
  ];

  const trendData = stats.last7Days.map(([date, data]) => ({
    date: date.slice(5),
    visits: data.visits,
    tests: data.tests,
  }));

  // 登录页面
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-black flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-black mb-2">数据分析后台</h1>
          <p className="text-neutral-500 text-center mb-8">请输入管理员密码</p>
          
          <form onSubmit={handleLogin}>
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full px-4 py-3 border-2 border-neutral-200 focus:border-black outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
            
            <button
              type="submit"
              className="w-full py-3 bg-black text-white font-medium hover:bg-neutral-800 transition-colors"
            >
              登录
            </button>
          </form>
          
          <p className="text-center mt-6">
            <Link to="/" className="text-neutral-500 hover:text-black text-sm">
              返回首页
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // 管理后台
  return (
    <div className="min-h-screen bg-neutral-100">
      {/* 顶部导航 */}
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-6 h-6" />
              <span className="font-bold text-lg">数据分析后台</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshData}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                title="刷新数据"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={handleExport}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                title="导出数据"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={handleClear}
                className="p-2 hover:bg-white/10 rounded transition-colors text-red-400"
                title="清除数据"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button
                onClick={logout}
                className="p-2 hover:bg-white/10 rounded transition-colors"
                title="退出登录"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 标签导航 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: '总览', icon: Activity },
              { id: 'distribution', label: '分布', icon: BarChart3 },
              { id: 'trends', label: '趋势', icon: TrendingUp },
              { id: 'details', label: '详情', icon: ClipboardCheck },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-black text-black'
                    : 'border-transparent text-neutral-500 hover:text-black'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 内容区 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 总览 */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 核心指标卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-neutral-400" />
                  <span className="text-xs text-neutral-500">总访问量</span>
                </div>
                <p className="text-3xl font-bold text-black">{stats.totalVisits.toLocaleString()}</p>
              </div>
              
              <div className="bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <ClipboardCheck className="w-8 h-8 text-neutral-400" />
                  <span className="text-xs text-neutral-500">完成测试</span>
                </div>
                <p className="text-3xl font-bold text-black">{stats.totalTests.toLocaleString()}</p>
              </div>
              
              <div className="bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-neutral-400" />
                  <span className="text-xs text-neutral-500">转化率</span>
                </div>
                <p className="text-3xl font-bold text-black">{stats.conversionRate}%</p>
              </div>
              
              <div className="bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <Award className="w-8 h-8 text-neutral-400" />
                  <span className="text-xs text-neutral-500">平均分</span>
                </div>
                <p className="text-3xl font-bold text-black">{stats.averageScore}</p>
              </div>
            </div>

            {/* 分数统计 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-6">分数区间分布</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={scoreDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#000000">
                      {scoreDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-6">五维能力雷达</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={dimensionData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="平均分"
                      dataKey="value"
                      stroke="#000000"
                      fill="#000000"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 维度得分详情 */}
            <div className="bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-black mb-6">各维度平均得分</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {dimensionData.map((dim, index) => (
                  <div key={index} className="text-center p-4 bg-neutral-50">
                    <Target className="w-6 h-6 mx-auto mb-2 text-neutral-400" />
                    <p className="text-2xl font-bold text-black">{dim.value}</p>
                    <p className="text-xs text-neutral-500">{dim.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 分布 */}
        {activeTab === 'distribution' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-6">结果等级分布</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={levelDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {levelDistributionData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-6">分数段统计</h3>
                <div className="space-y-4">
                  {scoreDistributionData.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{item.name.replace('\n', ' ')}</span>
                        <span className="font-medium">{item.value} 人</span>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${stats.totalTests > 0 ? (item.value / stats.totalTests) * 100 : 0}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 极值统计 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-4">最高分记录</h3>
                <p className="text-4xl font-bold text-green-500">{stats.highestScore}</p>
                <p className="text-neutral-500 text-sm mt-2">历史最高得分</p>
              </div>
              <div className="bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-black mb-4">最低分记录</h3>
                <p className="text-4xl font-bold text-red-500">{stats.lowestScore}</p>
                <p className="text-neutral-500 text-sm mt-2">历史最低得分</p>
              </div>
            </div>
          </div>
        )}

        {/* 趋势 */}
        {activeTab === 'trends' && (
          <div className="space-y-8">
            <div className="bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-black mb-6">最近7天访问趋势</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="visits" 
                    name="访问量" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="tests" 
                    name="测试数" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 每日数据表格 */}
            <div className="bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-black mb-6">每日数据明细</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-neutral-500">日期</th>
                      <th className="text-right py-3 px-4 font-medium text-neutral-500">访问量</th>
                      <th className="text-right py-3 px-4 font-medium text-neutral-500">测试数</th>
                      <th className="text-right py-3 px-4 font-medium text-neutral-500">转化率</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...stats.last7Days].reverse().map(([date, data]) => (
                      <tr key={date} className="border-b hover:bg-neutral-50">
                        <td className="py-3 px-4">{date}</td>
                        <td className="text-right py-3 px-4">{data.visits}</td>
                        <td className="text-right py-3 px-4">{data.tests}</td>
                        <td className="text-right py-3 px-4">
                          {data.visits > 0 ? ((data.tests / data.visits) * 100).toFixed(1) : 0}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 详情 */}
        {activeTab === 'details' && (
          <div className="space-y-8">
            <div className="bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-black mb-6">最近测试记录</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-neutral-500">时间</th>
                      <th className="text-right py-3 px-4 font-medium text-neutral-500">总分</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-500">等级</th>
                      <th className="text-right py-3 px-4 font-medium text-neutral-500">识别力</th>
                      <th className="text-right py-3 px-4 font-medium text-neutral-500">应对力</th>
                      <th className="text-right py-3 px-4 font-medium text-neutral-500">自信度</th>
                      <th className="text-right py-3 px-4 font-medium text-neutral-500">边界感</th>
                      <th className="text-right py-3 px-4 font-medium text-neutral-500">支持网</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentResults.map((result) => (
                      <tr key={result.id} className="border-b hover:bg-neutral-50">
                        <td className="py-3 px-4 text-sm">
                          {new Date(result.timestamp).toLocaleString()}
                        </td>
                        <td className="text-right py-3 px-4 font-medium">{result.totalScore}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 bg-neutral-100 text-xs rounded">
                            {result.level}
                          </span>
                        </td>
                        <td className="text-right py-3 px-4">{result.dimensionScores.recognition}</td>
                        <td className="text-right py-3 px-4">{result.dimensionScores.response}</td>
                        <td className="text-right py-3 px-4">{result.dimensionScores.confidence}</td>
                        <td className="text-right py-3 px-4">{result.dimensionScores.boundary}</td>
                        <td className="text-right py-3 px-4">{result.dimensionScores.support}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {stats.recentResults.length === 0 && (
                <p className="text-center text-neutral-500 py-8">暂无测试记录</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
