'use client';

import { useState, useEffect } from 'react';
import { Save, Upload, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { PortfolioData } from '@/types/portfolio';

export default function PortfolioEditor() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    personalInfo: true,
    experience: false,
    education: false,
    skills: false,
    projects: false,
    socialLinks: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/portfolio');
      if (response.ok) {
        const data = await response.json();
        setPortfolioData(data);
      } else {
        // Fallback
        const { portfolioData: defaultData } = await import('@/data/portfolio');
        setPortfolioData(defaultData);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      const { portfolioData: defaultData } = await import('@/data/portfolio');
      setPortfolioData(defaultData);
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateField = (section: string, field: string, value: any, index?: number) => {
    if (!portfolioData) return;

    const updated = { ...portfolioData };

    if (section === 'personalInfo') {
      (updated.personalInfo as any)[field] = value;
    } else if (index !== undefined) {
      if (Array.isArray((updated as any)[section])) {
        const arr = [...(updated as any)[section]];
        if (field.includes('.')) {
          const parts = field.split('.');
          if (parts.length === 2) {
            const [parent, child] = parts;
            arr[index] = { ...arr[index], [parent]: { ...(arr[index][parent] || {}), [child]: value } };
          } else if (parts.length === 3) {
            // Handle nested fields like companyInfo.logo
            const [parent, child, grandchild] = parts;
            arr[index] = {
              ...arr[index],
              [parent]: {
                ...(arr[index][parent] || {}),
                [child]: {
                  ...(arr[index][parent]?.[child] || {}),
                  [grandchild]: value,
                },
              },
            };
          }
        } else {
          arr[index] = { ...arr[index], [field]: value };
        }
        (updated as any)[section] = arr;
      }
    }

    setPortfolioData(updated);
  };

  const addItem = (section: string) => {
    if (!portfolioData) return;

    const updated = { ...portfolioData };
    const emptyItems: Record<string, any> = {
      experience: {
        company: '',
        role: '',
        duration: '',
        startDate: '',
        description: [''],
        location: '',
        current: false,
        companyInfo: { industry: '', founded: '', website: '', description: '', logo: '' },
      },
      education: {
        institution: '',
        degree: '',
        field: '',
        duration: '',
        startDate: '',
        endDate: '',
        location: '',
      },
      skills: { name: '', category: 'technical', proficiency: 'intermediate' },
      projects: { name: '', description: '', technologies: [] },
      socialLinks: { platform: '', url: '' },
    };

    if (Array.isArray((updated as any)[section])) {
      (updated as any)[section] = [emptyItems[section], ...(updated as any)[section]];
    }

    setPortfolioData(updated);
  };

  const removeItem = (section: string, index: number) => {
    if (!portfolioData || !confirm('Are you sure you want to delete this item?')) return;

    const updated = { ...portfolioData };
    if (Array.isArray((updated as any)[section])) {
      (updated as any)[section] = (updated as any)[section].filter((_: any, i: number) => i !== index);
    }
    setPortfolioData(updated);
  };

  const handleImageUpload = async (file: File, folder: string, callback: (url: string) => void) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        callback(data.url);
      } else {
        setMessage({ type: 'error', text: 'Failed to upload image' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload image' });
    }
  };

  const handleSave = async () => {
    if (!portfolioData) return;

    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(portfolioData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Portfolio updated successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to save changes' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save changes' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !portfolioData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-cyan-400">Loading portfolio data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold gradient-text-tech mb-2">Portfolio Editor</h1>
          <p className="text-gray-400">Edit all your portfolio content in one place</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:shadow-glow transition-all disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg border ${
            message.type === 'success'
              ? 'bg-green-500/20 border-green-500/30 text-green-400'
              : 'bg-red-500/20 border-red-500/30 text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Personal Info Section */}
      <div className="glass-card-dark rounded-xl border border-cyan-500/20 overflow-hidden">
        <button
          onClick={() => toggleSection('personalInfo')}
          className="w-full p-6 flex items-center justify-between hover:bg-tech-800/50 transition-all"
        >
          <h2 className="text-2xl font-bold text-gray-200">Personal Information</h2>
          {expandedSections.personalInfo ? (
            <ChevronUp className="w-5 h-5 text-cyan-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-cyan-400" />
          )}
        </button>
        {expandedSections.personalInfo && (
          <div className="p-6 space-y-4 border-t border-cyan-500/20">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                <input
                  type="text"
                  value={portfolioData.personalInfo.name}
                  onChange={(e) => updateField('personalInfo', 'name', e.target.value)}
                  className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                <input
                  type="text"
                  value={portfolioData.personalInfo.title}
                  onChange={(e) => updateField('personalInfo', 'title', e.target.value)}
                  className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Bio *</label>
              <textarea
                value={portfolioData.personalInfo.bio}
                onChange={(e) => updateField('personalInfo', 'bio', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  value={portfolioData.personalInfo.location}
                  onChange={(e) => updateField('personalInfo', 'location', e.target.value)}
                  className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={portfolioData.personalInfo.email || ''}
                  onChange={(e) => updateField('personalInfo', 'email', e.target.value)}
                  className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  value={portfolioData.personalInfo.phone || ''}
                  onChange={(e) => updateField('personalInfo', 'phone', e.target.value)}
                  className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image</label>
              <div className="flex items-center gap-4">
                {portfolioData.personalInfo.profileImage && (
                  <img
                    src={portfolioData.personalInfo.profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-cyan-500/30"
                  />
                )}
                <label className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg hover:bg-tech-800 transition-all">
                    <Upload className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-gray-300">Upload Image</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleImageUpload(file, 'profile', (url) => {
                          updateField('personalInfo', 'profileImage', url);
                        });
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Experience Section */}
      <div className="glass-card-dark rounded-xl border border-cyan-500/20 overflow-hidden">
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-200">Work Experience ({portfolioData.experience.length})</h2>
          <div className="flex gap-2">
            <button
              onClick={() => toggleSection('experience')}
              className="px-4 py-2 bg-tech-800 text-gray-300 rounded hover:bg-tech-700"
            >
              {expandedSections.experience ? 'Collapse' : 'Expand'}
            </button>
            <button
              onClick={() => addItem('experience')}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
        {expandedSections.experience && (
          <div className="p-6 space-y-4 border-t border-cyan-500/20">
            {portfolioData.experience.map((exp, index) => (
              <div key={index} className="p-4 bg-tech-800/30 rounded-lg border border-cyan-500/10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-200">{exp.company || `Experience ${index + 1}`}</h3>
                  <button
                    onClick={() => removeItem('experience', index)}
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company *</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateField('experience', 'company', e.target.value, index)}
                      className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Role *</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateField('experience', 'role', e.target.value, index)}
                      className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={exp.description.join('\n')}
                    onChange={(e) => {
                      const updated = { ...portfolioData };
                      updated.experience[index].description = e.target.value.split('\n').filter(Boolean);
                      setPortfolioData(updated);
                    }}
                    rows={3}
                    className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    placeholder="Enter each point on a new line"
                  />
                </div>
                <div className="mt-4 border-t border-cyan-500/20 pt-4">
                  <h4 className="text-lg font-semibold text-gray-200 mb-3">Company Information</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Industry</label>
                      <input
                        type="text"
                        value={exp.companyInfo?.industry || ''}
                        onChange={(e) => updateField('experience', 'companyInfo.industry', e.target.value, index)}
                        className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                      <input
                        type="url"
                        value={exp.companyInfo?.website || ''}
                        onChange={(e) => updateField('experience', 'companyInfo.website', e.target.value, index)}
                        className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company Description</label>
                    <textarea
                      value={exp.companyInfo?.description || ''}
                      onChange={(e) => updateField('experience', 'companyInfo.description', e.target.value, index)}
                      rows={2}
                      className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company Logo</label>
                    <div className="flex items-center gap-4">
                      {exp.companyInfo?.logo && (
                        <img
                          src={exp.companyInfo.logo}
                          alt="Company Logo"
                          className="w-20 h-20 rounded object-cover border-2 border-cyan-500/30"
                        />
                      )}
                      <label className="cursor-pointer">
                        <div className="flex items-center gap-2 px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg hover:bg-tech-800 transition-all">
                          <Upload className="w-4 h-4 text-cyan-400" />
                          <span className="text-sm text-gray-300">
                            {exp.companyInfo?.logo ? 'Change Logo' : 'Upload Logo'}
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(file, 'logos', (url) => {
                                const updated = { ...portfolioData };
                                if (!updated.experience[index].companyInfo) {
                                  updated.experience[index].companyInfo = {};
                                }
                                updated.experience[index].companyInfo!.logo = url;
                                setPortfolioData(updated);
                              });
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Education Section */}
      <div className="glass-card-dark rounded-xl border border-cyan-500/20 overflow-hidden">
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-200">Education ({portfolioData.education.length})</h2>
          <div className="flex gap-2">
            <button
              onClick={() => toggleSection('education')}
              className="px-4 py-2 bg-tech-800 text-gray-300 rounded hover:bg-tech-700"
            >
              {expandedSections.education ? 'Collapse' : 'Expand'}
            </button>
            <button
              onClick={() => addItem('education')}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
        {expandedSections.education && (
          <div className="p-6 space-y-4 border-t border-cyan-500/20">
            {portfolioData.education.map((edu, index) => (
              <div key={index} className="p-4 bg-tech-800/30 rounded-lg border border-cyan-500/10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-200">{edu.institution || `Education ${index + 1}`}</h3>
                  <button
                    onClick={() => removeItem('education', index)}
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Institution *</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateField('education', 'institution', e.target.value, index)}
                      className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Degree *</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateField('education', 'degree', e.target.value, index)}
                      className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div className="glass-card-dark rounded-xl border border-cyan-500/20 overflow-hidden">
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-200">Skills ({portfolioData.skills.length})</h2>
          <div className="flex gap-2">
            <button
              onClick={() => toggleSection('skills')}
              className="px-4 py-2 bg-tech-800 text-gray-300 rounded hover:bg-tech-700"
            >
              {expandedSections.skills ? 'Collapse' : 'Expand'}
            </button>
            <button
              onClick={() => addItem('skills')}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
        {expandedSections.skills && (
          <div className="p-6 space-y-4 border-t border-cyan-500/20">
            {portfolioData.skills.map((skill, index) => (
              <div key={index} className="p-4 bg-tech-800/30 rounded-lg border border-cyan-500/10 flex items-center justify-between">
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateField('skills', 'name', e.target.value, index)}
                    className="px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    placeholder="Skill name"
                  />
                  <select
                    value={skill.category}
                    onChange={(e) => updateField('skills', 'category', e.target.value, index)}
                    className="px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                  >
                    <option value="technical">Technical</option>
                    <option value="soft">Soft</option>
                    <option value="language">Language</option>
                    <option value="tool">Tool</option>
                  </select>
                  <select
                    value={skill.proficiency || ''}
                    onChange={(e) => updateField('skills', 'proficiency', e.target.value, index)}
                    className="px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                  >
                    <option value="">None</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
                <button
                  onClick={() => removeItem('skills', index)}
                  className="ml-4 px-3 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Projects Section */}
      <div className="glass-card-dark rounded-xl border border-cyan-500/20 overflow-hidden">
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-200">Projects ({portfolioData.projects.length})</h2>
          <div className="flex gap-2">
            <button
              onClick={() => toggleSection('projects')}
              className="px-4 py-2 bg-tech-800 text-gray-300 rounded hover:bg-tech-700"
            >
              {expandedSections.projects ? 'Collapse' : 'Expand'}
            </button>
            <button
              onClick={() => addItem('projects')}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
        {expandedSections.projects && (
          <div className="p-6 space-y-4 border-t border-cyan-500/20">
            {portfolioData.projects.map((project, index) => (
              <div key={index} className="p-4 bg-tech-800/30 rounded-lg border border-cyan-500/10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-200">{project.name || `Project ${index + 1}`}</h3>
                  <button
                    onClick={() => removeItem('projects', index)}
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Project Name *</label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => updateField('projects', 'name', e.target.value, index)}
                      className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Related Company/Organization</label>
                    <select
                      value={(project as any).relatedCompany || ''}
                      onChange={(e) => {
                        const updated = { ...portfolioData };
                        (updated.projects[index] as any).relatedCompany = e.target.value;
                        setPortfolioData(updated);
                      }}
                      className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    >
                      <option value="">Select a company (optional)</option>
                      {portfolioData.experience.map((exp, expIndex) => (
                        <option key={expIndex} value={exp.company}>
                          {exp.company} - {exp.role}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-400 mt-1">Link this project to a company from your work experience</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => updateField('projects', 'description', e.target.value, index)}
                      rows={3}
                      className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Technologies (comma-separated)</label>
                    <input
                      type="text"
                      value={project.technologies.join(', ')}
                      onChange={(e) => {
                        const updated = { ...portfolioData };
                        updated.projects[index].technologies = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                        setPortfolioData(updated);
                      }}
                      className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                      placeholder="Kotlin, RoomDB, State Machines"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Project Image</label>
                    <div className="flex items-center gap-4">
                      {project.image && (
                        <img
                          src={project.image}
                          alt="Project"
                          className="w-32 h-32 rounded object-cover border-2 border-cyan-500/30"
                        />
                      )}
                      <label className="cursor-pointer">
                        <div className="flex items-center gap-2 px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg hover:bg-tech-800 transition-all">
                          <Upload className="w-4 h-4 text-cyan-400" />
                          <span className="text-sm text-gray-300">
                            {project.image ? 'Change Image' : 'Upload Image'}
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(file, 'projects', (url) => {
                                updateField('projects', 'image', url, index);
                              });
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="border-t border-cyan-500/20 pt-4">
                    <h4 className="text-lg font-semibold text-gray-200 mb-3">Project Links</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                        <input
                          type="url"
                          value={project.links?.github || ''}
                          onChange={(e) => {
                            const updated = { ...portfolioData };
                            if (!updated.projects[index].links) {
                              updated.projects[index].links = {};
                            }
                            updated.projects[index].links!.github = e.target.value;
                            setPortfolioData(updated);
                          }}
                          className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                          placeholder="https://github.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Live URL</label>
                        <input
                          type="url"
                          value={project.links?.live || ''}
                          onChange={(e) => {
                            const updated = { ...portfolioData };
                            if (!updated.projects[index].links) {
                              updated.projects[index].links = {};
                            }
                            updated.projects[index].links!.live = e.target.value;
                            setPortfolioData(updated);
                          }}
                          className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Demo URL</label>
                        <input
                          type="url"
                          value={project.links?.demo || ''}
                          onChange={(e) => {
                            const updated = { ...portfolioData };
                            if (!updated.projects[index].links) {
                              updated.projects[index].links = {};
                            }
                            updated.projects[index].links!.demo = e.target.value;
                            setPortfolioData(updated);
                          }}
                          className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Social Links Section */}
      <div className="glass-card-dark rounded-xl border border-cyan-500/20 overflow-hidden">
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-200">Social Links ({portfolioData.socialLinks.length})</h2>
          <div className="flex gap-2">
            <button
              onClick={() => toggleSection('socialLinks')}
              className="px-4 py-2 bg-tech-800 text-gray-300 rounded hover:bg-tech-700"
            >
              {expandedSections.socialLinks ? 'Collapse' : 'Expand'}
            </button>
            <button
              onClick={() => addItem('socialLinks')}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
        {expandedSections.socialLinks && (
          <div className="p-6 space-y-4 border-t border-cyan-500/20">
            {portfolioData.socialLinks.map((link, index) => (
              <div key={index} className="p-4 bg-tech-800/30 rounded-lg border border-cyan-500/10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-200">{link.platform || `Link ${index + 1}`}</h3>
                  <button
                    onClick={() => removeItem('socialLinks', index)}
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Platform *</label>
                    <input
                      type="text"
                      value={link.platform}
                      onChange={(e) => updateField('socialLinks', 'platform', e.target.value, index)}
                      className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">URL *</label>
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateField('socialLinks', 'url', e.target.value, index)}
                      className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button at Bottom */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:shadow-glow transition-all disabled:opacity-50 text-lg"
        >
          <Save className="w-6 h-6" />
          {saving ? 'Saving All Changes...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}

