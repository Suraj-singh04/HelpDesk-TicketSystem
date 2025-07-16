const express = require("express");
const router = express.Router();
const Ticket = require("../models/ticket");

// Create Ticket
router.post("/", async (req, res) => {
  const ticket = new Ticket(req.body);
  const saved = await ticket.save();
  res.status(201).json(saved);
});

// Get All Tickets
router.get("/", async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
});

// Update Ticket
router.put("/:id", async (req, res) => {
  const updated = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// Delete Ticket
router.delete("/:id", async (req, res) => {
  await Ticket.findByIdAndDelete(req.params.id);
  res.json({ message: "Ticket deleted" });
});

module.exports = router;
