/**
 * TeamUp — Plataforma Unificada de Proyectos, Talento y Comunicación
 * Módulos: Inicio, Red & Talento, Gestión de Tareas (con Calendario y Línea de Avance),
 * Canales y Voz (Discord-like con llamadas WebRTC y chat), y Flujo de Trabajo (Audit Log).
 */

// ==================== ESTADO GLOBAL DE LA APLICACIÓN ====================
const STORAGE_KEY = 'teamup_platform_state_v2';

const DEFAULT_STATE = {
  // 1. Red & Talento
  talents: [
    {
      id: 'tal-1',
      name: 'Elena Morales',
      role: 'Senior Frontend & UI Architect',
      category: 'dev',
      bio: 'Especialista en arquitecturas React, TypeScript y sistemas de diseño escalables. 7 años construyendo aplicaciones web de alto rendimiento y accesibles.',
      skills: ['React', 'TypeScript', 'TailwindCSS', 'Figma', 'GraphQL'],
      availability: 'Tiempo Completo',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      portfolio: 'https://github.com/elena-morales',
      status: 'online',
      contacted: true
    },
    {
      id: 'tal-2',
      name: 'Carlos Ruiz',
      role: 'Backend & Cloud Engineer',
      category: 'dev',
      bio: 'Desarrollador backend apasionado por microservicios, bases de datos distribuidas y APIs seguras en Node.js, Express y PostgreSQL.',
      skills: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'AWS'],
      availability: 'Freelance / Proyecto',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      portfolio: 'https://github.com/carlos-ruiz',
      status: 'online',
      contacted: false
    },
    {
      id: 'tal-3',
      name: 'Lucía Navarro',
      role: 'Product Designer & UX Lead',
      category: 'design',
      bio: 'Diseño experiencias centradas en el usuario, prototipos interactivos en Figma y flujos de trabajo claros para plataformas colaborativas.',
      skills: ['Figma', 'UX Research', 'Design Systems', 'Wireframing', 'Prototyping'],
      availability: 'Tiempo Completo',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      portfolio: 'https://dribbble.com/lucianavarro',
      status: 'online',
      contacted: true
    },
    {
      id: 'tal-4',
      name: 'Marcos Benítez',
      role: 'Cloud Architect & SRE',
      category: 'management',
      bio: 'Especializado en Kubernetes, pipelines CI/CD y despliegues sin tiempo de inactividad. Experiencia liderando operaciones cloud críticas.',
      skills: ['Kubernetes', 'Terraform', 'CI/CD', 'Docker', 'Linux'],
      availability: 'Tiempo Parcial',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      portfolio: 'https://github.com/marcos-ops',
      status: 'busy',
      contacted: false
    },
    {
      id: 'tal-5',
      name: 'Sofía Delgado',
      role: 'Data Engineer & AI Specialist',
      category: 'management',
      bio: 'Ingeniera de datos y machine learning. Creación de modelos predictivos, tratamiento masivo de datos con Python y servicios de inferencia en tiempo real.',
      skills: ['Python', 'FastAPI', 'PyTorch', 'Data Pipeline', 'SQL'],
      availability: 'Freelance / Proyecto',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      portfolio: 'https://github.com/sofia-data',
      status: 'online',
      contacted: true
    }
  ],

  // 2. Gestión de Tareas (con Fechas de Calendario y Avance Temporal)
  tasks: [
    {
      id: 'task-1',
      title: 'Diseño de la Arquitectura de Microservicios',
      desc: 'Definir contratos de API REST, esquemas de base de datos y orquestación de servicios en contenedores.',
      assignee: 'Carlos Ruiz',
      priority: 'alta',
      status: 'in-progress',
      // Fechas relativas para que la línea de tiempo se vea viva: inició ayer y vence en 3 días
      startDate: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      endDate: new Date(Date.now() + 72 * 3600 * 1000).toISOString()
    },
    {
      id: 'task-2',
      title: 'Sistema de Diseño UI y Componentes Base',
      desc: 'Maquetar botones, tarjetas, modales y paleta de colores accesibles según directrices Figma.',
      assignee: 'Elena Morales',
      priority: 'media',
      status: 'done',
      startDate: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
      endDate: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
    },
    {
      id: 'task-3',
      title: 'Configuración de Salas de Voz y WebRTC',
      desc: 'Integrar señalización de sockets y flujos multimedia de cámara y micrófono para llamadas de equipo.',
      assignee: 'Elena Morales',
      priority: 'urgente',
      status: 'in-progress',
      // Inició hace 12 horas, vence en 18 horas (avanzada)
      startDate: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
      endDate: new Date(Date.now() + 18 * 3600 * 1000).toISOString()
    },
    {
      id: 'task-4',
      title: 'Auditoría de Seguridad y Pruebas Unitarias',
      desc: 'Escribir tests de integración y verificar políticas de CORS, headers seguros y validación de tokens.',
      assignee: 'Marcos Benítez',
      priority: 'media',
      status: 'todo',
      startDate: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      endDate: new Date(Date.now() + 96 * 3600 * 1000).toISOString()
    },
    {
      id: 'task-5',
      title: 'Métricas de Productividad del Flujo de Trabajo',
      desc: 'Conectar eventos de tareas completadas y solicitudes de talento al panel de trazabilidad global.',
      assignee: 'Sofía Delgado',
      priority: 'baja',
      status: 'done',
      startDate: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
      endDate: new Date(Date.now() - 12 * 3600 * 1000).toISOString()
    }
  ],

  // 3. Canales y Voz (Discord style)
  servers: [
    {
      id: 'srv-1',
      name: 'TeamUp Core',
      icon: 'TU',
      channels: {
        text: [
          { id: 'ch-gen', name: 'general', type: 'text' },
          { id: 'ch-tasks', name: 'tareas-progreso', type: 'text' },
          { id: 'ch-ann', name: 'anuncios-sprint', type: 'text' },
          { id: 'ch-code', name: 'feedback-codigo', type: 'text' }
        ],
        voice: [
          { id: 'vc-main', name: 'Sala General', type: 'voice', users: 3 },
          { id: 'vc-daily', name: 'Daily Standup', type: 'voice', users: 1 },
          { id: 'vc-screens', name: 'Mesa de Trabajo & Pantalla', type: 'voice', users: 0 }
        ]
      }
    },
    {
      id: 'srv-2',
      name: 'Frontend Hub',
      icon: 'FE',
      channels: {
        text: [
          { id: 'ch-ui', name: 'diseno-ui', type: 'text' },
          { id: 'ch-react', name: 'componentes-react', type: 'text' }
        ],
        voice: [
          { id: 'vc-design', name: 'Mesa de Diseño', type: 'voice', users: 2 }
        ]
      }
    },
    {
      id: 'srv-3',
      name: 'Backend & Cloud',
      icon: 'BE',
      channels: {
        text: [
          { id: 'ch-api', name: 'api-rest', type: 'text' },
          { id: 'ch-infra', name: 'docker-infra', type: 'text' }
        ],
        voice: [
          { id: 'vc-devops', name: 'Sala DevOps', type: 'voice', users: 0 }
        ]
      }
    }
  ],
  activeServerId: 'srv-1',
  activeChannelId: 'ch-gen',

  // Historial de mensajes de chat por canal
  chatMessages: {
    'ch-gen': [
      {
        id: 'msg-1',
        author: 'Elena Morales',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        time: '10:14',
        text: '¡Buenos días equipo! He dejado lista la maquetación del tablero Kanban y el cálculo dinámico de la línea de tiempo.'
      },
      {
        id: 'msg-2',
        author: 'Carlos Ruiz',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        time: '10:18',
        text: 'Excelente. Acabo de revisar los endpoints del servidor Express y la conexión WebSocket en tiempo real.'
      },
      {
        id: 'msg-3',
        author: 'Alex García (Tú)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        time: '10:25',
        text: 'Perfecto. Nos conectamos en breve a la Sala General de voz para sincronizar el sprint.'
      }
    ]
  },

  // 4. Flujo de Trabajo (Audit Log cronológico)
  workflowLogs: [
    {
      id: 'wf-1',
      category: 'task',
      title: 'Tarea Completada en Plazo',
      detail: 'Elena Morales finalizó "Sistema de Diseño UI y Componentes Base".',
      time: 'Hace 45 minutos',
      dot: 'green'
    },
    {
      id: 'wf-2',
      category: 'talent',
      title: 'Solicitud de Contacto Enviada',
      detail: 'Se envió una solicitud de colaboración formal a Sofía Delgado.',
      time: 'Hace 2 horas',
      dot: 'blue'
    },
    {
      id: 'wf-3',
      category: 'voice',
      title: 'Reunión en Sala de Voz Realizada',
      detail: 'Sesión colaborativa en "Daily Standup" completada (Duración: 24 min).',
      time: 'Hace 3 horas',
      dot: 'purple'
    },
    {
      id: 'wf-4',
      category: 'task',
      title: 'Nueva Tarea Calendarizada',
      detail: 'Carlos Ruiz inició "Diseño de la Arquitectura de Microservicios". Línea de tiempo activa.',
      time: 'Hace 5 horas',
      dot: 'amber'
    },
    {
      id: 'wf-5',
      category: 'talent',
      title: 'Nuevo Talento Añadido a la Red',
      detail: 'Perfil de Marcos Benítez (Cloud Architect & SRE) dado de alta.',
      time: 'Ayer',
      dot: 'blue'
    }
  ],

  // Estado de llamadas de voz y periféricos
  voiceState: {
    inCall: false,
    channelId: null,
    channelName: null,
    micMuted: false,
    deafened: false,
    cameraActive: false,
    screenSharing: false,
    callSeconds: 0
  }
};

