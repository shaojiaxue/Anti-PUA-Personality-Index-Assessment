// 职场反PUA测试题目数据
// 基于心理学研究设计，涵盖五个维度：识别力、应对力、自信度、边界感、支持网

export interface Option {
  id: string;
  text: string;
  scores: {
    recognition: number; // 识别力
    response: number;    // 应对力
    confidence: number;  // 自信度
    boundary: number;    // 边界感
    support: number;     // 支持网
  };
}

export interface Question {
  id: number;
  text: string;
  category: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "你的上司在团队会议上公开质疑你的能力，说你'总是拖后腿'，你会...",
    category: "公开羞辱",
    options: [
      { id: "A", text: "默默忍受，私下反思自己是否真的有问题", scores: { recognition: 1, response: 1, confidence: 1, boundary: 1, support: 2 } },
      { id: "B", text: "当场反驳，情绪激动地据理力争", scores: { recognition: 3, response: 2, confidence: 3, boundary: 2, support: 2 } },
      { id: "C", text: "会后单独沟通，冷静澄清事实并询问具体改进建议", scores: { recognition: 5, response: 5, confidence: 4, boundary: 4, support: 3 } },
      { id: "D", text: "向HR或更高层领导反映这种不当管理方式", scores: { recognition: 4, response: 4, confidence: 4, boundary: 5, support: 4 } }
    ]
  },
  {
    id: 2,
    text: "同事经常以'开玩笑'的方式调侃你的外貌/穿着/口音，让你感到不适，你会...",
    category: "隐性攻击",
    options: [
      { id: "A", text: "一笑而过，不想把事情闹大", scores: { recognition: 2, response: 1, confidence: 2, boundary: 1, support: 2 } },
      { id: "B", text: "当场严肃表示这种玩笑让你不舒服，请对方停止", scores: { recognition: 4, response: 4, confidence: 4, boundary: 4, support: 3 } },
      { id: "C", text: "也用同样的方式'回敬'对方", scores: { recognition: 3, response: 2, confidence: 3, boundary: 2, support: 2 } },
      { id: "D", text: "私下找对方认真谈，说明底线，必要时寻求上级介入", scores: { recognition: 5, response: 5, confidence: 4, boundary: 5, support: 4 } }
    ]
  },
  {
    id: 3,
    text: "领导经常在工作时间外（晚上/周末）给你发消息安排任务，并说'很急'，你会...",
    category: "边界侵犯",
    options: [
      { id: "A", text: "立即响应处理，怕给领导留下不好的印象", scores: { recognition: 2, response: 2, confidence: 2, boundary: 1, support: 2 } },
      { id: "B", text: "看心情回复，有时候装没看见", scores: { recognition: 3, response: 2, confidence: 3, boundary: 2, support: 2 } },
      { id: "C", text: "区分紧急程度，非紧急事项工作时间再处理，并适时沟通边界", scores: { recognition: 5, response: 5, confidence: 4, boundary: 5, support: 3 } },
      { id: "D", text: "直接设置工作时段的消息免打扰，非工作时间不回复", scores: { recognition: 4, response: 3, confidence: 4, boundary: 4, support: 3 } }
    ]
  },
  {
    id: 4,
    text: "你的功劳被同事抢去汇报，领导表扬了TA，你会...",
    category: "功劳掠夺",
    options: [
      { id: "A", text: "算了，以后多留个心眼就好", scores: { recognition: 3, response: 1, confidence: 2, boundary: 2, support: 2 } },
      { id: "B", text: "当场揭穿，让所有人知道真相", scores: { recognition: 4, response: 2, confidence: 3, boundary: 2, support: 2 } },
      { id: "C", text: "私下找该同事对质，要求下次澄清", scores: { recognition: 4, response: 4, confidence: 4, boundary: 4, support: 3 } },
      { id: "D", text: "找机会向领导补充说明，并建立工作留痕机制", scores: { recognition: 5, response: 5, confidence: 5, boundary: 5, support: 4 } }
    ]
  },
  {
    id: 5,
    text: "领导对你说'离开这里你什么都不是，外面工作很难找'，你的反应是...",
    category: "威胁恐吓",
    options: [
      { id: "A", text: "感到害怕，更加努力工作证明自己", scores: { recognition: 1, response: 1, confidence: 1, boundary: 1, support: 2 } },
      { id: "B", text: "开始悄悄更新简历，关注外部机会", scores: { recognition: 4, response: 3, confidence: 3, boundary: 3, support: 3 } },
      { id: "C", text: "冷静分析这是管理手段还是事实，不被情绪左右", scores: { recognition: 5, response: 5, confidence: 5, boundary: 4, support: 4 } },
      { id: "D", text: "直接回怼'那我们可以试试看'", scores: { recognition: 3, response: 2, confidence: 4, boundary: 2, support: 2 } }
    ]
  },
  {
    id: 6,
    text: "团队聚餐时，有人不断劝酒，说'不喝就是不给我面子'，你会...",
    category: "道德绑架",
    options: [
      { id: "A", text: "勉强喝下，不想破坏气氛", scores: { recognition: 2, response: 1, confidence: 2, boundary: 1, support: 2 } },
      { id: "B", text: "坚决拒绝，不管对方怎么说", scores: { recognition: 4, response: 3, confidence: 4, boundary: 4, support: 2 } },
      { id: "C", text: "以茶代酒，用其他方式表达尊重", scores: { recognition: 5, response: 5, confidence: 4, boundary: 4, support: 3 } },
      { id: "D", text: "找借口提前离开", scores: { recognition: 3, response: 2, confidence: 2, boundary: 2, support: 2 } }
    ]
  },
  {
    id: 7,
    text: "你的项目成果很好，但领导在总结时只字不提你的贡献，你会...",
    category: "忽视抹杀",
    options: [
      { id: "A", text: "期待领导以后会注意到，继续默默努力", scores: { recognition: 2, response: 1, confidence: 2, boundary: 2, support: 2 } },
      { id: "B", text: "在适当场合'不经意'提及自己的贡献", scores: { recognition: 4, response: 3, confidence: 3, boundary: 3, support: 3 } },
      { id: "C", text: "主动向领导汇报，要求认可并记录业绩", scores: { recognition: 5, response: 5, confidence: 5, boundary: 4, support: 3 } },
      { id: "D", text: "找同事吐槽，寻求心理安慰", scores: { recognition: 3, response: 1, confidence: 2, boundary: 2, support: 3 } }
    ]
  },
  {
    id: 8,
    text: "同事经常'请教'你问题，实际上是把TA的工作推给你，你会...",
    category: "责任转嫁",
    options: [
      { id: "A", text: "尽量帮忙，怕影响同事关系", scores: { recognition: 2, response: 1, confidence: 2, boundary: 1, support: 2 } },
      { id: "B", text: "直接拒绝，说自己也很忙", scores: { recognition: 4, response: 3, confidence: 3, boundary: 3, support: 2 } },
      { id: "C", text: "引导对方自己思考，提供思路而非代劳", scores: { recognition: 5, response: 5, confidence: 4, boundary: 5, support: 3 } },
      { id: "D", text: "帮一次，然后明确告知对方这是最后一次", scores: { recognition: 4, response: 4, confidence: 4, boundary: 4, support: 3 } }
    ]
  },
  {
    id: 9,
    text: "领导对你的工作总是不满意，无论你如何改进，你会...",
    category: "永不满足",
    options: [
      { id: "A", text: "怀疑自己的能力，越来越焦虑", scores: { recognition: 1, response: 1, confidence: 1, boundary: 1, support: 1 } },
      { id: "B", text: "请领导明确具体标准和期望", scores: { recognition: 5, response: 5, confidence: 4, boundary: 4, support: 3 } },
      { id: "C", text: "寻求同事或HR的第三方意见", scores: { recognition: 4, response: 4, confidence: 3, boundary: 3, support: 5 } },
      { id: "D", text: "认定领导在针对自己，开始找下家", scores: { recognition: 3, response: 2, confidence: 2, boundary: 2, support: 2 } }
    ]
  },
  {
    id: 10,
    text: "有人散布关于你的不实传言，影响你的职业形象，你会...",
    category: "谣言中伤",
    options: [
      { id: "A", text: "清者自清，相信时间会证明一切", scores: { recognition: 2, response: 1, confidence: 2, boundary: 2, support: 2 } },
      { id: "B", text: "找造谣者当面对质，要求澄清", scores: { recognition: 4, response: 3, confidence: 4, boundary: 3, support: 2 } },
      { id: "C", text: "在合适的场合用事实澄清，必要时寻求上级介入", scores: { recognition: 5, response: 5, confidence: 5, boundary: 4, support: 4 } },
      { id: "D", text: "也在背后说对方的坏话", scores: { recognition: 2, response: 1, confidence: 1, boundary: 1, support: 1 } }
    ]
  },
  {
    id: 11,
    text: "领导承诺的晋升/加薪一直没有兑现，每次都有新借口，你会...",
    category: "虚假承诺",
    options: [
      { id: "A", text: "继续等待，相信领导会兑现", scores: { recognition: 1, response: 1, confidence: 2, boundary: 1, support: 2 } },
      { id: "B", text: "直接找领导谈，要求明确时间表", scores: { recognition: 5, response: 4, confidence: 4, boundary: 4, support: 3 } },
      { id: "C", text: "开始关注外部机会，做好两手准备", scores: { recognition: 4, response: 4, confidence: 4, boundary: 4, support: 3 } },
      { id: "D", text: "向HR或更高层反映情况", scores: { recognition: 4, response: 5, confidence: 4, boundary: 5, support: 4 } }
    ]
  },
  {
    id: 12,
    text: "同事在合作项目中不做事，却在汇报时大谈自己的'贡献'，你会...",
    category: "搭便车",
    options: [
      { id: "A", text: "下次避免和TA合作", scores: { recognition: 3, response: 2, confidence: 3, boundary: 3, support: 2 } },
      { id: "B", text: "在汇报时直接指出TA的实际贡献", scores: { recognition: 4, response: 3, confidence: 3, boundary: 2, support: 2 } },
      { id: "C", text: "建立明确的分工记录，汇报时客观呈现", scores: { recognition: 5, response: 5, confidence: 5, boundary: 5, support: 3 } },
      { id: "D", text: "私下找TA谈，明确分工和责任", scores: { recognition: 4, response: 4, confidence: 4, boundary: 4, support: 3 } }
    ]
  },
  {
    id: 13,
    text: "领导经常拿你和'优秀'的同事比较，说'你怎么不能像TA一样'，你会...",
    category: "比较打压",
    options: [
      { id: "A", text: "感到自卑，努力向那个同事学习", scores: { recognition: 2, response: 2, confidence: 2, boundary: 2, support: 2 } },
      { id: "B", text: "心里不舒服，但表面附和", scores: { recognition: 3, response: 1, confidence: 2, boundary: 2, support: 2 } },
      { id: "C", text: "冷静分析自己的优势，不被比较影响自我价值感", scores: { recognition: 5, response: 5, confidence: 5, boundary: 4, support: 4 } },
      { id: "D", text: "向领导说明每个人的特点和贡献方式不同", scores: { recognition: 4, response: 4, confidence: 4, boundary: 4, support: 3 } }
    ]
  },
  {
    id: 14,
    text: "有人在你背后向领导'打小报告'，说你工作态度有问题，你会...",
    category: "背后捅刀",
    options: [
      { id: "A", text: "很受伤，但不知道是谁", scores: { recognition: 1, response: 1, confidence: 1, boundary: 1, support: 1 } },
      { id: "B", text: "找信任的同事打听是谁，然后当面对质", scores: { recognition: 3, response: 2, confidence: 3, boundary: 2, support: 3 } },
      { id: "C", text: "主动向领导汇报工作，用事实证明自己", scores: { recognition: 5, response: 5, confidence: 5, boundary: 4, support: 3 } },
      { id: "D", text: "更加谨慎，注意职场人际关系", scores: { recognition: 4, response: 4, confidence: 4, boundary: 4, support: 4 } }
    ]
  },
  {
    id: 15,
    text: "领导说'我这是为你好，才这么严格要求你'，但实际上是过度压榨，你会...",
    category: "情感绑架",
    options: [
      { id: "A", text: "感激领导的'用心'，更加努力工作", scores: { recognition: 1, response: 1, confidence: 2, boundary: 1, support: 2 } },
      { id: "B", text: "心里清楚但不说破，找机会跳槽", scores: { recognition: 4, response: 3, confidence: 3, boundary: 3, support: 2 } },
      { id: "C", text: "客观评估工作量和回报，适时表达自己的底线", scores: { recognition: 5, response: 5, confidence: 5, boundary: 5, support: 3 } },
      { id: "D", text: "直接说'如果是为我好，请给我相应的回报'", scores: { recognition: 4, response: 3, confidence: 4, boundary: 3, support: 2 } }
    ]
  },
  {
    id: 16,
    text: "同事在群里@你，用命令的口吻让你做不属于你职责的事，你会...",
    category: "越权指挥",
    options: [
      { id: "A", text: "照做，不想在群里引起冲突", scores: { recognition: 2, response: 1, confidence: 2, boundary: 1, support: 2 } },
      { id: "B", text: "在群里回复'这不是我的职责范围'", scores: { recognition: 4, response: 3, confidence: 4, boundary: 4, support: 2 } },
      { id: "C", text: "私下找对方说明职责边界，建议找正确的人", scores: { recognition: 5, response: 5, confidence: 5, boundary: 5, support: 3 } },
      { id: "D", text: "@对方领导，请明确分工", scores: { recognition: 3, response: 2, confidence: 3, boundary: 2, support: 3 } }
    ]
  },
  {
    id: 17,
    text: "你的创意被同事'借鉴'并在会议上提出，获得领导赞赏，你会...",
    category: "创意剽窃",
    options: [
      { id: "A", text: "算了，下次注意保护自己的创意", scores: { recognition: 3, response: 2, confidence: 2, boundary: 2, support: 2 } },
      { id: "B", text: "当场说'这是我之前提过的想法'", scores: { recognition: 4, response: 3, confidence: 4, boundary: 3, support: 2 } },
      { id: "C", text: "会后找该同事谈，要求以后注明出处", scores: { recognition: 4, response: 4, confidence: 4, boundary: 4, support: 3 } },
      { id: "D", text: "以后在邮件或文档中记录创意，建立证据", scores: { recognition: 5, response: 5, confidence: 5, boundary: 5, support: 4 } }
    ]
  },
  {
    id: 18,
    text: "领导说'现在的年轻人就是吃不了苦'，暗示你加班不够多，你会...",
    category: "代际标签",
    options: [
      { id: "A", text: "感到愧疚，开始主动加班", scores: { recognition: 1, response: 1, confidence: 1, boundary: 1, support: 2 } },
      { id: "B", text: "心里不服，但表面附和", scores: { recognition: 3, response: 1, confidence: 2, boundary: 2, support: 2 } },
      { id: "C", text: "用工作效率和成果说话，不被标签定义", scores: { recognition: 5, response: 5, confidence: 5, boundary: 4, support: 3 } },
      { id: "D", text: "向领导说明工作效率比工作时长更重要", scores: { recognition: 4, response: 4, confidence: 4, boundary: 4, support: 3 } }
    ]
  },
  {
    id: 19,
    text: "团队里有人总是'无意间'在领导面前提起你的小失误，你会...",
    category: "暗箭伤人",
    options: [
      { id: "A", text: "以后更加小心，尽量不犯错", scores: { recognition: 3, response: 2, confidence: 2, boundary: 2, support: 2 } },
      { id: "B", text: "找机会也在领导面前说TA的问题", scores: { recognition: 2, response: 1, confidence: 2, boundary: 1, support: 1 } },
      { id: "C", text: "主动找领导汇报，澄清并说明改进措施", scores: { recognition: 5, response: 5, confidence: 5, boundary: 4, support: 3 } },
      { id: "D", text: "私下找对方谈，表明自己注意到了这种行为", scores: { recognition: 4, response: 4, confidence: 4, boundary: 4, support: 3 } }
    ]
  },
  {
    id: 20,
    text: "领导在年度评估时给你很低的分数，但平时从未指出过问题，你会...",
    category: "突然打击",
    options: [
      { id: "A", text: "接受结果，明年再努力", scores: { recognition: 2, response: 1, confidence: 2, boundary: 2, support: 2 } },
      { id: "B", text: "情绪激动地找领导理论", scores: { recognition: 3, response: 2, confidence: 3, boundary: 2, support: 2 } },
      { id: "C", text: "要求领导提供具体事例和改进建议，并申请复议", scores: { recognition: 5, response: 5, confidence: 5, boundary: 5, support: 4 } },
      { id: "D", text: "向HR投诉，要求重新评估", scores: { recognition: 4, response: 4, confidence: 4, boundary: 4, support: 4 } }
    ]
  }
];

