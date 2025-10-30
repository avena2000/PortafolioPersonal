import type { Language } from '$lib/stores/language';

export interface Project {
	company: string;
	period: string;
	role: string;
	location: string;
	description: string;
	achievements: string[];
	technologies: string[];
	color: string;
}

export interface Translations {
	meta: {
		title: string;
		description: string;
	};
	hero: {
		title1: string;
		title2: string;
		subtitle: string;
	};
	about: {
		title: string;
		description: string;
	};
	experience: {
		title: string;
		achievementsTitle: string;
		technologiesTitle: string;
	};
	stack: {
		title: string;
		backend: {
			title: string;
			items: string[];
		};
		frontend: {
			title: string;
			items: string[];
		};
		mobile: {
			title: string;
			items: string[];
		};
		devops: {
			title: string;
			items: string[];
		};
		security: {
			title: string;
			items: string[];
		};
		architecture: {
			title: string;
			items: string[];
		};
	};
	contact: {
		title: string;
		subtitle: string;
		email: string;
		linkedin: string;
		github: string;
	};
	footer: {
		text: string;
	};
	projects: Project[];
}

export const translations: Record<Language, Translations> = {
	es: {
		meta: {
			title: 'Portafolio - Adrián Vázquez Nieto',
			description:
				'Portafolio profesional de Adrián Vázquez Nieto, desarrollador Full-Stack especializado en Go, SvelteKit, Flutter y más'
		},
		hero: {
			title1: 'Desarrollador',
			title2: 'Adrián Vázquez Nieto',
			subtitle: 'Soy un desarrollador apasionado por crear soluciones funcionales y bien diseñadas. Disfruto integrar tecnología con diseño para mejorar la experiencia de usuario, desde el backend hasta la interfaz. Me motiva aprender continuamente, optimizar procesos y aportar ideas que hagan que cada proyecto funcione mejor y se sienta más humano.'
		},
		about: {
			title: 'Sobre Mí',
			description:
				'Soy un desarrollador Full-Stack apasionado por crear soluciones tecnológicas innovadoras y eficientes. Con experiencia en backend, frontend y desarrollo móvil, me especializo en construir sistemas escalables que resuelven problemas reales. Mi enfoque está en escribir código limpio, seguir las mejores prácticas y entregar productos de alta calidad.'
		},
		experience: {
			title: 'Experiencia Profesional',
			achievementsTitle: 'Logros y Responsabilidades',
			technologiesTitle: 'Tecnologías'
		},
		stack: {
			title: 'Stack Tecnológico',
			backend: {
				title: 'Backend',
				items: ['Go (Golang)', 'PostgreSQL', 'REST APIs', 'Docker']
			},
			frontend: {
				title: 'Frontend',
				items: ['SvelteKit', 'Vue.js', 'TailwindCSS', 'TypeScript']
			},
			mobile: {
				title: 'Mobile',
				items: ['Flutter', 'Kotlin', 'Android', 'PWA']
			},
			devops: {
				title: 'DevOps',
				items: ['Docker Compose', 'Traefik', 'Coolify', 'VPS Deployment']
			},
			security: {
				title: 'Seguridad',
				items: ['JWT & Refresh Tokens', 'Secure Cookies', 'Route Protection', 'SSR']
			},
			architecture: {
				title: 'Arquitectura',
				items: ['Clean Architecture', 'SOLID Principles', 'Microservices', 'REST APIs']
			}
		},
		contact: {
			title: 'Contacto',
			subtitle: '¿Interesado en trabajar juntos? No dudes en contactarme',
			email: 'Email',
			linkedin: 'LinkedIn',
			github: 'GitHub'
		},
		footer: {
			text: '© 2025 Portafolio. Desarrollado con SvelteKit y Tailwind CSS'
		},
		projects: [
			{
				company: 'LA MEJOR OPCIÓN',
				period: 'Ago. 2025 – Oct. 2025',
				role: 'Desarrollador Full-Stack Freelance',
				location: 'Mérida, Yucatán',
				description:
					'La Mejor Opción es un proveedor especializado de restaurantes que surte abarrotes, frutas y verduras y químicos especializados de limpieza.',
				achievements: [
					'Diseñé e implementé un sistema completo de gestión de inventarios, pedidos, facturación y Business Intelligence',
					'Implementé técnicas avanzadas de seguridad: Cookies, JWT con Refresh Tokens',
					'Sistema de protección de rutas y precarga de datos con Server Side Rendering',
					'Desplegué todo el stack en VPS con Reverse Proxy y CDN para optimización de imágenes'
				],
				technologies: ['SvelteKit', 'Go', 'PostgreSQL', 'Docker', 'JWT', 'SSR', 'CDN'],
				color: 'from-emerald-500 to-teal-600'
			},
			{
				company: 'INTEGRA EXPANSIÓN',
				period: 'Jul. 2025 – Ago. 2025',
				role: 'Desarrollador Frontend Freelance',
				location: 'Mérida, Yucatán',
				description:
					'Integra Expansión es un centro holístico privado en Mérida, Yucatán que necesitaba una aplicación móvil con información relacionada al área holística de las enfermedades.',
				achievements: [
					'Diseñé e implementé una Landing Page para el centro holístico',
					'Desarrollé aplicación móvil multiplataforma (Android, iOS) y PWA',
					'Despliegue automatizado con Docker en Netlify'
				],
				technologies: ['Vue', 'Flutter', 'Docker', 'Netlify', 'PWA'],
				color: 'from-purple-500 to-pink-600'
			},
			{
				company: 'CENTROGEO',
				period: 'Ene. 2025 – Jun. 2025',
				role: 'Desarrollador Full-Stack Para Proyecto de Investigación',
				location: 'Mérida, Yucatán',
				description:
					'CentroGeo (Centro de Investigación en Ciencias de Información Geoespacial) es un centro público de investigación del CONACYT especializado en análisis territorial, movilidad y desarrollo de tecnologías geoespaciales.',
				achievements: [
					'Diseñé herramientas para recolección geoespacial de datos de flora y situaciones de riesgo',
					'Desarrollé PWA con Flutter para subida de imágenes con geolocalización',
					'Construí backend en Go con APIs para almacenamiento seguro, CDN y gestión de GPS',
					'Desplegué en la nube con Docker Compose, Traefik y Coolify'
				],
				technologies: ['Flutter', 'Go', 'PostgreSQL', 'Docker', 'Traefik', 'Coolify', 'PWA'],
				color: 'from-blue-500 to-cyan-600'
			},
			{
				company: 'SISTEMEXICO',
				period: 'Ene. 2024 – Ago. 2024',
				role: 'Desarrollador Junior Backend / Mobile',
				location: 'Mérida, Yucatán',
				description:
					'SisteMexico Solutions es una compañía de software especializada en soluciones de administración y aprendizaje para instituciones educativas públicas y privadas.',
				achievements: [
					'Diseñé y desarrollé componentes clave en comunicación del sistema para aplicaciones móviles',
					'Desarrollo de rutas del sistema y APIs REST con Go y PostgreSQL',
					'Rediseño completo de UI/UX de dos aplicaciones Android en Kotlin',
					'Reduje el tiempo de inicio de la aplicación en 30%',
					'Optimicé despliegue de organigramas y datos en 40%, solucionando bugs críticos'
				],
				technologies: ['Go', 'PostgreSQL', 'Kotlin', 'Android', 'REST APIs'],
				color: 'from-orange-500 to-red-600'
			}
		]
	},
	en: {
		meta: {
			title: 'Portfolio - Adrián Vázquez Nieto',
			description:
				'Professional portfolio of Adrián Vázquez Nieto, Full-Stack developer specialized in Go, SvelteKit, Flutter and more'
		},
		hero: {
			title1: 'Developer',
			title2: 'Adrián Vázquez Nieto',
			subtitle: "I'm a developer passionate about creating functional and well-designed solutions. I enjoy integrating technology and design to enhance the user experience, from backend to interface. I'm motivated by continuous learning, optimizing processes, and bringing ideas that make each project work better and feel more human."
		},
		about: {
			title: 'About Me',
			description:
				"I'm a Full-Stack developer passionate about creating innovative and efficient technological solutions. With experience in backend, frontend and mobile development, I specialize in building scalable systems that solve real problems. My focus is on writing clean code, following best practices and delivering high-quality products."
		},
		experience: {
			title: 'Professional Experience',
			achievementsTitle: 'Achievements and Responsibilities',
			technologiesTitle: 'Technologies'
		},
		stack: {
			title: 'Tech Stack',
			backend: {
				title: 'Backend',
				items: ['Go (Golang)', 'PostgreSQL', 'REST APIs', 'Docker']
			},
			frontend: {
				title: 'Frontend',
				items: ['SvelteKit', 'Vue.js', 'TailwindCSS', 'TypeScript']
			},
			mobile: {
				title: 'Mobile',
				items: ['Flutter', 'Kotlin', 'Android', 'PWA']
			},
			devops: {
				title: 'DevOps',
				items: ['Docker Compose', 'Traefik', 'Coolify', 'VPS Deployment']
			},
			security: {
				title: 'Security',
				items: ['JWT & Refresh Tokens', 'Secure Cookies', 'Route Protection', 'SSR']
			},
			architecture: {
				title: 'Architecture',
				items: ['Clean Architecture', 'SOLID Principles', 'Microservices', 'REST APIs']
			}
		},
		contact: {
			title: 'Contact',
			subtitle: "Interested in working together? Don't hesitate to contact me",
			email: 'Email',
			linkedin: 'LinkedIn',
			github: 'GitHub'
		},
		footer: {
			text: '© 2025 Portfolio. Built with SvelteKit and Tailwind CSS'
		},
		projects: [
			{
				company: 'LA MEJOR OPCIÓN',
				period: 'Aug. 2025 – Oct. 2025',
				role: 'Freelance Full-Stack Developer',
				location: 'Mérida, Yucatán',
				description:
					'La Mejor Opción is a specialized restaurant supplier that provides groceries, fruits and vegetables, and specialized cleaning chemicals.',
				achievements: [
					'Designed and implemented a complete inventory, orders, billing and Business Intelligence management system',
					'Implemented advanced security techniques: Cookies, JWT with Refresh Tokens',
					'Route protection system and data preloading with Server Side Rendering',
					'Deployed the entire stack on VPS with Reverse Proxy and CDN for image optimization'
				],
				technologies: ['SvelteKit', 'Go', 'PostgreSQL', 'Docker', 'JWT', 'SSR', 'CDN'],
				color: 'from-emerald-500 to-teal-600'
			},
			{
				company: 'INTEGRA EXPANSIÓN',
				period: 'Jul. 2025 – Aug. 2025',
				role: 'Freelance Frontend Developer',
				location: 'Mérida, Yucatán',
				description:
					'Integra Expansión is a private holistic center in Mérida, Yucatán that needed a mobile application with information related to the holistic area of diseases.',
				achievements: [
					'Designed and implemented a Landing Page for the holistic center',
					'Developed cross-platform mobile application (Android, iOS) and PWA',
					'Automated deployment with Docker on Netlify'
				],
				technologies: ['Vue', 'Flutter', 'Docker', 'Netlify', 'PWA'],
				color: 'from-purple-500 to-pink-600'
			},
			{
				company: 'CENTROGEO',
				period: 'Jan. 2025 – Jun. 2025',
				role: 'Full-Stack Developer For Research Project',
				location: 'Mérida, Yucatán',
				description:
					'CentroGeo (Geospatial Information Sciences Research Center) is a CONACYT public research center specialized in territorial analysis, mobility and development of geospatial technologies for the public and academic sector.',
				achievements: [
					'Designed tools for geospatial data collection of flora and risk situations',
					'Developed PWA with Flutter for uploading images with geolocation',
					'Built backend in Go with APIs for secure storage, CDN and GPS coordinate management',
					'Deployed to the cloud with Docker Compose, Traefik and Coolify'
				],
				technologies: ['Flutter', 'Go', 'PostgreSQL', 'Docker', 'Traefik', 'Coolify', 'PWA'],
				color: 'from-blue-500 to-cyan-600'
			},
			{
				company: 'SISTEMEXICO',
				period: 'Jan. 2024 – Aug. 2024',
				role: 'Junior Backend / Mobile Developer',
				location: 'Mérida, Yucatán',
				description:
					'SisteMexico Solutions is a software company specialized in administration and learning solutions for public and private educational institutions.',
				achievements: [
					'Designed and developed key components in system communication for mobile applications',
					'Development of system routes and REST APIs with Go and PostgreSQL',
					'Complete UI/UX redesign of two Android applications in Kotlin',
					'Reduced application startup time by 30%',
					'Optimized organization charts and data deployment by 40%, fixing critical bugs'
				],
				technologies: ['Go', 'PostgreSQL', 'Kotlin', 'Android', 'REST APIs'],
				color: 'from-orange-500 to-red-600'
			}
		]
	}
};

export const getTranslations = (lang: Language): Translations => translations[lang];

