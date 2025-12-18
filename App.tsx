
import React, { useState, useRef, useCallback } from 'react';
import { ArtisticStyle, ModificationState, StyleOption } from './types';
import { STYLE_OPTIONS, MUSHROOM_SVG } from './constants';
import StyleCard from './components/StyleCard';
import { performStyleTransfer } from './services/geminiService';

const App: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<ArtisticStyle | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [modState, setModState] = useState<ModificationState>({
    targetText: '',
    newText: '',
    objectTarget: '',
    objectChange: '',
    customStylePrompt: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTransfer = async () => {
    if (!image || !selectedStyle) {
      setError("请先上传图片并选择风格");
      return;
    }

    setLoading(true);
    setError(null);

    const styleObj = STYLE_OPTIONS.find(s => s.id === selectedStyle);
    const basePrompt = styleObj?.prompt || "";

    try {
      const result = await performStyleTransfer(image, basePrompt, modState);
      if (result) {
        setResultImage(result);
      } else {
        setError("无法生成风格图，请稍后重试");
      }
    } catch (err) {
      setError("AI 处理出错，请检查 API 配置或网络状况");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen futuristic-bg flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-7xl px-6 py-6 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-800">
        <div className="flex items-center gap-3">
          {MUSHROOM_SVG}
          <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            设计风格迁移
          </h1>
        </div>
        <div className="hidden md:block text-slate-400 text-sm">
          Powered by Gemini AI
        </div>
      </header>

      <main className="w-full max-w-6xl px-6 py-10 flex flex-col gap-10">
        
        {/* Step 1: Upload and View */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs">1</span>
              图片上传
            </h2>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-video w-full rounded-3xl border-2 border-dashed border-slate-700 bg-slate-800/20 hover:bg-slate-800/40 hover:border-blue-500 transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden group relative"
            >
              {image ? (
                <img src={image} alt="Original" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-500 group-hover:text-blue-400 transition-colors">
                  <span className="text-4xl">📤</span>
                  <p className="font-medium">点击或拖拽图片到这里</p>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*" 
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-xs">2</span>
              生成结果
            </h2>
            <div className="aspect-video w-full rounded-3xl border-2 border-slate-700 bg-slate-900 flex items-center justify-center overflow-hidden relative shadow-2xl">
              {loading ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-blue-400 animate-pulse font-medium">AI 艺术风格迁移中...</p>
                </div>
              ) : resultImage ? (
                <img src={resultImage} alt="Result" className="w-full h-full object-cover" />
              ) : (
                <div className="text-slate-600 flex flex-col items-center">
                  <span className="text-4xl mb-2">✨</span>
                  <p>在此处预览生成的艺术作品</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Step 2: Styles Selector */}
        <section className="flex flex-col gap-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-xs">3</span>
            选择艺术风格
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {STYLE_OPTIONS.map((opt) => (
              <StyleCard 
                key={opt.id} 
                option={opt} 
                isActive={selectedStyle === opt.id} 
                onClick={() => setSelectedStyle(opt.id)}
              />
            ))}
          </div>
        </section>

        {/* Step 3: Advanced Tools */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-blue-400">📝 高级修改</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">自定义风格输入</label>
                <input 
                  type="text"
                  placeholder="如：莫奈风格、朋克蒸汽..."
                  value={modState.customStylePrompt}
                  onChange={(e) => setModState({...modState, customStylePrompt: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">海报文字修改 (自动识别并替换)</label>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    placeholder="输入要显示的新文字..."
                    value={modState.newText}
                    onChange={(e) => setModState({...modState, newText: e.target.value})}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-indigo-400">🤖 局部/人物修改</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">修改目标 (如：人物、背景、天空)</label>
                <input 
                  type="text"
                  placeholder="识别对象：如 '背景中的树'..."
                  value={modState.objectTarget}
                  onChange={(e) => setModState({...modState, objectTarget: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1 uppercase tracking-wider">修改需求</label>
                <input 
                  type="text"
                  placeholder="指令：如 '变成盛开的樱花'..."
                  value={modState.objectChange}
                  onChange={(e) => setModState({...modState, objectChange: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-4 mt-6">
          {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
          <button
            onClick={handleTransfer}
            disabled={loading || !image || !selectedStyle}
            className={`px-12 py-5 rounded-full font-bold text-xl transition-all duration-500 transform 
              ${loading || !image || !selectedStyle 
                ? 'bg-slate-700 cursor-not-allowed text-slate-500' 
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] active:scale-95 text-white'
              }`}
          >
            {loading ? 'AI 正极速生成中...' : '开始一键转换风格'}
          </button>
        </div>
      </main>

      {/* Futuristic Footer Background Decor */}
      <footer className="w-full mt-20 relative overflow-hidden bg-slate-950 border-t border-slate-800">
        <div className="absolute inset-0 futuristic-grid opacity-20"></div>
        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="scale-75">{MUSHROOM_SVG}</div>
            <span className="font-bold text-slate-300">设计风格迁移 v2.0</span>
          </div>
          <div className="text-slate-500 text-sm">
            © 2024 AI Design Magic. All rights reserved.
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
              <span className="text-xs">FB</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
              <span className="text-xs">TW</span>
            </div>
          </div>
        </div>
        {/* Glow Effect */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-blue-600/20 blur-[100px] rounded-full"></div>
      </footer>
    </div>
  );
};

export default App;
