/**
 * resumes[] → date false de test, ca să vezi cum arată aplicația înainte să ai CV-uri reale
AIResponseFormat → îi arată AI-ului exact ce structură JSON să returneze
prepareInstructions → construiește mesajul complet care merge către AI, cu jobul și CV-ul utilizatorului
 */


// ============================================================
// DATE DE TEST (mock data)
// Acestea sunt CV-uri false folosite ca exemplu în aplicație
// până când utilizatorul își încarcă propriul CV
// ============================================================
export const resumes: Resume[] = [
  {
    id: "1",                                    // ID unic pentru fiecare CV
    companyName: "Google",                      // Compania la care aplici
    jobTitle: "Frontend Developer",             // Jobul pentru care aplici
    imagePath: "/images/resume_01.png",          // Poza de previzualizare a CV-ului
    resumePath: "/resumes/resume-1.pdf",        // Fișierul PDF al CV-ului
    feedback: {
      overallScore: 85,                         // Scorul general (0-100)
      ATS: {
        score: 90,                              // Cât de bine trece CV-ul prin filtrele automate
        tips: [],                               // Sfaturi (gol deocamdată, vine de la AI)
      },
      toneAndStyle: {
        score: 90,                              // Scorul pentru ton și stil de scriere
        tips: [],
      },
      content: {
        score: 90,                              // Scorul pentru conținutul CV-ului
        tips: [],
      },
      structure: {
        score: 90,                              // Scorul pentru structura CV-ului
        tips: [],
      },
      skills: {
        score: 90,                              // Scorul pentru skill-urile menționate
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,                         // Scor mai mic = CV slab, AI-ul va da sfaturi de îmbunătățire
      ATS: { score: 90, tips: [] },
      toneAndStyle: { score: 90, tips: [] },
      content: { score: 90, tips: [] },
      structure: { score: 90, tips: [] },
      skills: { score: 90, tips: [] },
    },
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume_03.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: { score: 90, tips: [] },
      toneAndStyle: { score: 90, tips: [] },
      content: { score: 90, tips: [] },
      structure: { score: 90, tips: [] },
      skills: { score: 90, tips: [] },
    },
  },
];

// ============================================================
// FORMATUL RĂSPUNSULUI AI
// Acest string îi spune AI-ului EXACT cum să structureze
// răspunsul JSON pe care îl trimite înapoi la aplicație.
// Practic e "schița" pe care AI-ul trebuie să o urmeze.
// ============================================================
export const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //max 100
      ATS: {
        score: number; //rate based on ATS suitability
        tips: {
          type: "good" | "improve";   // "good" = ce e bine, "improve" = ce trebuie îmbunătățit
          tip: string;                // 3-4 sfaturi scurte
        }[];
      };
      toneAndStyle: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string;          // titlu scurt al sfatului
          explanation: string;  // explicație detaliată
        }[];
      };
      content: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string;
          explanation: string;
        }[];
      };
      structure: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string;
          explanation: string;
        }[];
      };
      skills: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string;
          explanation: string;
        }[];
      };
    }`;

// ============================================================
// INSTRUCȚIUNILE PENTRU AI
// Această funcție construiește mesajul (prompt-ul) pe care
// îl trimitem către AI (ex: Claude/GPT) împreună cu CV-ul.
//
// Primește 3 parametri:
//   → jobTitle       = titlul jobului (ex: "Frontend Developer")
//   → jobDescription = descrierea jobului copiată de pe site
//   → AIResponseFormat = formatul de mai sus, ca AI-ul să știe
//                        cum să structureze răspunsul
//
// Returnează un string lung (prompt-ul complet) care merge
// direct către AI ca instrucțiune.
// ============================================================
export const prepareInstructions = ({
  jobTitle,
  jobDescription,
  AIResponseFormat,
}: {
  jobTitle: string;
  jobDescription: string;
  AIResponseFormat: string;
}) =>
  `You are an expert in ATS (Applicant Tracking System) and resume analysis.
  Please analyze and rate this resume and suggest how to improve it.
  The rating can be low if the resume is bad.
  Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
  If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
  If available, use the job description for the job user is applying to to give more detailed feedback.
  If provided, take the job description into consideration.
  The job title is: ${jobTitle}          
  The job description is: ${jobDescription}
  Provide the feedback using the following format: ${AIResponseFormat}
  Return the analysis as a JSON object, without any other text and without the backticks.
  Do not include any other text or comments.`;
  // ↑ Îi spunem explicit AI-ului să returneze doar JSON curat,
  //   fără text extra sau backticks (```), ca să putem face
  //   JSON.parse() pe răspuns fără erori