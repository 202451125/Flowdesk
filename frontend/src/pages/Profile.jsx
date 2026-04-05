import { useNavigate } from "react-router-dom";
import { Box, Typography, Avatar, Chip, Divider, LinearProgress } from "@mui/material";
import Sidebar from "../components/Sidebar";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import PendingRoundedIcon from "@mui/icons-material/PendingRounded";



const SKILLS = ["React", "UI Design", "Team Lead", "Flask", "MySQL", "Agile"];

const ACTIVITY = [
  { icon: <CheckCircleRoundedIcon sx={{ fontSize: 15, color: "#22c55e" }} />, text: "Completed task 'Design new dashboard'", time: "2h ago" },
  { icon: <AccessTimeRoundedIcon sx={{ fontSize: 15, color: "#2563eb" }} />, text: "Started task 'API integration'", time: "5h ago" },
  { icon: <PendingRoundedIcon sx={{ fontSize: 15, color: "#f59e0b" }} />, text: "Task 'Employee module' moved to review", time: "Yesterday" },
  { icon: <CheckCircleRoundedIcon sx={{ fontSize: 15, color: "#22c55e" }} />, text: "Completed 'Database schema'", time: "2 days ago" },
];

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const INFO_ROWS = [
    { icon: <EmailRoundedIcon sx={{ fontSize: 16, color: "#2563eb" }} />, label: "Email", value: user?.email || "—" },
    { icon: <BadgeRoundedIcon sx={{ fontSize: 16, color: "#7c3aed" }} />, label: "Username", value: user?.name || "—" },
    { icon: <WorkRoundedIcon sx={{ fontSize: 16, color: "#059669" }} />, label: "Role", value: user?.role || "Employee" },
    { icon: <CalendarMonthRoundedIcon sx={{ fontSize: 16, color: "#d97706" }} />, label: "Joined", value: "March 2024" },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f0f4ff", fontFamily: "'DM Sans', sans-serif" }}>

      <Sidebar />

      {/* MAIN */}
      <Box sx={{ marginLeft: "240px", width: "100%" }}>

        {/* TOPBAR */}
        <Box sx={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(240,244,255,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(37,99,235,0.08)", px: 4, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}>My Profile</Typography>
            <Typography sx={{ fontSize: 12.5, color: "#64748b", mt: 0.2 }}>View your account overview</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box onClick={() => navigate("/notifications")} sx={{ width: 40, height: 40, borderRadius: "12px", background: "#fff", border: "1.5px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", "&:hover": { borderColor: "#2563eb" } }}>
              <NotificationsNoneRoundedIcon sx={{ color: "#475569", fontSize: 20 }} />
              <Box sx={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: "50%", background: "#ef4444", border: "2px solid #f0f4ff" }} />
            </Box>
            <Avatar onClick={() => navigate("/profile")} sx={{ width: 40, height: 40, background: "linear-gradient(135deg,#2563eb,#38bdf8)", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              {user?.name?.[0]?.toUpperCase() || "U"}
            </Avatar>
          </Box>
        </Box>

        <Box sx={{ p: 4 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 3, alignItems: "start" }}>

            {/* LEFT — Profile card */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

              {/* Hero card */}
              <Box sx={{ background: "#fff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 2px 16px rgba(37,99,235,0.07)", border: "1.5px solid rgba(37,99,235,0.07)" }}>
                {/* Banner */}
                <Box sx={{ height: 90, background: "linear-gradient(135deg,#1e3a8a,#2563eb,#38bdf8)", position: "relative" }}>
                  <Box sx={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                </Box>
                <Box sx={{ px: 3, pb: 3 }}>
                  <Avatar sx={{ width: 72, height: 72, background: "linear-gradient(135deg,#2563eb,#38bdf8)", fontSize: 28, fontWeight: 800, border: "4px solid #fff", mt: -4.5, mb: 1.5 }}>
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </Avatar>
                  <Typography sx={{ fontWeight: 800, fontSize: 18, color: "#0f172a" }}>{user?.name || "User"}</Typography>
                  <Typography sx={{ fontSize: 13, color: "#64748b", mb: 1.5 }}>{user?.email || "—"}</Typography>
                  <Chip label={user?.role || "Employee"} size="small"
                    sx={{ background: "linear-gradient(90deg,#eff6ff,#dbeafe)", color: "#2563eb", fontWeight: 700, fontSize: 12 }} />
                </Box>
              </Box>

              {/* Info rows */}
              <Box sx={{ background: "#fff", borderRadius: "20px", p: 3, boxShadow: "0 2px 16px rgba(37,99,235,0.07)", border: "1.5px solid rgba(37,99,235,0.07)" }}>
                <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#0f172a", mb: 2 }}>Account Details</Typography>
                {INFO_ROWS.map((row, i) => (
                  <Box key={row.label}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1.5 }}>
                      <Box sx={{ width: 32, height: 32, borderRadius: "9px", background: "#f8faff", display: "flex", alignItems: "center", justifyContent: "center" }}>{row.icon}</Box>
                      <Box>
                        <Typography sx={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{row.label.toUpperCase()}</Typography>
                        <Typography sx={{ fontSize: 13.5, color: "#1e293b", fontWeight: 600 }}>{row.value}</Typography>
                      </Box>
                    </Box>
                    {i < INFO_ROWS.length - 1 && <Divider sx={{ borderColor: "#f1f5f9" }} />}
                  </Box>
                ))}
              </Box>

              {/* Skills */}
              <Box sx={{ background: "#fff", borderRadius: "20px", p: 3, boxShadow: "0 2px 16px rgba(37,99,235,0.07)", border: "1.5px solid rgba(37,99,235,0.07)" }}>
                <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#0f172a", mb: 2 }}>Skills & Tags</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {SKILLS.map((s) => (
                    <Chip key={s} label={s} size="small"
                      sx={{ background: "#f0f4ff", color: "#2563eb", fontWeight: 600, fontSize: 12, border: "1px solid #dbeafe" }} />
                  ))}
                </Box>
              </Box>
            </Box>

            {/* RIGHT */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

              {/* Stats row */}
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
                {[
                  { label: "Tasks Done", value: "24", color: "#059669", bg: "#f0fdf4", border: "#bbf7d0" },
                  { label: "In Progress", value: "6", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
                  { label: "Performance", value: "92%", color: "#7c3aed", bg: "#fdf4ff", border: "#e9d5ff" },
                ].map((s) => (
                  <Box key={s.label} sx={{ background: s.bg, border: `1.5px solid ${s.border}`, borderRadius: "16px", p: 2.5, textAlign: "center" }}>
                    <Typography sx={{ fontSize: 28, fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</Typography>
                    <Typography sx={{ fontSize: 12.5, color: "#64748b", fontWeight: 500, mt: 0.5 }}>{s.label}</Typography>
                  </Box>
                ))}
              </Box>

              {/* Performance bars */}
              <Box sx={{ background: "#fff", borderRadius: "20px", p: 3.5, boxShadow: "0 2px 16px rgba(37,99,235,0.07)", border: "1.5px solid rgba(37,99,235,0.07)" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
                  <StarRoundedIcon sx={{ fontSize: 18, color: "#f59e0b" }} />
                  <Typography sx={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>Performance Overview</Typography>
                </Box>
                {[
                  { label: "Task Completion", value: 92, color: "#2563eb" },
                  { label: "On-time Delivery", value: 78, color: "#059669" },
                  { label: "Team Collaboration", value: 85, color: "#7c3aed" },
                  { label: "Quality Score", value: 88, color: "#d97706" },
                ].map((bar) => (
                  <Box key={bar.label} sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.8 }}>
                      <Typography sx={{ fontSize: 13, color: "#475569", fontWeight: 500 }}>{bar.label}</Typography>
                      <Typography sx={{ fontSize: 13, fontWeight: 700, color: bar.color }}>{bar.value}%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={bar.value}
                      sx={{ height: 7, borderRadius: 4, background: "#f1f5f9", "& .MuiLinearProgress-bar": { background: bar.color, borderRadius: 4 } }} />
                  </Box>
                ))}
              </Box>

              {/* Activity */}
              <Box sx={{ background: "#fff", borderRadius: "20px", p: 3.5, boxShadow: "0 2px 16px rgba(37,99,235,0.07)", border: "1.5px solid rgba(37,99,235,0.07)" }}>
                <Typography sx={{ fontWeight: 700, fontSize: 15, color: "#0f172a", mb: 2 }}>Recent Activity</Typography>
                {ACTIVITY.map((a, i) => (
                  <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, py: 1.5, borderBottom: i < ACTIVITY.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                    <Box sx={{ width: 28, height: 28, borderRadius: "8px", background: "#f8faff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, mt: 0.2 }}>{a.icon}</Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: 13, color: "#1e293b", fontWeight: 500 }}>{a.text}</Typography>
                      <Typography sx={{ fontSize: 11.5, color: "#94a3b8", mt: 0.3 }}>{a.time}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}