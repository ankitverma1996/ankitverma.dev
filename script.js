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

const architectureContainer = document.getElementById("architecture-diagram");

function renderArchitectureFallback(container) {
  container.classList.add("diagram-fallback");

  const fallback = document.createElement("div");
  fallback.className = "diagram-fallback-content";

  const title = document.createElement("h3");
  title.textContent = "Architecture flow";

  const description = document.createElement("p");
  description.textContent =
    "Frontend or Power Apps feed requests into backend services, which validate data, trigger automation, and sync reliable outputs into business systems.";

  const list = document.createElement("ul");
  [
    "Interface layer for forms and operational actions",
    "Backend API layer for validation and orchestration",
    "Automation jobs for repeatable recurring tasks",
    "Dataverse, SharePoint, or external systems as data endpoints",
  ].forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });

  fallback.append(title, description, list);
  container.replaceChildren(fallback);
}

if (architectureContainer) {
  if (
    typeof window.vis !== "undefined" &&
    typeof window.vis.DataSet === "function" &&
    typeof window.vis.Network === "function"
  ) {
    const nodes = new window.vis.DataSet([
      { id: 1, label: "Frontend\nor Power Apps", color: "#2dd4bf" },
      { id: 2, label: "Backend\nServices", color: "#60a5fa" },
      { id: 3, label: "Automation\nFlows", color: "#22c55e" },
      { id: 4, label: "Dataverse /\nSharePoint", color: "#f59e0b" },
      { id: 5, label: "External\nAPIs", color: "#f97316" },
    ]);

    const edges = new window.vis.DataSet([
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 5, to: 2 },
      { from: 3, to: 4 },
    ]);

    const data = { nodes, edges };

    const options = {
      autoResize: true,
      nodes: {
        shape: "dot",
        size: 22,
        font: {
          color: "#ecf3ff",
          size: 16,
          face: "Segoe UI",
        },
        borderWidth: 0,
      },
      edges: {
        arrows: "to",
        color: {
          color: "rgba(159,178,209,.5)",
          highlight: "#2dd4bf",
        },
        smooth: {
          type: "cubicBezier",
        },
      },
      interaction: {
        hover: true,
      },
      physics: {
        stabilization: true,
        barnesHut: {
          gravitationalConstant: -3800,
          springLength: 180,
          springConstant: 0.035,
        },
      },
    };

    new window.vis.Network(architectureContainer, data, options);
  } else {
    renderArchitectureFallback(architectureContainer);
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
