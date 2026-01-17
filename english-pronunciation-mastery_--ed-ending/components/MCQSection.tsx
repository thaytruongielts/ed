
import React, { useState, useMemo } from 'react';
import { MCQQuestion } from '../types';

interface MCQSectionProps {
  questions: MCQQuestion[];
}

const MCQSection: React.FC<MCQSectionProps> = ({ questions }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const score = useMemo(() => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return (10 * correct / questions.length).toFixed(1);
  }, [answers, questions]);

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const reset = () => {
    setAnswers({});
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getLetter = (idx: number) => ['A', 'B', 'C', 'D'][idx];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Bài Tập Trắc Nghiệm</h2>
          <p className="text-slate-500">Chọn từ có cách phát âm đuôi -ed khác với các từ còn lại.</p>
        </div>
        <div className="flex items-center gap-2">
            {!showResults ? (
                <button 
                  onClick={() => setShowResults(true)}
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                >
                  Nộp Bài Chấm Điểm
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
        <div className="bg-indigo-600 rounded-2xl p-6 text-white text-center shadow-xl mb-8">
            <p className="text-lg opacity-90">Điểm số của bạn</p>
            <div className="text-5xl font-black mt-1">{score} <span className="text-2xl opacity-70">/ 10</span></div>
        </div>
      )}

      <div className="grid gap-6">
        {questions.map((q) => {
          const userAnswer = answers[q.id];
          const isCorrect = userAnswer === q.correctIndex;
          
          return (
            <div 
              key={q.id} 
              className={`bg-white rounded-2xl p-6 shadow-sm border transition-all ${
                showResults 
                  ? isCorrect 
                    ? 'border-emerald-200 bg-emerald-50/20' 
                    : 'border-rose-200 bg-rose-50/20'
                  : 'border-slate-100 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-slate-800 font-bold flex items-center">
                  <span className="text-indigo-500 mr-2 text-sm">Câu {q.id}.</span>
                </h3>
                {showResults && userAnswer !== undefined && (
                   <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                     {isCorrect ? 'Đúng' : 'Sai'}
                   </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={showResults}
                    onClick={() => handleSelect(q.id, idx)}
                    className={`flex items-center text-left px-4 py-3 rounded-xl border transition-all ${
                      userAnswer === idx
                        ? showResults
                          ? idx === q.correctIndex
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-rose-600 border-rose-600 text-white'
                          : 'bg-indigo-600 border-indigo-600 text-white'
                        : 'bg-slate-50 border-slate-100 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                        userAnswer === idx ? 'bg-white/20' : 'bg-slate-200 text-slate-500'
                    }`}>
                        {getLetter(idx)}
                    </span>
                    {opt}
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
                Nộp Bài (Hoàn thành {Object.keys(answers).length}/100)
            </button>
         ) : (
            <button 
                onClick={reset}
                className="bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl hover:bg-slate-900 transition-all"
            >
                Làm Lại Bài Tập
            </button>
         )}
      </div>
    </div>
  );
};

export default MCQSection;
