'use client';

import { useState, useEffect } from 'react';
import { Save, Palette } from 'lucide-react';

interface DesignSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
}

export default function DesignPage() {
  const [settings, setSettings] = useState<DesignSettings>({
    primaryColor: '#0ea5e9',
    secondaryColor: '#6366f1',
    accentColor: '#00f0ff',
    backgroundColor: '#0f172a',
    textColor: '#f1f5f9',
    fontFamily: 'system-ui',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const saved = localStorage.getItem('design_settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load design settings:', error);
      }
    }
  };

  const handleChange = (field: keyof DesignSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      // Save to localStorage for now
      localStorage.setItem('design_settings', JSON.stringify(settings));
      
      // In production, you might want to save this to a config file or database
      setMessage({ type: 'success', text: 'Design settings saved! Note: These are stored locally. For production, integrate with your backend.' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  };

  const applyPreview = () => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', settings.primaryColor);
    root.style.setProperty('--secondary-color', settings.secondaryColor);
    root.style.setProperty('--accent-color', settings.accentColor);
    root.style.setProperty('--bg-color', settings.backgroundColor);
    root.style.setProperty('--text-color', settings.textColor);
    root.style.setProperty('--font-family', settings.fontFamily);
  };

  useEffect(() => {
    applyPreview();
  }, [settings]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold gradient-text-tech mb-2">Design Customization</h1>
        <p className="text-gray-400">Customize colors, fonts, and design elements</p>
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

      <form onSubmit={handleSubmit} className="glass-card-dark rounded-xl p-6 border border-cyan-500/20 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary Color */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="w-16 h-16 rounded-lg border border-cyan-500/30 cursor-pointer"
              />
              <input
                type="text"
                value={settings.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="flex-1 px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                placeholder="#0ea5e9"
              />
            </div>
          </div>

          {/* Secondary Color */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.secondaryColor}
                onChange={(e) => handleChange('secondaryColor', e.target.value)}
                className="w-16 h-16 rounded-lg border border-cyan-500/30 cursor-pointer"
              />
              <input
                type="text"
                value={settings.secondaryColor}
                onChange={(e) => handleChange('secondaryColor', e.target.value)}
                className="flex-1 px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                placeholder="#6366f1"
              />
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Accent Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.accentColor}
                onChange={(e) => handleChange('accentColor', e.target.value)}
                className="w-16 h-16 rounded-lg border border-cyan-500/30 cursor-pointer"
              />
              <input
                type="text"
                value={settings.accentColor}
                onChange={(e) => handleChange('accentColor', e.target.value)}
                className="flex-1 px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                placeholder="#00f0ff"
              />
            </div>
          </div>

          {/* Background Color */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Background Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.backgroundColor}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                className="w-16 h-16 rounded-lg border border-cyan-500/30 cursor-pointer"
              />
              <input
                type="text"
                value={settings.backgroundColor}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                className="flex-1 px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                placeholder="#0f172a"
              />
            </div>
          </div>

          {/* Text Color */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Text Color</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.textColor}
                onChange={(e) => handleChange('textColor', e.target.value)}
                className="w-16 h-16 rounded-lg border border-cyan-500/30 cursor-pointer"
              />
              <input
                type="text"
                value={settings.textColor}
                onChange={(e) => handleChange('textColor', e.target.value)}
                className="flex-1 px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
                placeholder="#f1f5f9"
              />
            </div>
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Font Family</label>
            <select
              value={settings.fontFamily}
              onChange={(e) => handleChange('fontFamily', e.target.value)}
              className="w-full px-4 py-2 bg-tech-800/50 border border-cyan-500/30 rounded-lg text-gray-100"
            >
              <option value="system-ui">System UI</option>
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Lato">Lato</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Poppins">Poppins</option>
            </select>
          </div>
        </div>

        {/* Preview Section */}
        <div className="border-t border-cyan-500/20 pt-6">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Preview</h3>
          <div className="space-y-4">
            <div
              className="p-6 rounded-lg"
              style={{
                backgroundColor: settings.backgroundColor,
                color: settings.textColor,
                fontFamily: settings.fontFamily,
              }}
            >
              <h4
                className="text-2xl font-bold mb-2"
                style={{ color: settings.primaryColor }}
              >
                Sample Heading
              </h4>
              <p className="mb-4">This is a preview of how your design will look.</p>
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-white"
                style={{ backgroundColor: settings.primaryColor }}
              >
                Primary Button
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-lg text-white ml-2"
                style={{ backgroundColor: settings.secondaryColor }}
              >
                Secondary Button
              </button>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
          <p className="text-sm text-gray-300">
            <strong className="text-blue-400">Note:</strong> Design customization is currently saved to localStorage.
            For production use, integrate these settings with your backend or configuration file.
            You may need to update your Tailwind config or CSS variables to apply these changes globally.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:shadow-glow transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Design Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}

