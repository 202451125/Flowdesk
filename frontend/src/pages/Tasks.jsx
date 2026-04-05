import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box, Typography, TextField, Button, MenuItem,
  Avatar, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import AddRoundedIcon        from "@mui/icons-material/AddRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon       from "@mui/icons-material/EditRounded";
import CloseRoundedIcon      from "@mui/icons-material/CloseRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

const COLUMNS = [
  { key: "TO_DO",       label: "To Do",       color: "#94a3b8", bg: "#f8faff", border: "#e2e8f0", dot: "#94a3b8", headerBg: "linear-gradient(90deg,#f1f5f9,#e2e8f0)" },
  { key: "IN_PROGRESS", label: "In Progress", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe", dot: "#2563eb", headerBg: "linear-gradient(90deg,#eff6ff,#dbeafe)" },
  { key: "DONE",        label: "Done",        color: "#059669", bg: "#f0fdf4", border: "#bbf7d0", dot: "#059669", headerBg: "linear-gradient(90deg,#f0fdf4,#dcfce7)" },
];

const PRIORITY_STYLES = {
  HIGH:   { bg: "#fee2e2", color: "#dc2626", dot: "#ef4444" },
  MEDIUM: { bg: "#fef9c3", color: "#ca8a04", dot: "#eab308" },
  LOW:    { bg: "#dcfce7", color: "#16a34a", dot: "#22c55e" },
};

const FIELD_SX = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px", fontSize: 14, background: "#f8fafc",
    "& fieldset": { borderColor: "#e2e8f0" },
    "&:hover fieldset": { borderColor: "#93c5fd" },
    "&.Mui-focused fieldset": { borderColor: "#2563eb", borderWidth: "2px" },
  },
  "& .MuiOutlinedInput-input": { py: 1.4 },
};

