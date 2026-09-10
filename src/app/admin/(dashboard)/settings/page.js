"use client";

export const dynamic = 'force-dynamic';

import { useState } from "react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    platformName: "SkillEval",
    maintenanceMode: false,
    allowRegistration: true,
    maxSkillsPerEvaluation: 5,
    defaultTestDuration: 200,
    questionsPerTest: 100,
    emailNotifications: false,
    autoIssueCertificates: true,
    certificateExpiryDays: 365,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main className="min-h-screen bg-[#05050a] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[5%] top-[5%] h-[420px] w-[420px] rounded-full bg-violet-700/15 blur-[140px]" />
        <div className="absolute right-[0%] top-[30%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-0 left-[35%] h-[350px] w-[350px] rounded-full bg-fuchsia-600/10 blur-[150px]" />
        <div className="grid-background absolute inset-0 opacity-[0.025]" />
      </div>

      <section className="mx-auto max-w-4xl px-4 lg:px-6 py-4">
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold">Settings</h1>
          <p className="text-zinc-500 mt-1">Configure platform settings</p>
        </div>

        {saved && (
          <div className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-emerald-300">
            Settings saved successfully!
          </div>
        )}

        {/* General Settings */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 mb-6">
          <h3 className="text-lg font-bold mb-5">General</h3>
          <div className="space-y-5">
            <SettingInput
              label="Platform Name"
              value={settings.platformName}
              onChange={(v) => handleChange("platformName", v)}
            />
            <SettingNumber
              label="Max Skills per Evaluation"
              value={settings.maxSkillsPerEvaluation}
              onChange={(v) => handleChange("maxSkillsPerEvaluation", v)}
              min={1}
              max={10}
            />
            <SettingNumber
              label="Default Test Duration (minutes)"
              value={settings.defaultTestDuration}
              onChange={(v) => handleChange("defaultTestDuration", v)}
              min={10}
              max={480}
            />
            <SettingNumber
              label="Questions per Test"
              value={settings.questionsPerTest}
              onChange={(v) => handleChange("questionsPerTest", v)}
              min={10}
              max={200}
            />
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 mb-6">
          <h3 className="text-lg font-bold mb-5">Features</h3>
          <div className="space-y-3">
            <SettingToggle
              label="Allow User Registration"
              description="Enable/disable new user signups"
              value={settings.allowRegistration}
              onChange={(v) => handleChange("allowRegistration", v)}
            />
            <SettingToggle
              label="Maintenance Mode"
              description="Disable all evaluations and show maintenance page"
              value={settings.maintenanceMode}
              onChange={(v) => handleChange("maintenanceMode", v)}
            />
            <SettingToggle
              label="Auto-Issue Certificates"
              description="Automatically generate certificates for completed tests"
              value={settings.autoIssueCertificates}
              onChange={(v) => handleChange("autoIssueCertificates", v)}
            />
            <SettingToggle
              label="Email Notifications"
              description="Send email notifications for important events"
              value={settings.emailNotifications}
              onChange={(v) => handleChange("emailNotifications", v)}
            />
          </div>
        </div>

        {/* Certificate Settings */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 mb-6">
          <h3 className="text-lg font-bold mb-5">Certificates</h3>
          <div className="space-y-5">
            <SettingNumber
              label="Certificate Expiry (days)"
              value={settings.certificateExpiryDays}
              onChange={(v) => handleChange("certificateExpiryDays", v)}
              min={30}
              max={3650}
            />
          </div>
        </div>

        {/* Security Notice */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 mb-6">
          <h3 className="text-lg font-bold mb-4 text-amber-400">⚠️ Security Notice</h3>
          <div className="space-y-2 text-sm text-zinc-400">
            <p>• Admin credentials are stored in server-side environment variables only</p>
            <p>• Never commit <code className="bg-white/[0.04] px-1.5 py-0.5 rounded">.env.local</code> or expose <code className="bg-white/[0.04] px-1.5 py-0.5 rounded">ADMIN_PASSWORD</code></p>
            <p>• All admin routes are protected by middleware with HttpOnly cookie validation</p>
            <p>• Admin authentication is completely separate from user authentication</p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-8 py-3 font-bold text-white transition hover:from-violet-600 hover:to-cyan-600 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </section>
    </main>
  );
}

function SettingInput({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-400 mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white placeholder:text-zinc-600 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
      />
    </div>
  );
}

function SettingNumber({ label, value, onChange, min, max }) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-400 mb-2">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        min={min}
        max={max}
        className="w-full px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white placeholder:text-zinc-600 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all"
      />
    </div>
  );
}

function SettingToggle({ label, description, value, onChange }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-xs text-zinc-500">{description}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          value ? "bg-gradient-to-r from-violet-500 to-cyan-500" : "bg-white/[0.08]"
        }`}
        role="switch"
        aria-checked={value}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}