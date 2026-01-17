
import React, { useState, useMemo } from 'react';
import { AppTab } from './types';
import { EXCEPTIONS, MCQ_QUESTIONS, CLASSIFICATION_WORDS } from './constants';
import TheorySection from './components/TheorySection';
import MCQSection from './components/MCQSection';
import ClassificationSection from './components/ClassificationSection';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.Theory);

  return (
    <div className="min-h-screen flex flex-col max-w-5xl mx-auto px-4 py-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2 tracking-tight">
          Luyện Phát Âm Đuôi -ed
        </h1>
        <p className="text-slate-500 font-medium">Làm chủ các quy tắc và ngoại lệ phát âm chuẩn xác</p>
      </header>

      {/* Tabs Navigation */}
      <nav className="flex items-center justify-center space-x-2 mb-8 sticky top-4 z-50 bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-slate-200">
        <button
          onClick={() => setActiveTab(AppTab.Theory)}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeTab === AppTab.Theory
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          📖 Lý Thuyết
        </button>
        <button
          onClick={() => setActiveTab(AppTab.MCQ)}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeTab === AppTab.MCQ
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          ✏️ Trắc Nghiệm
        </button>
        <button
          onClick={() => setActiveTab(AppTab.Classification)}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeTab === AppTab.Classification
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🧩 Phân Loại Từ
        </button>
      </nav>

      <main className="flex-1">
        {activeTab === AppTab.Theory && <TheorySection exceptions={EXCEPTIONS} />}
        {activeTab === AppTab.MCQ && <MCQSection questions={MCQ_QUESTIONS} />}
        {activeTab === AppTab.Classification && <ClassificationSection words={CLASSIFICATION_WORDS} />}
      </main>

      <footer className="mt-16 py-8 border-t border-slate-200 text-center text-slate-400 text-sm">
        <p>© 2024 English -ed Mastery App. Built for Language Excellence.</p>
      </footer>
    </div>
  );
};

export default App;
