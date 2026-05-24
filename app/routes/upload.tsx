import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import Navbar from "../components/Navbar";
import FileUploader from '~/components/FileUploader';

// Componenta trebuie să înceapă cu literă mare
const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState(''); // valoare inițială string gol

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // oprește refresh-ul paginii la submit
  }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover"> {/* ghilimele închise corect */}
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart feedback for your dream job</h1>

          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="/images/resume-scan.gif" className="w-full" />
            </>
          ) : (
            <h2>Drop your resume for ATS improvement tips</h2>
          )}

          {/* ! fără ? — condiția era greșită */}
          {!isProcessing && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">

              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="Company Name"
                  id="company-name" // ghilimele consistente
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="Job Title"
                  id="job-title"
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea rows={5}
                  name="job-description"
                  placeholder="Job Description"
                  id="job-description"
                />
              </div>

              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader></FileUploader>
              </div>

              <button className="primary-button" type="submit">Analyze Resume</button>

            </form>
          )}

        </div>
      </section>
    </main>
  )
}

export default Upload