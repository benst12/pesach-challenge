import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Track } from "@/lib/data";
import { TRACKS } from "@/lib/data";

interface Student {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  school: string;
  grade: string;
  trackId?: string;
}

interface StudentContextType {
  student: Student | null;
  setStudent: (s: Student | null) => void;
  selectedTrack: Track | null;
  setSelectedTrack: (t: Track | null) => void;
  studyCompleted: boolean;
  setStudyCompleted: (v: boolean) => void;
}

const StudentContext = createContext<StudentContextType | null>(null);

export function StudentProvider({ children }: { children: ReactNode }) {
  const [student, setStudentState] = useState<Student | null>(() => {
    try {
      const saved = localStorage.getItem("pesach_student");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [selectedTrack, setSelectedTrackState] = useState<Track | null>(() => {
    try {
      const saved = localStorage.getItem("pesach_track");
      if (saved) {
        const trackId = JSON.parse(saved);
        return TRACKS.find(t => t.id === trackId) || null;
      }
      return null;
    } catch { return null; }
  });

  const [studyCompleted, setStudyCompletedState] = useState<boolean>(() => {
    try {
      return localStorage.getItem("pesach_study_completed") === "true";
    } catch { return false; }
  });

  const setStudent = (s: Student | null) => {
    setStudentState(s);
    if (s) localStorage.setItem("pesach_student", JSON.stringify(s));
    else localStorage.removeItem("pesach_student");
  };

  const setSelectedTrack = (t: Track | null) => {
    setSelectedTrackState(t);
    if (t) localStorage.setItem("pesach_track", JSON.stringify(t.id));
    else localStorage.removeItem("pesach_track");
  };

  const setStudyCompleted = (v: boolean) => {
    setStudyCompletedState(v);
    localStorage.setItem("pesach_study_completed", v.toString());
  };

  return (
    <StudentContext.Provider value={{ student, setStudent, selectedTrack, setSelectedTrack, studyCompleted, setStudyCompleted }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("useStudent must be used within StudentProvider");
  return ctx;
}
