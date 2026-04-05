import { useState } from "react";
import { Box, Typography, Avatar, Chip, Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";



const INITIAL_NOTIFS = [
  { id: 1, type: "task", icon: <AssignmentTurnedInRoundedIcon sx={{ fontSize: 17 }} />, iconColor: "#2563eb", iconBg: "#eff6ff", title: "Task Completed", body: "Ananya marked 'Design new dashboard' as done.", time: "2 min ago", read: false },
  { id: 2, type: "employee", icon: <PersonAddRoundedIcon sx={{ fontSize: 17 }} />, iconColor: "#7c3aed", iconBg: "#fdf4ff", title: "New Employee Added", body: "Ravi Kumar joined the Engineering department.", time: "1 hour ago", read: false },
  { id: 3, type: "warning", icon: <WarningAmberRoundedIcon sx={{ fontSize: 17 }} />, iconColor: "#d97706", iconBg: "#fffbeb", title: "Task Overdue", body: "'API integration' is past its deadline.", time: "3 hours ago", read: false },
  { id: 4, type: "task", icon: <AssignmentTurnedInRoundedIcon sx={{ fontSize: 17 }} />, iconColor: "#059669", iconBg: "#f0fdf4", title: "Task Assigned", body: "You have been assigned 'Write unit tests'.", time: "Yesterday", read: true },
  { id: 5, type: "info", icon: <InfoRoundedIcon sx={{ fontSize: 17 }} />, iconColor: "#0891b2", iconBg: "#ecfeff", title: "System Update", body: "FlowDesk was updated to the latest version.", time: "2 days ago", read: true },
  { id: 6, type: "employee", icon: <CheckCircleRoundedIcon sx={{ fontSize: 17 }} />, iconColor: "#059669", iconBg: "#f0fdf4", title: "Profile Updated", body: "Your profile information was saved successfully.", time: "3 days ago", read: true },
];

const PREF_ROWS = [
  { label: "Task assignments", sub: "When a task is assigned to you", key: "taskAssign" },
  { label: "Task completions", sub: "When a task in your team is completed", key: "taskDone" },
  { label: "New employees", sub: "When someone joins the team", key: "newEmp" },
  { label: "Overdue alerts", sub: "When a task passes its deadline", key: "overdue" },
  { label: "System updates", sub: "FlowDesk feature and version updates", key: "system" },
];

export default function Notifications() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);
  const [activeTab, setActiveTab] = useState("all");
  const [prefs, setPrefs] = useState({ taskAssign: true, taskDone: true, newEmp: false, overdue: true, system: false });


  const markAllRead = () => setNotifs((n) => n.map((x) => ({ ...x, read: true })));
  const markRead = (id) => setNotifs((n) => n.map((x) => x.id === id ? { ...x, read: true } : x));
  const deleteNotif = (id) => setNotifs((n) => n.filter((x) => x.id !== id));

  const unread = notifs.filter((n) => !n.read).length;
  const displayed = activeTab === "all" ? notifs : notifs.filter((n) => !n.read);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f0f4ff", fontFamily: "'DM Sans', sans-serif" }}>

      <Sidebar unreadCount={unread} />

      {/* MAIN */}
      <Box sx={{ marginLeft: "240px", width: "100%" }}>

        {/* TOPBAR */}
        <Box sx={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(240,244,255,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(37,99,235,0.08)", px: 4, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}>Notifications</Typography>
            <Typography sx={{ fontSize: 12.5, color: "#64748b", mt: 0.2 }}>{unread} unread notification{unread !== 1 ? "s" : ""}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ width: 40, height: 40, borderRadius: "12px", background: "#fff", border: "1.5px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
              <NotificationsNoneRoundedIcon sx={{ color: "#475569", fontSize: 20 }} />
              {unread > 0 && <Box sx={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: "50%", background: "#ef4444", border: "2px solid #f0f4ff" }} />}
            </Box>
            <Avatar onClick={() => navigate("/profile")} sx={{ width: 40, height: 40, background: "linear-gradient(135deg,#2563eb,#38bdf8)", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              {user?.name?.[0]?.toUpperCase() || "U"}
            </Avatar>
          </Box>
        </Box>

        <Box sx={{ p: 4, display: "grid", gridTemplateColumns: "1fr 320px", gap: 3, alignItems: "start" }}>

          {/* LEFT — notification feed */}
          <Box>
            {/* Tabs + actions */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                {["all", "unread"].map((tab) => (
                  <Box key={tab} onClick={() => setActiveTab(tab)}
                    sx={{ px: 2.5, py: 1, borderRadius: "10px", cursor: "pointer", fontWeight: 600, fontSize: 13, background: activeTab === tab ? "#2563eb" : "#fff", color: activeTab === tab ? "#fff" : "#64748b", border: "1.5px solid", borderColor: activeTab === tab ? "#2563eb" : "#e2e8f0", transition: "all 0.2s" }}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {tab === "unread" && unread > 0 && (
                      <Box component="span" sx={{ ml: 1, background: activeTab === "unread" ? "rgba(255,255,255,0.25)" : "#eff6ff", color: activeTab === "unread" ? "#fff" : "#2563eb", borderRadius: "6px", px: 0.8, fontSize: 11, fontWeight: 700 }}>
                        {unread}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
              <Box onClick={markAllRead} sx={{ display: "flex", alignItems: "center", gap: 0.8, cursor: "pointer", color: "#2563eb", fontSize: 13, fontWeight: 600, "&:hover": { opacity: 0.7 } }}>
                <DoneAllRoundedIcon sx={{ fontSize: 16 }} />
                Mark all read
              </Box>
            </Box>

            {/* Notification cards */}
            <Box sx={{ background: "#fff", borderRadius: "20px", boxShadow: "0 2px 16px rgba(37,99,235,0.07)", border: "1.5px solid rgba(37,99,235,0.07)", overflow: "hidden" }}>
              {displayed.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 8, color: "#94a3b8" }}>
                  <NotificationsNoneRoundedIcon sx={{ fontSize: 40, mb: 1, opacity: 0.4 }} />
                  <Typography sx={{ fontSize: 14 }}>No notifications here</Typography>
                </Box>
              ) : (
                displayed.map((n, i) => (
                  <Box
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    sx={{
                      display: "flex", alignItems: "flex-start", gap: 2, px: 3, py: 2.2,
                      borderBottom: i < displayed.length - 1 ? "1px solid #f1f5f9" : "none",
                      background: !n.read ? "rgba(37,99,235,0.03)" : "#fff",
                      cursor: "pointer",
                      transition: "background 0.15s",
                      "&:hover": { background: "#f8faff" },
                      position: "relative",
                    }}
                  >
                    {/* Unread dot */}
                    {!n.read && <Box sx={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 7, height: 7, borderRadius: "50%", background: "#2563eb" }} />}

                    <Box sx={{ width: 38, height: 38, borderRadius: "11px", background: n.iconBg, color: n.iconColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, ml: 1 }}>
                      {n.icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: 13.5, fontWeight: !n.read ? 700 : 600, color: "#0f172a" }}>{n.title}</Typography>
                        <Typography sx={{ fontSize: 11.5, color: "#94a3b8" }}>{n.time}</Typography>
                      </Box>
                      <Typography sx={{ fontSize: 13, color: "#64748b", mt: 0.3 }}>{n.body}</Typography>
                    </Box>
                    <Box onClick={(e) => { e.stopPropagation(); deleteNotif(n.id); }}
                      sx={{ color: "#cbd5e1", cursor: "pointer", "&:hover": { color: "#ef4444" }, transition: "color 0.15s", flexShrink: 0 }}>
                      <DeleteOutlineRoundedIcon sx={{ fontSize: 17 }} />
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </Box>

          {/* RIGHT — preferences */}
          <Box sx={{ background: "#fff", borderRadius: "20px", p: 3, boxShadow: "0 2px 16px rgba(37,99,235,0.07)", border: "1.5px solid rgba(37,99,235,0.07)" }}>
            <Typography sx={{ fontWeight: 700, fontSize: 15, color: "#0f172a", mb: 0.5 }}>Preferences</Typography>
            <Typography sx={{ fontSize: 12, color: "#94a3b8", mb: 2.5 }}>Control what you get notified about</Typography>
            {PREF_ROWS.map((row, i) => (
              <Box key={row.key}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 1.5 }}>
                  <Box>
                    <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: "#1e293b" }}>{row.label}</Typography>
                    <Typography sx={{ fontSize: 11.5, color: "#94a3b8" }}>{row.sub}</Typography>
                  </Box>
                  <Switch
                    checked={prefs[row.key]}
                    onChange={(e) => setPrefs((p) => ({ ...p, [row.key]: e.target.checked }))}
                    size="small"
                    sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: "#2563eb" }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: "#2563eb" } }}
                  />
                </Box>
                {i < PREF_ROWS.length - 1 && <Box sx={{ borderBottom: "1px solid #f1f5f9" }} />}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}