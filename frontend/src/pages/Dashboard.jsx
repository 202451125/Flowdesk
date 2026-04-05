import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Avatar, LinearProgress, Chip } from "@mui/material";

import Sidebar from "../components/Sidebar";

import PeopleAltRoundedIcon         from "@mui/icons-material/PeopleAltRounded";
import AssignmentRoundedIcon         from "@mui/icons-material/AssignmentRounded";
import FolderRoundedIcon             from "@mui/icons-material/FolderRounded";
import CheckCircleRoundedIcon        from "@mui/icons-material/CheckCircleRounded";
import NotificationsNoneRoundedIcon  from "@mui/icons-material/NotificationsNoneRounded";
import SearchRoundedIcon             from "@mui/icons-material/SearchRounded";
import MoreHorizRoundedIcon          from "@mui/icons-material/MoreHorizRounded";
import ArrowUpwardRoundedIcon        from "@mui/icons-material/ArrowUpwardRounded";
import ChevronLeftRoundedIcon        from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon       from "@mui/icons-material/ChevronRightRounded";
import CloseRoundedIcon              from "@mui/icons-material/CloseRounded";

/* ── Mini Calendar ── */
function MiniCalendar() {
  const today = new Date();
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const year = current.getFullYear();
  const month = current.getMonth();
  const monthName = current.toLocaleString("default", { month: "long" });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);
  const isToday = (d) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <Box sx={{ background: "linear-gradient(135deg,#1e3a8a,#2563eb)", borderRadius: "20px", p: 3, color: "#fff", boxShadow: "0 6px 24px rgba(37,99,235,0.28)" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5 }}>
        <Typography sx={{ fontWeight: 800, fontSize: 15 }}>{monthName} {year}</Typography>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Box onClick={() => setCurrent(new Date(year, month - 1, 1))} sx={{ width: 28, height: 28, borderRadius: "8px", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", "&:hover": { background: "rgba(255,255,255,0.22)" } }}>
            <ChevronLeftRoundedIcon sx={{ fontSize: 16 }} />
          </Box>
          <Box onClick={() => setCurrent(new Date(year, month + 1, 1))} sx={{ width: 28, height: 28, borderRadius: "8px", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", "&:hover": { background: "rgba(255,255,255,0.22)" } }}>
            <ChevronRightRoundedIcon sx={{ fontSize: 16 }} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", mb: 1 }}>
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
          <Typography key={d} sx={{ textAlign: "center", fontSize: 10.5, fontWeight: 700, opacity: 0.6 }}>{d}</Typography>
        ))}
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 0.3 }}>
        {blanks.map((b) => <Box key={`b${b}`} />)}
        {days.map((d) => (
          <Box key={d} sx={{ aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", cursor: "pointer", background: isToday(d) ? "rgba(255,255,255,0.95)" : "transparent", "&:hover": { background: isToday(d) ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.15)" }, transition: "background 0.15s" }}>
            <Typography sx={{ fontSize: 12, fontWeight: isToday(d) ? 800 : 400, color: isToday(d) ? "#2563eb" : "rgba(255,255,255,0.9)" }}>{d}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid rgba(255,255,255,0.15)" }}>
        <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
          📅 Today is {today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </Typography>
      </Box>
    </Box>
  );
}

const PRIORITY_COLOR = {
  HIGH:   { bg: "#fee2e2", color: "#dc2626" },
  MEDIUM: { bg: "#fef9c3", color: "#ca8a04" },
  LOW:    { bg: "#dcfce7", color: "#16a34a" },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [stats, setStats]                     = useState({ employees: 0, tasks: 0, projects: 0, completed: 0 });
  const [allTasks, setAllTasks]               = useState([]);
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [search, setSearch]                   = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/dashboard-stats").then((r) => setStats(r.data)).catch(() => {});
    axios.get("http://127.0.0.1:5000/tasks").then((r) => setAllTasks(r.data)).catch(() => {});
    axios.get("http://127.0.0.1:5000/employees").then((r) => setRecentEmployees(r.data.slice(0, 4))).catch(() => {});
  }, []);

  const completionRate = stats.tasks > 0 ? Math.round((stats.completed / stats.tasks) * 100) : 0;

  const filteredTasks = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allTasks.slice(0, 5);
    return allTasks.filter((t) =>
      t.title?.toLowerCase().includes(q) ||
      t.employee_name?.toLowerCase().includes(q) ||
      t.priority?.toLowerCase().includes(q)
    );
  }, [search, allTasks]);

  const STAT_CARDS = [
    { title: "Total Employees", value: stats.employees, icon: <PeopleAltRoundedIcon />,   gradient: "linear-gradient(135deg,#2563eb,#60a5fa)", badge: "+2 this month", path: "/employees" },
    { title: "Total Tasks",     value: stats.tasks,     icon: <AssignmentRoundedIcon />,  gradient: "linear-gradient(135deg,#7c3aed,#a78bfa)", badge: "+5 this week",  path: "/tasks" },
    { title: "Projects",        value: stats.projects,  icon: <FolderRoundedIcon />,      gradient: "linear-gradient(135deg,#0891b2,#67e8f9)", badge: "Active",        path: "/reports" },
    { title: "Completed",       value: stats.completed, icon: <CheckCircleRoundedIcon />, gradient: "linear-gradient(135deg,#059669,#6ee7b7)", badge: `${completionRate}% rate`, path: "/tasks" },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f0f4ff", fontFamily: "'DM Sans', sans-serif" }}>

      <Sidebar />

      <Box sx={{ marginLeft: "240px", width: "100%" }}>

        {/* Topbar */}
        <Box sx={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(240,244,255,0.88)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(37,99,235,0.08)", px: 4, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}>
              Welcome back, {user?.name?.split(" ")[0] || "there"} 👋
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: "#64748b", mt: 0.2 }}>
              Here's what's happening with your team today.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Search */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: "12px", px: 2, py: 1, width: 230, "&:focus-within": { borderColor: "#2563eb" }, transition: "border-color 0.2s" }}>
              <SearchRoundedIcon sx={{ color: "#94a3b8", fontSize: 18, flexShrink: 0 }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                style={{ border: "none", outline: "none", fontSize: 13, color: "#475569", background: "transparent", width: "100%" }}
              />
              {search && (
                <CloseRoundedIcon onClick={() => setSearch("")} sx={{ color: "#94a3b8", fontSize: 16, cursor: "pointer" }} />
              )}
            </Box>

            {/* Bell → /notifications */}
            <Box onClick={() => navigate("/notifications")} sx={{ width: 40, height: 40, borderRadius: "12px", background: "#fff", border: "1.5px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", "&:hover": { borderColor: "#2563eb" }, transition: "border-color 0.2s" }}>
              <NotificationsNoneRoundedIcon sx={{ color: "#475569", fontSize: 20 }} />
              <Box sx={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: "50%", background: "#ef4444", border: "2px solid #f0f4ff" }} />
            </Box>

            {/* Avatar → /profile */}
            <Avatar onClick={() => navigate("/profile")} sx={{ width: 40, height: 40, background: "linear-gradient(135deg,#2563eb,#38bdf8)", fontSize: 15, fontWeight: 700, cursor: "pointer", "&:hover": { opacity: 0.85 }, transition: "opacity 0.2s" }}>
              {user?.name?.[0]?.toUpperCase() || "U"}
            </Avatar>
          </Box>
        </Box>

        {/* Body */}
        <Box sx={{ p: 4 }}>

          {/* Stat cards — clickable */}
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2.5, mb: 3 }}>
            {STAT_CARDS.map((card) => (
              <Box
                key={card.title}
                onClick={() => navigate(card.path)}
                sx={{ background: "#fff", borderRadius: "20px", p: 3, boxShadow: "0 2px 16px rgba(37,99,235,0.07)", border: "1.5px solid rgba(37,99,235,0.07)", position: "relative", overflow: "hidden", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", "&:hover": { transform: "translateY(-4px)", boxShadow: "0 12px 32px rgba(37,99,235,0.15)" } }}
              >
                <Box sx={{ position: "absolute", top: -20, right: -20, width: 90, height: 90, borderRadius: "50%", background: card.gradient, opacity: 0.12, filter: "blur(10px)" }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box>
                    <Typography sx={{ fontSize: 11.5, color: "#94a3b8", fontWeight: 700, letterSpacing: "0.4px", mb: 0.8, textTransform: "uppercase" }}>{card.title}</Typography>
                    <Typography sx={{ fontSize: 34, fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>{card.value}</Typography>
                  </Box>
                  <Box sx={{ width: 44, height: 44, borderRadius: "14px", background: card.gradient, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 4px 14px rgba(37,99,235,0.25)" }}>
                    {card.icon}
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 2 }}>
                  <ArrowUpwardRoundedIcon sx={{ fontSize: 13, color: "#059669" }} />
                  <Typography sx={{ fontSize: 12, color: "#059669", fontWeight: 600 }}>{card.badge}</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Bottom grid */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>

            {/* Recent / Searched Tasks */}
            <Box sx={{ background: "#fff", borderRadius: "20px", p: 3, boxShadow: "0 2px 16px rgba(37,99,235,0.07)", border: "1.5px solid rgba(37,99,235,0.07)" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2.5 }}>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>
                    {search ? `Results for "${search}"` : "Recent Tasks"}
                  </Typography>
                  {search && (
                    <Typography sx={{ fontSize: 11.5, color: "#94a3b8", mt: 0.3 }}>
                      {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""} found
                    </Typography>
                  )}
                </Box>
                <Box onClick={() => navigate("/tasks")} sx={{ fontSize: 12, color: "#2563eb", cursor: "pointer", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}>
                  View all →
                </Box>
              </Box>

              {filteredTasks.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography sx={{ color: "#94a3b8", fontSize: 13 }}>
                    {search ? "No tasks match your search" : "No tasks yet"}
                  </Typography>
                  {search && (
                    <Box onClick={() => setSearch("")} sx={{ color: "#2563eb", fontSize: 12.5, fontWeight: 600, cursor: "pointer", mt: 1 }}>Clear search</Box>
                  )}
                </Box>
              ) : (
                filteredTasks.map((task) => (
                  <Box
                    key={task.id}
                    onClick={() => navigate("/tasks")}
                    sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 1.5, borderBottom: "1px solid #f1f5f9", "&:last-child": { borderBottom: "none" }, cursor: "pointer", borderRadius: "8px", px: 1, mx: -1, "&:hover": { background: "#f8faff" }, transition: "background 0.15s" }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, background: task.status === "DONE" ? "#059669" : task.status === "IN_PROGRESS" ? "#2563eb" : "#94a3b8" }} />
                      <Box>
                        <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: "#1e293b" }}>{task.title}</Typography>
                        <Typography sx={{ fontSize: 11, color: "#94a3b8" }}>
                          {task.employee_name || "Unassigned"} · Due {task.deadline || "N/A"}
                        </Typography>
                      </Box>
                    </Box>
                    {task.priority && (
                      <Chip label={task.priority} size="small" sx={{ fontSize: 10, fontWeight: 700, height: 20, background: PRIORITY_COLOR[task.priority]?.bg || "#f1f5f9", color: PRIORITY_COLOR[task.priority]?.color || "#475569", border: "none" }} />
                    )}
                  </Box>
                ))
              )}
            </Box>

            {/* Right col */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

              <MiniCalendar />

              {/* Completion rate */}
              <Box sx={{ background: "linear-gradient(135deg,#1e3a8a,#2563eb)", borderRadius: "20px", p: 3, color: "#fff", boxShadow: "0 6px 24px rgba(37,99,235,0.3)", position: "relative", overflow: "hidden" }}>
                <Box sx={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
                <Box sx={{ position: "absolute", bottom: -40, left: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(56,189,248,0.1)" }} />
                <Typography sx={{ fontSize: 13, fontWeight: 600, opacity: 0.8, mb: 1 }}>Task Completion Rate</Typography>
                <Typography sx={{ fontSize: 40, fontWeight: 800, lineHeight: 1, mb: 2 }}>{completionRate}%</Typography>
                <LinearProgress variant="determinate" value={completionRate} sx={{ height: 8, borderRadius: 4, background: "rgba(255,255,255,0.2)", "& .MuiLinearProgress-bar": { background: "linear-gradient(90deg,#38bdf8,#818cf8)", borderRadius: 4 } }} />
                <Typography sx={{ fontSize: 11.5, opacity: 0.7, mt: 1 }}>{stats.completed} of {stats.tasks} tasks completed</Typography>
              </Box>

              {/* Team members */}
              <Box sx={{ background: "#fff", borderRadius: "20px", p: 3, boxShadow: "0 2px 16px rgba(37,99,235,0.07)", border: "1.5px solid rgba(37,99,235,0.07)", flex: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>Team Members</Typography>
                  <Box onClick={() => navigate("/employees")} sx={{ fontSize: 12, color: "#2563eb", cursor: "pointer", fontWeight: 600, "&:hover": { textDecoration: "underline" } }}>
                    See all →
                  </Box>
                </Box>
                {recentEmployees.length === 0 ? (
                  <Typography sx={{ color: "#94a3b8", fontSize: 13, textAlign: "center", py: 2 }}>No employees yet</Typography>
                ) : (
                  recentEmployees.map((emp) => (
                    <Box key={emp.id} onClick={() => navigate("/employees")} sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1.2, borderBottom: "1px solid #f1f5f9", "&:last-child": { borderBottom: "none" }, cursor: "pointer", borderRadius: "8px", px: 1, mx: -1, "&:hover": { background: "#f8faff" }, transition: "background 0.15s" }}>
                      <Avatar sx={{ width: 34, height: 34, background: `hsl(${(emp.name?.charCodeAt(0) || 65) * 5},65%,55%)`, fontSize: 13, fontWeight: 700 }}>
                        {emp.name?.[0]?.toUpperCase()}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{emp.name}</Typography>
                        <Typography sx={{ fontSize: 11, color: "#94a3b8" }}>{emp.department || emp.role}</Typography>
                      </Box>
                      <MoreHorizRoundedIcon sx={{ color: "#cbd5e1", fontSize: 18 }} />
                    </Box>
                  ))
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}