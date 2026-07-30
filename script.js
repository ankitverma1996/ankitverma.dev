const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function getNavOffset() {
  return nav ? nav.getBoundingClientRect().height + 20 : 0;
}

function scrollToSection(target, smooth = true) {
  if (!target) {
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - getNavOffset();

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: smooth ? "smooth" : "auto",
  });
}

function scrollToHash(hash, smooth = true) {
  if (!hash || hash === "#") {
    return;
  }

  const target = document.querySelector(hash);
  scrollToSection(target, smooth);
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    const target = document.querySelector(id);

    if (!target) {
      return;
    }

    event.preventDefault();
    history.pushState(null, "", id);
    scrollToSection(target, true);
  });
});

window.addEventListener("hashchange", () => {
  scrollToHash(window.location.hash, true);
});

window.addEventListener("load", () => {
  if (window.location.hash) {
    scrollToHash(window.location.hash, false);
  }
});

// Architecture / project diagrams: static, hand-authored SVGs live directly
// in the HTML (elements with class "flow-svg") so they render instantly with
// no external library or network dependency. The only JS needed here is to
// respect prefers-reduced-motion, since SMIL <animateMotion> doesn't obey
// that CSS media query on its own.
const flowSvgs = document.querySelectorAll(".flow-svg");

if (flowSvgs.length > 0) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    flowSvgs.forEach((svg) => {
      if (typeof svg.pauseAnimations === "function") {
        svg.pauseAnimations();
      }
      svg.classList.add("motion-reduced");
    });
  }
}

const chatbot = document.getElementById("chatbot");
const chatToggle = document.getElementById("chat-toggle");
const chatClose = document.getElementById("chat-close");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");
const chatMessages = document.getElementById("chat-messages");
const chatChips = document.querySelectorAll(".chat-chip");

const knowledgeBase = [
  {
    keywords: ["payroll", "salary", "payout"],
    response:
      "My payroll and payout work focuses on replacing opaque recurring jobs with clearer API-driven or scheduled workflows that are easier to monitor, troubleshoot, and maintain.",
  },
  {
    keywords: ["attendance", "biometric", "leave"],
    response:
      "I built attendance automation around biometric logs, leave data, and reconciliation pipelines so records could be normalized and processed with less manual cleanup.",
  },
  {
    keywords: ["approval", "approvals", "approve"],
    response:
      "I've built multi-step approval systems with Power Apps, Power Automate, and Dataverse to make routing, status tracking, and notifications more visible and auditable.",
  },
  {
    keywords: ["document", "documents", "sharepoint", "graph"],
    response:
      "My document workflow work combines Power Apps, SharePoint, and Microsoft Graph to support document tracking, reporting, and more structured process visibility.",
  },
  {
    keywords: ["power apps", "power automate", "power platform", "dataverse"],
    response:
      "I build Power Platform solutions for internal teams, including approval systems, document workflows, attendance tools, and apps backed by Dataverse with automation through Power Automate.",
  },
  {
    keywords: ["backend", "api", "apis", "integration", "integrations"],
    response:
      "My backend work is centered on API services, secure integrations, validation layers, workflow orchestration, and automation that makes internal operations more dependable.",
  },
  {
    keywords: ["project", "projects", "build", "built", "portfolio"],
    response:
      "I focus on backend integrations, attendance and payroll automation, payout processing, approval systems, and Power Platform applications built for HR, operations, and MIS teams.",
  },
  {
    keywords: ["stack", "technology", "technologies", "tools", "tech"],
    response:
      "My core stack is Python, FastAPI, Flask, Pandas, Power Apps, Power Automate, Dataverse, SharePoint, Microsoft Graph, and REST API integrations.",
  },
  {
    keywords: ["architecture", "system", "design", "workflow", "orchestration"],
    response:
      "I usually keep the interface layer simple, move validation and business rules into backend services, use automation for repeatable processes, and store outputs in dependable systems like Dataverse or SharePoint.",
  },
  {
    keywords: ["experience", "background", "role", "specialize", "specialise"],
    response:
      "My background is centered on backend engineering and workflow automation. I work best on problems where business operations need APIs, data pipelines, approvals, and internal tooling to work together reliably.",
  },
  {
    keywords: ["automation", "automate", "workflow", "workflows", "process", "processes"],
    response:
      "I design automation around recurring business processes like approvals, attendance, payroll support, reporting, and document handling so teams do less manual follow-up and get cleaner outputs.",
  },
  {
    keywords: ["contact", "email", "reach", "hire", "connect"],
    response:
      "You can reach me by email from the contact section, connect on LinkedIn, or review more of my work through the GitHub link on the site.",
  },
  {
    keywords: ["resume", "cv"],
    response:
      "The resume button in the hero section opens a downloadable PDF version of my profile with a broader summary of my backend and automation work.",
  },
  {
    keywords: ["hello", "hi", "hey"],
    response:
      "Hello. You can ask me about backend projects, automation work, payroll, attendance, approvals, Power Platform solutions, architecture, or the tools I use.",
  },
];

