import { Router } from "express";
import { getNotes, addNote } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, (_req, res) => {
  res.json({ notes: getNotes() });
});

router.post("/", requireAuth, (req, res) => {
  const { title, body } = req.body || {};
  if (!title || !body) {
    return res.status(400).json({ error: "title and body are required" });
  }
  const note = addNote({ title, body });
  res.status(201).json({ note });
});

export default router;