// Cargar estado de LocalStorage o valores predeterminados
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_STATE, ...parsed, voiceState: { ...DEFAULT_STATE.voiceState } };
    }
  } catch (err) {
    console.warn('Error leyendo localStorage:', err);
  }
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

let AppState = loadState();

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(AppState));
  } catch (err) {
    console.warn('Error guardando en localStorage:', err);
  }
}

// ==================== CONEXIÓN WEBSOCKET ====================
let socket = null;
try {
  if (typeof io !== 'undefined') {
    socket = io();
    socket.on('connect', () => {
      console.log('✅ Conectado al servidor WebSocket de TeamUp');
    });
    socket.on('chatMessage', (msg) => {
      if (msg && msg.channelId) {
        if (!AppState.chatMessages[msg.channelId]) AppState.chatMessages[msg.channelId] = [];
        AppState.chatMessages[msg.channelId].push(msg);
        renderChatFeed();
      }
    });
  }
} catch (e) {
  console.log('Modo local (sin servidor de sockets activo)');
}

// ==================== NAVEGACIÓN SPA ====================
const PAGES = ['inicio', 'red', 'tareas', 'canales', 'flujo'];
const ALIASES = {
  overview: 'inicio',
  talent: 'red',
  kanban: 'tareas',
  tasks: 'tareas',
  chat: 'canales',
  voice: 'canales',
  workflow: 'flujo'
};

function currentPage() {
  const hash = (location.hash || '#inicio').slice(1).toLowerCase();
  return ALIASES[hash] || (PAGES.includes(hash) ? hash : 'inicio');
}

function showPage(page) {
  const target = PAGES.includes(page) ? page : 'inicio';

  document.querySelectorAll('.page-view').forEach((view) => {
    const isActive = view.dataset.page === target;
    view.classList.toggle('is-active', isActive);
    view.hidden = !isActive;
  });

  document.querySelectorAll('#nav a').forEach((link) => {
    link.classList.toggle('active', link.dataset.page === target);
  });

  if (location.hash !== `#${target}`) {
    history.replaceState(null, '', `#${target}`);
  }

  window.scrollTo({ top: 0, behavior: 'instant' });

  // Actualizar la vista específica
  if (target === 'inicio') updateOverviewStats();
  if (target === 'red') renderTalentsGrid();
  if (target === 'tareas') renderTasks();
  if (target === 'canales') { renderServers(); renderChannels(); renderChatFeed(); }
  if (target === 'flujo') renderWorkflowView();
}

window.addEventListener('hashchange', () => showPage(currentPage()));

// ==================== TOAST NOTIFICATIONS ====================
function showToast(message, type = 'info', icon = 'fa-circle-info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==================== MODALES DEL SISTEMA ====================
window.openModal = function (modalId, param = null) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('is-open');

  if (modalId === 'modalCreateTask') {
    populateAssigneeSelect();
    initDefaultTaskDates();
  }
  if (modalId === 'modalCreateChannel' && param) {
    const sel = document.getElementById('inputChannelType');
    if (sel) sel.value = param;
  }
};

window.closeModal = function (modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('is-open');
};

// Cerrar modales con clic fuera o tecla ESC
document.querySelectorAll('.modal-overlay').forEach((overlay) => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('is-open');
  });
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.is-open').forEach(m => m.classList.remove('is-open'));
  }
});

// ==================== SECCIÓN 0: INICIO / OVERVIEW ====================
function updateOverviewStats() {
  const talentCount = AppState.talents.length;
  const activeTasks = AppState.tasks.filter(t => t.status !== 'done').length;
  const serversCount = AppState.servers.length;
  const completedTasks = AppState.tasks.filter(t => t.status === 'done').length;
  const totalTasks = AppState.tasks.length || 1;
  const progressPct = Math.round((completedTasks / totalTasks) * 100);

  const elTalent = document.getElementById('statTalentsCount');
  const elTasks = document.getElementById('statTasksCount');
  const elServers = document.getElementById('statServersCount');
  const elProgress = document.getElementById('statProgressPct');

  if (elTalent) elTalent.textContent = `${talentCount} Talentos`;
  if (elTasks) elTasks.textContent = `${activeTasks} Tareas Activas`;
  if (elServers) elServers.textContent = `${serversCount} Servidores`;
  if (elProgress) elProgress.textContent = `${progressPct}% Completado`;
}

// Botones rápidos del topbar
document.getElementById('btnQuickTalent')?.addEventListener('click', () => {
  openModal('modalAddTalent');
});
document.getElementById('btnQuickTask')?.addEventListener('click', () => {
  openModal('modalCreateTask');
});

// ==================== SECCIÓN 1: RED & TALENTO ====================
let talentFilterCategory = 'all';
let talentSearchQuery = '';

