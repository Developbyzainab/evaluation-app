"use client";

export default function QuestionCard({ question, answer, onAnswer, showResult = false }) {
  if (!question) return null;

  const isUrdu = question.language === "Urdu";

  return (
    <div className="rounded-[30px] border border-white/[0.07] bg-white/[0.025] p-6 shadow-2xl sm:p-9">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-violet-500/10 px-3 py-1.5 text-[10px] uppercase tracking-widest text-violet-300">
          {question.skill}
        </span>
        {question.difficulty && (
          <span className="text-[10px] uppercase tracking-widest text-zinc-700">
            {question.difficulty}
          </span>
        )}
      </div>

      <h2 className="mt-7 text-xl font-bold leading-8 sm:text-2xl">
        {question.question}
      </h2>

      <div className="mt-7 space-y-3">
        {question.options?.map((option, index) => {
          const selected = answer === index;
          const correct = showResult && index === question.correct;
          const wrong = showResult && selected && index !== question.correct;

          return (
            <button
              key={index}
              type="button"
              disabled={showResult}
              onClick={() => onAnswer(index)}
              className={`
                flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all
                ${
                  correct
                    ? "border-emerald-400/30 bg-emerald-500/10"
                    : wrong
                    ? "border-red-400/30 bg-red-500/10"
                    : selected
                    ? "border-violet-400/30 bg-violet-500/10"
                    : "border-white/[0.06] bg-black/10 hover:-translate-y-0.5 hover:border-violet-400/20"
                }
              `}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-xs font-bold text-zinc-500">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-sm leading-6 text-zinc-300">
                {option}
              </span>
              <span className="ml-auto">
                {correct && "✓"}
                {wrong && "✕"}
              </span>
            </button>
          );
        })}
      </div>

      {showResult && question.explanation && (
        <div className="mt-6 rounded-2xl border border-white/[0.06] bg-black/20 p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-violet-400">
            Explanation
          </p>
          <p className="mt-3 text-sm leading-7 text-zinc-500">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}