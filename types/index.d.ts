/**
 * ? după un câmp (ex: companyName?) înseamnă că e opțional — poate să lipsească fără eroare
[] după un tip (ex: tips[]) înseamnă listă — pot fi 0, 1 sau mai multe sfaturi
"good" | "improve" înseamnă că tipul poate fi doar una din cele două valori — nimic altceva
Feedback e separată de Resume pentru că e complexă și e refolosită și în AIResponseFormat din constants.ts
 */

// ============================================================
// TYPES / INTERFEȚE
// Acest fișier definește "șabloanele" pentru datele din aplicație.
// TypeScript folosește aceste interfețe ca să verifice că datele
// au structura corectă oriunde sunt folosite în aplicație.
// ============================================================


// ------------------------------------------------------------
// Job
// Descrie un job la care utilizatorul vrea să aplice.
// Momentan nu e folosit direct, dar e util dacă vrei să
// adaugi funcționalitate de salvare a joburilor în viitor.
// ------------------------------------------------------------
interface Job {
  title: string;           // Titlul jobului (ex: "Frontend Developer")
  description: string;     // Descrierea jobului copiată de pe site
  location: string;        // Locația (ex: "București", "Remote")
  requiredSkills: string[]; // Lista de skill-uri cerute (ex: ["React", "TypeScript"])
}


// ------------------------------------------------------------
// Resume
// Descrie un CV din aplicație — atât datele lui, cât și
// feedback-ul primit de la AI după analiză.
// ------------------------------------------------------------
interface Resume {
  id: string;           // ID unic pentru fiecare CV (ex: "1", "2")
  companyName?: string; // Compania la care aplici — opțional (? = poate lipsi)
  jobTitle?: string;    // Jobul pentru care aplici — opțional
  imagePath: string;    // Calea către poza de previzualizare a CV-ului
  resumePath: string;   // Calea către fișierul PDF al CV-ului
  feedback: Feedback;   // Feedback-ul complet de la AI (vezi interfața de mai jos)
}


// ------------------------------------------------------------
// Feedback
// Descrie răspunsul pe care AI-ul îl returnează după ce
// analizează un CV. Are un scor general și 5 categorii,
// fiecare cu scorul ei și o listă de sfaturi.
// ------------------------------------------------------------
interface Feedback {
  overallScore: number; // Scorul general al CV-ului (0-100)

  // Cât de bine trece CV-ul prin filtrele automate ATS
  // (sisteme folosite de companii mari să filtreze CV-urile)
  ATS: {
    score: number; // Scorul ATS (0-100)
    tips: {
      type: "good" | "improve"; // "good" = ce e bine / "improve" = ce trebuie schimbat
      tip: string;              // Sfatul scurt (ex: "Folosești cuvinte cheie relevante")
    }[];           // [] = listă de sfaturi
  };

  // Tonul și stilul de scriere al CV-ului
  // (ex: prea informal, prea lung, prea tehnic etc.)
  toneAndStyle: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;         // Titlu scurt al sfatului
      explanation: string; // Explicație detaliată a sfatului
    }[];
  };

  // Conținutul CV-ului
  // (ex: experiența descrisă bine, realizări concrete etc.)
  content: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };

  // Structura și formatul CV-ului
  // (ex: secțiuni clare, ordine logică, ușor de citit etc.)
  structure: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };

  // Skill-urile menționate în CV
  // (ex: relevante pentru job, bine prezentate etc.)
  skills: {
    score: number;
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
}