import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Avatar, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";
import Sidebar from "../components/Sidebar";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import PieChartRoundedIcon from "@mui/icons-material/PieChartRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

export default function Reports() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [stats, setStats] = useState({ employees: 0, tasks: 0, projects: 0, completed: 0 });
const WEEKLY_TASKS = [
  { day: "Mon", completed: 4, added: 6 },
  { day: "Tue", completed: 7, added: 5 },
  { day: "Wed", completed: 5, added: 8 },
  { day: "Thu", completed: 9, added: 7 },
  { day: "Fri", completed: 6, added: 4 },
  { day: "Sat", completed: 3, added: 2 },
  { day: "Sun", completed: 2, added: 1 },
];

const MONTHLY_TREND = [
  { month: "Oct", tasks: 28 }, { month: "Nov", tasks: 35 },
  { month: "Dec", tasks: 22 }, { month: "Jan", tasks: 40 },
  { month: "Feb", tasks: 47 }, { month: "Mar", tasks: 38 },
];

const PRIORITY_DATA = [
  { name: "High", value: 8, color: "#ef4444" },
  { name: "Medium", value: 15, color: "#f59e0b" },
  { name: "Low", value: 10, color: "#22c55e" },
];

const STATUS_DATA = [
  { name: "To Do", value: 12, color: "#94a3b8" },
  { name: "In Progress", value: 9, color: "#2563eb" },
  { name: "Done", value: 22, color: "#059669" },
];

const CUSTOM_TOOLTIP = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{ background: "#fff", border: "1.5px solid #e2e8f0", borderRadius: "12px", p: 1.5, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
        <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#0f172a", mb: 0.5 }}>{label}</Typography>
        {payload.map((p) => (
          <Typography key={p.name} sx={{ fontSize: 12, color: p.color, fontWeight: 500 }}>
            {p.name}: {p.value}
          </Typography>
        ))}
      </Box>
    );
  }
  return null;
};

