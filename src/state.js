// ============================================================
// state.js — État global de l'application
// ============================================================

export const state = {
  finishQuestion: 0,
  goodAnswers: 0,
  currentData: [],
  totalQuestions: 0,
  isInQuiz: false,
};

export function resetState() {
  state.finishQuestion = 0;
  state.goodAnswers = 0;
  state.currentData = [];
  state.totalQuestions = 0;
  state.isInQuiz = false;
}
