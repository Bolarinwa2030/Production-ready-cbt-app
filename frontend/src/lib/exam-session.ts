import { useSyncExternalStore } from "react";

/**
 * Lightweight client-side store for the in-progress exam session.
 * Frontend-only: it holds selected answers and flagged questions so the
 * exam interface, review page and result page stay in sync. Swap the
 * setters for REST calls when the backend lands.
 */

type SessionState = {
  answers: Record<string, string>;
  flagged: Record<string, boolean>;
};

let state: SessionState = { answers: {}, flagged: {} };
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export const examSession = {
  getState: () => state,
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  answer(questionId: string, optionId: string) {
    state = { ...state, answers: { ...state.answers, [questionId]: optionId } };
    emit();
  },
  toggleFlag(questionId: string) {
    const flagged = { ...state.flagged, [questionId]: !state.flagged[questionId] };
    state = { ...state, flagged };
    emit();
  },
  reset() {
    state = { answers: {}, flagged: {} };
    emit();
  },
};

export function useExamSession() {
  return useSyncExternalStore(
    examSession.subscribe,
    examSession.getState,
    examSession.getState,
  );
}