function ChartCard({ icon, title, subtitle, children }) {
  return (
    <Box sx={{ background: "#fff", borderRadius: "20px", p: 3, boxShadow: "0 2px 16px rgba(37,99,235,0.07)", border: "1.5px solid rgba(37,99,235,0.07)" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
        <Box sx={{ width: 36, height: 36, borderRadius: "11px", background: "linear-gradient(135deg,#2563eb,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{title}</Typography>
          {subtitle && <Typography sx={{ fontSize: 11.5, color: "#94a3b8" }}>{subtitle}</Typography>}
        </Box>
      </Box>
      {children}
    </Box>
  );
}

export default function Reports() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [stats, setStats] = useState({ employees: 0, tasks: 0, projects: 0, completed: 0 });

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/dashboard-stats").then((r) => setStats(r.data)).catch(() => {});
  }, []);

  const completionRate = stats.tasks > 0 ? Math.round((stats.completed / stats.tasks) * 100) : 0;

  const SUMMARY = [
    { label: "Total Tasks", value: stats.tasks, change: "+12%", color: "#2563eb", bg: "#eff6ff" },
    { label: "Completed", value: stats.completed, change: "+8%", color: "#059669", bg: "#f0fdf4" },
    { label: "Completion Rate", value: `${completionRate}%`, change: "+5%", color: "#7c3aed", bg: "#fdf4ff" },
    { label: "Employees", value: stats.employees, change: "+2", color: "#d97706", bg: "#fffbeb" },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f0f4ff", fontFamily: "'DM Sans', sans-serif" }}>

      <Sidebar />

      {/* MAIN */}
      <Box sx={{ marginLeft: "240px", width: "100%" }}>

        {/* TOPBAR */}
        <Box sx={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(240,244,255,0.88)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(37,99,235,0.08)", px: 4, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}>Reports & Analytics</Typography>
            <Typography sx={{ fontSize: 12.5, color: "#64748b", mt: 0.2 }}>Track your team's performance and progress</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Chip label="This Month" size="small" sx={{ background: "#eff6ff", color: "#2563eb", fontWeight: 600, fontSize: 12 }} />
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

          {/* Summary KPI cards */}
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2.5, mb: 3 }}>
            {SUMMARY.map((s) => (
              <Box key={s.label} sx={{ background: "#fff", borderRadius: "18px", p: 2.5, boxShadow: "0 2px 14px rgba(37,99,235,0.07)", border: "1.5px solid rgba(37,99,235,0.07)", transition: "transform 0.2s", "&:hover": { transform: "translateY(-3px)" } }}>
                <Typography sx={{ fontSize: 11.5, color: "#94a3b8", fontWeight: 700, letterSpacing: "0.3px", mb: 0.8 }}>{s.label.toUpperCase()}</Typography>
                <Typography sx={{ fontSize: 30, fontWeight: 900, color: "#0f172a", lineHeight: 1, mb: 1 }}>{s.value}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <ArrowUpwardRoundedIcon sx={{ fontSize: 12, color: "#059669" }} />
                  <Typography sx={{ fontSize: 12, color: "#059669", fontWeight: 600 }}>{s.change} this month</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Row 1: Bar chart + Pie chart */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 3, mb: 3 }}>
            <ChartCard icon={<BarChartRoundedIcon sx={{ color: "#fff", fontSize: 18 }} />} title="Weekly Task Activity" subtitle="Tasks completed vs added this week">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={WEEKLY_TASKS} barSize={12} barCategoryGap="35%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CUSTOM_TOOLTIP />} />
                  <Bar dataKey="completed" name="Completed" fill="#2563eb" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="added" name="Added" fill="#bfdbfe" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <Box sx={{ display: "flex", gap: 2.5, mt: 1 }}>
                {[{ color: "#2563eb", label: "Completed" }, { color: "#bfdbfe", label: "Added" }].map((l) => (
                  <Box key={l.label} sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "3px", background: l.color }} />
                    <Typography sx={{ fontSize: 12, color: "#64748b" }}>{l.label}</Typography>
                  </Box>
                ))}
              </Box>
            </ChartCard>

            <ChartCard icon={<PieChartRoundedIcon sx={{ color: "#fff", fontSize: 18 }} />} title="Tasks by Priority" subtitle="Current distribution">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={PRIORITY_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                    {PRIORITY_DATA.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(val, name) => [`${val} tasks`, name]} />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
                {PRIORITY_DATA.map((d) => (
                  <Box key={d.name} sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: d.color }} />
                    <Typography sx={{ fontSize: 12, color: "#64748b" }}>{d.name} ({d.value})</Typography>
                  </Box>
                ))}
              </Box>
            </ChartCard>
          </Box>

          {/* Row 2: Area chart + Status pie */}
          <Box sx={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 3 }}>
            <ChartCard icon={<TimelineRoundedIcon sx={{ color: "#fff", fontSize: 18 }} />} title="Monthly Task Trend" subtitle="Total tasks over the last 6 months">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={MONTHLY_TREND}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CUSTOM_TOOLTIP />} />
                  <Area type="monotone" dataKey="tasks" name="Tasks" stroke="#2563eb" strokeWidth={2.5} fill="url(#areaGrad)" dot={{ fill: "#2563eb", r: 4 }} activeDot={{ r: 6 }} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard icon={<PieChartRoundedIcon sx={{ color: "#fff", fontSize: 18 }} />} title="Tasks by Status" subtitle="Current board status split">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={STATUS_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                    {STATUS_DATA.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(val, name) => [`${val} tasks`, name]} />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
                {STATUS_DATA.map((d) => (
                  <Box key={d.name} sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: d.color }} />
                    <Typography sx={{ fontSize: 12, color: "#64748b" }}>{d.name} ({d.value})</Typography>
                  </Box>
                ))}
              </Box>
            </ChartCard>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}}