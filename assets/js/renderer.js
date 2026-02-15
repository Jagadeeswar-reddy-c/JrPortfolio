// ========================================
// RENDERER - Generate DOM from profile data
// ========================================

class Renderer {
    constructor(data) {
        this.data = data;
    }

    /**
     * Render hero section
     */
    renderHero() {
        const { basics, summary } = this.data;
        const heroGreeting = document.querySelector('.hero-greeting');
        const heroName = document.querySelector('.hero-name');
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');

        if (heroGreeting) heroGreeting.textContent = 'Hi there! 👋 I\'m';
        if (heroName) heroName.textContent = basics.name;
        if (heroTitle) heroTitle.textContent = 'MSc Computer Science Student | ML Engineer | Systems Builder';
        if (heroDescription) heroDescription.textContent = summary[0];
    }

    /**
     * Render contact links in hero section
     */
    renderHeroLinks() {
        const { basics } = this.data;
        const heroCTA = document.querySelector('.hero-cta');

        if (!heroCTA) return;

        const primaryLink = basics.links.find(l => l.label === 'LinkedIn');
        const secondaryLink = basics.links.find(l => l.label === 'GitHub');

        heroCTA.innerHTML = `
      <a href="${primaryLink?.url || '#contact'}" target="_blank" class="btn btn-primary">
        <span>Let's Connect</span>
        <span>→</span>
      </a>
      <a href="${secondaryLink?.url || '#projects'}" target="_blank" class="btn btn-secondary">
        <span>View My Work</span>
        <span>↓</span>
      </a>
    `;
    }

    /**
     * Render hero project (Stock_AI spotlight)
     */
    renderHeroProject() {
        const heroProject = this.data.projects.find(p => p.title.includes('Stock_AI'));
        if (!heroProject) return;

        const container = document.getElementById('hero-project-content');
        if (!container) return;

        const firstBullet = heroProject.bullet_pool[0] || '';

        container.innerHTML = `
      <span class="hero-project-badge">⭐ Featured Project</span>
      <h3 class="hero-project-title">${heroProject.title}</h3>
      <p class="hero-project-description">${firstBullet}</p>
      <div class="hero-project-tech">
        ${heroProject.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
      <a href="${heroProject.links[0]}" target="_blank" class="hero-project-link">
        <span>View Live Demo</span>
        <span>→</span>
      </a>
    `;
    }

    /**
     * Render skills section
     */
    renderSkills() {
        const { skills } = this.data;
        const container = document.getElementById('skills-content');
        if (!container) return;

        const skillCategories = Object.entries(skills).map(([category, items]) => {
            const displayName = category.replace(/_/g, ' & ');
            return `
        <div class="skill-category reveal">
          <h3 class="skill-category-title">${displayName}</h3>
          <ul class="skill-list">
            ${items.map(skill => `<li class="skill-item">${skill}</li>`).join('')}
          </ul>
        </div>
      `;
        }).join('');

        container.innerHTML = `<div class="skills-grid">${skillCategories}</div>`;
    }

    /**
     * Render all projects (excluding hero project)
     */
    renderProjects() {
        const projects = this.data.projects.filter(p => !p.title.includes('Stock_AI'));
        const container = document.getElementById('projects-content');
        if (!container) return;

        const projectCards = projects.map(project => {
            const description = project.bullet_pool[0] || 'No description available';
            const githubLink = project.links.find(l => l.includes('github'));
            const liveLink = project.links.find(l => !l.includes('github'));

            return `
        <div class="project-card reveal" data-tags="${project.tags.join(',')}">
          <div class="project-header">
            <h3 class="project-title">${project.title}</h3>
            <div class="project-tags">
              ${project.tags.slice(0, 3).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
          </div>
          <p class="project-description">${description}</p>
          <div class="project-links">
            ${githubLink ? `<a href="${githubLink}" target="_blank" class="project-link">
              <span>Code</span>
              <span>→</span>
            </a>` : ''}
            ${liveLink ? `<a href="${liveLink}" target="_blank" class="project-link">
              <span>Live Demo</span>
              <span>↗</span>
            </a>` : ''}
          </div>
        </div>
      `;
        }).join('');

        container.innerHTML = projectCards;
    }

