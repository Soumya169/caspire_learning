import React, { useState } from 'react';
import { X, Download, User, Briefcase, GraduationCap, Code, Award } from 'lucide-react';

const ResumeBuilder = ({ onClose }) => {
  const [data, setData] = useState({
    name: '', email: '', phone: '', linkedin: '', github: '', summary: '',
    degree: '', college: '', year: '', cgpa: '',
    jobTitle: '', company: '', duration: '', jobDesc: '',
    project1: '', tech1: '', desc1: '',
    project2: '', tech2: '', desc2: '',
    skills: '',
    certifications: ''
  });

  const downloadResume = () => {
    const resumeHTML = document.getElementById('resume-preview');
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>Resume - ' + data.name + '</title>');
    printWindow.document.write('<style>body{font-family:Arial,sans-serif;padding:40px;color:#333;} h1{font-size:32px;margin-bottom:5px;color:#000;} h2{font-size:18px;color:#0891b2;border-bottom:3px solid #0891b2;margin-top:20px;margin-bottom:10px;padding-bottom:5px;} .contact{font-size:14px;color:#666;margin-bottom:20px;} .section{margin-bottom:15px;} .section-title{font-weight:bold;font-size:15px;} .section-subtitle{color:#666;font-size:14px;} .section-text{font-size:14px;margin-top:5px;line-height:1.6;} .skills{font-size:14px;line-height:1.8;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(resumeHTML.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl w-full max-w-6xl my-8">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <User className="text-cyan-400" />
            ATS-Friendly Resume Builder
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 p-6">
          {/* LEFT SIDE - FORM */}
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
            
            {/* Personal Info */}
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                <User size={18} /> Personal Details
              </h3>
              <input 
                type="text" 
                placeholder="Full Name *" 
                value={data.name} 
                onChange={(e) => setData({...data, name: e.target.value})} 
                className="w-full px-3 py-2 mb-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
              />
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={data.email} 
                  onChange={(e) => setData({...data, email: e.target.value})} 
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
                />
                <input 
                  type="tel" 
                  placeholder="Phone" 
                  value={data.phone} 
                  onChange={(e) => setData({...data, phone: e.target.value})} 
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <input 
                  type="text" 
                  placeholder="LinkedIn" 
                  value={data.linkedin} 
                  onChange={(e) => setData({...data, linkedin: e.target.value})} 
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
                />
                <input 
                  type="text" 
                  placeholder="GitHub" 
                  value={data.github} 
                  onChange={(e) => setData({...data, github: e.target.value})} 
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
                />
              </div>
              <textarea 
                placeholder="Professional Summary (2-3 lines about yourself)" 
                value={data.summary} 
                onChange={(e) => setData({...data, summary: e.target.value})} 
                rows="3" 
                className="w-full px-3 py-2 mt-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
              />
            </div>

            {/* Education */}
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                <GraduationCap size={18} /> Education
              </h3>
              <input 
                type="text" 
                placeholder="Degree (e.g., B.Tech in Computer Science)" 
                value={data.degree} 
                onChange={(e) => setData({...data, degree: e.target.value})} 
                className="w-full px-3 py-2 mb-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
              />
              <input 
                type="text" 
                placeholder="College/University Name" 
                value={data.college} 
                onChange={(e) => setData({...data, college: e.target.value})} 
                className="w-full px-3 py-2 mb-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
              />
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" 
                  placeholder="Year (2020-2024)" 
                  value={data.year} 
                  onChange={(e) => setData({...data, year: e.target.value})} 
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
                />
                <input 
                  type="text" 
                  placeholder="CGPA/%" 
                  value={data.cgpa} 
                  onChange={(e) => setData({...data, cgpa: e.target.value})} 
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
                />
              </div>
            </div>

            {/* Experience */}
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                <Briefcase size={18} /> Experience / Internship
              </h3>
              <input 
                type="text" 
                placeholder="Job Title (e.g., Frontend Developer Intern)" 
                value={data.jobTitle} 
                onChange={(e) => setData({...data, jobTitle: e.target.value})} 
                className="w-full px-3 py-2 mb-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
              />
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input 
                  type="text" 
                  placeholder="Company Name" 
                  value={data.company} 
                  onChange={(e) => setData({...data, company: e.target.value})} 
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
                />
                <input 
                  type="text" 
                  placeholder="Duration (Jan 2023 - Present)" 
                  value={data.duration} 
                  onChange={(e) => setData({...data, duration: e.target.value})} 
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
                />
              </div>
              <textarea 
                placeholder="Description (What you did, achievements, responsibilities)" 
                value={data.jobDesc} 
                onChange={(e) => setData({...data, jobDesc: e.target.value})} 
                rows="3" 
                className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
              />
            </div>

            {/* Projects */}
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                <Code size={18} /> Projects
              </h3>
              
              {/* Project 1 */}
              <div className="mb-4 pb-4 border-b border-slate-700">
                <p className="text-white text-xs mb-2">Project 1</p>
                <input 
                  type="text" 
                  placeholder="Project Name" 
                  value={data.project1} 
                  onChange={(e) => setData({...data, project1: e.target.value})} 
                  className="w-full px-3 py-2 mb-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
                />
                <input 
                  type="text" 
                  placeholder="Technologies Used (React, Node.js, MongoDB)" 
                  value={data.tech1} 
                  onChange={(e) => setData({...data, tech1: e.target.value})} 
                  className="w-full px-3 py-2 mb-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
                />
                <textarea 
                  placeholder="Project Description" 
                  value={data.desc1} 
                  onChange={(e) => setData({...data, desc1: e.target.value})} 
                  rows="2" 
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
                />
              </div>

              {/* Project 2 */}
              <div>
                <p className="text-white text-xs mb-2">Project 2 (Optional)</p>
                <input 
                  type="text" 
                  placeholder="Project Name" 
                  value={data.project2} 
                  onChange={(e) => setData({...data, project2: e.target.value})} 
                  className="w-full px-3 py-2 mb-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
                />
                <input 
                  type="text" 
                  placeholder="Technologies Used" 
                  value={data.tech2} 
                  onChange={(e) => setData({...data, tech2: e.target.value})} 
                  className="w-full px-3 py-2 mb-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
                />
                <textarea 
                  placeholder="Project Description" 
                  value={data.desc2} 
                  onChange={(e) => setData({...data, desc2: e.target.value})} 
                  rows="2" 
                  className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
                />
              </div>
            </div>

            {/* Skills */}
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                <Award size={18} /> Technical Skills
              </h3>
              <textarea 
                placeholder="Languages: Python, JavaScript, Java&#10;Frameworks: React, Node.js, Express&#10;Tools: Git, Docker, VS Code&#10;Databases: MongoDB, MySQL" 
                value={data.skills} 
                onChange={(e) => setData({...data, skills: e.target.value})} 
                rows="4" 
                className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
              />
            </div>

            {/* Certifications */}
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-cyan-400 font-semibold mb-3">Certifications (Optional)</h3>
              <textarea 
                placeholder="AWS Certified Developer&#10;Google Cloud Associate&#10;Microsoft Azure Fundamentals" 
                value={data.certifications} 
                onChange={(e) => setData({...data, certifications: e.target.value})} 
                rows="3" 
                className="w-full px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:border-cyan-500 focus:outline-none text-sm" 
              />
            </div>

          </div>

          {/* RIGHT SIDE - PREVIEW */}
          <div className="bg-white rounded-lg p-8 max-h-[70vh] overflow-y-auto">
            <div id="resume-preview">
              {/* Header */}
              <div className="border-b-4 border-cyan-500 pb-4 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{data.name || 'YOUR NAME'}</h1>
                <div className="text-sm text-gray-600 mt-2">
                  {data.email && <span>{data.email}</span>}
                  {data.email && data.phone && <span> | </span>}
                  {data.phone && <span>{data.phone}</span>}
                  {(data.linkedin || data.github) && <span> | </span>}
                  {data.linkedin && <span>LinkedIn</span>}
                  {data.linkedin && data.github && <span> | </span>}
                  {data.github && <span>GitHub</span>}
                </div>
              </div>

              {/* Summary */}
              {data.summary && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-cyan-600 mb-2">PROFESSIONAL SUMMARY</h2>
                  <p className="text-sm text-gray-700">{data.summary}</p>
                </div>
              )}

              {/* Education */}
              {data.degree && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-cyan-600 mb-2">EDUCATION</h2>
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold text-sm">{data.degree}</p>
                      <p className="text-sm text-gray-600">{data.college}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{data.year}</p>
                      {data.cgpa && <p className="text-sm font-semibold">{data.cgpa}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Experience */}
              {data.jobTitle && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-cyan-600 mb-2">EXPERIENCE</h2>
                  <div className="flex justify-between">
                    <p className="font-semibold text-sm">{data.jobTitle}</p>
                    <p className="text-sm text-gray-600">{data.duration}</p>
                  </div>
                  <p className="text-sm text-gray-600">{data.company}</p>
                  <p className="text-xs text-gray-700 mt-1 whitespace-pre-line">{data.jobDesc}</p>
                </div>
              )}

              {/* Projects */}
              {data.project1 && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-cyan-600 mb-2">PROJECTS</h2>
                  
                  {/* Project 1 */}
                  <div className="mb-3">
                    <p className="font-semibold text-sm">{data.project1}</p>
                    {data.tech1 && <p className="text-xs text-cyan-600">{data.tech1}</p>}
                    <p className="text-xs text-gray-700 mt-1">{data.desc1}</p>
                  </div>

                  {/* Project 2 */}
                  {data.project2 && (
                    <div className="mb-3">
                      <p className="font-semibold text-sm">{data.project2}</p>
                      {data.tech2 && <p className="text-xs text-cyan-600">{data.tech2}</p>}
                      <p className="text-xs text-gray-700 mt-1">{data.desc2}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Skills */}
              {data.skills && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-cyan-600 mb-2">TECHNICAL SKILLS</h2>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{data.skills}</p>
                </div>
              )}

              {/* Certifications */}
              {data.certifications && (
                <div>
                  <h2 className="text-lg font-bold text-cyan-600 mb-2">CERTIFICATIONS</h2>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{data.certifications}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-gray-700 flex justify-end gap-4">
          <button 
            onClick={onClose} 
            className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={downloadResume} 
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Download size={18} />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;