const navLinks = document.querySelectorAll('nav a[href^="#"]');

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    const target = document.querySelector(id);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
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

const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");
const chatMessages = document.getElementById("chat-messages");
const chatChips = document.querySelectorAll(".chat-chip");

const knowledgeBase = [
  {
    keywords: ["project", "projects", "build", "built", "work", "portfolio"],
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
    keywords: ["power apps", "power automate", "power platform", "dataverse"],
    response:
      "I build Power Platform solutions for internal teams, including approval systems, document workflows, attendance tools, and apps backed by Dataverse with automation through Power Automate.",
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
      "Hello. You can ask me about backend projects, automation work, Power Platform solutions, architecture, or the tools I use.",
  },
];

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

function getReply(message) {
  const normalized = message.toLowerCase().trim();

  if (!normalized) {
    return "Type a question and I will point you to the right part of the portfolio.";
  }

  let bestMatch = null;
  let bestScore = 0;

  knowledgeBase.forEach((entry) => {
    const score = entry.keywords.reduce((total, keyword) => {
      return total + (normalized.includes(keyword) ? 1 : 0);
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  });

  if (bestMatch) {
    return bestMatch.response;
  }

  return "I can help with questions about projects, stack, architecture, experience, Power Platform work, resume, or contact details.";
}

function handleChatSubmit(message) {
  const text = message.trim();

  if (!text) {
    return;
  }

  appendMessage("user", text);
  appendMessage("bot", getReply(text));

  if (chatInput) {
    chatInput.value = "";
  }
}

if (chatMessages) {
  appendMessage(
    "bot",
    "Ask me about backend projects, automation workflows, Power Platform systems, architecture, or how I work."
  );
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