    /**
     * Render project filters
     */
    renderProjectFilters() {
        const projects = this.data.projects;
        const allTags = new Set();

        projects.forEach(project => {
            project.tags.forEach(tag => allTags.add(tag));
        });

        const filters = document.getElementById('project-filters');
        if (!filters) return;

        const filterButtons = `
      <button class="filter-btn active" data-filter="all">All</button>
      ${Array.from(allTags).sort().slice(0, 8).map(tag =>
            `<button class="filter-btn" data-filter="${tag}">${tag}</button>`
        ).join('')}
    `;

        filters.innerHTML = filterButtons;
    }

    /**
     * Render work experience
     */
    renderExperience() {
        const { work_experience } = this.data;
        const container = document.getElementById('experience-content');
        if (!container) return;

        const timelineItems = work_experience.map(exp => `
      <div class="timeline-item reveal">
        <div class="experience-card">
          <div class="experience-header">
            <div>
              <h3 class="experience-title">${exp.role}</h3>
              <div class="experience-company">${exp.company}</div>
            </div>
            <div class="experience-meta">
              <span>📍 ${exp.location}</span>
              <span>📅 ${exp.dates}</span>
            </div>
          </div>
          <ul class="experience-description">
            ${exp.bullet_pool.slice(0, 3).map(bullet => `<li>${bullet}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');

        container.innerHTML = `<div class="timeline">${timelineItems}</div>`;
    }

    /**
     * Render education section
     */
    renderEducation() {
        const { education } = this.data;
        const container = document.getElementById('education-content');
        if (!container) return;

        const educationItems = education.map(edu => `
      <div class="glass-card reveal">
        <h3 class="experience-title">${edu.degree}</h3>
        <div class="experience-company">${edu.school}</div>
        <div class="experience-meta">
          <span>📍 ${edu.location}</span>
          <span>📅 ${edu.dates}</span>
        </div>
      </div>
    `).join('');

        container.innerHTML = educationItems;
    }

    /**
     * Render publications section
     */
    renderPublications() {
        const { publications } = this.data;
        if (!publications || publications.length === 0) return;

        const container = document.getElementById('publications-content');
        if (!container) return;

        const publicationItems = publications.map(pub => `
      <div class="glass-card reveal">
        <span class="hero-project-badge">📄 ${pub.author_position}</span>
        <h3 class="project-title">${pub.title}</h3>
        <p class="text-secondary">${pub.venue}, ${pub.year}</p>
        ${pub.link ? `
          <a href="${pub.link}" target="_blank" class="project-link" style="margin-top: 1rem; display: inline-flex;">
            <span>View Publication</span>
            <span>→</span>
          </a>
        ` : ''}
      </div>
    `).join('');

        container.innerHTML = publicationItems;
    }

    /**
     * Render contact section
     */
    renderContact() {
        const { basics } = this.data;
        const container = document.getElementById('contact-links');
        if (!container) return;

        const contactInfo = [
            { icon: '✉️', label: 'Email', value: basics.email, link: `mailto:${basics.email}` },
            { icon: '📱', label: 'Phone', value: basics.phone, link: `tel:${basics.phone}` },
            { icon: '💼', label: 'LinkedIn', value: 'Connect', link: basics.links.find(l => l.label === 'LinkedIn')?.url },
            { icon: '💻', label: 'GitHub', value: 'Follow', link: basics.links.find(l => l.label === 'GitHub')?.url }
        ];

        const contactHTML = contactInfo.map(item => `
      <a href="${item.link}" target="_blank" class="contact-link">
        <span>${item.icon}</span>
        <span>${item.label}</span>
      </a>
    `).join('');

        container.innerHTML = contactHTML;
    }

    /**
     * Render all sections
     */
    renderAll() {
        console.log('🎨 Rendering all sections...');
        this.renderHero();
        this.renderHeroLinks();
        this.renderHeroProject();
        this.renderSkills();
        this.renderProjectFilters();
        this.renderProjects();
        this.renderExperience();
        this.renderEducation();
        this.renderPublications();
        this.renderContact();
        console.log('✅ All sections rendered');
    }
}
