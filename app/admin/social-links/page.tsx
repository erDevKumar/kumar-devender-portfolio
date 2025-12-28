'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { SocialLink } from '@/types/portfolio';

export default function SocialLinksPage() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
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
        setSocialLinks(data.socialLinks || []);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSocialLinks([
      {
        platform: '',
        url: '',
      },
      ...socialLinks,
    ]);
    setEditingIndex(0);
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this social link?')) {
      setSocialLinks(socialLinks.filter((_, i) => i !== index));
    }
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setSocialLinks(updated);
  };

  const handleSubmit = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch('/api/portfolio');
      const currentData = await response.json();

      const updatedData = {
        ...currentData,
        socialLinks: socialLinks,
      };

      const saveResponse = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (saveResponse.ok) {
        setMessage({ type: 'success', text: 'Social links updated successfully!' });
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
          <h1 className="text-4xl font-bold gradient-text-tech mb-2">Social Links</h1>
          <p className="text-gray-200">Manage your social media links</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-glow transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Link
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
        {socialLinks.map((link, index) => (
          <div key={index} className="glass-card-dark rounded-xl p-6 border border-cyan-500/20">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-200">
                {link.platform || `Link ${index + 1}`}
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
                  <label className="block text-sm font-medium text-gray-300 mb-2">Platform *</label>
                  <input
                    type="text"
                    value={link.platform}
                    onChange={(e) => handleChange(index, 'platform', e.target.value)}
                    className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    placeholder="e.g., LinkedIn, GitHub, Twitter"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">URL *</label>
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => handleChange(index, 'url', e.target.value)}
                    className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Icon (optional)</label>
                  <input
                    type="text"
                    value={link.icon || ''}
                    onChange={(e) => handleChange(index, 'icon', e.target.value)}
                    className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                    placeholder="Icon URL or name"
                  />
                </div>
              </div>
            ) : (
              <div className="text-gray-300">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  {link.url}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {socialLinks.length > 0 && (
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