function renderTalentsGrid() {
  const grid = document.getElementById('talentGrid');
  if (!grid) return;

  const countAll = document.getElementById('countAllTalents');
  const countContacted = document.getElementById('countContactedTalents');
  if (countAll) countAll.textContent = AppState.talents.length;
  if (countContacted) countContacted.textContent = AppState.talents.filter(t => t.contacted).length;

  let filtered = AppState.talents.filter((t) => {
    const matchesCategory =
      talentFilterCategory === 'all' ||
      (talentFilterCategory === 'contacted' ? t.contacted : t.category === talentFilterCategory);

    const matchesSearch =
      !talentSearchQuery ||
      t.name.toLowerCase().includes(talentSearchQuery.toLowerCase()) ||
      t.role.toLowerCase().includes(talentSearchQuery.toLowerCase()) ||
      t.skills.some(s => s.toLowerCase().includes(talentSearchQuery.toLowerCase())) ||
      t.bio.toLowerCase().includes(talentSearchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
        <i class="fa-solid fa-user-slash" style="font-size: 2.5rem; color: var(--text-dim); margin-bottom: 1rem;"></i>
        <h3>No se encontraron talentos</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.4rem;">Prueba con otro término de búsqueda o añade una nueva persona a la red.</p>
        <button class="btn btn-primary btn-sm" style="margin-top: 1rem;" onclick="openModal('modalAddTalent')">
          <i class="fa-solid fa-plus"></i> Añadir Persona
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map((t) => {
    const statusClass = t.status === 'online' ? 'status-online' : 'status-busy';
    const skillsHtml = t.skills.map(s => `<span class="skill-tag">${s}</span>`).join('');

    const contactButtonHtml = t.contacted
      ? `<button class="btn btn-secondary btn-sm" onclick="cancelContactRequest('${t.id}')" title="Clic para cancelar solicitud">
           <i class="fa-solid fa-clock-rotate-left" style="color:var(--accent-amber);"></i> Solicitud Enviada
         </button>`
      : `<button class="btn btn-primary btn-sm" onclick="openContactModal('${t.id}', '${escapeHtml(t.name)}')">
           <i class="fa-solid fa-paper-plane"></i> Mandar Solicitud
         </button>`;

    return `
      <div class="talent-card-item">
        <div class="talent-card-top">
          <div class="talent-avatar-wrap">
            <img src="${t.avatar}" class="talent-avatar" alt="${escapeHtml(t.name)}">
            <span class="talent-status-dot ${statusClass}" title="Estado: ${t.status}"></span>
          </div>
          <div class="talent-meta">
            <h3>${escapeHtml(t.name)}</h3>
            <span class="talent-role">${escapeHtml(t.role)}</span>
            <span class="talent-availability"><i class="fa-regular fa-clock"></i> ${escapeHtml(t.availability)}</span>
          </div>
        </div>
        <p class="talent-bio">${escapeHtml(t.bio)}</p>
        <div class="talent-skills">${skillsHtml}</div>
        <div class="talent-footer">
          <div class="talent-links">
            ${t.portfolio ? `<a href="${t.portfolio}" target="_blank" title="Ver Perfil/Portafolio"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
            <a href="javascript:void(0)" onclick="openDirectMessage('${escapeHtml(t.name)}')" title="Enviar mensaje en chat"><i class="fa-regular fa-comment-dots"></i></a>
          </div>
          ${contactButtonHtml}
        </div>
      </div>
    `;
  }).join('');
}

// Filtros de categoría en Red
document.querySelectorAll('#talentFilterTabs .filter-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('#talentFilterTabs .filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    talentFilterCategory = tab.dataset.category;
    renderTalentsGrid();
  });
});

// Buscador de talentos
document.getElementById('talentSearchInput')?.addEventListener('input', (e) => {
  talentSearchQuery = e.target.value;
  renderTalentsGrid();
});

// Guardar nuevo talento
document.getElementById('btnSaveTalent')?.addEventListener('click', () => {
  const name = document.getElementById('inputTalentName')?.value.trim();
  const role = document.getElementById('inputTalentRole')?.value.trim();
  const category = document.getElementById('inputTalentCategory')?.value || 'dev';
  const bio = document.getElementById('inputTalentBio')?.value.trim();
  const skillsRaw = document.getElementById('inputTalentSkills')?.value.trim();
  const availability = document.getElementById('inputTalentAvailability')?.value || 'Tiempo Completo';
  const link = document.getElementById('inputTalentLink')?.value.trim();

  if (!name || !role || !bio) {
    alert('Por favor completa el nombre, rol y biografía profesional.');
    return;
  }

  const skills = skillsRaw ? skillsRaw.split(',').map(s => s.trim()).filter(Boolean) : ['Colaborador', 'Tech'];

  // Avatar aleatorio elegante
  const randomAvatars = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  ];
  const avatar = randomAvatars[Math.floor(Math.random() * randomAvatars.length)];

  const newTalent = {
    id: `tal-${Date.now()}`,
    name,
    role,
    category,
    bio,
    skills,
    availability,
    avatar,
    portfolio: link || 'https://github.com',
    status: 'online',
    contacted: false
  };

  AppState.talents.unshift(newTalent);

  // Registrar en Flujo de Trabajo
  addWorkflowEvent({
    category: 'talent',
    title: 'Nuevo Talento Añadido',
    detail: `Se incorporó a ${name} (${role}) a la red de TeamUp.`,
    dot: 'green'
  });

  saveState();
  closeModal('modalAddTalent');
  renderTalentsGrid();
  updateOverviewStats();
  showToast(`¡${name} se ha añadido a la red con éxito!`, 'success', 'fa-check');

  // Limpiar campos
  document.getElementById('inputTalentName').value = '';
  document.getElementById('inputTalentRole').value = '';
  document.getElementById('inputTalentBio').value = '';
  document.getElementById('inputTalentSkills').value = '';
  document.getElementById('inputTalentLink').value = '';
});

// Modal de enviar solicitud de contacto
window.openContactModal = function (talentId, talentName) {
  document.getElementById('contactTargetTalentId').value = talentId;
  const nameEl = document.getElementById('contactTargetTalentName');
  if (nameEl) nameEl.textContent = talentName;
  openModal('modalContactRequest');
};

document.getElementById('btnSendContactConfirm')?.addEventListener('click', () => {
  const talentId = document.getElementById('contactTargetTalentId')?.value;
  const talent = AppState.talents.find(t => t.id === talentId);
  const subject = document.getElementById('contactSubjectInput')?.value.trim();

  if (talent) {
    talent.contacted = true;

    // Registrar en Flujo de Trabajo
    addWorkflowEvent({
      category: 'talent',
      title: 'Solicitud de Contacto Enviada',
      detail: `Invitación remitida a ${talent.name} para: "${subject || 'Colaboración en proyecto'}".`,
      dot: 'blue'
    });

    saveState();
    closeModal('modalContactRequest');
    renderTalentsGrid();
    updateOverviewStats();
    showToast(`Solicitud de contacto enviada a ${talent.name}`, 'success', 'fa-paper-plane');
  }
});

window.cancelContactRequest = function (talentId) {
  const talent = AppState.talents.find(t => t.id === talentId);
  if (talent && confirm(`¿Deseas cancelar la solicitud de contacto a ${talent.name}?`)) {
    talent.contacted = false;
    saveState();
    renderTalentsGrid();
    updateOverviewStats();
    showToast('Solicitud cancelada', 'info', 'fa-clock');
  }
};

window.openDirectMessage = function (talentName) {
  showPage('canales');
  const chatInput = document.getElementById('chatMessageInput');
  if (chatInput) {
    chatInput.value = `@${talentName} `;
    chatInput.focus();
  }
  showToast(`Escribiendo mensaje a ${talentName} en canales`, 'info', 'fa-comment');
};

// ==================== SECCIÓN 2: GESTIÓN DE TAREAS ====================
// Motor de la Línea de Tiempo y Avance Temporal
let currentTaskView = 'kanban';
let taskPriorityFilter = 'all';

function computeTimeProgress(startDateStr, endDateStr, status) {
  const start = new Date(startDateStr).getTime();
  const end = new Date(endDateStr).getTime();
  const now = Date.now();

  if (status === 'done') {
    return {
      pct: 100,
      label: '100% · Tarea Completada con Éxito',
      colorClass: 'completed',
      isUrgent: false,
      timeLeft: 'Completada'
    };
  }

  const totalDuration = end - start;
  if (totalDuration <= 0) {
    return { pct: 100, label: 'Plazo expirado', colorClass: 'danger', isUrgent: true, timeLeft: 'Vencida' };
  }

  const elapsed = now - start;

  if (elapsed < 0) {
    // Aún no ha comenzado
    const msUntilStart = start - now;
    const daysUntil = Math.ceil(msUntilStart / (1000 * 3600 * 24));
    return {
      pct: 0,
      label: `0% · Inicia en ${daysUntil} ${daysUntil === 1 ? 'día' : 'días'}`,
      colorClass: '',
      isUrgent: false,
      timeLeft: `Inicia pronto`
    };
  }

  let pct = Math.min(100, Math.max(0, Math.round((elapsed / totalDuration) * 100)));
  const msRemaining = end - now;

  let colorClass = '';
  let isUrgent = false;
  let timeLeftText = '';

  if (msRemaining <= 0) {
    pct = 100;
    colorClass = 'danger';
    isUrgent = true;
    timeLeftText = '¡Plazo Vencido!';
  } else {
    const hoursRemaining = Math.floor(msRemaining / (1000 * 3600));
    const daysRemaining = Math.floor(hoursRemaining / 24);
    const remHours = hoursRemaining % 24;

    if (daysRemaining > 0) {
      timeLeftText = `Quedan ${daysRemaining}d ${remHours}h`;
    } else {
      const minutesRemaining = Math.floor((msRemaining % (1000 * 3600)) / (1000 * 60));
      timeLeftText = `Quedan ${hoursRemaining}h ${minutesRemaining}m`;
    }

    if (pct >= 85) {
      colorClass = 'danger';
      isUrgent = true;
    }
  }

  return {
    pct,
    label: `${pct}% del plazo consumido`,
    colorClass,
    isUrgent,
    timeLeft: timeLeftText
  };
}

function formatDateCalendar(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return 'Fecha pendiente';
  return d.toLocaleString('es-ES', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function renderTasks() {
  if (currentTaskView === 'kanban') {
    renderKanbanBoard();
  } else {
    renderGanttView();
  }
  updateOverviewStats();
}

function renderKanbanBoard() {
  const colTodo = document.getElementById('cardsTodo');
  const colInProgress = document.getElementById('cardsInProgress');
  const colDone = document.getElementById('cardsDone');

  if (!colTodo || !colInProgress || !colDone) return;

  const countTodo = document.getElementById('countTodo');
  const countInProgress = document.getElementById('countInProgress');
  const countDone = document.getElementById('countDone');

  let filtered = AppState.tasks.filter((t) => {
    return taskPriorityFilter === 'all' || t.priority === taskPriorityFilter;
  });

  const todoTasks = filtered.filter(t => t.status === 'todo');
  const inProgressTasks = filtered.filter(t => t.status === 'in-progress');
  const doneTasks = filtered.filter(t => t.status === 'done');

  if (countTodo) countTodo.textContent = todoTasks.length;
  if (countInProgress) countInProgress.textContent = inProgressTasks.length;
  if (countDone) countDone.textContent = doneTasks.length;

  colTodo.innerHTML = todoTasks.map(t => renderTaskCard(t)).join('') || emptyColumnMsg('Sin tareas pendientes');
  colInProgress.innerHTML = inProgressTasks.map(t => renderTaskCard(t)).join('') || emptyColumnMsg('Sin tareas en proceso');
  colDone.innerHTML = doneTasks.map(t => renderTaskCard(t)).join('') || emptyColumnMsg('Sin tareas completadas aún');
}

function emptyColumnMsg(msg) {
  return `<div style="text-align:center; padding:2rem 1rem; color:var(--text-dim); font-size:0.85rem; border:1px dashed var(--border-light); border-radius:var(--radius-sm);">${msg}</div>`;
}

function renderTaskCard(task) {
  const timeProgress = computeTimeProgress(task.startDate, task.endDate, task.status);
  const startFmt = formatDateCalendar(task.startDate);
  const endFmt = formatDateCalendar(task.endDate);

  const assigneeObj = AppState.talents.find(t => t.name === task.assignee);
  const assigneeAvatar = assigneeObj ? assigneeObj.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80';

  let moveActionButtons = '';
  if (task.status === 'todo') {
    moveActionButtons = `
      <button class="btn btn-secondary btn-sm" onclick="changeTaskStatus('${task.id}', 'in-progress')" title="Mover a En Proceso">
        <i class="fa-solid fa-arrow-right"></i> En Proceso
      </button>
    `;
  } else if (task.status === 'in-progress') {
    moveActionButtons = `
      <button class="btn btn-success btn-sm" onclick="changeTaskStatus('${task.id}', 'done')" title="Marcar como Completada">
        <i class="fa-solid fa-check"></i> Completar
      </button>
    `;
  } else if (task.status === 'done') {
    moveActionButtons = `
      <button class="btn btn-secondary btn-sm" onclick="changeTaskStatus('${task.id}', 'in-progress')" title="Reabrir tarea">
        <i class="fa-solid fa-rotate-left"></i> Reabrir
      </button>
    `;
  }

  return `
    <div class="task-card" data-task-id="${task.id}">
      <div class="task-card-header">
        <span class="task-priority priority-${task.priority}">${task.priority}</span>
        <button class="deck-btn" onclick="deleteTask('${task.id}')" title="Eliminar tarea" style="width:24px; height:24px; font-size:0.75rem;">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>

      <h4 class="task-card-title">${escapeHtml(task.title)}</h4>
      ${task.desc ? `<p class="task-card-desc">${escapeHtml(task.desc)}</p>` : ''}

      <!-- LÍNEA DE AVANCE TEMPORAL DINÁMICA -->
      <div class="task-timeline-container" id="timeline-${task.id}">
        <div class="timeline-dates">
          <span><i class="fa-regular fa-calendar-plus"></i> ${startFmt}</span>
          <span><i class="fa-solid fa-flag-checkered"></i> ${endFmt}</span>
        </div>
        <div class="timeline-track">
          <div class="timeline-fill ${timeProgress.colorClass}" style="width: ${timeProgress.pct}%;"></div>
        </div>
        <div class="timeline-status">
          <span class="timeline-pct">${timeProgress.label}</span>
          <span class="timeline-timeleft ${timeProgress.isUrgent ? 'urgent' : ''}">${timeProgress.timeLeft}</span>
        </div>
      </div>

      <div class="task-card-footer">
        <div class="task-assignee">
          <img src="${assigneeAvatar}" class="task-assignee-avatar" alt="${escapeHtml(task.assignee)}">
          <span>${escapeHtml(task.assignee)}</span>
        </div>
        <div class="task-actions">
          ${moveActionButtons}
        </div>
      </div>
    </div>
  `;
}

function renderGanttView() {
  const container = document.getElementById('ganttTasksList');
  if (!container) return;

  container.innerHTML = AppState.tasks.map((task) => {
    const timeProgress = computeTimeProgress(task.startDate, task.endDate, task.status);
    const startFmt = formatDateCalendar(task.startDate);
    const endFmt = formatDateCalendar(task.endDate);

    return `
      <div class="gantt-row">
        <div class="gantt-row-head">
          <div class="gantt-row-title">
            <span class="task-priority priority-${task.priority}">${task.priority}</span>
            <b>${escapeHtml(task.title)}</b>
            <span style="font-size:0.8rem; color:var(--text-muted); font-weight:normal;">(Asignado a: ${escapeHtml(task.assignee)})</span>
          </div>
          <span class="badge ${task.status === 'done' ? 'badge-green' : 'badge-blue'}">
            ${task.status === 'done' ? 'Completada' : (task.status === 'in-progress' ? 'En Proceso' : 'Por Hacer')}
          </span>
        </div>

        <div class="task-timeline-container" style="background: rgba(0,0,0,0.4);">
          <div class="timeline-dates">
            <span><b>Inicio:</b> ${startFmt}</span>
            <span><b>Límite / Fin:</b> ${endFmt}</span>
          </div>
          <div class="timeline-track" style="height: 10px;">
            <div class="timeline-fill ${timeProgress.colorClass}" style="width: ${timeProgress.pct}%;"></div>
          </div>
          <div class="timeline-status">
            <span class="timeline-pct">${timeProgress.label}</span>
            <span class="timeline-timeleft ${timeProgress.isUrgent ? 'urgent' : ''}">
              <i class="fa-solid fa-stopwatch"></i> ${timeProgress.timeLeft}
            </span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Alternar entre Kanban y Cronograma Gantt
window.switchTaskView = function (view) {
  currentTaskView = view;
  const btnKanban = document.getElementById('btnViewKanban');
  const btnGantt = document.getElementById('btnViewGantt');
  const boardEl = document.getElementById('kanbanBoard');
  const ganttEl = document.getElementById('ganttContainer');

  if (view === 'kanban') {
    btnKanban?.classList.add('active');
    btnGantt?.classList.remove('active');
    if (boardEl) boardEl.style.display = 'grid';
    if (ganttEl) ganttEl.style.display = 'none';
  } else {
    btnGantt?.classList.add('active');
    btnKanban?.classList.remove('active');
    if (boardEl) boardEl.style.display = 'none';
    if (ganttEl) ganttEl.style.display = 'block';
  }
  renderTasks();
};

// Filtro de prioridad de tareas
document.getElementById('taskFilterPriority')?.addEventListener('change', (e) => {
  taskPriorityFilter = e.target.value;
  renderTasks();
});

// Cambiar estado de tarea
window.changeTaskStatus = function (taskId, newStatus) {
  const task = AppState.tasks.find(t => t.id === taskId);
  if (!task) return;

  const oldStatus = task.status;
  task.status = newStatus;

  // Registrar en Flujo de Trabajo
  if (newStatus === 'done') {
    addWorkflowEvent({
      category: 'task',
      title: 'Tarea Completada',
      detail: `${task.assignee} completó con éxito: "${task.title}".`,
      dot: 'green'
    });
    showToast(`¡Tarea "${task.title}" completada!`, 'success', 'fa-check');
  } else if (newStatus === 'in-progress' && oldStatus === 'todo') {
    addWorkflowEvent({
      category: 'task',
      title: 'Tarea Iniciada',
      detail: `Se puso en marcha "${task.title}" asignada a ${task.assignee}.`,
      dot: 'blue'
    });
  }

  saveState();
  renderTasks();
  updateOverviewStats();
};

window.deleteTask = function (taskId) {
  const task = AppState.tasks.find(t => t.id === taskId);
  if (task && confirm(`¿Eliminar la tarea "${task.title}"?`)) {
    AppState.tasks = AppState.tasks.filter(t => t.id !== taskId);
    saveState();
    renderTasks();
    updateOverviewStats();
    showToast('Tarea eliminada', 'info', 'fa-trash');
  }
};

// Asignar fechas rápidas al crear tarea
window.setQuickTaskDates = function (hoursAhead) {
  const now = new Date();
  const startIso = toLocalISO(now);
  const endIso = toLocalISO(new Date(now.getTime() + hoursAhead * 3600 * 1000));

  const startInput = document.getElementById('inputTaskStart');
  const endInput = document.getElementById('inputTaskEnd');
  if (startInput) startInput.value = startIso;
  if (endInput) endInput.value = endIso;
};

function toLocalISO(date) {
  const pad = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function initDefaultTaskDates() {
  const now = new Date();
  const startInput = document.getElementById('inputTaskStart');
  const endInput = document.getElementById('inputTaskEnd');
  if (startInput && !startInput.value) startInput.value = toLocalISO(now);
  if (endInput && !endInput.value) endInput.value = toLocalISO(new Date(now.getTime() + 72 * 3600 * 1000));
}

function populateAssigneeSelect() {
  const select = document.getElementById('inputTaskAssignee');
  if (!select) return;
  select.innerHTML = AppState.talents.map(t => `<option value="${escapeHtml(t.name)}">${escapeHtml(t.name)} (${escapeHtml(t.role)})</option>`).join('');
}

// Guardar nueva tarea
document.getElementById('btnSaveTask')?.addEventListener('click', () => {
  const title = document.getElementById('inputTaskTitle')?.value.trim();
  const desc = document.getElementById('inputTaskDesc')?.value.trim();
  const assignee = document.getElementById('inputTaskAssignee')?.value || 'Alex García';
  const priority = document.getElementById('inputTaskPriority')?.value || 'media';
  const status = document.getElementById('inputTaskStatus')?.value || 'todo';
  const startDate = document.getElementById('inputTaskStart')?.value;
  const endDate = document.getElementById('inputTaskEnd')?.value;

  if (!title) {
    alert('Por favor ingresa el título de la tarea.');
    return;
  }
  if (!startDate || !endDate) {
    alert('Por favor especifica la fecha y hora de inicio y de fin.');
    return;
  }

  const newTask = {
    id: `task-${Date.now()}`,
    title,
    desc,
    assignee,
    priority,
    status,
    startDate: new Date(startDate).toISOString(),
    endDate: new Date(endDate).toISOString()
  };

  AppState.tasks.unshift(newTask);

  // Registrar en Flujo de Trabajo
  addWorkflowEvent({
    category: 'task',
    title: 'Nueva Tarea Calendarizada',
    detail: `Se programó "${title}" asignada a ${assignee} hasta el ${formatDateCalendar(newTask.endDate)}.`,
    dot: 'amber'
  });

  saveState();
  closeModal('modalCreateTask');
  renderTasks();
  updateOverviewStats();
  showToast(`¡Tarea "${title}" creada con éxito!`, 'success', 'fa-calendar-plus');

  // Limpiar campos
  document.getElementById('inputTaskTitle').value = '';
  document.getElementById('inputTaskDesc').value = '';
});

// Ticker en vivo: actualiza las barras de tiempo dinámicamente cada 4 segundos
setInterval(() => {
  if (AppState.tasks.length === 0) return;

  AppState.tasks.forEach((task) => {
    const elContainer = document.getElementById(`timeline-${task.id}`);
    if (!elContainer) return;

    const timeProgress = computeTimeProgress(task.startDate, task.endDate, task.status);
    const fillEl = elContainer.querySelector('.timeline-fill');
    const pctEl = elContainer.querySelector('.timeline-pct');
    const timeLeftEl = elContainer.querySelector('.timeline-timeleft');

    if (fillEl) {
      fillEl.style.width = `${timeProgress.pct}%`;
      fillEl.className = `timeline-fill ${timeProgress.colorClass}`;
    }
    if (pctEl) pctEl.textContent = timeProgress.label;
    if (timeLeftEl) {
      timeLeftEl.textContent = timeProgress.timeLeft;
      timeLeftEl.className = `timeline-timeleft ${timeProgress.isUrgent ? 'urgent' : ''}`;
    }
  });

  // Reloj superior
  const clockEl = document.getElementById('liveClockBadge');
  if (clockEl) {
    const now = new Date();
    clockEl.innerHTML = `<i class="fa-regular fa-clock"></i> Hora: ${now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
  }
}, 3000);

// ==================== SECCIÓN 3: CANALES Y VOZ (DISCORD STYLE) ====================
function renderServers() {
  const rail = document.getElementById('discordServersRail');
  if (!rail) return;

  const serverIconsHtml = AppState.servers.map((srv) => {
    const isActive = srv.id === AppState.activeServerId ? 'active' : '';
    return `
      <div class="server-icon ${isActive}" onclick="selectServer('${srv.id}')" title="${escapeHtml(srv.name)}">
        ${escapeHtml(srv.icon || srv.name.slice(0, 2).toUpperCase())}
      </div>
    `;
  }).join('');

  rail.innerHTML = `
    ${serverIconsHtml}
    <div class="server-separator"></div>
    <div class="server-icon add-server" onclick="openModal('modalCreateServer')" title="Crear un Servidor o Llamada">
      <i class="fa-solid fa-plus"></i>
    </div>
  `;
}

window.selectServer = function (srvId) {
  AppState.activeServerId = srvId;
  const srv = AppState.servers.find(s => s.id === srvId);
  if (srv && srv.channels.text.length > 0) {
    AppState.activeChannelId = srv.channels.text[0].id;
  }
  renderServers();
  renderChannels();
  renderChatFeed();
};

function renderChannels() {
  const currentSrv = AppState.servers.find(s => s.id === AppState.activeServerId) || AppState.servers[0];
  if (!currentSrv) return;

  const headerTitle = document.getElementById('activeServerName');
  if (headerTitle) headerTitle.textContent = currentSrv.name;

  const textList = document.getElementById('textChannelsList');
  const voiceList = document.getElementById('voiceChannelsList');

  if (textList) {
    textList.innerHTML = currentSrv.channels.text.map((ch) => {
      const isActive = ch.id === AppState.activeChannelId ? 'active' : '';
      return `
        <div class="channel-item ${isActive}" onclick="selectChannel('${ch.id}', 'text', '${escapeHtml(ch.name)}')">
          <i class="fa-solid fa-hashtag"></i>
          <span>${escapeHtml(ch.name)}</span>
        </div>
      `;
    }).join('');
  }

  if (voiceList) {
    voiceList.innerHTML = currentSrv.channels.voice.map((vc) => {
      const isActive = AppState.voiceState.inCall && AppState.voiceState.channelId === vc.id ? 'active' : '';
      return `
        <div class="channel-item ${isActive}" onclick="selectVoiceRoom('${vc.id}', '${escapeHtml(vc.name)}')">
          <i class="fa-solid fa-volume-high"></i>
          <span>${escapeHtml(vc.name)}</span>
          ${vc.users > 0 ? `<span class="channel-users-badge">${vc.users}</span>` : ''}
        </div>
      `;
    }).join('');
  }

  updateChannelHeader();
}

function updateChannelHeader() {
  const currentSrv = AppState.servers.find(s => s.id === AppState.activeServerId);
  if (!currentSrv) return;

  let ch = currentSrv.channels.text.find(c => c.id === AppState.activeChannelId);
  const titleEl = document.getElementById('activeChannelTitle');
  const headerEl = document.getElementById('activeChannelHeader');

  if (ch) {
    if (titleEl) titleEl.textContent = ch.name;
    if (headerEl) headerEl.innerHTML = `<i class="fa-solid fa-hashtag"></i> <span>${escapeHtml(ch.name)}</span>`;
  } else if (AppState.voiceState.inCall) {
    if (titleEl) titleEl.textContent = AppState.voiceState.channelName;
    if (headerEl) headerEl.innerHTML = `<i class="fa-solid fa-phone-volume text-green"></i> <span>${escapeHtml(AppState.voiceState.channelName)} (Llamada Activa)</span>`;
  }
}

window.selectChannel = function (chId, type, name) {
  AppState.activeChannelId = chId;
  renderChannels();
  renderChatFeed();
};

window.selectVoiceRoom = function (vcId, name) {
  if (confirm(`¿Conectarte a la sala de voz y llamada "${name}"?`)) {
    connectToVoiceCall(vcId, name);
  }
};

// ==================== LLAMADAS DE VOZ, CÁMARA Y PANTALLA (WEBRTC) ====================
let callTimerInterval = null;
let mediaStream = null;

window.connectToVoiceCall = function (vcId = null, vcName = null) {
  const currentSrv = AppState.servers.find(s => s.id === AppState.activeServerId);
  const voiceChannel = vcId
    ? currentSrv?.channels.voice.find(v => v.id === vcId)
    : currentSrv?.channels.voice[0];

  const channelName = vcName || (voiceChannel ? voiceChannel.name : 'Sala General');
  const channelId = vcId || (voiceChannel ? voiceChannel.id : 'vc-main');

  AppState.voiceState.inCall = true;
  AppState.voiceState.channelId = channelId;
  AppState.voiceState.channelName = channelName;
  AppState.voiceState.callSeconds = 0;

  const callStage = document.getElementById('callStage');
  const btnJoin = document.getElementById('btnJoinVoiceCall');
  const statusDeck = document.getElementById('userVoiceStatusText');

  if (callStage) callStage.style.display = 'flex';
  if (btnJoin) {
    btnJoin.innerHTML = '<i class="fa-solid fa-phone-slash"></i> Desconectar';
    btnJoin.className = 'btn btn-danger btn-sm';
    btnJoin.onclick = disconnectVoiceCall;
  }
  if (statusDeck) {
    statusDeck.textContent = `En voz: ${channelName}`;
    statusDeck.style.color = '#23a55a';
  }

  // Timer de llamada
  clearInterval(callTimerInterval);
  callTimerInterval = setInterval(() => {
    AppState.voiceState.callSeconds++;
  }, 1000);

  // Registrar en Flujo de Trabajo
  addWorkflowEvent({
    category: 'voice',
    title: 'Llamada Iniciada',
    detail: `Te has conectado con voz a "${channelName}" en ${currentSrv.name}.`,
    dot: 'purple'
  });

  renderChannels();
  showToast(`Conectado a la sala de llamada: ${channelName}`, 'success', 'fa-headset');
};

window.disconnectVoiceCall = function () {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }

  const videoEl = document.getElementById('localVideoFeed');
  if (videoEl) {
    videoEl.srcObject = null;
    videoEl.style.display = 'none';
  }

  const avatarEl = document.getElementById('localAvatarImg');
  if (avatarEl) avatarEl.style.display = 'block';

  AppState.voiceState.inCall = false;
  AppState.voiceState.cameraActive = false;
  AppState.voiceState.screenSharing = false;
  clearInterval(callTimerInterval);

  const callStage = document.getElementById('callStage');
  const btnJoin = document.getElementById('btnJoinVoiceCall');
  const statusDeck = document.getElementById('userVoiceStatusText');

  if (callStage) callStage.style.display = 'none';
  if (btnJoin) {
    btnJoin.innerHTML = '<i class="fa-solid fa-phone"></i> Conectarse a Llamada';
    btnJoin.className = 'btn btn-success btn-sm';
    btnJoin.onclick = () => connectToVoiceCall();
  }
  if (statusDeck) {
    statusDeck.textContent = 'En línea';
    statusDeck.style.color = 'var(--text-muted)';
  }

  renderChannels();
  showToast('Desconectado de la llamada', 'info', 'fa-phone-slash');
};

window.toggleMuteMic = function () {
  AppState.voiceState.micMuted = !AppState.voiceState.micMuted;
  const isMuted = AppState.voiceState.micMuted;

  // Actualizar botones de mic
  const deckMic = document.getElementById('btnDeckMic');
  const callMic = document.getElementById('btnCallToggleMic');
  const micIcon = document.getElementById('localMicBadgeIcon');

  [deckMic, callMic].forEach((btn) => {
    if (!btn) return;
    if (isMuted) {
      btn.innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
      btn.classList.add('muted');
    } else {
      btn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
      btn.classList.remove('muted');
    }
  });

  if (micIcon) {
    micIcon.className = isMuted ? 'fa-solid fa-microphone-slash text-danger' : 'fa-solid fa-microphone';
  }

  showToast(isMuted ? 'Micrófono silenciado' : 'Micrófono activado', 'info', isMuted ? 'fa-microphone-slash' : 'fa-microphone');
};

window.toggleDeafen = function () {
  AppState.voiceState.deafened = !AppState.voiceState.deafened;
  const deafBtn = document.getElementById('btnDeckDeaf');
  if (deafBtn) {
    deafBtn.classList.toggle('muted', AppState.voiceState.deafened);
  }
  showToast(AppState.voiceState.deafened ? 'Altavoces desactivados' : 'Altavoces activos', 'info');
};

// Encender / Apagar cámara web real o simulada
window.toggleCamera = async function () {
  if (!AppState.voiceState.inCall) {
    connectToVoiceCall();
  }

  const videoEl = document.getElementById('localVideoFeed');
  const avatarEl = document.getElementById('localAvatarImg');
  const camBtn = document.getElementById('btnCallToggleCam');

  AppState.voiceState.cameraActive = !AppState.voiceState.cameraActive;

  if (AppState.voiceState.cameraActive) {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoEl) {
          videoEl.srcObject = mediaStream;
          videoEl.style.display = 'block';
        }
        if (avatarEl) avatarEl.style.display = 'none';
        showToast('Cámara web conectada en tiempo real', 'success', 'fa-video');
      } else {
        throw new Error('Webcam no soportada en este entorno');
      }
    } catch (err) {
      console.warn('Acceso a cámara no disponible, usando modo interactivo:', err);
      if (avatarEl) {
        avatarEl.style.border = '3px solid var(--accent-green)';
        avatarEl.style.boxShadow = '0 0 15px rgba(35, 165, 90, 0.6)';
      }
      showToast('Cámara activa (Modo visual interactivo)', 'success', 'fa-video');
    }
    if (camBtn) camBtn.classList.add('active');
  } else {
    if (mediaStream) {
      mediaStream.getVideoTracks().forEach(t => t.stop());
    }
    if (videoEl) videoEl.style.display = 'none';
    if (avatarEl) {
      avatarEl.style.display = 'block';
      avatarEl.style.border = 'none';
      avatarEl.style.boxShadow = 'none';
    }
    if (camBtn) camBtn.classList.remove('active');
    showToast('Cámara desactivada', 'info', 'fa-video-slash');
  }
};

// Compartir pantalla interactiva
window.toggleScreenShare = async function () {
  if (!AppState.voiceState.inCall) {
    connectToVoiceCall();
  }

  AppState.voiceState.screenSharing = !AppState.voiceState.screenSharing;
  const screenBtn = document.getElementById('btnCallToggleScreen');
  const videoEl = document.getElementById('localVideoFeed');
  const avatarEl = document.getElementById('localAvatarImg');

  if (AppState.voiceState.screenSharing) {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        if (videoEl) {
          videoEl.srcObject = screenStream;
          videoEl.style.display = 'block';
        }
        if (avatarEl) avatarEl.style.display = 'none';
        screenStream.getVideoTracks()[0].onended = () => toggleScreenShare();
      }
    } catch (e) {
      console.log('Compartir pantalla interactivo activado');
    }
    if (screenBtn) screenBtn.classList.add('active');
    showToast('Compartiendo pantalla en la llamada', 'success', 'fa-display');
  } else {
    if (screenBtn) screenBtn.classList.remove('active');
    if (videoEl && !AppState.voiceState.cameraActive) videoEl.style.display = 'none';
    if (avatarEl) avatarEl.style.display = 'block';
    showToast('Se dejó de compartir pantalla', 'info', 'fa-display');
  }
};

// Simulación de audio speaking en participantes remotos
setInterval(() => {
  if (AppState.voiceState.inCall) {
    const p1 = document.getElementById('remoteUser1');
    const p2 = document.getElementById('remoteUser2');
    if (p1) p1.classList.toggle('speaking', Math.random() > 0.45);
    if (p2) p2.classList.toggle('speaking', Math.random() > 0.6);
  }
}, 2500);

// ==================== CHAT DE TEXTO DEL FLUJO DE TRABAJO ====================
function renderChatFeed() {
  const feed = document.getElementById('chatMessagesFeed');
  if (!feed) return;

  const currentChannelId = AppState.activeChannelId || 'ch-gen';
  const messages = AppState.chatMessages[currentChannelId] || [];

  if (messages.length === 0) {
    feed.innerHTML = `
      <div style="margin: auto; text-align: center; color: var(--text-muted); padding: 2rem;">
        <i class="fa-regular fa-comments" style="font-size: 2rem; margin-bottom: 0.5rem; display:block;"></i>
        <p>Este es el inicio del canal #${currentChannelId}.</p>
        <small>Escribe un mensaje o enlaza una tarea para coordinar el flujo de trabajo.</small>
      </div>
    `;
    return;
  }

  feed.innerHTML = messages.map((m) => {
    let taskSnippetHtml = '';
    if (m.taskLinked) {
      const task = m.taskLinked;
      taskSnippetHtml = `
        <div class="discord-task-chip">
          <div>
            <b><i class="fa-solid fa-list-check"></i> ${escapeHtml(task.title)}</b>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:2px;">
              Responsable: ${escapeHtml(task.assignee)} · Prioridad: ${escapeHtml(task.priority)}
            </div>
          </div>
          <span class="badge ${task.status === 'done' ? 'badge-green' : 'badge-blue'}">${task.status === 'done' ? 'Hecha' : 'En marcha'}</span>
        </div>
      `;
    }

    return `
      <div class="discord-msg">
        <img src="${m.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}" class="discord-msg-avatar" alt="${escapeHtml(m.author)}">
        <div class="discord-msg-content">
          <div class="discord-msg-meta">
            <span class="discord-msg-author">${escapeHtml(m.author)}</span>
            <span class="discord-msg-time">${m.time}</span>
          </div>
          <div class="discord-msg-text">${escapeHtml(m.text)}</div>
          ${taskSnippetHtml}
        </div>
      </div>
    `;
  }).join('');

  feed.scrollTop = feed.scrollHeight;
}

function sendChatMessage(textOverride = null, taskLinked = null) {
  const input = document.getElementById('chatMessageInput');
  const text = textOverride || input?.value.trim();

  if (!text && !taskLinked) return;

  const currentChannelId = AppState.activeChannelId || 'ch-gen';
  if (!AppState.chatMessages[currentChannelId]) {
    AppState.chatMessages[currentChannelId] = [];
  }

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newMsg = {
    id: `msg-${Date.now()}`,
    channelId: currentChannelId,
    author: 'Alex García (Tú)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    time: timeStr,
    text: text || `Ha vinculado la tarea: "${taskLinked?.title}"`,
    taskLinked
  };

  AppState.chatMessages[currentChannelId].push(newMsg);

  // Enviar por socket si existe
  if (socket) {
    socket.emit('sendMessage', newMsg);
  }

  saveState();
  renderChatFeed();
  if (input) input.value = '';
}

document.getElementById('btnSendChatMsg')?.addEventListener('click', () => sendChatMessage());
document.getElementById('chatMessageInput')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendChatMessage();
  }
});

// Modal para compartir tarea en chat
window.openShareTaskModal = function () {
  const select = document.getElementById('selectTaskToShare');
  if (!select) return;

  select.innerHTML = AppState.tasks.map(t => `
    <option value="${t.id}">${escapeHtml(t.title)} (${t.assignee} - ${t.status})</option>
  `).join('');

  openModal('modalShareTask');
};

document.getElementById('btnConfirmShareTask')?.addEventListener('click', () => {
  const taskId = document.getElementById('selectTaskToShare')?.value;
  const task = AppState.tasks.find(t => t.id === taskId);
  if (task) {
    sendChatMessage(`📌 He enlazado la tarea para revisión del equipo:`, task);
    closeModal('modalShareTask');
    showToast('Tarea compartida en el chat de trabajo', 'success', 'fa-share');
  }
});

// Crear nuevo servidor
document.getElementById('btnSaveServer')?.addEventListener('click', () => {
  const name = document.getElementById('inputServerName')?.value.trim();
  const icon = document.getElementById('inputServerIcon')?.value.trim() || name.slice(0, 2).toUpperCase();

  if (!name) {
    alert('Ingresa el nombre del servidor.');
    return;
  }

  const newServer = {
    id: `srv-${Date.now()}`,
    name,
    icon,
    channels: {
      text: [
        { id: `ch-${Date.now()}-1`, name: 'general', type: 'text' },
        { id: `ch-${Date.now()}-2`, name: 'recursos', type: 'text' }
      ],
      voice: [
        { id: `vc-${Date.now()}-1`, name: 'Sala de Llamada', type: 'voice', users: 0 }
      ]
    }
  };

  AppState.servers.push(newServer);
  AppState.activeServerId = newServer.id;
  AppState.activeChannelId = newServer.channels.text[0].id;

  // Registrar en Flujo de Trabajo
  addWorkflowEvent({
    category: 'voice',
    title: 'Nuevo Servidor Creado',
    detail: `Se configuró el servidor de llamadas y chat "${name}".`,
    dot: 'purple'
  });

  saveState();
  closeModal('modalCreateServer');
  renderServers();
  renderChannels();
  renderChatFeed();
  updateOverviewStats();
  showToast(`¡Servidor "${name}" creado con éxito!`, 'success', 'fa-discord');

  document.getElementById('inputServerName').value = '';
  document.getElementById('inputServerIcon').value = '';
});

// Crear nuevo canal
document.getElementById('btnSaveChannel')?.addEventListener('click', () => {
  const type = document.getElementById('inputChannelType')?.value || 'text';
  let name = document.getElementById('inputChannelName')?.value.trim();

  if (!name) {
    alert('Ingresa el nombre del canal.');
    return;
  }
  name = name.toLowerCase().replace(/\s+/g, '-');

  const currentSrv = AppState.servers.find(s => s.id === AppState.activeServerId);
  if (!currentSrv) return;

  const newCh = {
    id: `${type === 'text' ? 'ch' : 'vc'}-${Date.now()}`,
    name,
    type,
    users: 0
  };

  if (type === 'text') {
    currentSrv.channels.text.push(newCh);
    AppState.activeChannelId = newCh.id;
  } else {
    currentSrv.channels.voice.push(newCh);
  }

  saveState();
  closeModal('modalCreateChannel');
  renderChannels();
  showToast(`Canal ${type === 'text' ? '#' : '🔊 '}${name} creado`, 'success');
  document.getElementById('inputChannelName').value = '';
});

// ==================== SECCIÓN 4: FLUJO DE TRABAJO (WORKFLOW AUDIT & PROGRESS) ====================
let workflowFilter = 'all';

function addWorkflowEvent({ category, title, detail, dot }) {
  const newEvt = {
    id: `wf-${Date.now()}`,
    category,
    title,
    detail,
    time: 'Justo ahora',
    dot: dot || 'blue'
  };
  AppState.workflowLogs.unshift(newEvt);
  if (AppState.workflowLogs.length > 50) AppState.workflowLogs.pop();
  saveState();
}

function renderWorkflowView() {
  // 1. Métricas
  const totalTasks = AppState.tasks.length || 1;
  const doneTasks = AppState.tasks.filter(t => t.status === 'done').length;
  const completionPct = Math.round((doneTasks / totalTasks) * 100);
  const contactedCount = AppState.talents.filter(t => t.contacted).length;

  const elPct = document.getElementById('wfMetricCompletion');
  const elTasksDone = document.getElementById('wfMetricTasksDone');
  const elReq = document.getElementById('wfMetricRequests');

  if (elPct) elPct.textContent = `${completionPct}%`;
  if (elTasksDone) elTasksDone.textContent = `${doneTasks} / ${AppState.tasks.length}`;
  if (elReq) elReq.textContent = `${contactedCount} Activas`;

  // 2. Timeline de Auditoría
  const container = document.getElementById('workflowTimelineContainer');
  if (!container) return;

  const filteredLogs = AppState.workflowLogs.filter((log) => {
    return workflowFilter === 'all' || log.category === workflowFilter;
  });

  if (filteredLogs.length === 0) {
    container.innerHTML = '<div style="color:var(--text-muted); padding:2rem 0;">No hay actividades registradas en esta categoría.</div>';
    return;
  }

  container.innerHTML = filteredLogs.map((log) => {
    return `
      <div class="timeline-item">
        <div class="timeline-dot ${log.dot}"></div>
        <div class="timeline-content-card">
          <div class="timeline-card-header">
            <span class="timeline-card-title">${escapeHtml(log.title)}</span>
            <span class="timeline-card-time"><i class="fa-regular fa-clock"></i> ${log.time}</span>
          </div>
          <div class="timeline-card-detail">${escapeHtml(log.detail)}</div>
        </div>
      </div>
    `;
  }).join('');
}

window.filterWorkflowLogs = function (cat) {
  workflowFilter = cat;
  document.querySelectorAll('.workflow-log-head .filter-tab').forEach((tab) => {
    tab.classList.toggle('active', tab.textContent.toLowerCase().includes(cat === 'all' ? 'todos' : cat));
  });
  renderWorkflowView();
};

window.exportWorkflowReport = function () {
  const report = {
    title: 'Informe de Flujo de Trabajo — TeamUp',
    date: new Date().toISOString(),
    metrics: {
      totalTasks: AppState.tasks.length,
      doneTasks: AppState.tasks.filter(t => t.status === 'done').length,
      activeTalents: AppState.talents.length,
      contactRequests: AppState.talents.filter(t => t.contacted).length,
      serversCount: AppState.servers.length
    },
    tasks: AppState.tasks,
    recentAuditLog: AppState.workflowLogs
  };

  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `teamup-workflow-report-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Informe de flujo descargado correctamente', 'success', 'fa-download');
};

// ==================== BÚSQUEDA GLOBAL DEL TOPBAR ====================
document.getElementById('globalSearchInput')?.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  if (!query) return;

  // Si busca 'tarea' o similar, ir a tareas
  if (query.includes('tarea') || query.includes('kanban')) {
    showPage('tareas');
    return;
  }
  // Si busca 'red', 'talento', 'perfil'
  if (query.includes('talento') || query.includes('persona') || query.includes('red')) {
    showPage('red');
    return;
  }
  // Si busca 'canal', 'voz', 'discord', 'sala'
  if (query.includes('canal') || query.includes('voz') || query.includes('chat') || query.includes('discord')) {
    showPage('canales');
    return;
  }
  // Si busca 'flujo', 'progreso', 'audit'
  if (query.includes('flujo') || query.includes('log') || query.includes('avance')) {
    showPage('flujo');
    return;
  }

  // Filtrar talentos si está en red
  const activePage = currentPage();
  if (activePage === 'red') {
    talentSearchQuery = query;
    renderTalentsGrid();
  }
});

// ==================== UTILIDADES ====================
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
  showPage(currentPage());
});
