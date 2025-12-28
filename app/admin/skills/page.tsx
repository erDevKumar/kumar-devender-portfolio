'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { Skill } from '@/types/portfolio';

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
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
        setSkills(data.skills || []);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSkills([
      {
        name: '',
        category: 'technical',
        proficiency: 'intermediate',
      },
      ...skills,
    ]);
    setEditingIndex(0);
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      setSkills(skills.filter((_, i) => i !== index));
    }
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: value };
    setSkills(updated);
  };

  const handleSubmit = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/portfolio');
      const currentData = await response.json();

      const updatedData = {
        ...currentData,
        skills: skills,
      };

      const saveResponse = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (saveResponse.ok) {
        setMessage({ type: 'success', text: 'Skills updated successfully!' });
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

  const categories: Skill['category'][] = ['technical', 'soft', 'language', 'tool'];
  const proficiencies: Skill['proficiency'][] = ['beginner', 'intermediate', 'advanced', 'expert'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold gradient-text-tech mb-2">Skills</h1>
          <p className="text-gray-400">Manage your skills and proficiencies</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-glow transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Skill
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
        {skills.map((skill, index) => (
          <div key={index} className="glass-card-dark rounded-xl p-6 border border-cyan-500/20">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-200">
                {skill.name || `Skill ${index + 1}`}
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">Skill Name *</label>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                    <select
                      value={skill.category}
                      onChange={(e) => handleChange(index, 'category', e.target.value)}
                      className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Proficiency</label>
                    <select
                      value={skill.proficiency || ''}
                      onChange={(e) => handleChange(index, 'proficiency', e.target.value)}
                      className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    >
                      <option value="">None</option>
                      {proficiencies.map((prof) => (
                        <option key={prof} value={prof}>
                          {prof.charAt(0).toUpperCase() + prof.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded text-sm">
                    {skill.category}
                  </span>
                  {skill.proficiency && (
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                      {skill.proficiency}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {skills.length > 0 && (
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

