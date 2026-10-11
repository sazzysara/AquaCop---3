"use client";

import React, { useState } from "react";
import { X, Lock, Shield, UserCheck, AlertCircle, KeyRound } from "lucide-react";

interface OfficerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const OfficerLoginModal: React.FC<OfficerLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [badgeId, setBadgeId] = useState("TN-REV-4082");
  const [password, setPassword] = useState("officer2026");
  const [department, setDepartment] = useState("Revenue & Wetland Conservation Department");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
      if (badgeId && password) {
        onLoginSuccess();
        onClose();
      } else {
        setError("Invalid Badge ID or Security Token.");
      }
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-[8px] bg-[var(--bg-card)] border border-[var(--border)] shadow-2xl p-6 text-[var(--text-primary)] theme-surface">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-[6px] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono-val text-[var(--color-primary)] font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>OFFICER ACCESS CONTROL</span>
            </div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              Municipal & Revenue Officer Login
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Authorised government officers can issue statutory Section 133 notices, order drone inspections, and verify encroachment anomalies.
            </p>
          </div>

          {error && (
            <div className="p-2.5 rounded-[6px] bg-[var(--danger-banner-bg)] border border-[var(--danger-banner-border)] text-[var(--danger-banner-text)] text-xs font-mono-val flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[var(--text-muted)] mb-1 font-mono-val">
                Officer Service Badge ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={badgeId}
                  onChange={(e) => setBadgeId(e.target.value)}
                  className="w-full px-3 py-2 rounded-[6px] bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] font-mono-val"
                  placeholder="e.g. TN-REV-4082"
                />
              </div>
            </div>

            <div>
              <label className="block text-[var(--text-muted)] mb-1 font-mono-val">
                Department Division
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 rounded-[6px] bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
              >
                <option value="Revenue & Wetland Conservation Department">
                  Revenue & Wetland Conservation Department
                </option>
                <option value="Coastal Zone Management Authority (CRZ)">
                  Coastal Zone Management Authority (CRZ)
                </option>
                <option value="Water Resources Department (WRD) Enforcement">
                  Water Resources Department (WRD) Enforcement
                </option>
                <option value="Disaster Management Response Cell">
                  Disaster Management Response Cell
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[var(--text-muted)] mb-1 font-mono-val">
                Security PIN / Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-[6px] bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] font-mono-val"
                  placeholder="••••••••"
                />
              </div>
              <p className="text-[10px] text-[var(--text-muted)] font-mono-val mt-1">
                Demo default pre-filled: badge <span className="text-[var(--color-primary)] font-semibold">TN-REV-4082</span>
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-[8px] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Authenticate & Unlock Officer Hub</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
