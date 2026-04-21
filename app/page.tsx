'use client';
import React, { useState } from 'react';
import { 
  Home, Activity, Target, Command, Layers, 
  MessageCircle, CheckCircle2, GraduationCap,
  FileText, Sparkles, Zap, Copy,
  PenTool, MessageSquare, BarChart, Loader2, XCircle,
  Download, Award, ArrowRight, Settings, Rocket
} from 'lucide-react';

export default function HomeLayout() {
  const [progress, setProgress] = useState(75); 
  const [activeTab, setActiveTab] = useState('ipo'); // 預設開啟 IPO 讓你檢查

  const navItems = [
    { id: 'home', label: '課程首頁', icon: Home, completed: true },
    { id: 'ipo', label: 'I-P-O 流程拆解', icon: Activity, completed: true },
    { id: 'has', label: 'HAS 協作五等級', icon: Target, completed: true },
    { id: 'craft', label: 'CRAFT 提示詞生產器', icon: Command, completed: true },
    { id: 'scenario', label: '情境實戰', icon: Layers, completed: progress === 100 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* 左側導覽列 */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between fixed h-full z-10 shadow-sm">
        <div>
          <div className="p-6 pb-4">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">HR AI 價值轉型</h1>
            <p className="text-xs text-gray-500 mt-1">從自動化到實戰應用</p>
            <div className="mt-6">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>學習進度</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>
          <hr className="border-gray-100 mx-4" />
          <nav className="mt-4 px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md transition-colors text-sm ${isActive ? 'bg-gray-50 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                  <div className="flex items-center gap-3"><Icon size={18} className={isActive ? 'text-gray-700' : 'text-gray-400'} /><span>{item.label}</span></div>
                  {item.completed && <CheckCircle2 size={16} className="text-emerald-500" />}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-100 bg-white">
          <button onClick={() => setActiveTab('certificate')} disabled={progress < 100} className={`w-full flex items-center justify-center gap-2 py-3 rounded-md text-sm font-medium transition-all ${progress === 100 ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
            <GraduationCap size={18} /> 領取結業證書
          </button>
        </div>
      </aside>

      {/* 右側內容區塊 */}
      <main className="flex-1 ml-64 bg-gray-50/50 p-10">
        <div className="max-w-5xl mx-auto">
          {activeTab === 'home' && (
             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 min-h-[500px] flex flex-col items-center justify-center text-center">
               <h2 className="text-3xl font-bold mb-4">歡迎來到 HR AI 價值轉型課程</h2>
               <p className="text-gray-600 mb-8 max-w-lg">這是一個結合互動實作的線上學習平台，請點擊左側選單，跟著步驟完成所有課程與測驗，獲取您的結業證書！</p>
               <button onClick={() => setActiveTab('ipo')} className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800">開始第一課程</button>
             </div>
          )}
          {activeTab === 'ipo' && <IpoModule />}
          {activeTab === 'has' && <HasModule />}
          {activeTab === 'craft' && <CraftModule />}
          {activeTab === 'scenario' && <ScenarioModule onComplete={() => setProgress(100)} />}
          {activeTab === 'certificate' && progress === 100 && <CertificateModule />}
        </div>
      </main>
    </div>
  );
}

// ---------------------------------------------------------
// 模組 1：I-P-O 流程拆解 (完整還原！)
// ---------------------------------------------------------
function IpoModule() {
  const [data, setData] = useState({ input: '', process: '', output: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [feedback, setFeedback] = useState('');

  const templates = {
    interview: { input: '1. 應徵者履歷 PDF\n2. 主管日曆空檔\n3. 面試標準評分表', process: '1. 比對時間\n2. 撥打電話確認意願\n3. 預約會議室\n4. 發送通知信', output: '1. 行事曆面試行程\n2. ATS 系統狀態更新' },
    onboard: { input: '1. 新人錄取通知書\n2. 職務說明書', process: '1. 建立員工編號\n2. 開通 Email 與系統權限\n3. 準備座位與電腦', output: '1. IT 派工單\n2. 新人歡迎信' }
  };

  const handleGenerate = () => {
    setIsGenerating(true); setFeedback('');
    setTimeout(() => {
      setIsGenerating(false);
      setFeedback('這是一位很好的 I-P-O 拆解起點，但要真正實現 AI 自動化，需要更細緻的刻畫：\n\n1. Process (處理) 的細節程度：目前的「比對時間」還是太過籠統。建議拆解成「讀取 Google 日曆 API」、「尋找共同空檔」等。\n2. Input (輸入) 的格式化：履歷 PDF 不利於讀取，理想情況是經過 OCR 辨識轉為 JSON。\n3. Output (輸出) 的驗證：如何驗證行程已建立？例如檢查 API 的 response code。\n\n繼續保持，流程越清楚，AI 越能幫助你！');
    }, 1500);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold text-gray-800 tracking-tight">I-P-O 流程拆解畫板</h2>
      <p className="text-gray-500 mt-2 mb-8">流程清楚才有辦法自動化。請拆解你的 HR 任務：</p>

      {/* 上方流程狀態圖 */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-center gap-6 mb-8">
        <div className={`px-6 py-3 rounded-lg border-2 flex flex-col items-center ${data.input ? 'border-emerald-500 text-emerald-700 bg-emerald-50' : 'border-gray-200 text-gray-500'}`}><span className="text-xs font-bold mb-1">INPUT</span><span className="font-medium">{data.input ? '已就緒' : '等待輸入'}</span></div>
        <ArrowRight className="text-gray-300" />
        <div className={`px-6 py-3 rounded-lg border-2 flex flex-col items-center ${data.process ? 'border-amber-500 text-amber-700 bg-amber-50' : 'border-gray-200 text-gray-500'}`}><span className="text-xs font-bold mb-1">PROCESS</span><span className="font-medium">{data.process ? '自動化準備中' : '等待定義'}</span></div>
        <ArrowRight className="text-gray-300" />
        <div className={`px-6 py-3 rounded-lg border-2 flex flex-col items-center ${data.output ? 'border-indigo-500 text-indigo-700 bg-indigo-50' : 'border-gray-200 text-gray-500'}`}><span className="text-xs font-bold mb-1">OUTPUT</span><span className="font-medium">{data.output ? '價值產出' : '目標設定'}</span></div>
      </div>

      <div className="flex gap-3 mb-6">
        <button onClick={() => {setData(templates.interview); setFeedback('');}} className="py-2 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">教材案例：安排面試</button>
        <button onClick={() => {setData(templates.onboard); setFeedback('');}} className="py-2 px-4 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">教材案例：新人入職</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl border-t-4 border-t-emerald-500 shadow-sm border border-gray-100">
          <h3 className="font-bold flex items-center gap-2 mb-3 text-emerald-800"><CheckCircle2 size={18}/> Input</h3>
          <textarea value={data.input} onChange={(e)=>setData({...data, input: e.target.value})} rows={5} className="w-full text-sm outline-none resize-none p-2" placeholder="需要哪些材料？" />
        </div>
        <div className="bg-white p-5 rounded-xl border-t-4 border-t-amber-500 shadow-sm border border-gray-100">
          <h3 className="font-bold flex items-center gap-2 mb-3 text-amber-800"><Settings size={18}/> Process</h3>
          <textarea value={data.process} onChange={(e)=>setData({...data, process: e.target.value})} rows={5} className="w-full text-sm outline-none resize-none p-2" placeholder="拆解步驟與判斷點..." />
        </div>
        <div className="bg-white p-5 rounded-xl border-t-4 border-t-indigo-500 shadow-sm border border-gray-100">
          <h3 className="font-bold flex items-center gap-2 mb-3 text-indigo-800"><Activity size={18}/> Output</h3>
          <textarea value={data.output} onChange={(e)=>setData({...data, output: e.target.value})} rows={5} className="w-full text-sm outline-none resize-none p-2" placeholder="最終交付物是什麼？" />
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <button onClick={handleGenerate} disabled={!data.input || isGenerating} className="bg-slate-900 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-slate-800 disabled:opacity-50">
          {isGenerating ? <Loader2 size={18} className="animate-spin"/> : <Rocket size={18}/>}
          提交並獲取專業點評
        </button>
      </div>

      {feedback && (
        <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-xl animate-in slide-in-from-bottom-4">
          <h3 className="font-bold text-emerald-800 flex items-center gap-2 mb-4"><Sparkles size={18}/> GEN-1 助教專業回饋</h3>
          <p className="text-emerald-900 whitespace-pre-wrap leading-relaxed">{feedback}</p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------
// 模組 2-5：(保留之前完整實作好的功能，直接貼上不影響)
// ---------------------------------------------------------
function HasModule() {
  const [selectedLevel, setSelectedLevel] = useState(3);
  const levelsData = [
    { id: 5, label: 'Level 5', title: 'H5. 全人工主導', icon: Target, colorClass: 'border-red-500', textClass: 'text-red-500', desc: '任務完成完全依賴你的參與（最原始、低效的狀態）。', example: '教材案例：手動在 Excel 裡逐筆輸入員工資料，無自動化。', warning: '這是目前的低效區 (H4-H5)。透過流程拆解，我們應致力於提升至 H2 分級。' },
    { id: 4, label: 'Level 4', title: 'H4. 人類主導協作', icon: FileText, colorClass: 'border-orange-400', textClass: 'text-orange-500', desc: '人類承擔任務執行的主要責任，AI 提供不同程度的協助。', example: '教材案例：主管撰寫績效評語，AI 負責潤色成專業文字。', warning: '這是目前的低效區 (H4-H5)。透過流程拆解，我們應致力於提升至 H2 分級。' },
    { id: 3, label: 'Level 3', title: 'H3. 平等夥伴關係', icon: Sparkles, colorClass: 'border-amber-400', textClass: 'text-amber-500', desc: '人類和 AI 代理人在整個任務過程中密切協作。', example: '教材案例：面試進行時，AI 即時生成評分建議與追問問題。' },
    { id: 2, label: 'Level 2', title: 'H2. AI 主導協作', icon: Zap, colorClass: 'border-emerald-500', textClass: 'text-emerald-600', desc: 'AI 代理人需要你輸入一些關鍵要點來實現更好的任務績效。', example: '教材案例：由 AI 安排面試，但最後由你確認場地安排。' },
    { id: 1, label: 'Level 1', title: 'H1. AI 主導完成', icon: CheckCircle2, colorClass: 'border-teal-600', textClass: 'text-teal-700', desc: 'AI 代理人承擔任務執行的主要責任，無需或僅需極少的人類監督。', example: '教材案例：全自動化簡歷篩選並自動發送拒絕信給不合格者。' },
  ];
  const currentData = levelsData.find(d => d.id === selectedLevel);
  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold text-gray-800 tracking-tight">HAS 協作層級探索</h2>
      <div className="flex gap-4 mb-8 mt-8">
        {levelsData.map(data => {
          const Icon = data.icon;
          return (
            <button key={data.id} onClick={() => setSelectedLevel(data.id)} className={`flex-1 py-4 rounded-xl border-2 transition-all bg-white shadow-sm flex flex-col items-center ${selectedLevel === data.id ? `${data.colorClass} scale-[1.02]` : 'border-gray-100'}`}>
              <Icon className={`mb-2 ${selectedLevel === data.id ? data.textClass : 'text-gray-400'}`} />
              <span className="text-sm font-bold">{data.label}</span>
            </button>
          );
        })}
      </div>
      <div className={`bg-white rounded-xl p-8 border-l-8 ${currentData?.colorClass}`}>
        <h3 className={`text-2xl font-bold mb-4 ${currentData?.textClass}`}>{currentData?.title}</h3>
        <p className="text-lg mb-4">{currentData?.desc}</p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4"><p className="font-medium text-gray-800">{currentData?.example}</p></div>
      </div>
    </div>
  );
}

function CraftModule() {
  const [craft, setCraft] = useState({ context: '', role: '', action: '', format: '', tone: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResult, setAiResult] = useState('');
  const templates = {
    jd: { context: '我是一家台灣 SaaS 新創（150人）的 CHRO，正在招募第一位 HRBP', role: '請你扮演擅長科技業人才招募的資深 HR 顧問', action: '請協助撰寫 JD，需包含：開場白、職責（5條含指標）、資格條件、價值主張', format: 'Markdown 格式，適合直接貼到 104 或 LinkedIn', tone: '專業但有溫度，讓主動與被動求職者看完想投遞履歷' },
    interview: { context: '公司有一位技術極強但溝通能力較弱的資深軟體工程師。', role: '扮演資深且擅長引導的 HR 專家', action: '設計一份年度績效面談的問題清單。', format: '以 Q&A 列表呈現', tone: '建設性、同理心' },
  };
  const handleGenerate = () => {
    setIsGenerating(true); setAiResult('');
    setTimeout(() => { setIsGenerating(false); setAiResult(`收到您的 CRAFT 指令！\n這是一份根據您的要求打造的結果...`); }, 1500);
  };
  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold mb-8">CRAFT 提示詞生產器</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-gray-100"><h3 className="font-bold mb-2">Context</h3><input value={craft.context} onChange={(e)=>setCraft({...craft, context: e.target.value})} className="w-full border p-2 rounded" /></div>
          <div className="bg-white p-5 rounded-xl border border-gray-100"><h3 className="font-bold mb-2">Role</h3><input value={craft.role} onChange={(e)=>setCraft({...craft, role: e.target.value})} className="w-full border p-2 rounded" /></div>
          <div className="bg-white p-5 rounded-xl border border-gray-100"><h3 className="font-bold mb-2">Action</h3><textarea value={craft.action} onChange={(e)=>setCraft({...craft, action: e.target.value})} className="w-full border p-2 rounded" /></div>
        </div>
        <div>
          <div className="flex gap-3 mb-6">
            <button onClick={() => setCraft(templates.jd)} className="flex-1 py-2 bg-white border rounded hover:bg-gray-50">寫 JD</button>
            <button onClick={() => setCraft(templates.interview)} className="flex-1 py-2 bg-white border rounded hover:bg-gray-50">面談問綱</button>
          </div>
          <div className="bg-gray-400 p-5 rounded-lg text-white text-sm mb-4 min-h-[150px]"><pre>{JSON.stringify(craft, null, 2)}</pre></div>
          <button onClick={handleGenerate} className="w-full py-3 bg-slate-900 text-white rounded font-bold hover:bg-slate-800">給 AI 測試</button>
          {aiResult && <div className="mt-4 bg-emerald-50 border p-4 rounded text-emerald-900">{aiResult}</div>}
        </div>
      </div>
    </div>
  );
}

function ScenarioModule({ onComplete }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const currentQuiz = { title: '新創效率極限', desc: '面臨組織重整時，你該採取的策略是？', optionA: '花費預算導入大型傳統 HR 系統。', optionB: '將例行庶務大幅自動化，用 AI 取代。', correctAnswer: 'B' };
  
  const handleOptionSelect = (opt) => { setSelectedOption(opt); setIsCorrect(opt === currentQuiz.correctAnswer); };
  
  return (
    <div className="animate-in fade-in">
      <h2 className="text-3xl font-bold mb-8">情境考驗站</h2>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-2xl font-bold mb-6">{currentQuiz.title}</h3>
        <p className="mb-6">{currentQuiz.desc}</p>
        <button onClick={() => handleOptionSelect('A')} className={`w-full text-left p-4 mb-3 border rounded ${selectedOption === 'A' ? (isCorrect ? 'bg-emerald-50' : 'bg-red-50') : ''}`}>A. {currentQuiz.optionA}</button>
        <button onClick={() => handleOptionSelect('B')} className={`w-full text-left p-4 mb-3 border rounded ${selectedOption === 'B' ? (isCorrect ? 'bg-emerald-50' : 'bg-red-50') : ''}`}>B. {currentQuiz.optionB}</button>
        {isCorrect && <button onClick={onComplete} className="mt-4 bg-slate-900 text-white px-6 py-2 rounded">完成所有情境測驗！</button>}
      </div>
    </div>
  );
}

function CertificateModule() {
  const [name, setName] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const today = new Date().toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' });

  if (!isGenerated) return (
    <div className="bg-white p-12 text-center rounded-2xl border max-w-2xl mx-auto"><Award size={48} className="mx-auto text-amber-500 mb-6" /><h2 className="text-3xl font-bold mb-4">輸入您的姓名以生成證書</h2><input value={name} onChange={(e) => setName(e.target.value)} className="w-full max-w-sm border p-3 rounded mb-4 text-center" /><button onClick={() => setIsGenerated(true)} className="bg-slate-900 text-white px-8 py-3 rounded">生成證書</button></div>
  );

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white border-8 border-slate-900 p-12 rounded-xl shadow-xl w-full aspect-[1.414/1] relative text-center flex flex-col justify-center">
        <h1 className="text-4xl font-serif font-bold text-slate-800 mb-4">完課證明</h1>
        <h2 className="text-lg font-bold mb-8">AI 時代的 HR 價值轉型</h2>
        <div className="text-5xl font-bold border-b-2 pb-2 px-12 mb-8">{name}</div>
        <p className="text-sm text-gray-600 mb-12">已圓滿完成上述課程培訓。</p>
        <div className="flex justify-between w-full px-12"><div className="text-left"><p className="font-serif text-xl border-b pb-1">Wesley Cheng</p><p className="text-xs text-gray-500">指導老師</p></div><div className="text-right"><p className="font-bold border-b pb-1">{today}</p><p className="text-xs text-gray-500">發證日期</p></div></div>
      </div>
      <button onClick={() => window.print()} className="bg-amber-600 text-white px-8 py-3 rounded mt-8 flex gap-2"><Download size={18}/> 下載 PDF</button>
    </div>
  );
}
 