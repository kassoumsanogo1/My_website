document.addEventListener('DOMContentLoaded', function() {
    // Navigation mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scroll pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Fermer le menu mobile si ouvert
                if (navMenu) navMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            }
        });
    });

    // Projets dépliables
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const header = card.querySelector('.project-header');
        
        if (header) {
            header.addEventListener('click', function() {
                // Fermer tous les autres projets
                projectCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('active');
                    }
                });
                
                // Toggle le projet actuel
                card.classList.toggle('active');
            });
        }
    });

    // Recherche dépliable (même logique que les projets)
    const researchCards = document.querySelectorAll('.research-card');
    
    researchCards.forEach(card => {
        const header = card.querySelector('.research-header');
        
        if (header) {
            header.addEventListener('click', function() {
                // Fermer toutes les autres recherches
                researchCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('active');
                    }
                });
                
                // Toggle la recherche actuelle
                card.classList.toggle('active');
            });
        }
    });

    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Animation spéciale pour les éléments de timeline
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('animate');
                }
                
                // Animation pour les highlights
                if (entry.target.classList.contains('highlight-item')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 200);
                }
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    document.querySelectorAll('.skill-category, .overview-card, .tech-category, .project-card, .research-card, .contact-item, .timeline-item, .highlight-item, .education-card').forEach(el => {
        observer.observe(el);
        
        // Préparer les highlight-items pour l'animation
        if (el.classList.contains('highlight-item')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
        }
    });

    // Animation en cascade pour les catégories tech
    const techObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const techCategories = document.querySelectorAll('.tech-category');
                techCategories.forEach((category, index) => {
                    setTimeout(() => {
                        category.classList.add('fade-in');
                    }, index * 100);
                });
                techObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        techObserver.observe(skillsSection);
    }

    // Navigation active
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const navProfileImg = document.querySelector('.nav-profile-img');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Afficher/masquer la photo selon la section
        if (current === 'competences' || current === 'projets' || current === 'recherche' || current === 'education' || current === 'contact') {
            navProfileImg.classList.add('show');
        } else {
            navProfileImg.classList.remove('show');
        }
    });

    // Boutons de téléchargement
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            handleDownload(type);
        });
    });

    function handleDownload(type) {
        // Effet visuel du bouton
        const button = document.querySelector(`[data-type="${type}"]`);
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Téléchargement...';
        button.disabled = true;

        // Simulation du téléchargement
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i> Téléchargé !';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 2000);

            // Logique de téléchargement selon le type
            switch(type) {
                case 'cv':
                    downloadCV();
                    break;
                case 'competences':
                    downloadCompetences();
                    break;
                case 'projets':
                    downloadProjets();
                    break;
            }
        }, 1000);
    }

    function downloadCV() {
        try {
            // Télécharger le fichier PDF directement
            const link = document.createElement('a');
            link.href = 'documents/Kassoum_Sanogo_CV.pdf';
            link.download = 'Kassoum_Sanogo_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Erreur lors du téléchargement du CV:', error);
            alert('Erreur lors du téléchargement du CV. Veuillez réessayer.');
        }
    }

    function downloadCompetences() {
        try {
            // Télécharger le fichier PDF directement
            const link = document.createElement('a');
            link.href = 'documents/Kassoum_Sanogo_Competences.pdf';
            link.download = 'Kassoum_Sanogo_Competences.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Erreur lors du téléchargement des compétences:', error);
            alert('Erreur lors du téléchargement du dossier de compétences. Veuillez réessayer.');
        }
    }

    // Animation au chargement
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Traductions
    const translations = {
        fr: {
            'nav-home': 'Accueil',
            'nav-skills': 'Compétences',
            'nav-projects': 'Projets',
            'nav-education': 'Formation',
            'nav-contact': 'Contact',
            'hero-title': 'AI & Data Engineer',
            'hero-description': 'Ingénieur, chercheur et gestionnaire avec des compétences académiques et industrielles en Intelligence Artificielle, machine learning, deep learning, data science et systèmes embarqués.',
            'btn-download-cv': 'Télécharger CV (PDF)',
            'btn-download-skills': 'Dossier Compétences (PDF)',
            'btn-download-projects': 'Liste Projets (LaTeX)',
            'skills-title': 'Mes Compétences',
            'main-skills': 'Grandes Compétences',
            'certifications': 'Certifications (10)',
            'programming-languages': 'Langages de programmation principaux',
            'projects-title': 'Mes Projets',
            'research-title': 'Mes Axes de Recherche',
            'education-title': 'Formation',
            'contact-title': 'Contact'
        },
        en: {
            'nav-home': 'Home',
            'nav-skills': 'Skills',
            'nav-projects': 'Projects',
            'nav-education': 'Education',
            'nav-contact': 'Contact',
            'hero-title': 'AI & Data Engineer',
            'hero-description': 'Engineer, researcher and manager with academic and industrial skills in Artificial Intelligence, machine learning, deep learning, data science and embedded systems.',
            'btn-download-cv': 'Download CV (PDF)',
            'btn-download-skills': 'Skills Portfolio (PDF)',
            'btn-download-projects': 'Projects List (LaTeX)',
            'skills-title': 'My Skills',
            'main-skills': 'Core Skills',
            'certifications': 'Certifications (10)',
            'programming-languages': 'Main Programming Languages',
            'projects-title': 'My Projects',
            'research-title': 'My Research Areas',
            'education-title': 'Education',
            'contact-title': 'Contact'
        }
    };

    // Langue courante - déclarée en global
    let currentLang = 'fr';

    // Fonction pour initialiser la langue
    function initializeLanguage() {
        const savedLang = localStorage.getItem('preferred-language');
        const browserLang = navigator.language.startsWith('en') ? 'en' : 'fr';
        const initialLang = savedLang || browserLang;
        
        if (initialLang !== currentLang) {
            changeLanguage(initialLang);
        }
    }

    // Fonction pour changer la langue
    function changeLanguage(newLang) {
        if (!translations[newLang]) return;
        
        console.log(`Changement de langue vers: ${newLang}`);
        
        // Animation de transition
        document.body.classList.add('lang-switching');
        
        setTimeout(() => {
            currentLang = newLang;
            
            // Mettre à jour tous les éléments avec data-lang
            document.querySelectorAll('[data-lang]').forEach(element => {
                const key = element.getAttribute('data-lang');
                if (translations[currentLang][key]) {
                    element.textContent = translations[currentLang][key];
                }
            });
            
            // Mettre à jour les boutons de langue
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-lang-code') === currentLang) {
                    btn.classList.add('active');
                }
            });
            
            // Sauvegarder la préférence
            localStorage.setItem('preferred-language', currentLang);
            
            // Mettre à jour l'attribut lang du document
            document.documentElement.lang = currentLang;
            
            // Animation de fin
            document.body.classList.remove('lang-switching');
            document.body.classList.add('lang-switched');
            
            setTimeout(() => {
                document.body.classList.remove('lang-switched');
            }, 500);
            
            console.log(`Langue changée vers: ${currentLang}`);
        }, 150);
    }

    // Gestionnaire de changement de langue - amélioré
    const langButtons = document.querySelectorAll('.lang-btn');
    
    console.log('Boutons de langue trouvés:', langButtons.length);
    
    langButtons.forEach((button, index) => {
        console.log(`Bouton ${index}:`, button.getAttribute('data-lang-code'));
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const newLang = this.getAttribute('data-lang-code');
            console.log(`Clic sur bouton langue: ${newLang}, langue actuelle: ${currentLang}`);
            
            if (newLang && newLang !== currentLang) {
                changeLanguage(newLang);
            }
        });
    });

    // Initialiser la langue après le chargement
    initializeLanguage();
});

// Fonction pour obtenir la langue courante
function getCurrentLanguage() {
    return currentLang;
}

// Export pour utilisation externe
window.changeLanguage = changeLanguage;
window.getCurrentLanguage = getCurrentLanguage;