let chatSeeded = false;

function appendMessage(role, text) {
  if (!chatMessages) {
    return;
  }

  const message = document.createElement("div");
  message.className = `chat-message ${role}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function seedChat() {
  if (chatSeeded || !chatMessages) {
    return;
  }

  appendMessage(
    "bot",
    "Ask me about backend projects, automation workflows, payroll, attendance, Power Platform systems, architecture, or how I work."
  );
  chatSeeded = true;
}

function getReply(message) {
  const normalized = message
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = normalized.split(" ").filter(Boolean);

  if (!normalized) {
    return "Type a question and I will point you to the right part of the portfolio.";
  }

  let bestMatch = null;
  let bestScore = 0;

  knowledgeBase.forEach((entry) => {
    const score = entry.keywords.reduce((total, keyword) => {
      if (keyword.includes(" ")) {
        return total + (normalized.includes(keyword) ? 1 : 0);
      }

      return total + (words.includes(keyword) ? 1 : 0);
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  });

  if (bestMatch) {
    return bestMatch.response;
  }

  return "I can help with questions about projects, stack, architecture, experience, backend work, payroll, attendance, approvals, Power Platform work, resume, or contact details.";
}

function handleChatSubmit(message) {
  const text = message.trim();

  if (!text) {
    return;
  }

  seedChat();
  appendMessage("user", text);
  appendMessage("bot", getReply(text));

  if (chatInput) {
    chatInput.value = "";
  }
}

function setChatOpen(isOpen) {
  if (!chatbot || !chatToggle) {
    return;
  }

  chatbot.hidden = !isOpen;
  chatToggle.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    seedChat();

    if (chatInput) {
      chatInput.focus();
    }
  }
}

if (chatToggle) {
  chatToggle.addEventListener("click", () => {
    const isOpen = chatbot ? chatbot.hidden : true;
    setChatOpen(isOpen);
  });
}

if (chatClose) {
  chatClose.addEventListener("click", () => {
    setChatOpen(false);
  });
}

if (chatInput) {
  chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleChatSubmit(chatInput.value);
    }
  });
}

if (chatSend) {
  chatSend.addEventListener("click", () => {
    handleChatSubmit(chatInput ? chatInput.value : "");
  });
}

chatChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const question = chip.dataset.question || chip.textContent || "";
    handleChatSubmit(question);
  });
});

document.addEventListener("click", (event) => {
  if (!chatbot || chatbot.hidden || !chatToggle) {
    return;
  }

  const target = event.target;

  if (
    target instanceof Node &&
    !chatbot.contains(target) &&
    !chatToggle.contains(target)
  ) {
    setChatOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setChatOpen(false);
  }
});

window.__portfolioAssistant = {
  getReply,
  setChatOpen,
  scrollToHash,
};
