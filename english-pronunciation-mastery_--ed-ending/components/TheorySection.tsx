
import React from 'react';
import { ExceptionWord } from '../types';

interface TheorySectionProps {
  exceptions: ExceptionWord[];
}

const TheorySection: React.FC<TheorySectionProps> = ({ exceptions }) => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Rules Overview */}
      <section className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
          <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-3">💡</span>
          Mẹo Ghi Nhớ "Thần Thánh"
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-700 mb-2">/ɪd/</h3>
            <p className="text-sm text-indigo-900 leading-relaxed font-medium">
              <span className="font-bold">Tiền Đô (t, d)</span> + Hội người già đặc biệt (tính từ ngoại lệ).
            </p>
          </div>
          <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100">
            <h3 className="text-xl font-bold text-rose-700 mb-2">/t/</h3>
            <p className="text-sm text-rose-900 leading-relaxed font-medium">
              <span className="font-bold">Sáng Sớm Chạy Khắp Phố Phường Xưa</span> (s, sh, ch, k, p, f/gh, x).
            </p>
          </div>
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
            <h3 className="text-xl font-bold text-emerald-700 mb-2">/d/</h3>
            <p className="text-sm text-emerald-900 leading-relaxed font-medium">
              Các trường hợp còn lại và các nguyên âm.
            </p>
          </div>
        </div>
      </section>

      {/* Exceptions Table */}
      <section className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 overflow-hidden">
        <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center">
          <span className="bg-amber-100 text-amber-600 p-2 rounded-lg mr-3">⭐</span>
          Bảng Các Trường Hợp Ngoại Lệ
        </h2>
        <p className="text-slate-500 mb-8 ml-12">Những từ này luôn phát âm là <span className="font-bold text-indigo-600">/ɪd/</span> bất kể âm cuối.</p>
        
        <div className="overflow-x-auto -mx-8">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-100">
                <th className="px-8 py-4 text-sm font-bold text-slate-600">Từ vựng</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-600">Phiên âm</th>
                <th className="px-4 py-4 text-sm font-bold text-slate-600">Nghĩa</th>
                <th className="px-8 py-4 text-sm font-bold text-slate-600">Ví dụ / Ghi chú</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {exceptions.map((exc, idx) => (
                <tr key={idx} className="hover:bg-indigo-50/50 transition-colors">
                  <td className="px-8 py-4 font-bold text-indigo-600">{exc.word}</td>
                  <td className="px-4 py-4 font-mono text-slate-500 text-xs">{exc.ipa}</td>
                  <td className="px-4 py-4 text-slate-700">{exc.meaning}</td>
                  <td className="px-8 py-4 text-slate-500 text-sm italic">{exc.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TheorySection;