// 结果等级定义
export const resultLevels = [
  {
    minScore: 0,
    maxScore: 40,
    title: "危险预警",
    subtitle: "职场小白兔",
    description: "你对职场操控的识别能力较弱，容易成为PUA的目标。建议提高警惕，学习识别各种操控手段，建立清晰的个人边界。",
    advice: [
      "学习职场心理学知识，了解常见的操控手段",
      "建立清晰的个人边界，学会说'不'",
      "寻找职场导师或信任的同事，建立支持网络",
      "记录工作成果和沟通记录，保护自己",
      "提升自信心，不被他人的评价左右自我价值"
    ],
    color: "#FF4444"
  },
  {
    minScore: 41,
    maxScore: 60,
    title: "需要警惕",
    subtitle: "职场学徒",
    description: "你具备一定的识别能力，但在应对上还不够果断。需要加强边界意识和应对技巧，避免被渐进式操控。",
    advice: [
      "练习在不舒服时及时表达，不要压抑感受",
      "建立工作留痕习惯，保护自己的劳动成果",
      "学习非暴力沟通技巧，有效表达边界",
      "扩大职场社交圈，获取更多视角和信息",
      "定期复盘职场互动，识别潜在问题"
    ],
    color: "#FF8800"
  },
  {
    minScore: 61,
    maxScore: 80,
    title: "防御高手",
    subtitle: "职场战士",
    description: "你有较强的职场操控识别能力和应对技巧，能够有效保护自己。继续保持，并帮助身边需要帮助的人。",
    advice: [
      "继续精进沟通技巧，做到既坚定又礼貌",
      "分享自己的经验，帮助团队建立健康文化",
      "关注职场新人，给予适当的指导和支持",
      "保持学习，了解新型操控手段",
      "建立更广泛的职业网络，增强抗风险能力"
    ],
    color: "#44AA44"
  },
  {
    minScore: 81,
    maxScore: 100,
    title: "反PUA大师",
    subtitle: "职场守护者",
    description: "你拥有出色的职场操控识别和应对能力，是团队中的'定海神针'。你的存在让不良行为无处遁形。",
    advice: [
      "成为职场文化的积极塑造者",
      " mentor新人，帮助他们快速成长",
      "在适当场合为弱势群体发声",
      "持续学习，保持敏锐度",
      "考虑向管理层发展，从源头改善文化"
    ],
    color: "#4488FF"
  }
];

// 维度说明
export const dimensionInfo = {
  recognition: {
    name: "识别力",
    description: "识别职场操控行为的能力",
    icon: "Eye"
  },
  response: {
    name: "应对力",
    description: "面对操控时的应对策略",
    icon: "Shield"
  },
  confidence: {
    name: "自信度",
    description: "自我价值感和自信心",
    icon: "Star"
  },
  boundary: {
    name: "边界感",
    description: "维护个人边界的能力",
    icon: "Lock"
  },
  support: {
    name: "支持网",
    description: "职场人际关系和支持系统",
    icon: "Users"
  }
};
