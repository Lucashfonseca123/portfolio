/**
 * Portfolio — project data and rendering.
 * Lightweight, no dependencies. Store links for Franq/Trizy; images in img/ for others.
 */

const portfolio = {
  projects: [
    {
      id: 'franq',
      name: 'Franq',
      link: null,
      image: null,
      storeLinks: [
        { name: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.franq&hl=pt_BR' },
        { name: 'App Store', url: 'https://apps.apple.com/br/app/befranq/id1478438810' }
      ],
      tech: ['Flutter', 'React Native', 'Django', 'Serverless'],
      description: 'BeFranq is the app of Franq Openbanking, offering general management for independent banking professionals.'
    },
    {
      id: 'trizy',
      name: 'Trizy',
      link: null,
      image: null,
      storeLinks: [
        { name: 'App Store', url: 'https://apps.apple.com/br/app/trizy/id1591619623' },
        { name: 'Google Play', url: 'https://play.google.com/store/apps/dev?id=6006507012155792474&hl=pt_BR' }
      ],
      tech: ['React Native', 'Flutter', 'NodeJS', 'MongoDB'],
      description: 'App from the Kmm by NsTech group, a logistics management tool.'
    },
    {
      id: 'ysma',
      name: 'Ysma',
      link: 'https://github.com/Lucashfonseca123/ysma-mobile',
      images: ['img/ysma/01.jpg', 'img/ysma/02.png', 'img/ysma/03.jpg'],
      tech: ['Flutter'],
      storeLinks: [
        { name: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.ysma.ysma&hl=pt_BR' }
      ],
      description: 'App for evaluating establishments, optionally with audio or video.'
    },
    {
      id: 'hey-max',
      name: 'Hey Max',
      link: 'https://github.com/Lucashfonseca123/hey-max',
      images: ['img/hey_max/01.jpg', 'img/hey_max/02.jpg', 'img/hey_max/03.jpg', 'img/hey_max/04.jpg'],
      tech: ['React Native', 'Redux Toolkit'],
      description: 'App to support learning for people with autism.'
    },
    {
      id: 'labirinto-smartphone',
      name: 'Labirinto com smartphone',
      link: 'https://github.com/GabrielBueno22/labyrinth_with_smartphone',
      images: [],
      tech: ['Flutter', 'Lua', 'Websocket'],
      description: 'App to control a virtualized labyrinth (computer engineering project).'
    },
    {
      id: 'travel-flow',
      name: 'Travel Flow',
      link: 'https://github.com/Lucashfonseca123/travel-flow',
      images: ['img/travel_flow/01.png', 'img/travel_flow/02.png', 'img/travel_flow/03.png'],
      tech: ['Flutter', 'Firebase (Storage, Authentication, Firestore, App Distribution)'],
      description: 'App for organizing trips, in groups or solo.'
    },
    {
      id: 'buscare',
      name: 'Buscare App',
      link: 'https://github.com/desenvolvimentogamavi/buscare-app',
      images: [],
      tech: ['React Native', 'Redux Toolkit', 'Ahgora'],
      description: 'App for a medical company for consultation support via video calls.'
    },
    {
      id: 'pda',
      name: 'PDA',
      link: null,
      images: [],
      tech: ['React Native', 'Redux Toolkit'],
      description: 'App for warehouse stock control (installed on a bis machine).'
    },
    {
      id: 'fullfit',
      name: 'Fullfit',
      link: 'https://github.com/hidedevelopment/fullfit-catalogo-mobile',
      images: [],
      tech: ['Flutter', 'Bloc'],
      description: 'App for product catalog, offline and online.'
    }
  ],

  /** Projects that have at least one image (for carousel). */
  get projectsWithImages() {
    return this.projects.filter((p) => p.images && p.images.length > 0);
  },

  /**
   * Renders a project card (title, tech, description, image or store links, optional repo link).
   */
  renderProject(project) {
    let mediaSection;
    if (project.storeLinks && project.storeLinks.length) {
      const links = project.storeLinks
        .map(
          (s) =>
            `<a href="${s.url}" target="_blank" rel="noopener" class="store-link">${s.name}</a>`
        )
        .join('');
      mediaSection = `<div class="project-stores" aria-label="Download ${project.name}">${links}</div>`;
    } else if (project.images && project.images.length > 0) {
      const thumb = project.images[0];
      mediaSection = `<img src="${thumb}" alt="${project.name}" class="project-img" loading="lazy" data-project-id="${project.id}" />`;
    } else {
      mediaSection = `<div class="project-img-placeholder" aria-label="Image of ${project.name}">Project photo</div>`;
    }

    const link = project.link
      ? `<a href="${project.link}" target="_blank" rel="noopener" class="project-link">View repository</a>`
      : '';

    const desc = project.description
      ? `<p class="project-desc">${project.description}</p>`
      : '';

    const tech = (project.tech && project.tech.length)
      ? `<div class="project-tech">${project.tech.map((t) => `<span>${t}</span>`).join('')}</div>`
      : '';

    return `
      <article class="project-card" data-project="${project.id}">
        <div class="project-media">${mediaSection}</div>
        <div class="project-body">
          <h3 class="project-name">${project.name}</h3>
          ${tech}
          ${desc}
          ${link}
        </div>
      </article>
    `;
  },

  /**
   * Renders all projects into the element with id "portfolio-grid".
   */
  mount(containerId = 'portfolio-grid') {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = this.projects.map((p) => this.renderProject(p)).join('');
    this.attachCarousel();
  },

  /**
   * Opens carousel modal for a project (by id). Prev/next cycle through that project's images.
   */
  openCarousel(projectId) {
    const project = this.projects.find((p) => p.id === projectId);
    if (!project || !project.images || !project.images.length) return;
    const modal = document.getElementById('carousel-modal');
    const imgEl = document.getElementById('carousel-img');
    const caption = document.getElementById('carousel-caption');
    const prev = document.getElementById('carousel-prev');
    const next = document.getElementById('carousel-next');
    if (!modal || !imgEl) return;

    const images = project.images;
    let i = 0;
    const set = () => {
      imgEl.src = images[i];
      imgEl.alt = project.name;
      caption.textContent = `${project.name} (${i + 1} / ${images.length})`;
      prev.style.visibility = images.length > 1 ? 'visible' : 'hidden';
      next.style.visibility = images.length > 1 ? 'visible' : 'hidden';
    };
    set();
    modal.classList.add('carousel-open');

    prev.onclick = () => {
      i = (i - 1 + images.length) % images.length;
      set();
    };
    next.onclick = () => {
      i = (i + 1) % images.length;
      set();
    };
  },

  closeCarousel() {
    document.getElementById('carousel-modal')?.classList.remove('carousel-open');
  },

  attachCarousel() {
    const modal = document.getElementById('carousel-modal');
    if (!modal) return;
    document.querySelectorAll('.project-media .project-img').forEach((img) => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        const projectId = img.dataset.projectId;
        if (projectId) this.openCarousel(projectId);
      });
    });
    modal.querySelector('.carousel-backdrop')?.addEventListener('click', () => this.closeCarousel());
    modal.querySelector('.carousel-close')?.addEventListener('click', () => this.closeCarousel());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeCarousel();
    });
  }
};

// Auto-mount when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => portfolio.mount());
} else {
  portfolio.mount();
}

window.portfolio = portfolio;
