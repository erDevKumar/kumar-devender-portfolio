'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Upload, X } from 'lucide-react';
import { Project } from '@/types/portfolio';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/portfolio');
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setProjects([
      {
        name: '',
        description: '',
        technologies: [],
      },
      ...projects,
    ]);
    setEditingIndex(0);
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((_, i) => i !== index));
    }
  };

  const handleChange = (index: number, field: string, value: any) => {
    const updated = [...projects];
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
    setProjects(updated);
  };

  const handleTechnologyChange = (index: number, techIndex: number, value: string) => {
    const updated = [...projects];
    const technologies = [...(updated[index].technologies || [])];
    technologies[techIndex] = value;
    updated[index].technologies = technologies;
    setProjects(updated);
  };

  const handleAddTechnology = (index: number) => {
    const updated = [...projects];
    updated[index].technologies = [...(updated[index].technologies || []), ''];
    setProjects(updated);
  };

  const handleRemoveTechnology = (index: number, techIndex: number) => {
    const updated = [...projects];
    updated[index].technologies = updated[index].technologies.filter((_, i) => i !== techIndex);
    setProjects(updated);
  };

  const handleImageUpload = async (index: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'projects');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        handleChange(index, 'image', data.url);
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
        projects: projects,
      };

      const saveResponse = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (saveResponse.ok) {
        setMessage({ type: 'success', text: 'Projects updated successfully!' });
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
          <h1 className="text-4xl font-bold gradient-text-tech mb-2">Projects</h1>
          <p className="text-gray-400">Manage your projects</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-glow transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Project
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
        {projects.map((project, index) => (
          <div key={index} className="glass-card-dark rounded-xl p-6 border border-cyan-500/20">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-200">
                {project.name || `Project ${index + 1}`}
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
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Name *</label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Technologies</label>
                  {project.technologies?.map((tech, techIndex) => (
                    <div key={techIndex} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) => handleTechnologyChange(index, techIndex, e.target.value)}
                        className="flex-1 px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                        placeholder="Technology name"
                      />
                      <button
                        onClick={() => handleRemoveTechnology(index, techIndex)}
                        className="px-3 py-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddTechnology(index)}
                    className="mt-2 px-4 py-2 text-sm bg-tech-800 text-cyan-400 rounded hover:bg-tech-700"
                  >
                    + Add Technology
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Image</label>
                  <div className="flex items-center gap-4">
                    {project.image && (
                      <img
                        src={project.image}
                        alt="Project"
                        className="w-32 h-32 rounded object-cover border border-cyan-500/30"
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
                          if (file) handleImageUpload(index, file);
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="border-t border-cyan-500/20 pt-4">
                  <h4 className="text-lg font-semibold text-gray-200 mb-3">Links</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                      <input
                        type="url"
                        value={project.links?.github || ''}
                        onChange={(e) => handleChange(index, 'links.github', e.target.value)}
                        className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Live URL</label>
                      <input
                        type="url"
                        value={project.links?.live || ''}
                        onChange={(e) => handleChange(index, 'links.live', e.target.value)}
                        className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Demo URL</label>
                      <input
                        type="url"
                        value={project.links?.demo || ''}
                        onChange={(e) => handleChange(index, 'links.demo', e.target.value)}
                        className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-300">
                <p className="mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {projects.length > 0 && (
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

