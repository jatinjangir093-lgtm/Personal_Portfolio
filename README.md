# Personal Portfolio Website with Groq Chatbot Integration

**Student Name:** Jatin Jangir  
**Project:** College Internal Assessment Project  
**Current Milestone:** Portfolio chatbot integration

---

## 📌 Project Overview

This repository hosts the personal developer portfolio website of **Jatin Jangir**, including a Groq-powered assistant grounded in facts published on the portfolio.

In Step 3, complete client-side interactive capabilities have been integrated:
1. **Real-time Project Search & Technology Filtering System** with dynamic results counting and empty state recovery.
2. **Accessible Light/Dark Theme Switcher** with zero-flash document initialization and `localStorage` persistence.
3. Fully responsive controls for mobile, tablet, laptop, and desktop viewports.

---

## 🔍 Features Implemented in Step 3

### 1. Real-Time Project Search
- Immediate keystroke filtering across project titles, descriptions, and technology tags.
- Case-insensitive search and whitespace trimming.
- Clear input ("X") button and keyboard `Escape` shortcut to reset.

### 2. Technology Filter Dropdown
- Options derived directly from active project entries:
  - `All Technologies`
  - `Python`
  - `JavaScript`
  - `HTML / CSS`
  - `AI-assisted development`
  - `Debugging / Cursor AI`
- Seamlessly combines with the keyword search query.

### 3. Dynamic Results Counter & Empty State
- Accurately counts visible cards (`5 projects`, `X projects found`, `No projects found`).
- Renders a clean empty state card with guidance when no projects match.
- Includes a dedicated "Clear All Filters" / "Reset Filters" action button that restores all 5 projects.

### 4. Cohesive Light / Dark Theme Toggle
- Preserves the default **Dark Cinematic Theme** (midnight navy, violet/blue/teal gradients).
- Adds a carefully designed **Light Theme** (clean slate, white cards, high-contrast typography, accessible borders).
- Desktop and mobile navigation toggles with dynamic Sun/Moon iconography and accessible ARIA labels.
- Theme selection is preserved across page refreshes via `localStorage` with zero theme flash.

---

## 🌐 Verified Professional Profiles

- **GitHub Profile:** [https://github.com/jatinjangir093-lgtm](https://github.com/jatinjangir093-lgtm)
- **LinkedIn Profile:** [https://www.linkedin.com/in/jatin-jangir-421511385/](https://www.linkedin.com/in/jatin-jangir-421511385/)

---

## 📁 Required Projects Status & Mapping

| # | Project Title | Technologies | Verified GitHub Repository | Status |
| :-: | :--- | :--- | :--- | :--- |
| **01** | **Python Programs Collection** | `Python`, `Algorithms`, `Data Structures` | [`python_basic_25bcon1380`](https://github.com/jatinjangir093-lgtm/python_basic_25bcon1380) | ✅ **Mapped to Factorial repo** *(Related modular repos: `fibonacci`, `struct-to-dict`)* |
| **02** | **Messy Python Code Improvement** | `Python`, `AI-assisted development` | [`correcting-grade-25BCON1380`](https://github.com/jatinjangir093-lgtm/correcting-grade-25BCON1380) | ✅ **Mapped** *(Contains `messy_py.py` and AI refactoring comparison table)* |
| **03** | **Bug Fixing Using Cursor AI** | `Programming`, `Debugging`, `Cursor AI` | Pending confirmation | ⏳ **Repository link pending** *(Awaiting student confirmation)* |
| **04** | **Interactive Quiz Application** | `HTML`, `CSS`, `JavaScript` | [`QUIZ-PE`](https://github.com/jatinjangir093-lgtm/QUIZ-PE) | ✅ **Verified match** *(Lecture 10 project files and questions confirmed)* |
| **05** | **Book Reading List Application** | `HTML`, `CSS`, `JavaScript` | [`jatinjangir093-lgtmjatinjangir093-lgtm-Books_reading_list`](https://github.com/jatinjangir093-lgtm/jatinjangir093-lgtmjatinjangir093-lgtm-Books_reading_list) | ✅ **Verified match** *(Lecture 11 reading-list project)* |

---

## 🛠️ Technology Stack

- **HTML5:** Semantic markup, section outlines, and accessible ARIA attributes.
- **CSS3:** Custom design system with modern CSS variables, midnight dark palette, purple/electric blue/teal accents, light theme tokens, responsive CSS Grid and Flexbox layouts.
- **Vanilla JavaScript:** Zero-dependency micro-interactions including search & filtering engine, theme state machine, mobile drawer menu toggling, dynamic copyright year, and active scroll spy navigation.

---

## 🤖 Groq Chatbot Configuration

The browser sends chat messages to the same-origin `/api/chat` Vercel serverless function. The function calls Groq's chat-completions API; the API key is never sent to the browser.

1. Create a Groq API key in your Groq account. Do not paste it into website source code or a chat.
2. In the project root, create a local `.env` file (it is ignored by Git) containing:

   ```env
   GROQ_API_KEY=YOUR_NEW_GROQ_API_KEY
   ```

   `.env.example` contains only the empty variable name. Never commit `.env`.
3. Run the website with Vercel's local development server so `/api/chat` is available:

   ```bash
   https://jatin-personal-portfolio-iota.vercel.app/
   ```

   If prompted, install/login to the Vercel CLI as needed. Open the local URL printed by the command. A plain static server or opening `index.html` directly can display the page but cannot run the API endpoint.
4. Open the chatbot and test a portfolio question such as “What projects use JavaScript?” Without a configured API key, the endpoint safely returns a configuration error and the UI displays a friendly message.

The endpoint uses Groq's currently available `openai/gpt-oss-20b` chat-completion model. Local live API testing requires a valid key in `.env`.

## 🚀 View the Portfolio Locally

For a static preview without the chatbot endpoint, open `index.html` directly or run the Python server below.

### Static preview only (chatbot API unavailable)
```bash
python -m http.server 8080
```
Navigate to `http://localhost:8080` in your web browser. Use `npx vercel dev` instead to test the chatbot.

---

## ⏭️ Upcoming Steps (Per Assessment Specification)

- **Later step:** GitHub repository publishing and Vercel cloud deployment.
