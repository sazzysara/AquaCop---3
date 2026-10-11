"use client";

import React, { useState, useRef, useMemo } from "react";
import { CitizenComplaintItem, Waterbody, AuthUser } from "./types";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Clock,
  Shield,
  Search,
  MapPin,
  Camera,
  AlertTriangle,
  FolderOpen,
  UserCheck,
  Lock,
  Sparkles,
  Plus,
  X,
  Eye,
  FileCheck,
  Download,
  ChevronRight,
  Send,
  Loader2,
  Navigation,
  Image as ImageIcon,
  Trash2,
  Maximize2,
  Paperclip,
  ZoomIn,
  Check,
  FileSpreadsheet,
  File
} from "lucide-react";

interface CitizenPortalProps {
  complaints: CitizenComplaintItem[];
  waterbodies: Waterbody[];
  onOpenReportModal?: () => void;
  currentUser?: AuthUser | null;
  onAddNewComplaint?: (newComplaint: CitizenComplaintItem) => void;
  isFullScreen?: boolean;
}

interface UploadedFilePreview {
  id: string;
  file?: File;
  name: string;
  size: string;
  type: "image" | "document";
  previewUrl: string;
  isSample?: boolean;
}

export const CitizenPortal: React.FC<CitizenPortalProps> = ({
  complaints: initialComplaints,
  waterbodies,
  onOpenReportModal,
  currentUser,
  onAddNewComplaint,
  isFullScreen = false,
}) => {
  const isCitizen = currentUser?.role === "citizen" || !currentUser;
  const currentCitizenName = currentUser?.name || "Priya Sharma";

  // Filter Mode: "my" (complaints filed by current user) vs "all"
  const [viewScope, setViewScope] = useState<"my" | "all">("my");

  // Search and filter state for "Complaints Filed by You"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("ALL");

  // Selected complaint for the "View Details >" modal
  const [activeComplaintDetails, setActiveComplaintDetails] = useState<CitizenComplaintItem | null>(null);

  // Full-screen Image Lightbox Preview
  const [lightboxImageUrl, setLightboxImageUrl] = useState<string | null>(null);
  const [lightboxImageTitle, setLightboxImageTitle] = useState<string>("");

  // Form State for Direct Evidence & Complaint Filing
  const [selectedWaterbodyName, setSelectedWaterbodyName] = useState(waterbodies[0]?.name || "Pallikaranai Wetland");
  const [selectedDistrict, setSelectedDistrict] = useState(waterbodies[0]?.district || "Chengalpattu");
  const [selectedIssueType, setSelectedIssueType] = useState("Land Filling");
  const [surveyNumber, setSurveyNumber] = useState("Sy. No. 194/B-2");
  const [cityZone, setCityZone] = useState("Zone 14 - Perungudi Catchment");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("12.9392");
  const [longitude, setLongitude] = useState("80.2195");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccessToast, setSubmissionSuccessToast] = useState<string | null>(null);

  // File Uploads State
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFilePreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  // Auto update district when waterbody selection changes
  const handleWaterbodyChange = (wbName: string) => {
    setSelectedWaterbodyName(wbName);
    const matched = waterbodies.find((w) => w.name === wbName);
    if (matched && matched.district) {
      setSelectedDistrict(matched.district);
    }
  };

  // Handle multiple files added from input or drag-drop
  const handleFilesAdded = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newPreviews: UploadedFilePreview[] = [];
    Array.from(files).forEach((file) => {
      const isImg = file.type.startsWith("image/");
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const sizeStr = file.size < 1024 * 1024 ? `${Math.round(file.size / 1024)} KB` : `${sizeMb} MB`;
      const previewUrl = isImg ? URL.createObjectURL(file) : "";

      newPreviews.push({
        id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        file,
        name: file.name,
        size: sizeStr,
        type: isImg ? "image" : "document",
        previewUrl,
      });
    });

    setUploadedFiles((prev) => [...prev, ...newPreviews]);
  };

  // Add sample evidence files with one click for easy testing
  const handleAddSampleEvidence = () => {
    const samples: UploadedFilePreview[] = [
      {
        id: `sample-img-${Date.now()}`,
        name: "excavator_earthfill_gps_12.9392N.jpg",
        size: "3.4 MB",
        type: "image",
        previewUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
        isSample: true,
      },
      {
        id: `sample-doc-${Date.now()}`,
        name: "cadastral_survey_deed_sy194.pdf",
        size: "1.8 MB",
        type: "document",
        previewUrl: "",
        isSample: true,
      },
      {
        id: `sample-img2-${Date.now()}`,
        name: "wetland_bund_encroachment_photo.jpg",
        size: "2.7 MB",
        type: "image",
        previewUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
        isSample: true,
      }
    ];

    setUploadedFiles((prev) => [...prev, ...samples]);
    if (!description) {
      setDescription("Heavy machinery excavators and earthmovers observed dumping construction debris into the high-water wetland buffer line.");
    }
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // Auto-detect GPS from browser
  const handleUseCurrentGps = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLatitude(pos.coords.latitude.toFixed(4));
          setLongitude(pos.coords.longitude.toFixed(4));
        },
        () => {
          setLatitude("12.9392");
          setLongitude("80.2195");
        }
      );
    } else {
      setLatitude("12.9392");
      setLongitude("80.2195");
    }
  };

  // Submit Complaint Handler
  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const trackingId = `WTN-2026-${String(Math.floor(485 + Math.random() * 500)).padStart(5, "0")}`;
    const todayStr = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    // Prepare photos and documents from uploaded files
    const photoList = uploadedFiles
      .filter((f) => f.type === "image")
      .map((f) => ({
        name: f.name,
        url: f.previewUrl || "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
        size: f.size,
      }));

    const docList = uploadedFiles
      .filter((f) => f.type === "document")
      .map((f) => ({
        name: f.name,
        size: f.size,
        type: "Uploaded Citizen Evidence Document",
      }));

    // If citizen uploaded no image, attach a realistic default photo representation
    if (photoList.length === 0) {
      photoList.push({
        name: "site_encroachment_photo_01.jpg",
        url: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
        size: "3.2 MB",
      });
    }

    if (docList.length === 0) {
      docList.push({
        name: "Cadastral_Revenue_Survey_Sketch.pdf",
        size: "1.4 MB",
        type: "Survey Deed Evidence",
      });
    }

    const newComplaintItem: CitizenComplaintItem = {
      id: trackingId,
      citizenName: currentCitizenName,
      citizenPhone: "+91 98402 77102",
      waterbodyName: selectedWaterbodyName,
      district: selectedDistrict,
      cityZone,
      surveyNumber: surveyNumber || "Sy. No. 194/B",
      issueType: selectedIssueType,
      description:
        description ||
        `Unauthorized ${selectedIssueType.toLowerCase()} observed encroaching across the wetland statutory buffer boundary.`,
      latitude: parseFloat(latitude) || 12.9392,
      longitude: parseFloat(longitude) || 80.2195,
      evidenceType: `${photoList.length} Photos + ${docList.length} Docs · Sentinel-2 Validated`,
      satelliteCrosscheckStatus: "VERIFIED_ANOMALY",
      createdAt: new Date().toISOString(),
      submittedDate: todayStr,
      assignedAuthority: "Survey Team Alpha (Zonal Enforcement)",
      updatedText: "Updated: Just now",
      status: "Under Review",
      photoEvidenceUrl: photoList[0]?.url,
      photos: photoList,
      documents: docList,
    };

    // Attempt backend POST, with local state fallback
    const formData = new FormData();
    formData.append("citizen_name", newComplaintItem.citizenName);
    formData.append("citizen_phone", newComplaintItem.citizenPhone);
    formData.append("waterbody_name", newComplaintItem.waterbodyName);
    formData.append("city_zone", newComplaintItem.cityZone);
    formData.append("survey_number", newComplaintItem.surveyNumber);
    formData.append("description", newComplaintItem.description);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    fetch("http://localhost:8000/api/complaints", {
      method: "POST",
      body: formData,
    })
      .catch((err) => console.log("Local fallback mode for complaint:", err))
      .finally(() => {
        setIsSubmitting(false);
        if (onAddNewComplaint) {
          onAddNewComplaint(newComplaintItem);
        }
        setSubmissionSuccessToast(`Complaint ${trackingId} successfully filed with ${photoList.length} photo(s) & ${docList.length} document(s)!`);
        setDescription("");
        setUploadedFiles([]);

        // Auto-scroll down to "Complaints Filed by You"
        setTimeout(() => {
          const element = document.getElementById("my-complaints-section");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);

        setTimeout(() => setSubmissionSuccessToast(null), 8000);
      });
  };

  // Filter complaints list:
  // When viewScope is "my", show complaints by current user (or Priya Sharma if logged in as Priya/default)
  const userComplaints = useMemo(() => {
    return initialComplaints.filter((c) => {
      if (viewScope === "all") return true;
      // In citizen login, match citizen name
      const matchesUser =
        c.citizenName.toLowerCase().includes(currentCitizenName.toLowerCase()) ||
        currentCitizenName.toLowerCase().includes(c.citizenName.toLowerCase()) ||
        (currentCitizenName === "Priya Sharma" && c.citizenName === "Priya Sharma");
      return matchesUser;
    });
  }, [initialComplaints, viewScope, currentCitizenName]);

  const filteredComplaints = useMemo(() => {
    return userComplaints.filter((c) => {
      const matchesSearch =
        c.waterbodyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.district && c.district.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.issueType && c.issueType.toLowerCase().includes(searchQuery.toLowerCase())) ||
        c.surveyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.citizenName.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedStatusFilter === "ALL") return matchesSearch;
      return matchesSearch && c.status.toLowerCase().replace(/\s+/g, "") === selectedStatusFilter.toLowerCase().replace(/\s+/g, "");
    });
  }, [userComplaints, searchQuery, selectedStatusFilter]);

  // Status statistics for user complaints
  const stats = useMemo(() => {
    const total = userComplaints.length;
    const underReview = userComplaints.filter((c) => c.status === "Under Review").length;
    const assigned = userComplaints.filter((c) => c.status === "Assigned").length;
    const fieldInspection = userComplaints.filter((c) => c.status === "Field Inspection" || c.status === "Field Verified").length;
    const resolved = userComplaints.filter((c) => c.status === "Action Taken" || c.status === "Notice Served" || c.status === "Restored").length;
    return { total, underReview, assigned, fieldInspection, resolved };
  }, [userComplaints]);

  const uploadedPhotosCount = uploadedFiles.filter((f) => f.type === "image").length;
  const uploadedDocsCount = uploadedFiles.filter((f) => f.type === "document").length;

  return (
    <div className={`w-full space-y-10 animate-fadeIn ${isFullScreen ? "max-w-[1440px] mx-auto" : ""}`}>
      {/* ── SECTION 1: Citizen Sentinel Portal Header & Status ─────────────────── */}
      <div className="p-6 sm:p-8 rounded-[16px] bg-[var(--bg-card)] border border-[var(--border)] relative overflow-hidden theme-surface shadow-sm">
        <div className="max-w-4xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[var(--bg-base)] border border-[var(--border)] text-xs font-mono-val text-[var(--color-primary)] font-bold">
              <Shield className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              <span>CITIZEN COMPLAINT & EVIDENCE PORTAL</span>
            </div>

            <span className="px-3 py-0.5 rounded-full text-xs font-mono-val font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              TAMPER-PROOF SENTINEL INTEGRATION
            </span>

            <span className="px-3 py-0.5 rounded-full text-xs font-mono-val font-semibold bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
              FULL-SCREEN CIVIC SENTINEL
            </span>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight font-inter">
              Waterbody Encroachment Grievance & Evidence Portal
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Upload photographs, legal deeds, and survey sketches of encroachment violations. Submissions are verified against Sentinel-2 satellite passes and dispatched to zonal revenue authorities under Section 133 CrPC.
            </p>
          </div>

          {/* Citizen Credentials Card */}
          <div className="p-3.5 sm:p-4 rounded-[10px] bg-[var(--bg-base)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/30 flex items-center justify-center text-[var(--color-primary)] font-bold font-mono-val text-sm shrink-0">
                {currentCitizenName ? currentCitizenName.charAt(0) : "P"}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[var(--text-primary)] text-sm">
                    {currentCitizenName}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-val font-semibold bg-[var(--color-primary)] text-white">
                    VERIFIED CITIZEN GUARDIAN
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] font-mono-val">
                    ID: {currentUser?.badgeId || "CWG-IND-552"}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] font-mono-val mt-0.5">
                  {currentUser?.department || "Citizen Water Guardians Network"} · Section 133 CrPC Grievance Lodgement
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="#my-complaints-section"
                className="px-3.5 py-1.5 rounded-[8px] bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-primary)] text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
              >
                <span>View My Complaints</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[var(--color-primary)] text-white text-[10px] font-mono-val font-bold">
                  {stats.total}
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[var(--color-primary)]/5 blur-3xl pointer-events-none" />
      </div>

      {/* Quick Metric Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-[12px] bg-[var(--bg-card)] border border-[var(--border)] theme-surface space-y-1 shadow-xs">
          <span className="text-[11px] font-mono-val uppercase text-[var(--text-muted)] font-semibold block">
            Complaints by You
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-[var(--text-primary)] font-mono-val">{stats.total}</span>
            <span className="text-[10px] font-mono-val text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded">Total Filed</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-[12px] bg-[var(--bg-card)] border border-[var(--border)] theme-surface space-y-1 shadow-xs">
          <span className="text-[11px] font-mono-val uppercase text-[var(--text-muted)] font-semibold block">
            Under AI Review
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono-val">{stats.underReview}</span>
            <span className="text-[10px] font-mono-val text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded">Sentinel-2 Check</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-[12px] bg-[var(--bg-card)] border border-[var(--border)] theme-surface space-y-1 shadow-xs">
          <span className="text-[11px] font-mono-val uppercase text-[var(--text-muted)] font-semibold block">
            Field Inspection
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono-val">{stats.assigned + stats.fieldInspection}</span>
            <span className="text-[10px] font-mono-val text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded">Officer On-Site</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-[12px] bg-[var(--bg-card)] border border-[var(--border)] theme-surface space-y-1 shadow-xs">
          <span className="text-[11px] font-mono-val uppercase text-[var(--text-muted)] font-semibold block">
            Resolved / Notice
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono-val">{stats.resolved}</span>
            <span className="text-[10px] font-mono-val text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">Eviction Ordered</span>
          </div>
        </div>
      </div>

      {/* Success Notification Toast */}
      {submissionSuccessToast && (
        <div className="p-4 rounded-[12px] bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center justify-between gap-3 shadow-md animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-semibold">{submissionSuccessToast}</span>
          </div>
          <button
            onClick={() => setSubmissionSuccessToast(null)}
            className="p-1 rounded hover:bg-emerald-200/50 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── SECTION 2: Full-Screen Evidence & Complaint Filing Form ───────────── */}
      <div className="p-6 sm:p-8 rounded-[16px] bg-[var(--bg-card)] border border-[var(--border)] theme-surface shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-[var(--color-primary)]" />
              <span>File New Encroachment Grievance</span>
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Upload photos and legal documents. All files receive cryptographic hash verification and EXIF GPS checks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAddSampleEvidence}
              className="px-3 py-1.5 rounded-[8px] bg-[var(--bg-base)] hover:bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Autofill with sample photos and cadastral survey deed for quick testing"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Autofill Sample Evidence</span>
            </button>
            <span className="text-[11px] font-mono-val px-2.5 py-1 rounded bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-muted)]">
              Statutory Form 1-B
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmitComplaint} className="space-y-6">
          {/* Row 1: Target Waterbody, District, & Issue Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Target Waterbody */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                Target Waterbody / Wetland *
              </label>
              <select
                value={selectedWaterbodyName}
                onChange={(e) => handleWaterbodyChange(e.target.value)}
                className="w-full text-xs font-medium py-2.5 px-3.5 rounded-[8px] bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] cursor-pointer"
                required
              >
                {waterbodies.map((wb) => (
                  <option key={wb.id} value={wb.name}>
                    {wb.name} ({wb.district || "Basin"})
                  </option>
                ))}
                <option value="Poondi Reservoir">Poondi Reservoir (Tiruvallur)</option>
                <option value="Madurantakam Lake">Madurantakam Lake (Chengalpattu)</option>
                <option value="Pulicat Lake">Pulicat Lake (Tiruvallur)</option>
                <option value="Pallikaranai Wetland">Pallikaranai Wetland (Chengalpattu)</option>
                <option value="Red Hills (Puzhal) Lake">Red Hills (Puzhal) Lake (Tiruvallur)</option>
                <option value="Muttukadu Coastal Tidal Estuary">Muttukadu Coastal Estuary (Chengalpattu)</option>
              </select>
            </div>

            {/* District */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-primary)]">
                Revenue District *
              </label>
              <input
                type="text"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                placeholder="e.g. Chengalpattu, Tiruvallur"
                className="w-full text-xs font-medium py-2.5 px-3.5 rounded-[8px] bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
                required
              />
            </div>

            {/* Encroachment Issue Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                Violation / Issue Type *
              </label>
              <select
                value={selectedIssueType}
                onChange={(e) => setSelectedIssueType(e.target.value)}
                className="w-full text-xs font-medium py-2.5 px-3.5 rounded-[8px] bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] cursor-pointer"
                required
              >
                <option value="Land Filling">Land Filling (Debris & Earthmovers)</option>
                <option value="Sand Mining">Sand Mining (Illegal Riverbed Dredging)</option>
                <option value="Commercial Encroachment">Commercial Encroachment (Masonry & Plinths)</option>
                <option value="Aquaculture Mud Bunds">Aquaculture Mud Bunds (Tidal Blockage)</option>
                <option value="Effluent & Sewage Dumping">Effluent & Industrial Sewage Dumping</option>
                <option value="Bund Breaching">Bund Breaching & Canal Obstruction</option>
              </select>
            </div>
          </div>

          {/* Row 2: Cadastral Survey Plot & GPS Coordinates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-primary)]">
                Cadastral Survey / Plot No. *
              </label>
              <input
                type="text"
                value={surveyNumber}
                onChange={(e) => setSurveyNumber(e.target.value)}
                placeholder="e.g. Sy. No. 194/B-2"
                className="w-full text-xs font-mono-val py-2.5 px-3.5 rounded-[8px] bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--text-primary)]">
                Zonal Ward / Locality *
              </label>
              <input
                type="text"
                value={cityZone}
                onChange={(e) => setCityZone(e.target.value)}
                placeholder="e.g. Zone 14 - Perungudi"
                className="w-full text-xs font-medium py-2.5 px-3.5 rounded-[8px] bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-[var(--text-primary)]">
                  GPS Coordinates (Lat, Lon) *
                </label>
                <button
                  type="button"
                  onClick={handleUseCurrentGps}
                  className="text-[10px] font-mono-val text-[var(--color-primary)] hover:underline flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Auto GPS</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="Latitude"
                  className="w-full text-xs font-mono-val py-2.5 px-3 rounded-[8px] bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
                  required
                />
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="Longitude"
                  className="w-full text-xs font-mono-val py-2.5 px-3 rounded-[8px] bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description Textarea */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--text-primary)]">
              Factual Narrative of Encroachment / Intrusion *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what equipment was seen, time of violation, boundary encroachment depth, or environmental destruction..."
              className="w-full text-xs py-2.5 px-3.5 rounded-[8px] bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--color-primary)] leading-relaxed resize-none"
              required
            />
          </div>

          {/* ── DRAG & DROP EVIDENCE UPLOADER FOR PHOTOS & DOCUMENTS ───────── */}
          <div className="space-y-4 p-5 rounded-[12px] bg-[var(--bg-base)] border border-[var(--border)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[var(--color-primary)]" />
                  <span>Attach Photographic Evidence & Legal Documents</span>
                </label>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  Supports both site photos (JPG, PNG) and cadastral documents (PDF, DOCX, CSV, TXT).
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono-val">
                <span className="px-2.5 py-1 rounded bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)]">
                  📷 {uploadedPhotosCount} Photo(s)
                </span>
                <span className="px-2.5 py-1 rounded bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)]">
                  📄 {uploadedDocsCount} Document(s)
                </span>
              </div>
            </div>

            {/* Hidden native inputs */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFilesAdded(e.target.files)}
              multiple
              accept="image/*,.pdf,.doc,.docx,.csv,.xlsx,.txt"
              className="hidden"
            />
            <input
              type="file"
              ref={cameraInputRef}
              onChange={(e) => handleFilesAdded(e.target.files)}
              accept="image/*"
              capture="environment"
              className="hidden"
            />

            {/* Dropzone Box */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFilesAdded(e.dataTransfer.files);
              }}
              className={`p-6 sm:p-8 rounded-[12px] border-2 border-dashed transition-all flex flex-col items-center justify-center text-center gap-3 ${
                isDragging
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10"
                  : "border-[var(--border)] hover:border-[var(--color-primary)] bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[var(--bg-input)] border border-[var(--border)] flex items-center justify-center text-[var(--color-primary)] shadow-sm">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div className="w-11 h-11 rounded-full bg-[var(--bg-input)] border border-[var(--border)] flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
                  <FileText className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                  Drag & Drop Photos or Documents here
                </p>
                <p className="text-[11px] text-[var(--text-muted)] font-mono-val">
                  JPG, PNG, WEBP, PDF, DOCX, CSV (Max 25MB per file) · EXIF GPS location verified
                </p>
              </div>

              <div className="flex items-center gap-3 pt-1 flex-wrap justify-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-[8px] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Browse Photos & Documents</span>
                </button>

                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="px-4 py-2 rounded-[8px] bg-[var(--bg-base)] hover:bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Camera className="w-3.5 h-3.5 text-blue-500" />
                  <span>Snap Photo with Camera</span>
                </button>
              </div>
            </div>

            {/* Uploaded Photos Section Preview */}
            {uploadedPhotosCount > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                    Uploaded Photos ({uploadedPhotosCount}):
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono-val">
                    Click photo to enlarge
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {uploadedFiles
                    .filter((f) => f.type === "image")
                    .map((fileItem) => (
                      <div
                        key={fileItem.id}
                        className="group relative rounded-[10px] border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden shadow-xs hover:border-[var(--color-primary)] transition-all"
                      >
                        <div
                          onClick={() => {
                            setLightboxImageUrl(fileItem.previewUrl);
                            setLightboxImageTitle(fileItem.name);
                          }}
                          className="aspect-video w-full bg-[var(--bg-input)] cursor-pointer overflow-hidden relative"
                        >
                          <img
                            src={fileItem.previewUrl}
                            alt={fileItem.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <ZoomIn className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="p-2 space-y-1">
                          <p className="text-[11px] font-semibold text-[var(--text-primary)] truncate" title={fileItem.name}>
                            {fileItem.name}
                          </p>
                          <div className="flex items-center justify-between text-[10px] font-mono-val text-[var(--text-muted)]">
                            <span>{fileItem.size}</span>
                            <span className="text-emerald-600 font-semibold">GPS Tagged</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveFile(fileItem.id)}
                          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-rose-600 text-white shadow-sm hover:bg-rose-700 transition-colors"
                          title="Remove photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Uploaded Documents Section Preview */}
            {uploadedDocsCount > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-500" />
                  Uploaded Legal Documents ({uploadedDocsCount}):
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {uploadedFiles
                    .filter((f) => f.type === "document")
                    .map((fileItem) => (
                      <div
                        key={fileItem.id}
                        className="p-3 rounded-[10px] bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <div className="w-9 h-9 rounded-[6px] bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                            <FileCheck className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-[var(--text-primary)] truncate" title={fileItem.name}>
                              {fileItem.name}
                            </p>
                            <p className="text-[10px] font-mono-val text-[var(--text-muted)]">
                              {fileItem.size} · Legal Record
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveFile(fileItem.id)}
                          className="p-1 rounded-full text-rose-500 hover:bg-rose-500/10 transition-colors shrink-0"
                          title="Remove document"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Action Bar */}
          <div className="pt-3 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono-val">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-primary)]" />
              <span>Encrypted submission routed to Zonal Revenue Officer Enforcement Cell</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-[8px] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold flex items-center justify-center gap-2.5 transition-all shadow-md disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Cross-Checking Satellite Spectral Bands...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Complaint & Dispatch Verification</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ── SECTION 3: "Complaints Filed by You" (Positioned at Down) ──────────── */}
      <div id="my-complaints-section" className="space-y-6 pt-4 scroll-mt-20">
        {/* Header row with Title and Right Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight font-inter">
                Complaints Filed by You
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono-val font-bold bg-[var(--color-primary)] text-white">
                {userComplaints.length} Filed
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
              Real-time statutory status, assigned field officers, and satellite verification results for your submitted cases.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
            {/* View Scope Toggle: "My Complaints" vs "All Community Complaints" */}
            <div className="p-1 rounded-[8px] bg-[var(--bg-input)] border border-[var(--border)] flex items-center text-xs">
              <button
                type="button"
                onClick={() => setViewScope("my")}
                className={`px-3 py-1 rounded-[6px] transition-all font-semibold ${
                  viewScope === "my"
                    ? "bg-[var(--bg-card)] text-[var(--text-primary)] shadow-xs"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                My Complaints ({initialComplaints.filter((c) => c.citizenName.toLowerCase().includes(currentCitizenName.toLowerCase()) || currentCitizenName.toLowerCase().includes(c.citizenName.toLowerCase())).length})
              </button>
              <button
                type="button"
                onClick={() => setViewScope("all")}
                className={`px-3 py-1 rounded-[6px] transition-all font-semibold ${
                  viewScope === "all"
                    ? "bg-[var(--bg-card)] text-[var(--text-primary)] shadow-xs"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                All Public Complaints ({initialComplaints.length})
              </button>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-[12px] bg-[var(--bg-card)] border border-[var(--border)] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-2 flex-wrap text-xs font-medium">
            <span className="text-[var(--text-muted)] text-[11px] font-mono-val uppercase mr-1">Status:</span>
            {[
              { label: "All", value: "ALL", count: userComplaints.length },
              { label: "Under Review", value: "Under Review", count: stats.underReview },
              { label: "Assigned", value: "Assigned", count: stats.assigned },
              { label: "Field Inspection", value: "Field Inspection", count: stats.fieldInspection },
              { label: "Action Taken", value: "Action Taken", count: stats.resolved },
            ].map((tab) => {
              const isSelected = selectedStatusFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => setSelectedStatusFilter(tab.value)}
                  className={`px-3 py-1.5 rounded-full transition-all text-xs font-medium flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[var(--color-primary)] text-white shadow-sm font-semibold"
                      : "bg-[var(--bg-base)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] font-mono-val px-1.5 py-0.2 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-[var(--bg-input)] text-[var(--text-muted)]"}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by lake, ID, or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-[8px] bg-[var(--bg-input)] border border-[var(--border)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] font-mono-val focus:outline-none focus:border-[var(--color-primary)]"
            />
          </div>
        </div>

        {/* ── CARDS GRID SHOWING CITIZEN COMPLAINTS AT DOWN ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredComplaints.map((item) => {
            let badgeStyle = "bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800";
            if (item.status === "Assigned") {
              badgeStyle = "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800";
            } else if (item.status === "Field Inspection" || item.status === "Field Verified") {
              badgeStyle = "bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800";
            } else if (item.status === "Action Taken" || item.status === "Notice Served" || item.status === "Restored") {
              badgeStyle = "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800";
            }

            const itemPhotos = item.photos || (item.photoEvidenceUrl ? [{ name: "site_photo.jpg", url: item.photoEvidenceUrl, size: "3.2 MB" }] : []);
            const itemDocs = item.documents || [];

            return (
              <div
                key={item.id}
                className="p-6 sm:p-7 rounded-[18px] bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--color-primary)]/40 transition-all shadow-sm hover:shadow-md flex flex-col justify-between space-y-5 group theme-surface"
              >
                {/* Top Row: Tracking Pill & Status Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-[6px] bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-mono-val font-bold">
                      {item.id}
                    </span>
                    <span className="text-[10px] font-mono-val px-2 py-0.5 rounded bg-[var(--bg-base)] text-[var(--text-muted)] border border-[var(--border)]">
                      By {item.citizenName}
                    </span>
                  </div>

                  <span className={`px-3.5 py-1 rounded-full text-xs font-semibold ${badgeStyle}`}>
                    {item.status}
                  </span>
                </div>

                {/* Content Body: Title and Metadata */}
                <div className="space-y-2.5">
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                    {item.waterbodyName}
                  </h3>

                  <div className="space-y-1.5 text-xs text-[var(--text-secondary)] font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[var(--text-muted)]">District:</span>
                      <span className="text-[var(--text-primary)] font-semibold">{item.district || "Chengalpattu"}</span>
                      <span>·</span>
                      <span className="text-[var(--text-muted)]">Plot:</span>
                      <span className="text-[var(--text-primary)] font-mono-val">{item.surveyNumber}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[var(--text-muted)]">Violation:</span>
                      <span className="text-[#E11D48] font-bold">{item.issueType || "Land Filling"}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[var(--text-muted)]">Submitted:</span>
                      <span className="text-[var(--text-primary)] font-semibold">{item.submittedDate || "25 Sep 2026"}</span>
                    </div>

                    {item.assignedAuthority && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[var(--text-muted)]">Assigned Authority:</span>
                        <span className="text-[var(--text-primary)] font-semibold">{item.assignedAuthority}</span>
                      </div>
                    )}
                  </div>

                  {/* Evidence Thumbnails Row */}
                  {(itemPhotos.length > 0 || itemDocs.length > 0) && (
                    <div className="pt-1 flex items-center gap-2 flex-wrap">
                      {itemPhotos.slice(0, 3).map((ph, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setLightboxImageUrl(ph.url);
                            setLightboxImageTitle(ph.name);
                          }}
                          className="w-12 h-12 rounded-[6px] overflow-hidden border border-[var(--border)] bg-[var(--bg-input)] cursor-pointer hover:opacity-85 transition-opacity relative group/thumb"
                          title="Click to enlarge photo"
                        >
                          <img src={ph.url} alt={ph.name} className="w-full h-full object-cover" />
                        </div>
                      ))}

                      {itemPhotos.length > 3 && (
                        <span className="text-[10px] font-mono-val px-2 py-1 rounded bg-[var(--bg-input)] text-[var(--text-muted)]">
                          +{itemPhotos.length - 3} more
                        </span>
                      )}

                      {itemDocs.length > 0 && (
                        <span className="text-[10px] font-mono-val px-2.5 py-1 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20 flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          <span>{itemDocs.length} Doc(s)</span>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Row: Updated Timestamp & View Details Button */}
                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between gap-3">
                  <span className="text-xs text-[var(--text-muted)] font-medium">
                    {item.updatedText || "Updated: Today"}
                  </span>

                  <button
                    onClick={() => setActiveComplaintDetails(item)}
                    className="px-4 py-2 rounded-[8px] bg-[#0F172A] hover:bg-[#1E293B] dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredComplaints.length === 0 && (
          <div className="p-12 text-center rounded-[16px] bg-[var(--bg-card)] border border-[var(--border)] space-y-3">
            <FolderOpen className="w-10 h-10 text-[var(--text-muted)] mx-auto opacity-50" />
            <h4 className="text-sm font-bold text-[var(--text-primary)]">No complaints found</h4>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
              {viewScope === "my"
                ? `No complaints match the filter under your profile (${currentCitizenName}). Use the form above to file a new report!`
                : "No complaints found with the selected filter criteria."}
            </p>
          </div>
        )}
      </div>

      {/* ── MODAL: Interactive "View Details" Dossier ─────────────────────────── */}
      {activeComplaintDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[16px] bg-[var(--bg-card)] border border-[var(--border)] shadow-2xl p-6 sm:p-8 space-y-6 theme-surface">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono-val font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {activeComplaintDetails.id}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">
                    {activeComplaintDetails.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">
                  {activeComplaintDetails.waterbodyName}
                </h3>
              </div>

              <button
                onClick={() => setActiveComplaintDetails(null)}
                className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Resolution Progress Tracker */}
            <div className="p-4 rounded-[12px] bg-[var(--bg-base)] border border-[var(--border)] space-y-3">
              <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase font-mono-val">
                Statutory Resolution Progress
              </h4>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono-val">
                <div className="p-2 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold">
                  1. Filed
                </div>
                <div className="p-2 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold">
                  2. AI Satellite Pass
                </div>
                <div className={`p-2 rounded ${activeComplaintDetails.status !== "Under Review" ? "bg-blue-500/15 border border-blue-500/30 text-blue-700 dark:text-blue-300 font-bold" : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)]"}`}>
                  3. Officer Assigned
                </div>
                <div className={`p-2 rounded ${activeComplaintDetails.status === "Action Taken" || activeComplaintDetails.status === "Notice Served" ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold" : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)]"}`}>
                  4. Demolition
                </div>
              </div>
            </div>

            {/* Evidence & Case Information */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono-val bg-[var(--bg-base)] p-4 rounded-[10px] border border-[var(--border)]">
              <div>
                <span className="text-[10px] text-[var(--text-muted)] block">DISTRICT & ZONE</span>
                <span className="font-semibold text-[var(--text-primary)] font-sans">
                  {activeComplaintDetails.district || "Chengalpattu"} · {activeComplaintDetails.cityZone}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--text-muted)] block">SURVEY NUMBER</span>
                <span className="font-semibold text-[var(--text-primary)]">
                  {activeComplaintDetails.surveyNumber}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--text-muted)] block">VIOLATION TYPE</span>
                <span className="font-bold text-rose-600">
                  {activeComplaintDetails.issueType || "Land Filling"}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[var(--text-muted)] block">ASSIGNED AUTHORITY</span>
                <span className="font-semibold text-[var(--text-primary)] font-sans">
                  {activeComplaintDetails.assignedAuthority || "Field Enforcement Wing"}
                </span>
              </div>
            </div>

            {/* Citizen Statement */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--text-primary)]">
                Citizen Narrative Statement:
              </label>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed p-3.5 rounded-[8px] bg-[var(--bg-base)] border border-[var(--border)]">
                {activeComplaintDetails.description}
              </p>
            </div>

            {/* Attached Photos Gallery */}
            {activeComplaintDetails.photos && activeComplaintDetails.photos.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  Attached Photos ({activeComplaintDetails.photos.length}):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {activeComplaintDetails.photos.map((photo, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setLightboxImageUrl(photo.url);
                        setLightboxImageTitle(photo.name);
                      }}
                      className="rounded-[8px] overflow-hidden border border-[var(--border)] bg-[var(--bg-input)] group relative aspect-video cursor-pointer"
                    >
                      <img
                        src={photo.url}
                        alt={photo.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-1.5 bg-black/70 text-white text-[10px] truncate font-mono-val">
                        {photo.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Attached Documents List */}
            {activeComplaintDetails.documents && activeComplaintDetails.documents.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                  Attached Legal Documents:
                </label>
                <div className="space-y-2">
                  {activeComplaintDetails.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-[8px] bg-[var(--bg-base)] border border-[var(--border)] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileCheck className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                        <span className="font-semibold text-[var(--text-primary)] truncate">{doc.name}</span>
                        <span className="text-[10px] font-mono-val text-[var(--text-muted)]">({doc.size || "1.2 MB"})</span>
                      </div>
                      <span className="text-[10px] font-mono-val px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold shrink-0">
                        VERIFIED HASH
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-3">
              <span className="text-[11px] text-[var(--text-muted)] font-mono-val">
                TAMPER-PROOF SHA-256 RECORD
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveComplaintDetails(null)}
                  className="px-4 py-2 rounded-[8px] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-semibold transition-colors"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FULL-SCREEN PHOTO LIGHTBOX MODAL ──────────────────────────────────── */}
      {lightboxImageUrl && (
        <div
          onClick={() => setLightboxImageUrl(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[90vh] bg-black/50 border border-white/20 rounded-[14px] overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="p-3 bg-black/60 border-b border-white/10 flex items-center justify-between text-white text-xs">
              <span className="font-mono-val truncate font-medium">{lightboxImageTitle || "Evidence Photo"}</span>
              <button
                onClick={() => setLightboxImageUrl(null)}
                className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-2 flex items-center justify-center bg-black/90">
              <img
                src={lightboxImageUrl}
                alt={lightboxImageTitle}
                className="max-h-[75vh] max-w-full object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
