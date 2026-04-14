import { useState, useEffect, useCallback } from 'react';

// 数据类型定义
export interface TestResult {
  id: string;
  timestamp: number;
  totalScore: number;
  level: string;
  dimensionScores: {
    recognition: number;
    response: number;
    confidence: number;
    boundary: number;
    support: number;
  };
  answers: number[];
}

export interface AnalyticsData {
  totalVisits: number;
  totalTests: number;
  results: TestResult[];
  dailyStats: Record<string, { visits: number; tests: number }>;
}

const STORAGE_KEY = 'danger_relation_analytics';
const ADMIN_PASSWORD = 'xue2025'; // 简单密码保护

// 初始化数据
const initData = (): AnalyticsData => ({
  totalVisits: 0,
  totalTests: 0,
  results: [],
  dailyStats: {},
});

// 获取数据
export const getAnalyticsData = (): AnalyticsData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('读取分析数据失败:', error);
  }
  return initData();
};

// 保存数据
export const saveAnalyticsData = (data: AnalyticsData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('保存分析数据失败:', error);
  }
};

// 记录访问
export const recordVisit = () => {
  const data = getAnalyticsData();
  data.totalVisits++;
  
  // 记录每日统计
  const today = new Date().toISOString().split('T')[0];
  if (!data.dailyStats[today]) {
    data.dailyStats[today] = { visits: 0, tests: 0 };
  }
  data.dailyStats[today].visits++;
  
  saveAnalyticsData(data);
};

// 记录测试结果
export const recordTestResult = (
  totalScore: number,
  level: string,
  dimensionScores: TestResult['dimensionScores'],
  answers: number[]
) => {
  const data = getAnalyticsData();
  
  const result: TestResult = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    totalScore,
    level,
    dimensionScores,
    answers,
  };
  
  data.results.push(result);
  data.totalTests++;
  
  // 记录每日统计
  const today = new Date().toISOString().split('T')[0];
  if (!data.dailyStats[today]) {
    data.dailyStats[today] = { visits: 0, tests: 0 };
  }
  data.dailyStats[today].tests++;
  
  saveAnalyticsData(data);
  return result.id;
};

// 验证管理员密码
export const verifyAdminPassword = (password: string): boolean => {
  return password === ADMIN_PASSWORD;
};

// 清除所有数据
export const clearAllData = () => {
  saveAnalyticsData(initData());
};

// 导出数据
export const exportData = (): string => {
  const data = getAnalyticsData();
  return JSON.stringify(data, null, 2);
};

// Hook
export const useAnalytics = () => {
  const [data, setData] = useState<AnalyticsData>(initData());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setData(getAnalyticsData());
  }, []);

  const refreshData = useCallback(() => {
    setData(getAnalyticsData());
  }, []);

  const login = useCallback((password: string): boolean => {
    if (verifyAdminPassword(password)) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const clearData = useCallback(() => {
    clearAllData();
    setData(initData());
  }, []);

  // 计算统计数据
  const stats = {
    // 基础数据
    totalVisits: data.totalVisits,
    totalTests: data.totalTests,
    conversionRate: data.totalVisits > 0 
      ? ((data.totalTests / data.totalVisits) * 100).toFixed(1) 
      : '0',
    
    // 分数分布
    scoreDistribution: {
      '0-40': data.results.filter(r => r.totalScore <= 40).length,
      '41-60': data.results.filter(r => r.totalScore > 40 && r.totalScore <= 60).length,
      '61-80': data.results.filter(r => r.totalScore > 60 && r.totalScore <= 80).length,
      '81-100': data.results.filter(r => r.totalScore > 80).length,
    },
    
    // 等级分布
    levelDistribution: data.results.reduce((acc, r) => {
      acc[r.level] = (acc[r.level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    
    // 各维度平均分
    averageDimensions: data.results.length > 0 ? {
      recognition: Math.round(data.results.reduce((sum, r) => sum + r.dimensionScores.recognition, 0) / data.results.length),
      response: Math.round(data.results.reduce((sum, r) => sum + r.dimensionScores.response, 0) / data.results.length),
      confidence: Math.round(data.results.reduce((sum, r) => sum + r.dimensionScores.confidence, 0) / data.results.length),
      boundary: Math.round(data.results.reduce((sum, r) => sum + r.dimensionScores.boundary, 0) / data.results.length),
      support: Math.round(data.results.reduce((sum, r) => sum + r.dimensionScores.support, 0) / data.results.length),
    } : {
      recognition: 0,
      response: 0,
      confidence: 0,
      boundary: 0,
      support: 0,
    },
    
    // 平均分
    averageScore: data.results.length > 0 
      ? Math.round(data.results.reduce((sum, r) => sum + r.totalScore, 0) / data.results.length)
      : 0,
    
    // 最高分和最低分
    highestScore: data.results.length > 0 
      ? Math.max(...data.results.map(r => r.totalScore))
      : 0,
    lowestScore: data.results.length > 0 
      ? Math.min(...data.results.map(r => r.totalScore))
      : 0,
    
    // 最近7天数据
    last7Days: Object.entries(data.dailyStats)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-7),
    
    // 所有结果（按时间倒序）
    recentResults: [...data.results].sort((a, b) => b.timestamp - a.timestamp).slice(0, 50),
  };

  return {
    data,
    stats,
    isAuthenticated,
    login,
    logout,
    refreshData,
    clearData,
  };
};
