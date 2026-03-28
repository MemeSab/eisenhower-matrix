# 🧠 Focus Matrix – Task Prioritisation App

## Overview
A productivity tool based on the Eisenhower Matrix, designed to help users prioritise tasks by urgency and importance.

This project explores how personal task management can better align with structured delivery tools like Jira, bridging the gap between individual prioritisation and team workflows.

---

## The Problem
Most task management tools rely on linear lists, which don’t support effective decision-making.

In delivery environments, there is also a disconnect between how individuals prioritise work and how tasks are structured in tools like Jira.

This can lead to:
- Poor prioritisation
- Misaligned focus
- Inefficient execution

---

## The Solution
This app introduces a visual prioritisation system (Focus Matrix) combined with task input from both manual entry and Jira integration.

It allows users to:
- Make clearer decisions about what matters
- Visualise workload effectively
- Align personal priorities with delivery tools

---

## ✨ Features

- 4-quadrant matrix layout (Important vs Urgent)
- Add tasks manually via modal
- Load tasks from Jira API (mock/live)
- Mark tasks as completed (hidden from active view)
- Responsive UI built with TailwindCSS
- React + Vite setup

---

## 🔧 Tech Stack

- React
- Vite
- TailwindCSS
- Jira REST API
- Local state (with planned persistence)

---

## 🧠 Key Decisions

- Chose a visual matrix over traditional lists to improve decision-making
- Designed Jira integration to connect personal and team workflows
- Kept architecture lightweight to prioritise speed and iteration

---

## 🚀 Roadmap

- [ ] Show/hide completed tasks toggle
- [ ] Persist tasks using localStorage / Firebase
- [ ] Drag-and-drop between quadrants
- [ ] Edit and delete tasks
- [ ] Jira bi-directional sync
- [ ] Notifications and reminders

---

## 📸 Screenshots
(Add screenshots here)

---

## 📦 Getting Started

```bash
git clone https://github.com/MemeSab/eisenhower-matrix.git
cd eisenhower-matrix
npm install
npm run dev
