import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Users, 
  BarChart3, 
  Layers, 
  Search, 
  Download, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  Sparkles,
  RefreshCw,
  Plus,
  Trash2,
  Edit2,
  Copy,
  ExternalLink,
  FileText,
  Send,
  Inbox,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { NICHES_DATABASE } from '../data/nichesData';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Lead {
  id: string;
  createdAt: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  country: string;
  businessNiche: string;
  servicesRequired: string[];
  platforms: string[];
  goals: string[];
  timeline: string;
  budgetRange: string;
  projectDescription: string;
  status: 'New' | 'Contacted' | 'Proposal Sent' | 'In Discussion' | 'Won' | 'Lost';
  notes?: string;
}

interface EmailLog {
  id: string;
  sentAt: string;
  to: string;
  subject: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  type: string;
  summary: string;
  status: string;
  notes?: string;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'email_logs' | 'analytics' | 'niches' | 'settings'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [analytics, setAnalytics] = useState<any>(null);
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');
  const [statusUpdateMsg, setStatusUpdateMsg] = useState('');
  const [sendingTestEmail, setSendingTestEmail] = useState(false);
  const [testEmailMsg, setTestEmailMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copiedLeadId, setCopiedLeadId] = useState<string | null>(null);

  // Fetch leads, email logs, and analytics
  const fetchDashboardData = async () => {
    setLoadingLeads(true);
    try {
      const [leadsRes, analyticsRes, emailLogsRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/analytics'),
        fetch('/api/email-logs')
      ]);

      const leadsData = await leadsRes.json();
      const analyticsData = await analyticsRes.json();
      const emailLogsData = await emailLogsRes.json();

      if (leadsData.success && leadsData.leads) {
        setLeads(leadsData.leads);
      }
      if (analyticsData.success && analyticsData.analytics) {
        setAnalytics(analyticsData.analytics);
      }
      if (emailLogsData.success && emailLogsData.logs) {
        setEmailLogs(emailLogsData.logs);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDashboardData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus as any } : l))
        );
        setStatusUpdateMsg(`Updated lead status to ${newStatus}`);
        setTimeout(() => setStatusUpdateMsg(''), 3000);
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    }
  };

  const handleSendTestEmail = async () => {
    setSendingTestEmail(true);
    setTestEmailMsg(null);
    try {
      const res = await fetch('/api/send-test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success) {
        setTestEmailMsg({
          type: 'success',
          text: `Success! Test email was dispatched to abhishekkuntare02@gmail.com.`
        });
        fetchDashboardData();
      } else {
        setTestEmailMsg({
          type: 'error',
          text: data.error || 'Failed to dispatch test email.'
        });
      }
    } catch (err) {
      setTestEmailMsg({
        type: 'error',
        text: 'Network error while attempting to send test email.'
      });
    } finally {
      setSendingTestEmail(false);
    }
  };

  const copyLeadSummary = (lead: Lead) => {
    const text = `
LEAD DETAILS (${lead.businessNiche}):
Name: ${lead.name}
Business: ${lead.businessName || 'None'}
Email: ${lead.email}
Phone: ${lead.phone}
Country: ${lead.country}
Services: ${lead.servicesRequired.join(', ')}
Budget: ${lead.budgetRange}
Timeline: ${lead.timeline}
Notes: ${lead.projectDescription || 'None'}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedLeadId(lead.id);
    setTimeout(() => setCopiedLeadId(null), 2500);
  };

  const filteredLeads = leads.filter((l) => {
    if (leadStatusFilter === 'all') return true;
    return l.status.toLowerCase() === leadStatusFilter.toLowerCase();
  });

  const exportLeadsJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `abhishek-leads-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
   
<div className="
    fixed inset-0 z-50
    bg-black/85 backdrop-blur-md
    animate-in fade-in duration-200
    flex items-end sm:items-center justify-center
    p-0 sm:p-4 lg:p-6
  "
  onClick={onClose}
>
  <div
    className="
      relative
      w-full
      max-w-5xl

      h-[100dvh]
      sm:h-auto
      sm:max-h-[94dvh]

      bg-[#0d1220]
      border border-cyan-500/30

      rounded-none
      sm:rounded-3xl

      shadow-2xl
      overflow-hidden

      flex flex-col
    "
    onClick={(e) => e.stopPropagation()}
  >

    {/* Mobile Handle */}
    <div className="sm:hidden shrink-0 flex justify-center pt-2.5 pb-1 bg-[#0d1220]">
      <div className="w-10 h-1 rounded-full bg-white/20" />
    </div>

    {/* ───────────────── HEADER ───────────────── */}
    <div
      className="
        shrink-0
        px-4 py-3.5
        sm:p-6
        lg:p-8

        bg-gradient-to-r
        from-[#111728]
        to-[#0a0d16]

        border-b border-white/10
      "
    >
      <div className="flex items-start justify-between gap-3">

        {/* Logo + Title */}
        <div className="flex items-start gap-3 min-w-0">

          <div
            className="
              w-9 h-9
              sm:w-10 sm:h-10
              rounded-xl
              bg-cyan-500/20
              border border-cyan-500/40
              text-cyan-400
              flex items-center justify-center
              shrink-0
            "
          >
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          <div className="min-w-0">

            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2">

              <h2
                className="
                  font-display
                  text-base
                  sm:text-xl
                  lg:text-2xl
                  font-bold
                  text-white
                  leading-tight
                  break-words
                "
              >
                Abhishek Studio Admin Portal
              </h2>

              <span
                className="
                  self-start
                  max-w-full
                  text-[8px]
                  sm:text-[10px]
                  font-mono
                  px-2 py-0.5
                  rounded
                  bg-emerald-500/20
                  text-emerald-400
                  border border-emerald-500/30
                  truncate
                "
              >
                Target: abhishekkuntare02@gmail.com
              </span>

            </div>

            <p
              className="
                mt-1
                text-[10px]
                sm:text-xs
                text-slate-400
                leading-relaxed
                max-w-3xl
              "
            >
              Manage inquiries, supervise leads CRM, and verify outbound email delivery
            </p>

          </div>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close admin portal"
          className="
            w-9 h-9
            sm:w-10 sm:h-10
            shrink-0
            flex items-center justify-center
            text-slate-400
            hover:text-white
            bg-white/5
            hover:bg-white/10
            border border-white/5
            rounded-xl
            transition-all
            active:scale-95
          "
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

      </div>
    </div>

    {/* ───────────────── TABS ───────────────── */}
    <div
      className="
        shrink-0
        px-3 py-2
        sm:px-6 sm:py-3
        lg:px-8

        bg-[#080a10]
        border-b border-white/10

        flex items-center gap-2
      "
    >
      {/* Scrollable Tabs */}
      <div
        className="
          flex-1
          min-w-0
          overflow-x-auto
          overscroll-x-contain
          scrollbar-none
          touch-pan-x
        "
      >
        <div className="flex items-center gap-1.5 sm:gap-2 w-max">

          {[
            {
              id: "leads",
              label: `Leads CRM (${leads.length})`,
              icon: Users,
            },
            {
              id: "email_logs",
              label: `Email Outbox (${emailLogs.length})`,
              icon: Inbox,
            },
            {
              id: "analytics",
              label: "Studio Analytics",
              icon: BarChart3,
            },
            {
              id: "niches",
              label: `Niches Database (${NICHES_DATABASE.length})`,
              icon: Layers,
            },
            {
              id: "settings",
              label: "Configuration & Mail",
              icon: ShieldCheck,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  min-h-9
                  px-3
                  sm:px-3.5
                  py-1.5
                  rounded-lg
                  sm:rounded-xl
                  text-[10px]
                  sm:text-xs
                  font-semibold
                  flex items-center
                  gap-1.5
                  whitespace-nowrap
                  transition-all
                  shrink-0

                  ${
                    isSelected
                      ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/10"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}

        </div>
      </div>

      {/* Sync */}
      <button
        type="button"
        onClick={fetchDashboardData}
        className="
          shrink-0
          w-9 h-9
          sm:w-auto sm:h-auto
          sm:px-2
          flex items-center justify-center
          gap-1
          rounded-lg
          text-slate-400
          hover:text-cyan-400
          hover:bg-white/5
          transition-all
        "
        title="Sync dashboard"
      >
        <RefreshCw
          className={`w-3.5 h-3.5 ${
            loadingLeads ? "animate-spin" : ""
          }`}
        />

        <span className="hidden sm:inline text-xs">
          Sync
        </span>
      </button>
    </div>

    {/* ───────────────── BODY ───────────────── */}
    <div
      className="
        flex-1
        min-h-0
        overflow-y-auto
        overflow-x-hidden
        overscroll-contain
        touch-pan-y
        [-webkit-overflow-scrolling:touch]

        px-3
        py-4

        sm:px-6
        sm:py-6

        lg:px-8
        lg:py-8
      "
    >

      {/* Email Delivery Hub */}
      <div
        className="
          mb-5
          sm:mb-6
          p-3.5
          sm:p-4
          rounded-2xl
          bg-[#111728]
          border border-cyan-500/30
          space-y-3
        "
      >
        <div
          className="
            flex flex-col
            sm:flex-row
            sm:items-center
            justify-between
            gap-3
            pb-3
            border-b border-white/10
          "
        >

          <div className="flex items-start gap-2.5 min-w-0">

            <div
              className="
                w-8 h-8
                rounded-lg
                bg-cyan-500/20
                text-cyan-400
                flex items-center justify-center
                shrink-0
              "
            >
              <Mail className="w-4 h-4" />
            </div>

            <div className="min-w-0">

              <div className="text-xs font-bold text-white flex flex-wrap items-center gap-2">
                <span>Email Delivery Hub</span>

                <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  Active
                </span>
              </div>

              <div className="mt-1 text-[10px] sm:text-[11px] text-slate-300 leading-relaxed break-words">
                All inquiries & proposals are routed to:
                <strong className="ml-1 text-cyan-400 font-mono break-all">
                  abhishekkuntare02@gmail.com
                </strong>
              </div>

            </div>
          </div>

          {/* Actions */}
          <div
            className="
              grid
              grid-cols-1
              sm:flex
              sm:flex-wrap
              items-stretch
              sm:items-center
              gap-2
              w-full
              sm:w-auto
              shrink-0
            "
          >

            <button
              type="button"
              disabled={sendingTestEmail}
              onClick={handleSendTestEmail}
              className="
                w-full sm:w-auto
                min-h-9
                px-3
                py-2
                rounded-xl
                bg-cyan-500/20
                hover:bg-cyan-500/30
                border border-cyan-500/40
                text-cyan-300
                text-[11px]
                font-semibold
                flex items-center
                justify-center
                gap-1.5
                transition-colors
                disabled:opacity-50
              "
            >
              {sendingTestEmail ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Sending Test...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Test Email</span>
                </>
              )}
            </button>

            <a
              href="https://mail.google.com/mail/u/0/#inbox"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-full sm:w-auto
                min-h-9
                px-3 py-2
                rounded-xl
                bg-white/5
                hover:bg-white/10
                border border-white/10
                text-[11px]
                font-semibold
                text-slate-300
                hover:text-white
                flex items-center justify-center
                gap-1.5
                transition-colors
              "
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Gmail</span>
            </a>

            <a
              href="/api/export-leads"
              download
              className="
                w-full sm:w-auto
                min-h-9
                px-3 py-2
                rounded-xl
                bg-white/5
                hover:bg-white/10
                border border-white/10
                text-[11px]
                font-semibold
                text-emerald-400
                flex items-center
                justify-center
                gap-1.5
                transition-colors
              "
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV</span>
            </a>

          </div>
        </div>

        {/* Test Message */}
        {testEmailMsg && (
          <div
            className={`
              p-2.5
              rounded-xl
              text-[11px]
              flex items-start
              gap-2
              leading-relaxed
              break-words

              ${
                testEmailMsg.type === "success"
                  ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                  : "bg-rose-500/15 border border-rose-500/30 text-rose-300"
              }
            `}
          >
            {testEmailMsg.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            )}

            <span>{testEmailMsg.text}</span>
          </div>
        )}
      </div>

      {/* Status */}
      {statusUpdateMsg && (
        <div className="mb-4 p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-start gap-2 leading-relaxed">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>{statusUpdateMsg}</span>
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* KEEP YOUR EXISTING TAB CONTENT HERE        */}
      {/* leads / email_logs / analytics / niches    */}
      {/* / settings                                 */}
      {/* ═══════════════════════════════════════════ */}

      {activeTab === "leads" && (
        <div className="space-y-5 sm:space-y-6">

          {/* Toolbar */}
          <div
            className="
              flex flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3
              pb-4
              border-b border-white/10
            "
          >

            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[11px] sm:text-xs text-slate-400 shrink-0">
                Filter Status:
              </span>

              <select
                value={leadStatusFilter}
                onChange={(e) => setLeadStatusFilter(e.target.value)}
                className="
                  min-w-0
                  max-w-full
                  bg-white/5
                  text-[11px] sm:text-xs
                  text-white
                  border border-white/10
                  rounded-lg
                  px-2.5 py-2
                  focus:outline-none
                "
              >
                <option value="all" className="bg-slate-900">
                  All Statuses ({leads.length})
                </option>
                <option value="New" className="bg-slate-900">
                  New
                </option>
                <option value="Contacted" className="bg-slate-900">
                  Contacted
                </option>
                <option value="Proposal Sent" className="bg-slate-900">
                  Proposal Sent
                </option>
                <option value="In Discussion" className="bg-slate-900">
                  In Discussion
                </option>
                <option value="Won" className="bg-slate-900">
                  Won
                </option>
                <option value="Lost" className="bg-slate-900">
                  Lost
                </option>
              </select>
            </div>

            <div className="grid grid-cols-2 sm:flex gap-2 w-full sm:w-auto">

              <a
                href="/api/export-leads"
                className="
                  min-h-9
                  px-3 py-2
                  rounded-lg
                  bg-emerald-500/15
                  hover:bg-emerald-500/25
                  border border-emerald-500/30
                  text-[10px] sm:text-xs
                  font-semibold
                  text-emerald-300
                  flex items-center
                  justify-center
                  gap-1.5
                "
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </a>

              <button
                type="button"
                onClick={exportLeadsJSON}
                className="
                  min-h-9
                  px-3 py-2
                  rounded-lg
                  bg-white/5
                  hover:bg-white/10
                  border border-white/10
                  text-[10px] sm:text-xs
                  font-semibold
                  text-slate-300
                  flex items-center
                  justify-center
                  gap-1.5
                "
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export JSON</span>
              </button>

            </div>
          </div>

          {/* Leads */}
          {filteredLeads.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">

              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="
                    p-3.5
                    sm:p-5
                    rounded-2xl
                    bg-white/5
                    border border-white/10
                    space-y-3
                    hover:border-cyan-500/30
                    transition-colors
                    min-w-0
                  "
                >

                  {/* Lead Header */}
                  <div
                    className="
                      flex flex-col
                      gap-3
                      sm:flex-row
                      sm:items-start
                      sm:justify-between
                    "
                  >

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">

                        <h4 className="font-bold text-white text-sm sm:text-base break-words">
                          {lead.name}
                        </h4>

                        {lead.businessName && (
                          <span className="text-[10px] sm:text-xs text-cyan-300 font-medium break-words">
                            • {lead.businessName}
                          </span>
                        )}

                        <span className="max-w-full text-[9px] font-semibold px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 break-words">
                          {lead.businessNiche}
                        </span>

                      </div>

                      <span className="block mt-1.5 text-[10px] sm:text-[11px] text-slate-400 leading-relaxed break-words">
                        Received{" "}
                        {new Date(lead.createdAt).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                        })}
                        {" • "}
                        Location: {lead.country}
                      </span>

                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">

                      <span className="text-[10px] text-slate-400">
                        Status:
                      </span>

                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleUpdateStatus(lead.id, e.target.value)
                        }
                        className={`
                          max-w-full
                          text-[10px] sm:text-xs
                          font-bold
                          rounded-lg
                          px-2.5 py-2
                          border
                          focus:outline-none

                          ${
                            lead.status === "New"
                              ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                              : lead.status === "Won"
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                              : "bg-white/10 text-slate-300 border-white/10"
                          }
                        `}
                      >
                        <option value="New" className="bg-slate-900 text-white">
                          New
                        </option>
                        <option value="Contacted" className="bg-slate-900 text-white">
                          Contacted
                        </option>
                        <option value="Proposal Sent" className="bg-slate-900 text-white">
                          Proposal Sent
                        </option>
                        <option value="In Discussion" className="bg-slate-900 text-white">
                          In Discussion
                        </option>
                        <option value="Won" className="bg-slate-900 text-white">
                          Won
                        </option>
                        <option value="Lost" className="bg-slate-900 text-white">
                          Lost
                        </option>
                      </select>

                    </div>
                  </div>

                  {/* Contact Information */}
                  <div
                    className="
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      lg:grid-cols-4
                      gap-2
                      pt-3
                      border-t border-white/5
                    "
                  >

                    <div className="min-w-0 flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-300">
                      <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <a
                        href={`tel:${lead.phone}`}
                        className="hover:underline truncate"
                      >
                        {lead.phone}
                      </a>
                    </div>

                    <div className="min-w-0 flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-300">
                      <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <a
                        href={`mailto:${lead.email}`}
                        className="hover:underline truncate"
                      >
                        {lead.email}
                      </a>
                    </div>

                    <div className="text-[10px] sm:text-xs break-words">
                      <strong>Budget:</strong>{" "}
                      <span className="text-emerald-400 font-mono font-semibold">
                        {lead.budgetRange}
                      </span>
                    </div>

                    <div className="text-[10px] sm:text-xs break-words">
                      <strong>Timeline:</strong> {lead.timeline}
                    </div>

                  </div>

                  {/* Services */}
                  <div className="text-[10px] sm:text-xs text-slate-400 space-y-2">

                    <div className="leading-relaxed break-words">
                      <strong>Requested Services:</strong>{" "}
                      {lead.servicesRequired.join(", ") || "None specified"}
                    </div>

                    {lead.projectDescription && (
                      <div
                        className="
                          p-2.5
                          rounded-lg
                          bg-black/30
                          border border-white/5
                          text-slate-300
                          font-mono
                          text-[10px]
                          sm:text-[11px]
                          leading-relaxed
                          break-words
                          overflow-hidden
                        "
                      >
                        "{lead.projectDescription}"
                      </div>
                    )}

                  </div>

                  {/* Communication Actions */}
                  <div
                    className="
                      grid
                      grid-cols-1
                      sm:grid-cols-3
                      gap-2
                      pt-3
                      border-t border-white/5
                    "
                  >

                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/${lead.phone.replace(
                        /[^0-9]/g,
                        ""
                      )}?text=${encodeURIComponent(
                        `Hi ${lead.name}, this is Abhishek from Abhishek Digital. I received your project inquiry for ${
                          lead.businessName || lead.businessNiche
                        }!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        min-h-9
                        px-2.5 py-2
                        rounded-lg
                        bg-emerald-500/15
                        hover:bg-emerald-500/25
                        border border-emerald-500/30
                        text-emerald-300
                        text-[10px] sm:text-xs
                        font-semibold
                        flex items-center
                        justify-center
                        gap-1.5
                      "
                    >
                      <Phone className="w-3 h-3" />
                      <span>WhatsApp Client</span>
                    </a>

                    {/* Gmail */}
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                        lead.email
                      )}&su=${encodeURIComponent(
                        `Project Proposal - ${
                          lead.businessName || lead.businessNiche
                        } (Abhishek Digital)`
                      )}&body=${encodeURIComponent(
                        `Hi ${lead.name},

Thank you for reaching out to Abhishek Digital regarding ${lead.businessNiche}.

Best regards,
Abhishek
+91 9156075536
abhishekkuntare02@gmail.com`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        min-h-9
                        px-2.5 py-2
                        rounded-lg
                        bg-cyan-500/15
                        hover:bg-cyan-500/25
                        border border-cyan-500/30
                        text-cyan-300
                        text-[10px] sm:text-xs
                        font-semibold
                        flex items-center
                        justify-center
                        gap-1.5
                      "
                    >
                      <Mail className="w-3 h-3" />
                      <span>Reply via Gmail</span>
                    </a>

                    {/* Copy */}
                    <button
                      type="button"
                      onClick={() => copyLeadSummary(lead)}
                      className="
                        min-h-9
                        px-2.5 py-2
                        rounded-lg
                        bg-white/5
                        hover:bg-white/10
                        text-slate-300
                        text-[10px] sm:text-xs
                        font-medium
                        flex items-center
                        justify-center
                        gap-1.5
                      "
                    >
                      {copiedLeadId === lead.id ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">
                            Copied!
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-400" />
                          <span>Copy Summary</span>
                        </>
                      )}
                    </button>

                  </div>

                </div>
              ))}

            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              No leads matching current filter.
            </div>
          )}

        </div>
      )}

      {/* Keep your existing email_logs / analytics / niches / settings
          sections below this point. They will now scroll correctly. */}

    </div>

    {/* ───────────────── FOOTER ───────────────── */}
    <div
      className="
        shrink-0
        px-4 py-3
        sm:px-6 sm:py-4
        lg:p-6

        bg-[#080a10]
        border-t border-white/10

        flex flex-col
        sm:flex-row
        sm:items-center
        sm:justify-between
        gap-2.5
      "
    >
      <span className="text-[10px] sm:text-xs text-slate-400 text-center sm:text-left leading-relaxed">
        Abhishek Studio • Secure Workspace Administration
      </span>

      <button
        type="button"
        onClick={onClose}
        className="
          w-full
          sm:w-auto
          min-h-10
          px-4 py-2
          rounded-xl
          bg-white/10
          hover:bg-white/20
          text-white
          text-xs
          font-semibold
          flex items-center
          justify-center
          transition-all
          active:scale-[0.98]
        "
      >
        Close Portal
      </button>
    </div>

  </div>
</div>
  );
};
