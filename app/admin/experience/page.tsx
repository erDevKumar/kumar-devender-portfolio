'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Upload, X } from 'lucide-react';
import { WorkExperience } from '@/types/portfolio';

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/portfolio');
      if (response.ok) {
        const data = await response.json();
        setExperiences(data.experience || []);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setExperiences([
      {
        company: '',
        role: '',
        duration: '',
        startDate: '',
        description: [''],
        location: '',
        current: false,
        companyInfo: {
          industry: '',
          founded: '',
          website: '',
          description: '',
          logo: '',
        },
      },
      ...experiences,
    ]);
    setEditingIndex(0);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      setExperiences(experiences.filter((_, i) => i !== index));
    }
  };

  const handleChange = (index: number, field: string, value: any) => {
    const updated = [...experiences];
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      updated[index] = {
        ...updated[index],
        [parent]: {
          ...(updated[index] as any)[parent],
          [child]: value,
        },
      };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setExperiences(updated);
  };

  const handleDescriptionChange = (index: number, descIndex: number, value: string) => {
    const updated = [...experiences];
    const descriptions = [...(updated[index].description || [])];
    descriptions[descIndex] = value;
    updated[index].description = descriptions;
    setExperiences(updated);
  };

  const handleAddDescription = (index: number) => {
    const updated = [...experiences];
    updated[index].description = [...(updated[index].description || []), ''];
    setExperiences(updated);
  };

  const handleRemoveDescription = (index: number, descIndex: number) => {
    const updated = [...experiences];
    updated[index].description = updated[index].description.filter((_, i) => i !== descIndex);
    setExperiences(updated);
  };

  const handleLogoUpload = async (index: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'logos');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        handleChange(index, 'companyInfo.logo', data.url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/portfolio');
      const currentData = await response.json();

      const updatedData = {
        ...currentData,
        experience: experiences,
      };

      const saveResponse = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (saveResponse.ok) {
        setMessage({ type: 'success', text: 'Experience updated successfully!' });
        setShowForm(false);
        setEditingIndex(null);
      } else {
        setMessage({ type: 'error', text: 'Failed to save changes' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save changes' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-cyan-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold gradient-text-tech mb-2">Work Experience</h1>
          <p className="text-gray-200">Manage your work experience entries</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-glow transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Experience
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

      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div key={index} className="glass-card-dark rounded-xl p-6 border border-cyan-500/20">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-200">
                {exp.company || `Experience ${index + 1}`}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                  className="px-3 py-1 text-sm bg-tech-800 text-gray-300 rounded hover:bg-tech-700"
                >
                  {editingIndex === index ? 'Cancel' : 'Edit'}
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-3 py-1 text-sm bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {editingIndex === index ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company *</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleChange(index, 'company', e.target.value)}
                      className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Role *</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => handleChange(index, 'role', e.target.value)}
                      className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Start Date (YYYY-MM) *</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                      className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                      placeholder="2025-02"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">End Date (YYYY-MM)</label>
                    <input
                      type="text"
                      value={exp.endDate || ''}
                      onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                      className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                      placeholder="2025-02"
                      disabled={exp.current}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`current-${index}`}
                    checked={exp.current || false}
                    onChange={(e) => handleChange(index, 'current', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`current-${index}`} className="text-sm text-gray-300">
                    Current Position
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                  <input
                    type="text"
                    value={exp.duration}
                    onChange={(e) => handleChange(index, 'duration', e.target.value)}
                    className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    placeholder="Feb. 2025 - Present"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    value={exp.location || ''}
                    onChange={(e) => handleChange(index, 'location', e.target.value)}
                    className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  {exp.description?.map((desc, descIndex) => (
                    <div key={descIndex} className="flex gap-2 mb-2">
                      <textarea
                        value={desc}
                        onChange={(e) => handleDescriptionChange(index, descIndex, e.target.value)}
                        className="flex-1 px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                        rows={2}
                      />
                      <button
                        onClick={() => handleRemoveDescription(index, descIndex)}
                        className="px-3 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddDescription(index)}
                    className="mt-2 px-4 py-2 text-sm bg-tech-800 text-cyan-400 rounded hover:bg-tech-700"
                  >
                    + Add Description Line
                  </button>
                </div>

                <div className="border-t border-cyan-500/20 pt-4">
                  <h4 className="text-lg font-semibold text-gray-200 mb-3">Company Info</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Industry</label>
                      <input
                        type="text"
                        value={exp.companyInfo?.industry || ''}
                        onChange={(e) => handleChange(index, 'companyInfo.industry', e.target.value)}
                        className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Founded</label>
                      <input
                        type="text"
                        value={exp.companyInfo?.founded || ''}
                        onChange={(e) => handleChange(index, 'companyInfo.founded', e.target.value)}
                        className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                    <input
                      type="url"
                      value={exp.companyInfo?.website || ''}
                      onChange={(e) => handleChange(index, 'companyInfo.website', e.target.value)}
                      className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company Description</label>
                    <textarea
                      value={exp.companyInfo?.description || ''}
                      onChange={(e) => handleChange(index, 'companyInfo.description', e.target.value)}
                      className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                      rows={3}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company Logo</label>
                    <div className="flex items-center gap-4">
                      {exp.companyInfo?.logo && (
                        <img
                          src={exp.companyInfo.logo}
                          alt="Logo"
                          className="w-16 h-16 rounded object-cover border border-cyan-500/30"
                        />
                      )}
                      <label className="cursor-pointer">
                        <div className="flex items-center gap-2 px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg hover:bg-tech-800 transition-all">
                          <Upload className="w-4 h-4 text-cyan-400" />
                          <span className="text-sm text-gray-300">Upload Logo</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleLogoUpload(index, file);
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-300">
                <p className="font-semibold">{exp.role}</p>
                <p className="text-sm text-gray-200">{exp.duration}</p>
                <p className="text-sm text-gray-200 mt-2">{exp.location}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {experiences.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:shadow-glow transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      )}
    </div>
  );
}