export default function Tasks() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [tasks, setTasks]         = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm]   = useState(false);

  // Add form
  const [addForm, setAddForm] = useState({ title: "", priority: "MEDIUM", assigned: "", deadline: "" });

  // Edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ id: null, title: "", priority: "MEDIUM", assigned: "", deadline: "" });

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => { fetchTasks(); fetchEmployees(); }, []);

  const fetchTasks     = async () => { const r = await axios.get("http://127.0.0.1:5000/tasks");     setTasks(r.data); };
  const fetchEmployees = async () => { const r = await axios.get("http://127.0.0.1:5000/employees"); setEmployees(r.data); };

  /* ── ADD ── */
  const addTask = async () => {
    if (!addForm.title.trim()) return;
    await axios.post("http://127.0.0.1:5000/tasks", {
      title: addForm.title, priority: addForm.priority,
      assigned_to: addForm.assigned, deadline: addForm.deadline,
    });
    setAddForm({ title: "", priority: "MEDIUM", assigned: "", deadline: "" });
    setShowForm(false);
    fetchTasks();
  };

  /* ── EDIT ── */
  const openEdit = (task) => {
    setEditForm({
      id: task.id, title: task.title, priority: task.priority,
      assigned: task.assigned_to || "", deadline: task.deadline || "",
    });
    setEditOpen(true);
  };

  const handleEdit = async () => {
    await axios.put(`http://127.0.0.1:5000/tasks/${editForm.id}`, {
      title: editForm.title, priority: editForm.priority,
      assigned_to: editForm.assigned, deadline: editForm.deadline,
    });
    setEditOpen(false);
    fetchTasks();
  };

  /* ── DELETE ── */
  const confirmDelete = async () => {
    await axios.delete(`http://127.0.0.1:5000/tasks/${deleteTarget.id}`);
    setDeleteTarget(null);
    fetchTasks();
  };

  /* ── DRAG & DROP ── */
  const updateStatus  = async (taskId, status) => { await axios.put(`http://127.0.0.1:5000/tasks/${taskId}`, { status }); fetchTasks(); };
  const handleDrop    = (e, status)  => { const id = e.dataTransfer.getData("taskId"); updateStatus(id, status); };
  const handleDragStart = (e, id)   => { e.dataTransfer.setData("taskId", id); };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f0f4ff", fontFamily: "'DM Sans', sans-serif" }}>
      <Sidebar />

      <Box sx={{ marginLeft: "240px", width: "100%" }}>

        {/* Topbar */}
        <Box sx={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(240,244,255,0.88)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(37,99,235,0.08)", px: 4, py: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.5px" }}>Task Board</Typography>
            <Typography sx={{ fontSize: 12.5, color: "#64748b", mt: 0.2 }}>Drag and drop to update task status</Typography>
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

          {/* Top action row */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              {COLUMNS.map((col) => (
                <Box key={col.key} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: col.dot }} />
                  <Typography sx={{ fontSize: 12.5, color: "#64748b", fontWeight: 500 }}>
                    {col.label} ({tasks.filter((t) => t.status === col.key).length})
                  </Typography>
                </Box>
              ))}
            </Box>
            <Button onClick={() => setShowForm(!showForm)} startIcon={<AddRoundedIcon />} variant="contained"
              sx={{ background: "linear-gradient(90deg,#2563eb,#38bdf8)", borderRadius: "12px", textTransform: "none", fontWeight: 700, px: 3, boxShadow: "0 4px 14px rgba(37,99,235,0.3)" }}>
              New Task
            </Button>
          </Box>

          {/* Add Task form */}
          {showForm && (
            <Box sx={{ background: "#fff", borderRadius: "20px", p: 3, mb: 3, boxShadow: "0 2px 16px rgba(37,99,235,0.1)", border: "1.5px solid rgba(37,99,235,0.1)" }}>
              <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#0f172a", mb: 2 }}>New Task</Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 2 }}>
                <TextField label="Task Title" value={addForm.title} onChange={(e) => setAddForm((p) => ({ ...p, title: e.target.value }))} size="small" sx={FIELD_SX} />
                <TextField select label="Priority" value={addForm.priority} onChange={(e) => setAddForm((p) => ({ ...p, priority: e.target.value }))} size="small" sx={FIELD_SX}>
                  {["LOW","MEDIUM","HIGH"].map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}
                </TextField>
                <TextField select label="Assign To" value={addForm.assigned} onChange={(e) => setAddForm((p) => ({ ...p, assigned: e.target.value }))} size="small" sx={FIELD_SX}>
                  {employees.map((e) => <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>)}
                </TextField>
                <TextField type="date" value={addForm.deadline} onChange={(e) => setAddForm((p) => ({ ...p, deadline: e.target.value }))} size="small" sx={FIELD_SX} />
              </Box>
              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <Button onClick={addTask} variant="contained" sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700, background: "linear-gradient(90deg,#2563eb,#38bdf8)", px: 3 }}>Add Task</Button>
                <Button onClick={() => setShowForm(false)} sx={{ borderRadius: "10px", textTransform: "none", color: "#64748b" }}>Cancel</Button>
              </Box>
            </Box>
          )}

          {/* Kanban board */}
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3 }}>
            {COLUMNS.map((col) => (
              <Box key={col.key} onDrop={(e) => handleDrop(e, col.key)} onDragOver={(e) => e.preventDefault()}
                sx={{ background: col.bg, borderRadius: "20px", border: `1.5px solid ${col.border}`, minHeight: 400, display: "flex", flexDirection: "column", overflow: "hidden" }}>

                {/* Column header */}
                <Box sx={{ px: 3, py: 2, background: col.headerBg, borderBottom: `1.5px solid ${col.border}` }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: col.dot }} />
                      <Typography sx={{ fontWeight: 700, fontSize: 14, color: col.color }}>{col.label}</Typography>
                    </Box>
                    <Box sx={{ background: col.color, color: "#fff", borderRadius: "8px", px: 1.2, py: 0.2 }}>
                      <Typography sx={{ fontSize: 11, fontWeight: 700 }}>
                        {tasks.filter((t) => t.status === col.key).length}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Task cards */}
                <Box sx={{ p: 2, flex: 1 }}>
                  {tasks.filter((t) => t.status === col.key).map((task) => {
                    const ps = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.MEDIUM;
                    return (
                      <Box
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        sx={{ background: "#fff", borderRadius: "14px", p: 2, mb: 2, cursor: "grab", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", border: "1.5px solid rgba(0,0,0,0.04)", transition: "all 0.2s", "&:hover": { transform: "translateY(-2px)", boxShadow: "0 6px 20px rgba(37,99,235,0.12)" }, "&:active": { cursor: "grabbing" } }}
                      >
                        {/* Drag handle + title */}
                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                          <DragIndicatorRoundedIcon sx={{ color: "#cbd5e1", fontSize: 16, mt: 0.3, flexShrink: 0 }} />
                          <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: "#1e293b", lineHeight: 1.4, flex: 1 }}>
                            {task.title}
                          </Typography>
                        </Box>

                        {/* Priority badge */}
                        <Box sx={{ mt: 1.5, display: "flex", alignItems: "center", gap: 0.5, background: ps.bg, borderRadius: "6px", px: 1, py: 0.3, width: "fit-content" }}>
                          <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: ps.dot }} />
                          <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: ps.color }}>{task.priority}</Typography>
                        </Box>

                        {/* Assignee + deadline */}
                        <Box sx={{ mt: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                            <Avatar sx={{ width: 22, height: 22, fontSize: 10, fontWeight: 700, background: `hsl(${(task.employee_name?.charCodeAt(0) || 85) * 5},60%,55%)` }}>
                              {task.employee_name?.[0] || "?"}
                            </Avatar>
                            <Typography sx={{ fontSize: 11.5, color: "#64748b", fontWeight: 500 }}>
                              {task.employee_name || "Unassigned"}
                            </Typography>
                          </Box>
                          {task.deadline && (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.4 }}>
                              <CalendarTodayRoundedIcon sx={{ fontSize: 11, color: "#94a3b8" }} />
                              <Typography sx={{ fontSize: 11, color: "#94a3b8" }}>{task.deadline}</Typography>
                            </Box>
                          )}
                        </Box>

                        {/* Edit + Delete buttons */}
                        <Box sx={{ display: "flex", gap: 0.8, mt: 1.5, pt: 1.5, borderTop: "1px solid #f1f5f9" }}>
                          <Box
                            onClick={(e) => { e.stopPropagation(); openEdit(task); }}
                            sx={{ display: "flex", alignItems: "center", gap: 0.5, px: 1.2, py: 0.5, borderRadius: "7px", background: "#eff6ff", cursor: "pointer", "&:hover": { background: "#dbeafe" }, transition: "background 0.15s" }}
                          >
                            <EditRoundedIcon sx={{ fontSize: 12, color: "#2563eb" }} />
                            <Typography sx={{ fontSize: 11, fontWeight: 600, color: "#2563eb" }}>Edit</Typography>
                          </Box>
                          <Box
                            onClick={(e) => { e.stopPropagation(); setDeleteTarget({ id: task.id, title: task.title }); }}
                            sx={{ display: "flex", alignItems: "center", gap: 0.5, px: 1.2, py: 0.5, borderRadius: "7px", background: "#fff1f2", cursor: "pointer", "&:hover": { background: "#fee2e2" }, transition: "background 0.15s" }}
                          >
                            <DeleteOutlineRoundedIcon sx={{ fontSize: 12, color: "#f87171" }} />
                            <Typography sx={{ fontSize: 11, fontWeight: 600, color: "#f87171" }}>Delete</Typography>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}

                  {tasks.filter((t) => t.status === col.key).length === 0 && (
                    <Box sx={{ textAlign: "center", py: 4, color: "#cbd5e1" }}>
                      <Typography sx={{ fontSize: 12.5 }}>Drop tasks here</Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* ── EDIT TASK MODAL ── */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} PaperProps={{ sx: { borderRadius: "20px", width: 440, p: 1 } }}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 0 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 17, color: "#0f172a" }}>Edit Task</Typography>
          <IconButton onClick={() => setEditOpen(false)} size="small" sx={{ color: "#94a3b8" }}><CloseRoundedIcon fontSize="small" /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {[{ label: "Task Title", key: "title", type: "text" }].map((f) => (
            <Box key={f.key} sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: "#374151", mb: 0.7 }}>{f.label}</Typography>
              <TextField fullWidth value={editForm[f.key]} onChange={(e) => setEditForm((p) => ({ ...p, [f.key]: e.target.value }))} sx={FIELD_SX} />
            </Box>
          ))}
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2 }}>
            <Box>
              <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: "#374151", mb: 0.7 }}>Priority</Typography>
              <TextField select fullWidth value={editForm.priority} onChange={(e) => setEditForm((p) => ({ ...p, priority: e.target.value }))} sx={FIELD_SX}>
                {["LOW","MEDIUM","HIGH"].map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}
              </TextField>
            </Box>
            <Box>
              <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: "#374151", mb: 0.7 }}>Deadline</Typography>
              <TextField type="date" fullWidth value={editForm.deadline} onChange={(e) => setEditForm((p) => ({ ...p, deadline: e.target.value }))} sx={FIELD_SX} />
            </Box>
          </Box>
          <Box>
            <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: "#374151", mb: 0.7 }}>Assign To</Typography>
            <TextField select fullWidth value={editForm.assigned} onChange={(e) => setEditForm((p) => ({ ...p, assigned: e.target.value }))} sx={FIELD_SX}>
              {employees.map((e) => <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>)}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={() => setEditOpen(false)} sx={{ borderRadius: "10px", textTransform: "none", color: "#64748b" }}>Cancel</Button>
          <Button onClick={handleEdit} variant="contained"
            sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700, background: "linear-gradient(90deg,#2563eb,#38bdf8)", px: 3 }}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── DELETE TASK CONFIRM ── */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} PaperProps={{ sx: { borderRadius: "20px", width: 380, p: 1 } }}>
        <DialogContent sx={{ pt: 3, textAlign: "center" }}>
          <Box sx={{ width: 56, height: 56, borderRadius: "16px", background: "#fff1f2", display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 2 }}>
            <WarningAmberRoundedIcon sx={{ color: "#f87171", fontSize: 28 }} />
          </Box>
          <Typography sx={{ fontWeight: 800, fontSize: 17, color: "#0f172a", mb: 1 }}>Delete Task?</Typography>
          <Typography sx={{ fontSize: 13.5, color: "#64748b" }}>
            Are you sure you want to delete <strong>"{deleteTarget?.title}"</strong>? This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1, justifyContent: "center" }}>
          <Button onClick={() => setDeleteTarget(null)} sx={{ borderRadius: "10px", textTransform: "none", color: "#64748b", border: "1.5px solid #e2e8f0", px: 3 }}>Cancel</Button>
          <Button onClick={confirmDelete} variant="contained"
            sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 700, background: "#ef4444", px: 3, "&:hover": { background: "#dc2626" } }}>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}