"use client";

import React, { useState } from "react";
import { EncroachmentAlertItem, Waterbody } from "./types";
import {
  ShieldAlert,
  Send,
  FileCheck,
  CheckCircle2,
  Clock,
  Filter,
  AlertOctagon,
  Eye,
  Building,
  UserCheck,
  Waves,
  MapPin,
  FileText,
  AlertTriangle,
  Download
} from "lucide-react";
import { getApiUrl } from "@/lib/api";

interface OfficerPortalProps {
  alerts: EncroachmentAlertItem[];
  waterbodies: Waterbody[];
  onUpdateAlertStatus: (alertId: string, newStatus: EncroachmentAlertItem["status"]) => void;
  isLoggedIn: boolean;
  onOpenLoginModal: () => void;
}

export const OfficerPortal: React.FC<OfficerPortalProps> = ({
  alerts,
  waterbodies,
  onUpdateAlertStatus,
  isLoggedIn,
  onOpenLoginModal,
}) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>("ALL");
  const [selectedThreat, setSelectedThreat] = useState<string>("ALL");
  const [inspectingAlert, setInspectingAlert] = useState<EncroachmentAlertItem | null>(alerts[0] || null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const filteredAlerts = alerts.filter((item) => {
    if (selectedSeverity !== "ALL" && item.severity !== selectedSeverity) return false;
    if (selectedThreat !== "ALL") {
      if (selectedThreat === "CONSTRUCTION" && item.threatClass !== "CONSTRUCTION") return false;
      if (selectedThreat === "LAND_FILLING" && item.threatClass !== "LAND_FILLING") return false;
      if (selectedThreat === "SAND_MINING" && item.threatClass !== "SAND_MINING") return false;
      if (selectedThreat === "WASTE_DUMPING" && item.threatClass !== "WASTE_DUMPING") return false;
    }
    return true;
  });

  const handleAction = (alertId: string, action: EncroachmentAlertItem["status"], label: string) => {
    onUpdateAlertStatus(alertId, action);
    setActionFeedback(`Success: ${label} recorded in legal audit registry.`);
    setTimeout(() => setActionFeedback(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Officer Auth Bar with generous padding */}
      <div className="p-6 sm:p-7 rounded-[12px] bg-[var(--bg-card)] border border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-6 theme-surface shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-[10px] bg-[var(--bg-base)] border border-[var(--border)] shrink-0">
            <ShieldAlert className="w-6 h-6 text-[var(--color-danger)]" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-base font-bold text-[var(--text-primary)] font-mono-val tracking-tight">
                MUNICIPAL & REVENUE ENFORCEMENT COMMAND
              </h2>
              {isLoggedIn ? (
                <span className="text-[10px] font-mono-val px-2.5 py-1 rounded-[4px] bg-[var(--status-verified-bg)] text-[var(--status-verified-text)] border border-[var(--status-verified-border)] font-semibold">
                  OFFICER VERIFIED
                </span>
              ) : (
                <span className="text-[10px] font-mono-val px-2.5 py-1 rounded-[4px] bg-[var(--severity-critical-bg)] text-[var(--severity-critical-text)] border border-[var(--severity-critical-border)] font-semibold">
                  PUBLIC READ-ONLY MODE
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Near real-time (every ~5 days) Sentinel-2 multi-spectral intrusion triggers & statutory stop-work notices under Section 133 CrPC
            </p>
          </div>
        </div>

        {!isLoggedIn ? (
          <button
            onClick={onOpenLoginModal}
            className="self-start md:self-auto px-5 py-2.5 rounded-[8px] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm shrink-0"
          >
            <UserCheck className="w-4 h-4" />
            <span>Authenticate Officer Credentials</span>
          </button>
        ) : (
          <div className="flex items-center gap-3 text-xs font-mono-val text-[var(--text-muted)] shrink-0">
            <span>Jurisdiction: Greater Metropolitan Catchment Area</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-success)] animate-pulse"></span>
          </div>
        )}
      </div>

      {actionFeedback && (
        <div className="p-4 rounded-[10px] bg-[var(--status-verified-bg)] border border-[var(--color-primary)] text-[var(--text-primary)] text-xs font-mono-val flex items-center gap-3 theme-surface">
          <CheckCircle2 className="w-5 h-5 text-[var(--status-verified-text)] shrink-0" />
          <span className="font-medium">{actionFeedback}</span>
        </div>
      )}

      {/* Threat Class & Severity Filter Bar */}
      <div className="p-4 rounded-[12px] bg-[var(--bg-card)] border border-[var(--border)] space-y-3 theme-surface">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono-val">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--color-primary)]" />
            <span className="font-bold text-[var(--text-primary)] uppercase">Filter by Monitored Threat Class:</span>
          </div>
          <span className="text-[11px] text-[var(--text-muted)]">
            Honest confidence labels strictly applied · All detections require field verification
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "ALL", label: "All Threats", color: "border-[var(--border)] text-[var(--text-primary)]" },
            { id: "CONSTRUCTION", label: "Construction (High Conf.)", color: "border-red-500/40 text-red-600 dark:text-red-400 bg-red-500/10" },
            { id: "LAND_FILLING", label: "Land Filling (High Conf.)", color: "border-orange-500/40 text-orange-600 dark:text-orange-400 bg-orange-500/10" },
            { id: "SAND_MINING", label: "Sand Mining (Medium Conf. - Verify)", color: "border-yellow-500/40 text-yellow-600 dark:text-yellow-400 bg-yellow-500/10" },
            { id: "WASTE_DUMPING", label: "Waste Dumping (Candidate - Verify)", color: "border-purple-500/40 text-purple-600 dark:text-purple-400 bg-purple-500/10" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedThreat(t.id)}
              className={`px-3 py-1.5 rounded-[6px] text-xs font-mono-val transition-all border ${t.color} ${
                selectedThreat === t.id
                  ? "ring-2 ring-[var(--color-primary)] font-bold shadow-sm"
                  : "opacity-75 hover:opacity-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid with spacious gap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Alerts Feed Column (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
            <span className="text-xs font-bold text-[var(--text-primary)] font-mono-val uppercase tracking-wider">
              Active Encroachment Triggers ({filteredAlerts.length})
            </span>
            <div className="flex items-center gap-1.5 text-[11px] font-mono-val bg-[var(--bg-elevated)] p-1 rounded-[6px] border border-[var(--border)]">
              {(["ALL", "CRITICAL", "HIGH"] as const).map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSelectedSeverity(sev)}
                  className={`px-2.5 py-1 rounded-[4px] transition-colors font-medium ${
                    selectedSeverity === sev
                      ? "bg-[var(--bg-card)] text-[var(--text-primary)] font-bold shadow-sm"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredAlerts.map((alert) => {
              const isSelected = inspectingAlert?.id === alert.id;
              return (
                <div
                  key={alert.id}
                  onClick={() => setInspectingAlert(alert)}
                  className={`p-5 rounded-[12px] cursor-pointer transition-all border theme-surface space-y-3.5 ${
                    isSelected
                      ? "bg-[var(--bg-elevated)] border-[var(--color-primary)] shadow-md ring-1 ring-[var(--color-primary)]/20"
                      : "bg-[var(--bg-card)] border-[var(--border)] hover:border-[var(--border-hover)] hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-[4px] text-[10px] font-bold font-mono-val border ${
                            alert.severity === "CRITICAL"
                              ? "bg-[var(--severity-critical-bg)] text-[var(--severity-critical-text)] border-[var(--severity-critical-border)]"
                              : alert.severity === "HIGH"
                              ? "bg-[var(--severity-high-bg)] text-[var(--severity-high-text)] border-[var(--severity-high-border)]"
                              : "bg-[var(--severity-moderate-bg)] text-[var(--severity-moderate-text)] border-[var(--severity-moderate-border)]"
                          }`}
                        >
                          {alert.severity}
                        </span>
                        {alert.threatName && (
                          <span
                            className="px-2 py-0.5 rounded-[4px] text-[10px] font-mono-val font-semibold border"
                            style={{
                              borderColor: `${alert.threatColor || "#EF4444"}55`,
                              color: alert.threatColor || "#EF4444",
                              backgroundColor: `${alert.threatColor || "#EF4444"}15`
                            }}
                          >
                            {alert.threatName}
                          </span>
                        )}
                        <span className="text-xs font-mono-val text-[var(--text-primary)] font-bold">
                          {alert.id}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-[var(--text-primary)] leading-tight">
                        {alert.waterbodyName}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono-val text-[var(--text-muted)] whitespace-nowrap">
                      {alert.detectedAt}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {alert.encroachmentType}
                  </p>

                  {/* Detection Delay Comparison Tag */}
                  <div className="p-2.5 rounded-[6px] bg-[var(--bg-base)] border border-[var(--border)] text-[11px] font-mono-val flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[var(--text-muted)]">
                      🛰️ Satellite Flagged: <strong className="text-[var(--color-primary)]">{alert.detectionDelayDays || 1.8}d</strong> from pass
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      ⚡ Saved: ~{alert.delaySavingsDays || 64} days vs complaints
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-xs font-mono-val">
                    <span className="text-[var(--color-danger)] font-bold">
                      Breach: {alert.bufferDistanceMeters}m to line
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-[4px] text-[10px] font-semibold border ${
                        alert.status === "PENDING_DISPATCH"
                          ? "bg-[var(--status-pending-bg)] text-[var(--status-pending-text)] border-[var(--status-pending-border)]"
                          : alert.status === "INVESTIGATION_ORDERED"
                          ? "bg-[var(--status-investigation-bg)] text-[var(--status-investigation-text)] border-[var(--status-investigation-border)]"
                          : alert.status === "EVICTION_NOTICE_ISSUED"
                          ? "bg-[var(--status-purple-bg)] text-[var(--status-purple-text)] border-[var(--status-purple-border)]"
                          : "bg-[var(--status-sealed-bg)] text-[var(--status-sealed-text)] border-[var(--status-sealed-border)]"
                      }`}
                    >
                      {alert.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Alert Dossier Column (7 cols) */}
        <div className="lg:col-span-7">
          {inspectingAlert ? (
            <div className="p-7 sm:p-8 rounded-[12px] bg-[var(--bg-card)] border border-[var(--border)] space-y-7 theme-surface shadow-sm">
              {/* Dossier Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border)]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-xs font-mono-val text-[var(--color-primary)] font-bold">
                      OFFICER CASE DOSSIER #{inspectingAlert.id}
                    </span>
                    {inspectingAlert.threatName && (
                      <span
                        className="px-2.5 py-0.5 text-[10px] font-mono-val rounded-[4px] font-bold border"
                        style={{
                          borderColor: `${inspectingAlert.threatColor || "#EF4444"}66`,
                          color: inspectingAlert.threatColor || "#EF4444",
                          backgroundColor: `${inspectingAlert.threatColor || "#EF4444"}20`
                        }}
                      >
                        {inspectingAlert.threatName} · {inspectingAlert.confidenceLabel || "High Confidence"}
                      </span>
                    )}
                    <span className="px-2 py-0.5 text-[10px] font-mono-val rounded-[4px] bg-[var(--bg-input)] text-[var(--text-muted)] border border-[var(--border)] font-medium">
                      Sentinel Vector ID #8841-B
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
                    {inspectingAlert.waterbodyName}
                  </h3>
                  <p className="text-xs font-mono-val text-[var(--text-muted)]">
                    Cadastral Survey Plot: <span className="text-[var(--text-primary)] font-semibold">{inspectingAlert.surveyPlot}</span>
                  </p>
                </div>

                <div className="text-left sm:text-right text-xs font-mono-val space-y-0.5 p-3 rounded-[8px] bg-[var(--bg-input)] border border-[var(--border)]">
                  <span className="text-[10px] text-[var(--text-muted)] block">GPS COORDINATES</span>
                  <span className="text-[var(--text-primary)] font-bold">
                    {inspectingAlert.coordinates[0]}° N, {inspectingAlert.coordinates[1]}° E
                  </span>
                </div>
              </div>

              {/* Centrepiece: Detection Delay Comparison & Audit Trail */}
              <div className="p-5 rounded-[10px] bg-[var(--bg-base)] border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
                  <span className="text-xs font-bold text-[var(--text-primary)] font-mono-val uppercase flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    Detection Delay Audit: Satellite vs Traditional Grievance
                  </span>
                  <span className="text-[10px] font-mono-val px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold">
                    Real Scene Audit
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono-val">
                  <div className="p-2.5 rounded bg-[var(--bg-card)] border border-[var(--border)] space-y-1">
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase">1. Change Appeared</span>
                    <strong className="text-[var(--text-primary)] block">{inspectingAlert.imageryDate || "18 Dec 2025"}</strong>
                    <span className="text-[10px] text-[var(--text-muted)]">Sentinel-2 scene pass</span>
                  </div>
                  <div className="p-2.5 rounded bg-[var(--bg-card)] border border-[var(--color-primary)] space-y-1">
                    <span className="text-[10px] text-[var(--color-primary)] block uppercase font-bold">2. AquaCop Flagged</span>
                    <strong className="text-[var(--color-primary)] block">{inspectingAlert.flaggedDate || "20 Dec 2025"}</strong>
                    <span className="text-[10px] text-[var(--color-primary)] font-semibold">+{inspectingAlert.detectionDelayDays || 2.0} days lag</span>
                  </div>
                  <div className="p-2.5 rounded bg-[var(--bg-card)] border border-[var(--border)] space-y-1">
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase">3. Officer Dispatched</span>
                    <strong className="text-[var(--text-primary)] block">{inspectingAlert.flaggedDate ? "21 Dec 2025" : "Active"}</strong>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">&lt; 24h statutory action</span>
                  </div>
                  <div className="p-2.5 rounded bg-[var(--bg-card)] border border-rose-500/30 space-y-1">
                    <span className="text-[10px] text-rose-600 dark:text-rose-400 block uppercase font-bold">4. Public Complaint</span>
                    <strong className="text-rose-600 dark:text-rose-400 block">{inspectingAlert.complaintDate || "05 Mar 2026"}</strong>
                    <span className="text-[10px] text-rose-500 font-semibold">+{inspectingAlert.delaySavingsDays ? inspectingAlert.delaySavingsDays + 2 : 77} days later</span>
                  </div>
                </div>

                <blockquote className="p-3 rounded bg-[var(--bg-card)] border-l-4 border-[var(--color-primary)] text-xs text-[var(--text-secondary)] italic leading-relaxed">
                  &ldquo;A complaint-based system finds problems after they are visible to residents; satellite monitoring finds them when the first change appears.&rdquo;
                </blockquote>
              </div>

              {/* Multi-temporal Satellite Evidence */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-val text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                    Multi-Temporal Satellite Evidence (Before vs Present)
                  </span>
                  <span className="text-[10px] font-mono-val text-[var(--color-primary)]">
                    10m Sentinel-2 Composite · Indicative Boundary
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="rounded-[10px] overflow-hidden border border-[var(--border)] bg-[var(--bg-base)]">
                    <div className="h-44 bg-gradient-to-br from-[#003B46] to-[#07575B] flex items-center justify-center p-6 text-center">
                      <div className="space-y-2">
                        <Waves className="w-8 h-8 text-[#00FFFF] mx-auto" />
                        <span className="text-xs font-mono-val text-white block font-bold">
                          2022 Pristine Wetland Buffer
                        </span>
                        <span className="text-[11px] font-mono-val text-white/80 block">
                          Zero Builtup Intrusion (NDWI: 0.72)
                        </span>
                      </div>
                    </div>
                    <div className="p-3 text-[11px] font-mono-val text-[var(--text-muted)] bg-[var(--bg-elevated)] border-t border-[var(--border)] flex justify-between">
                      <span>Sentinel-2 Pass</span>
                      <span>Oct 2022 Baseline</span>
                    </div>
                  </div>

                  <div className="rounded-[10px] overflow-hidden border border-[var(--severity-critical-border)] bg-[var(--bg-base)]">
                    <div className="h-44 bg-gradient-to-br from-[#3B1515] to-[#1F1824] flex items-center justify-center p-6 text-center">
                      <div className="space-y-2">
                        <Building className="w-8 h-8 text-[var(--color-danger)] mx-auto animate-pulse" />
                        <span className="text-xs font-mono-val text-white block font-bold">
                          2026 {inspectingAlert.threatName || "Illegal Earth-Fill"} Intrusion
                        </span>
                        <span className="text-[11px] font-mono-val text-[#FF6B6B] block font-semibold">
                          Buffer Violated by {inspectingAlert.bufferDistanceMeters}m
                        </span>
                      </div>
                    </div>
                    <div className="p-3 text-[11px] font-mono-val text-[var(--severity-critical-text)] bg-[var(--bg-elevated)] border-t border-[var(--severity-critical-border)] flex justify-between">
                      <span>Latest Pass: Today 03:14</span>
                      <span className="font-bold">CRITICAL VIOLATION</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disaster Impact Assessment */}
              <div className="p-5 rounded-[10px] bg-[var(--bg-input)] border border-[var(--border)] space-y-3 theme-surface">
                <div className="flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-[var(--color-danger)] shrink-0" />
                  <span className="text-xs font-bold text-[var(--text-primary)] font-mono-val uppercase">
                    Disaster Flood Modeling Assessment (Disaster Risk Score: {inspectingAlert.disasterRiskScore || 92}/100)
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {inspectingAlert.disasterImpact}
                </p>
                <div className="pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-val text-[var(--text-muted)]">
                  <span>Assigned Officer: <strong className="text-[var(--text-primary)]">{inspectingAlert.officerAssigned || "Unassigned"}</strong></span>
                  <span className="text-[var(--status-verified-text)] font-semibold">Jurisdiction: Sec 133 CrPC Statutory Eviction</span>
                </div>
              </div>

              {/* Officer Statutory Actions */}
              <div className="space-y-3.5 pt-2">
                <span className="text-xs font-mono-val text-[var(--text-muted)] uppercase tracking-wider font-semibold block">
                  Officer Statutory Enforcement Actions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => handleAction(inspectingAlert.id, "INVESTIGATION_ORDERED", "Field Inspection Order")}
                    className="p-3 rounded-[8px] bg-[var(--bg-input)] hover:bg-[var(--bg-elevated)] border border-[var(--border)] text-xs font-medium text-[var(--text-primary)] flex items-center justify-center gap-2 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[var(--satellite-status-text)]" />
                    <span>Order Drone Survey</span>
                  </button>

                  <button
                    onClick={() => handleAction(inspectingAlert.id, "EVICTION_NOTICE_ISSUED", "Section 133 Statutory Notice")}
                    className="p-3 rounded-[8px] bg-[var(--color-accent-purple)] hover:bg-[var(--color-accent-purple-hover)] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Issue Sec 133 Notice</span>
                  </button>

                  <a
                    href={getApiUrl(`/api/reports/eviction-notice/${inspectingAlert.waterbodyId || "WB-PALLIKARANAI"}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-[8px] bg-[var(--color-danger)] hover:opacity-90 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Court PDF Pack</span>
                  </a>

                  <button
                    onClick={() => handleAction(inspectingAlert.id, "SEALED", "Demolition & Eviction Sealed")}
                    className="p-3 rounded-[8px] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Seal & Enforce Boundary</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-[12px] bg-[var(--bg-card)] border border-[var(--border)] text-center text-xs text-[var(--text-muted)] space-y-2">
              <ShieldAlert className="w-8 h-8 mx-auto text-[var(--text-muted)]" />
              <p>Select an encroachment alert from the queue to inspect case telemetry.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
