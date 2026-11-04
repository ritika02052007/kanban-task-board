# Kanban Task Board

A Trello-style task board built with React (Vite) and Tailwind CSS. State-driven, no Redux, no direct DOM manipulation.

**Live demo:** https://glowing-starship-5471e6.netlify.app

## Features
**Phase 1:** 3 columns (To Do, In Progress, Done), add task, delete task, move task with buttons.
**Phase 2:** inline editing (click text; Enter/blur saves, Esc cancels), priority dropdown with colored borders (High red, Medium yellow, Low green), localStorage persistence.
**Phase 3:** drag and drop with dnd-kit, live global search.

## Tech stack
React 18, Vite, Tailwind CSS v4, @dnd-kit/core

## Run locally
```bash
npm install
npm run dev
```
Build: `npm run build`

## Structure
```
src/
  App.jsx                  state + handlers
  components/
    AddTaskForm.jsx  SearchBar.jsx  Board.jsx  Column.jsx  TaskCard.jsx
```
