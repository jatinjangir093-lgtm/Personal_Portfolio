const SYSTEM_PROMPT = `You are the portfolio assistant for Jatin Jangir. Answer only from the verified portfolio facts below. Do not invent or infer qualifications, credentials, project URLs, experience, achievements, personal details, or contact information. If a requested fact is absent, say it is not listed in the portfolio. Be concise, friendly, and clearly distinguish listed facts from anything not specified.

Introduction and education:
- Jatin Jangir describes himself as an engineering student interested in programming, software design, modern computing, software development, artificial intelligence, and machine learning.
- His specific institution, department, degree name, and graduation year are not listed.

Skills and tools listed:
- Python, C++, JavaScript, HTML5, CSS3, responsive design, Git, GitHub, and VS Code.
- Project technologies and topics also include algorithms, data structures, AI-assisted development, debugging, and Cursor AI.

Five portfolio projects:
1. Python Programs Collection: Python programs including factorial, Fibonacci, and structure-to-dictionary conversion; demonstrates foundational computational logic, sequence iteration, and data transformation. Technologies: Python, algorithms, data structures. Repository: https://github.com/jatinjangir093-lgtm/python_basic_25bcon1380
2. Messy Python Code Improvement: AI-assisted Python code improvement focused on readability, maintainability, modular functions, and PEP 8. Technologies: Python and AI-assisted development. Repository: https://github.com/jatinjangir093-lgtm/correcting-grade-25BCON1380
3. Bug Fixing Using Cursor AI: A debugging exercise involving diagnosing and correcting program errors, resolving syntax/runtime errors, and verifying test cases with Cursor AI. Technologies: programming, debugging, Cursor AI. Repository link is pending and not listed.
4. Interactive Quiz Application: A Lecture 10 project featuring dynamic quiz generation, multiple-choice questions, score calculation, and performance review. Technologies: HTML, CSS, JavaScript. Repository: https://github.com/jatinjangir093-lgtm/QUIZ-PE
5. Book Reading List Application: A Lecture 11 client-side app for cataloging books, tracking want-to-read/reading/finished statuses, and managing personal logs. Technologies: HTML, CSS, JavaScript. Repository: https://github.com/jatinjangir093-lgtm/jatinjangir093-lgtmjatinjangir093-lgtm-Books_reading_list

Public profiles and contact:
- GitHub: https://github.com/jatinjangir093-lgtm
- LinkedIn: https://www.linkedin.com/in/jatin-jangir-421511385/
- An official email address is not listed in the portfolio.

Do not claim a live website URL for any project unless one is explicitly listed above.`;

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_TOTAL_LENGTH = 16000;

function sendJson(res, status, body) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json(body);
}

function getRequestBody(body) {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  }
  return body;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed.' });
  }

  const body = getRequestBody(req.body);
  if (!body || typeof body !== 'object' || Array.isArray(body) || !Array.isArray(body.messages)) {
    return sendJson(res, 400, { error: 'A valid messages array is required.' });
  }

  const { messages } = body;
  if (messages.length < 1) {
    return sendJson(res, 400, { error: 'A valid messages array is required.' });
  }
  if (messages.length > MAX_MESSAGES) {
    return sendJson(res, 413, { error: 'Conversation is too long. Start a new chat and try again.' });
  }

  let totalLength = 0;
  for (const message of messages) {
    if (
      !message ||
      typeof message !== 'object' ||
      !['user', 'assistant'].includes(message.role) ||
      typeof message.content !== 'string' ||
      message.content.trim().length === 0
    ) {
      return sendJson(res, 400, { error: 'Each message must contain valid text and a supported role.' });
    }
    if (message.content.length > MAX_MESSAGE_LENGTH) {
      return sendJson(res, 413, { error: 'A message exceeds the 4,000 character limit.' });
    }
    totalLength += message.content.length;
  }

  if (totalLength > MAX_TOTAL_LENGTH) {
    return sendJson(res, 413, { error: 'Conversation is too long. Start a new chat and try again.' });
  }
  if (messages[messages.length - 1].role !== 'user') {
    return sendJson(res, 400, { error: 'The last conversation message must be from the user.' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return sendJson(res, 503, { error: 'The assistant is not configured.' });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  let upstream;
  try {
    upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.3,
        max_tokens: 600
      }),
      signal: controller.signal
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      return sendJson(res, 504, { error: 'The assistant took too long to respond. Please try again.' });
    }
    return sendJson(res, 502, { error: 'The assistant service is temporarily unavailable.' });
  } finally {
    clearTimeout(timeout);
  }

  if (upstream.status === 429) {
    return sendJson(res, 429, { error: 'The assistant is busy. Please try again shortly.' });
  }
  if (!upstream.ok) {
    return sendJson(res, 502, { error: 'The assistant service could not complete the request.' });
  }

  let result;
  try {
    result = await upstream.json();
  } catch {
    return sendJson(res, 502, { error: 'The assistant returned an invalid response.' });
  }

  const reply = result?.choices?.[0]?.message?.content;
  if (typeof reply !== 'string' || !reply.trim()) {
    return sendJson(res, 502, { error: 'The assistant returned an empty response.' });
  }

  return sendJson(res, 200, { reply: reply.trim() });
};
