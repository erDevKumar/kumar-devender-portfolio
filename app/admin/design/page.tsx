'use client';

import { useState, useEffect, useCallback } from 'react';
import { Save, Palette, RotateCcw, Eye } from 'lucide-react';

interface DesignSettings {
  // Colors
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  
  // Background
  bgPrimary: string;
  bgSecondary: string;
  
  // Text
  textPrimary: string;
  textSecondary: string;
  
  // Font
  fontFamily: string;
}

const defaultSettings: DesignSettings = {
  primary: '#2563eb',
  secondary: '#64748b',
  accent: '#0ea5e9',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  bgPrimary: '#111827',
  bgSecondary: '#1f2937',
  textPrimary: '#ffffff',
  textSecondary: '#d1d5db',
  fontFamily: 'Inter',
};

const fontOptions = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Source Sans Pro', label: 'Source Sans Pro' },
  { value: 'system-ui', label: 'System UI' },
];

export default function DesignPage() {
  const [settings, setSettings] = useState<DesignSettings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('design_settings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setSettings({ ...defaultSettings, ...parsed });
        } catch (e) {
          console.error('Failed to load design settings:', e);
        }
      }
    }
  };

  const applyPreviewStyles = useCallback(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--color-primary', settings.primary);
      root.style.setProperty('--color-secondary', settings.secondary);
      root.style.setProperty('--color-accent', settings.accent);
      root.style.setProperty('--color-success', settings.success);
      root.style.setProperty('--color-warning', settings.warning);
      root.style.setProperty('--color-error', settings.error);
      root.style.setProperty('--color-bg-primary', settings.bgPrimary);
      root.style.setProperty('--color-bg-secondary', settings.bgSecondary);
      root.style.setProperty('--color-text-primary', settings.textPrimary);
      root.style.setProperty('--color-text-secondary', settings.textSecondary);
      root.style.fontFamily = settings.fontFamily;
    }
  }, [settings]);

  useEffect(() => {
    applyPreviewStyles();
  }, [applyPreviewStyles]);

  const handleChange = (key: keyof DesignSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all design settings to default?')) {
      setSettings(defaultSettings);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('design_settings');
      }
      setMessage({ type: 'success', text: 'Design settings reset to default' });
    }
  };

  const handleSave = () => {
    setSaving(true);
    setMessage(null);

    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('design_settings', JSON.stringify(settings));
        setMessage({ type: 'success', text: 'Design settings saved successfully! Note: These are preview settings. To apply permanently, you may need to update your CSS variables.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save design settings' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Design Customization</h1>
          <p className="text-gray-200">Customize colors, backgrounds, and typography</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 text-gray-200 rounded-lg hover:border-blue-500/50 transition-all"
          >
            <Eye className="w-5 h-5" />
            {showPreview ? 'Hide' : 'Show'} Preview
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 text-gray-200 rounded-lg hover:border-orange-500/50 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Color Settings */}
          <div className="rounded-xl p-6 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                <Palette className="w-5 h-5 text-yellow-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Colors</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Primary Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={settings.primary}
                    onChange={(e) => handleChange('primary', e.target.value)}
                    className="w-16 h-10 rounded-lg border border-gray-700/50 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.primary}
                    onChange={(e) => handleChange('primary', e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Secondary Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={settings.secondary}
                    onChange={(e) => handleChange('secondary', e.target.value)}
                    className="w-16 h-10 rounded-lg border border-gray-700/50 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.secondary}
                    onChange={(e) => handleChange('secondary', e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Accent Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={settings.accent}
                    onChange={(e) => handleChange('accent', e.target.value)}
                    className="w-16 h-10 rounded-lg border border-gray-700/50 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.accent}
                    onChange={(e) => handleChange('accent', e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Success Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={settings.success}
                    onChange={(e) => handleChange('success', e.target.value)}
                    className="w-16 h-10 rounded-lg border border-gray-700/50 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.success}
                    onChange={(e) => handleChange('success', e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Warning Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={settings.warning}
                    onChange={(e) => handleChange('warning', e.target.value)}
                    className="w-16 h-10 rounded-lg border border-gray-700/50 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.warning}
                    onChange={(e) => handleChange('warning', e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Error Color</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={settings.error}
                    onChange={(e) => handleChange('error', e.target.value)}
                    className="w-16 h-10 rounded-lg border border-gray-700/50 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.error}
                    onChange={(e) => handleChange('error', e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Background Settings */}
          <div className="rounded-xl p-6 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50">
            <h2 className="text-2xl font-bold text-white mb-6">Background Colors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Primary Background</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={settings.bgPrimary}
                    onChange={(e) => handleChange('bgPrimary', e.target.value)}
                    className="w-16 h-10 rounded-lg border border-gray-700/50 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.bgPrimary}
                    onChange={(e) => handleChange('bgPrimary', e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Secondary Background</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={settings.bgSecondary}
                    onChange={(e) => handleChange('bgSecondary', e.target.value)}
                    className="w-16 h-10 rounded-lg border border-gray-700/50 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.bgSecondary}
                    onChange={(e) => handleChange('bgSecondary', e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text Settings */}
          <div className="rounded-xl p-6 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50">
            <h2 className="text-2xl font-bold text-white mb-6">Text Colors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Primary Text</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={settings.textPrimary}
                    onChange={(e) => handleChange('textPrimary', e.target.value)}
                    className="w-16 h-10 rounded-lg border border-gray-700/50 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.textPrimary}
                    onChange={(e) => handleChange('textPrimary', e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Secondary Text</label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={settings.textSecondary}
                    onChange={(e) => handleChange('textSecondary', e.target.value)}
                    className="w-16 h-10 rounded-lg border border-gray-700/50 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.textSecondary}
                    onChange={(e) => handleChange('textSecondary', e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Typography Settings */}
          <div className="rounded-xl p-6 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50">
            <h2 className="text-2xl font-bold text-white mb-6">Typography</h2>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Font Family</label>
              <select
                value={settings.fontFamily}
                onChange={(e) => handleChange('fontFamily', e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {fontOptions.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : 'Save Design Settings'}
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="lg:col-span-1">
            <div className="rounded-xl p-6 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 sticky top-8">
              <h2 className="text-xl font-bold text-white mb-4">Live Preview</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: settings.bgPrimary }}>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: settings.textPrimary }}>
                    Sample Heading
                  </h3>
                  <p className="text-sm" style={{ color: settings.textSecondary }}>
                    This is a sample paragraph showing how your text colors will look.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                    style={{ backgroundColor: settings.primary }}
                  >
                    Primary
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                    style={{ backgroundColor: settings.secondary }}
                  >
                    Secondary
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                    style={{ backgroundColor: settings.accent }}
                  >
                    Accent
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: settings.success + '20', color: settings.success }}>
                    Success message
                  </div>
                  <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: settings.warning + '20', color: settings.warning }}>
                    Warning message
                  </div>
                  <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: settings.error + '20', color: settings.error }}>
                    Error message
                  </div>
                </div>

                <div className="p-4 rounded-lg border" style={{ backgroundColor: settings.bgSecondary, borderColor: settings.secondary + '50' }}>
                  <p className="text-sm" style={{ color: settings.textPrimary, fontFamily: settings.fontFamily }}>
                    Font: {settings.fontFamily}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info Alert */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
        <Palette className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-gray-200">
          <p className="font-semibold text-blue-400 mb-1">Note:</p>
          <p className="text-gray-200">
            Design settings are saved to your browser&apos;s localStorage for preview purposes. 
            To apply these changes permanently to your portfolio, you&apos;ll need to update the CSS variables in your global stylesheet (globals.css).
          </p>
        </div>
      </div>
    </div>
  );
}

