
import React, { useState, useMemo } from 'react';
import { ClassificationWord, Category } from '../types';

interface ClassificationSectionProps {
  words: ClassificationWord[];
}

const ClassificationSection: React.FC<ClassificationSectionProps> = ({ words }) => {
  const [userChoices, setUserChoices] = useState<Record<number, Category | null>>({});
  const [showResults, setShowResults] = useState(false);

  const categories: Category[] = ['/t/', '/d/', '/ɪd/'];

  const score = useMemo(() => {
    let correct = 0;
    words.forEach(w => {
      if (userChoices[w.id] === w.category) {
        correct++;
      }
    });
    return (10 * correct / words.length).toFixed(1);
  }, [userChoices, words]);

  const handleSelect = (wordId: number, category: Category) => {
    if (showResults) return;
    setUserChoices(prev => ({ ...prev, [wordId]: category }));
  };

  const reset = () => {
    setUserChoices({});
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Phân Loại Từ Vựng</h2>
          <p className="text-slate-500">Xếp các từ sau vào đúng cột phát âm của chúng.</p>
        </div>
        <div className="flex items-center gap-2">
            {!showResults ? (
                <button 
                  onClick={() => setShowResults(true)}
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                >
                  Kiểm Tra
                </button>
            ) : (
                <button 
                  onClick={reset}
                  className="bg-slate-200 text-slate-700 px-6 py-2.5 rounded-xl font-bold hover:bg-slate-300 transition"
                >
                  Làm Lại
                </button>
            )}
        </div>
      </div>

      {showResults && (
        <div className="bg-emerald-600 rounded-2xl p-6 text-white text-center shadow-xl mb-8">
            <p className="text-lg opacity-90">Điểm số phân loại</p>
            <div className="text-5xl font-black mt-1">{score} <span className="text-2xl opacity-70">/ 10</span></div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {words.map((w) => {
          const choice = userChoices[w.id];
          const isCorrect = choice === w.category;

          return (
            <div 
              key={w.id} 
              className={`bg-white p-4 rounded-2xl shadow-sm border transition-all ${
                showResults 
                  ? choice ? (isCorrect ? 'border-emerald-200 bg-emerald-50/30' : 'border-rose-200 bg-rose-50/30') : 'border-slate-100'
                  : 'border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-slate-800 text-sm truncate pr-2">{w.id}. {w.word}</span>
                {showResults && choice && (
                   <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                     {isCorrect ? 'Đúng' : 'Sai'}
                   </span>
                )}
              </div>
              <div className="flex gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    disabled={showResults}
                    onClick={() => handleSelect(w.id, cat)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      choice === cat
                        ? showResults
                          ? cat === w.category
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-rose-600 border-rose-600 text-white'
                          : 'bg-indigo-600 border-indigo-600 text-white'
                        : 'bg-slate-50 border-slate-100 hover:border-slate-300 text-slate-500'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
         {!showResults ? (
            <button 
                onClick={() => {
                  setShowResults(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-2xl shadow-indigo-400 hover:scale-105 active:scale-95 transition-all"
            >
                Nộp Bài (Xong {Object.keys(userChoices).length}/100)
            </button>
         ) : (
            <button 
                onClick={reset}
                className="bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:bg-slate-900 transition-all"
            >
                Làm Lại Phân Loại
            </button>
         )}
      </div>
    </div>
  );
};

export default ClassificationSection;
