import React, { useState } from 'react';
import { COMMUNITY_QUESTIONS } from '../data/journeyConfig';
import { MessageSquare, ArrowBigUp, HelpCircle } from 'lucide-react';

interface CommunityBenchProps {
  levelId: number;
  accent: string;
}

export const CommunityBench: React.FC<CommunityBenchProps> = ({ levelId, accent }) => {
  const questions = COMMUNITY_QUESTIONS[levelId] || COMMUNITY_QUESTIONS[1];
  const [upvotes, setUpvotes] = useState<Record<string, number>>({});
  const [showAskModal, setShowAskModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [postedSuccess, setPostedSuccess] = useState(false);

  const handleUpvote = (id: string, defaultVotes: number) => {
    setUpvotes((prev) => ({
      ...prev,
      [id]: (prev[id] ?? defaultVotes) + 1,
    }));
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      setPostedSuccess(true);
      setTimeout(() => {
        setPostedSuccess(false);
        setShowAskModal(false);
        setNewQuestion('');
      }, 1500);
    }
  };

  return (
    <div className="w-[85vw] max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl border-2 border-[#DCE6F0] p-4 shadow-lg pointer-events-auto">
      {/* Bench Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm"
            style={{ backgroundColor: accent }}
          >
            #
          </div>
          <div>
            <div className="font-display font-bold text-xs sm:text-sm text-[#0F172A] leading-tight">
              Community Bench • Level {String(levelId).padStart(2, '0')} Discussion
            </div>
            <div className="text-[10px] text-slate-500">
              Live peer troubleshooting & advice thread
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowAskModal(true)}
          className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
        >
          <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
          <span>Ask the Bench</span>
        </button>
      </div>

      {/* Questions Stack */}
      <div className="space-y-2">
        {questions.map((q) => {
          const currentVotes = upvotes[q.id] ?? q.votes;
          return (
            <div
              key={q.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 hover:bg-slate-50 border border-slate-200 transition-colors gap-3"
            >
              {/* Upvote button */}
              <button
                onClick={() => handleUpvote(q.id, q.votes)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-emerald-500 hover:text-emerald-700 transition-colors shrink-0 shadow-2xs"
              >
                <ArrowBigUp className="w-4 h-4 text-emerald-600" />
                <span>{currentVotes}</span>
              </button>

              {/* Title & metadata */}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-800 truncate">{q.title}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  by <span className="font-semibold text-slate-600">{q.author}</span> • {q.replies} responses
                </div>
              </div>

              {/* Message icon */}
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 shrink-0">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{q.replies}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ask Modal */}
      {showAskModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border-2 border-slate-200 max-w-md w-full p-5 shadow-2xl">
            <h3 className="font-display font-bold text-base text-[#0F172A] mb-1">
              Ask the Level {String(levelId).padStart(2, '0')} Bench
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Get unblocked by engineers and alumni actively working on this stage.
            </p>
            {postedSuccess ? (
              <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-bold text-center border border-emerald-300">
                Question published to the bench!
              </div>
            ) : (
              <form onSubmit={handlePost} className="space-y-3">
                <textarea
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="What is your question or challenge on this level?"
                  rows={3}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#00C2FF]"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAskModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: accent }}
                  >
                    Post Question
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
