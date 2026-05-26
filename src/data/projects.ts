export type ProjectKind = 'Web' | 'App' | 'Tool' | 'Data' | 'Mobile' | 'Architecture';

import projectTranslationsJson from './projectTranslations.generated.json';
import { mediaPath } from '../lib/paths';

type ProjectDetails = {
  description: string;
  problem: string;
  solution: string;
  results: string;
  features: string[];
  tags: string[];
};

type ProjectTranslation = {
  title?: string;
  summary?: string;
  role?: string;
  context?: string;
  details?: Partial<ProjectDetails>;
};

type LocaleProjectTranslations = Record<string, Record<string, ProjectTranslation>>;

const projectTranslations: LocaleProjectTranslations = projectTranslationsJson as LocaleProjectTranslations;

export type Project = {
  id: string;
  title: string;
  category: 'Profesional' | 'Personal';
  kind: ProjectKind;
  summary: string;
  role: string;
  dateRange?: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  route: string;
  context: string;
  details: ProjectDetails;
  translations?: Record<string, ProjectTranslation>;
};

function mergeProjectDetails(defaultDetails: ProjectDetails, override?: Partial<ProjectDetails>): ProjectDetails {
  if (!override) {
    return defaultDetails;
    "id": "el-corte-ingles-ai-solutions",
    "title": "El Corte Inglés - AI Solutions",
    "category": "Profesional",
    "kind": "Architecture",
    "summary": "Arquitectura de soluciones de IA en Azure para retail, automatización inteligente y agentes corporativos en tiempo real.",
    "role": "Arquitecto de Soluciones",
    "dateRange": "May. 2025 – Presente",
    "image": "/media/projects/el-corte-ingles.jpg",
    "technologies": [
      "Azure",
      "GenAI",
      "MCP",
      "RAG",
      "Jira",
      "Confluence",
      "SonarQube",
      "BMC Helix"
    ],
    "route": "/project/el-corte-ingles-ai-solutions",
    "context": "Participación como AI Solutions Architect en iniciativas estratégicas de El Corte Inglés para integrar IA determinística y no determinística en procesos de negocio y soporte técnico.",
    "details": {
      "description": "Diseñé y validé arquitecturas empresariales para soluciones de IA en Azure, asegurando escalabilidad, seguridad, interoperabilidad con sistemas legacy y alineamiento con estándares corporativos.",
      "problem": "El reto era habilitar casos de uso de IA de gran escala sin romper la arquitectura existente, garantizando gobierno técnico, integración con herramientas corporativas y despliegue seguro en entornos híbridos.",
      "solution": "Definí el diseño de piezas clave de plataforma: catálogo de aplicaciones internas y externas, servidores MCP, agentes conversacionales integrados en tiempo real con Jira, Confluence, SonarQube y BMC Helix, y agentes SDLC para acompañar todo el ciclo de vida del software. Coordiné despliegues con infraestructura, publicación segura con ciberseguridad y seguimiento técnico continuo con cliente.",
      "results": "Se estableció una base reutilizable para nuevos productos de IA, se aceleró la automatización de procesos internos y se reforzó la eficiencia operativa en atención y soporte técnico, consolidando la arquitectura de referencia para escalar nuevos casos de uso.",
      "features": [
        "Catálogo de aplicaciones internas y externas",
        "Servidores MCP para integración enterprise",
        "Agentes conversacionales conectados a Jira, Confluence, SonarQube y BMC Helix",
        "Agentes SDLC para stakeholders IT",
        "Despliegue coordinado con infraestructura y ciberseguridad",
        "Seguimiento técnico periódico con cliente"
      ],
      "tags": [
        "retail",
        "azure",
        "genai",
        "mcp",
        "arquitectura",
        "automatizacion",
        "agentes"
      ]
    }
  },
  {
    "id": "banco-santander",
    "title": "Banco Santander - GenAI Platform",
    "category": "Profesional",
    "kind": "Architecture",
    "summary": "Definición y diseño de la plataforma Global GenAI de Santander sobre AWS con foco en seguridad, escalabilidad y cumplimiento.",
    "role": "Arquitecto de Soluciones",
    "dateRange": "Mar. 2024 – May. 2025",
    "image": "/media/projects/banco-santander-1.webp",
    "technologies": [
      "AWS",
      "Bedrock",
      "AI/ML",
      "GenAI"
    ],
    "route": "/project/banco-santander",
    "context": "Trabajo dentro del equipo de arquitectura de Santander para construir una plataforma corporativa global de IA generativa destinada a consumidores y proveedores del banco a nivel internacional.",
    "details": {
      "description": "Contribuí al diseño de una plataforma GenAI enterprise basada en servicios cloud-native de AWS, preparada para múltiples unidades de negocio, casos de uso transversales y marcos de gobierno técnico.",
      "problem": "La complejidad principal era habilitar adopción rápida de GenAI en un entorno regulado, con privacidad de datos por jurisdicción, integración con sistemas core bancarios y consistencia arquitectónica global.",
      "solution": "Diseñé piezas nucleares de la plataforma: catálogo de prompts y plantillas, generador de prompts, playground multi-LLM con distintos conjuntos de datos, agentes conversacionales y de voz, agentes operacionales, agentes SDLC, arquetipo de agentes, runtime de agentes y blueprint global de plataforma. Coordiné decisiones con infraestructura y ciberseguridad para despliegue seguro y conforme a arquitectura bancaria.",
      "results": "Se consolidó una arquitectura reutilizable para escalar productos GenAI en diferentes geografías, acelerando la industrialización de agentes y fortaleciendo el gobierno técnico de la plataforma global.",
      "features": [
        "Catálogo de prompts y plantillas",
        "Prompt generator",
        "Playground multi-LLM con pruebas por datasets",
        "Agentes conversacionales y de voz en tiempo real",
        "Agentes operacionales y SDLC",
        "Arquetipo y runtime de agentes",
        "Blueprint global de plataforma"
      ],
      "tags": [
        "banca",
        "aws",
        "bedrock",
        "sagemaker",
        "genai",
        "arquitectura",
        "gobernanza",
        "multi-tenant"
      ]
    },
    "translations": {
      "ENG": {
        "role": "Solutions Architect",
        "summary": "GenAI platform for Santander designed with AWS, governance and intelligent agents.",
        "context": "AI and cloud architecture project for global banking.",
        "details": {
          "description": "The Santander GenAI platform was designed with scalable AWS services, governance, and support for bank-specific AI use cases.",
          "problem": "The challenge was to create a reusable, secure, and compliant framework to deploy GenAI capabilities across multiple business units.",
          "solution": "We defined architecture patterns, a prompt and template catalog, and an environment to build conversational, operational, and SDLC agents.",
          "results": "A scalable solution that accelerates GenAI adoption, improves governance, and supports multiple internal and external channels.",
          "features": [
            "Prompt and template catalog",
            "Prompt builder",
            "Test playground",
            "Conversational and operational agents"
          ],
          "tags": [
            "GenAI",
            "banking",
            "AWS",
            "artificial intelligence"
          ]
        }
      }
    }
  },
  {
    "id": "bankinter",
    "title": "Bankinter",
    "category": "Profesional",
    "kind": "Architecture",
    "summary": "Consultoría estratégica de movilidad para Bankinter con evaluación de madurez, arquitectura de referencia y roadmap de evolución.",
    "role": "Arquitecto de Soluciones",
    "dateRange": "Abr. 2016 – Jun. 2016",
    "image": "/media/projects/bankinter-1.jpg",
    "technologies": [
      "Mobile",
      "Seguridad",
      "Analytics"
    ],
    "route": "/project/bankinter",
    "context": "Proyecto enfocado en seguridad, rendimiento y analítica para mejorar aplicaciones móviles existentes y definir la siguiente etapa tecnológica del banco.",
    "details": {
      "description": "Conduje una evaluación de capacidades móviles y definí una estrategia de evolución basada en diagnóstico técnico, prioridades de negocio y recursos disponibles.",
      "problem": "El banco requería decisiones arquitectónicas con visión a medio plazo para elevar calidad y seguridad del canal móvil sin frenar el delivery.",
      "solution": "Elaboré assessment de madurez, estudio de capacidades, informe de recomendaciones (tecnologías, frameworks y herramientas), estrategia móvil, roadmap y arquitectura de referencia; presentando conclusiones a liderazgo IT del banco.",
      "results": "Se estableció una hoja de ruta ejecutiva para evolucionar el canal móvil con foco en impacto, mitigación de riesgo y sostenibilidad técnica.",
      "features": [
        "Assessment de madurez móvil",
        "Evaluación de capacidades actuales",
        "Recomendaciones tecnológicas y de framework",
        "Estrategia de evolución del canal móvil",
        "Roadmap por etapas",
        "Arquitectura de referencia"
      ],
      "tags": [
        "banking",
        "mobile-strategy",
        "architecture",
        "security",
        "performance",
        "analytics",
        "consulting"
      ]
    },
    "translations": {
      "ENG": {
        "role": "Solutions Architect",
        "summary": "Mobile roadmap and architecture strategy for Bankinter’s digital evolution.",
        "context": "Mobile maturity consulting and architecture for the financial sector.",
        "details": {
          "description": "We defined Bankinter’s mobile strategy by assessing capabilities, technology, and improvement opportunities for existing products.",
          "problem": "The institution needed a clear roadmap to improve security, performance, and analytics across its mobile channels.",
          "solution": "We produced a mobile maturity report, tool recommendations, and a development roadmap based on available resources.",
          "results": "A technical proposal aligned with IT leaders and a roadmap focused on secure, measurable mobile product evolution.",
          "features": [
            "Maturity assessment",
            "Capability study",
            "Technology recommendations",
            "Product roadmap"
          ],
          "tags": [
            "banking",
            "strategy",
            "mobile",
            "security"
          ]
        }
      }
    }
  },
  {
    "id": "f-c-barcelona-tickets",
    "title": "F.C. Barcelona Tickets",
    "category": "Profesional",
    "kind": "Mobile",
    "summary": "Aplicación móvil oficial de ticketing del FC Barcelona con trazabilidad blockchain e integración enterprise.",
    "role": "Arquitecto de Soluciones",
    "dateRange": "Oct. 2022 – Feb. 2023",
    "image": "/media/projects/barcelona-ticketing.webp",
    "technologies": [
      "iOS",
      "Android",
      "Salesforce",
      "Blockchain",
      "AWS"
    ],
    "liveUrl": "https://play.google.com/store/apps/details?id=com.fcbarcelona.eticket&hl=es",
    "route": "/project/f-c-barcelona-tickets",
    "context": "Proyecto desarrollado por equipo mixto IBM-Viewnext para iOS y Android, orientado al acceso digital al estadio y gestión avanzada de entradas.",
    "details": {
      "description": "Lideré la definición arquitectónica end-to-end de la solución móvil y sus integraciones backend para garantizar una experiencia segura, fluida y escalable para miles de aficionados.",
      "problem": "El desafío era centralizar todo el ciclo de ticketing en una app única, con transferencias seguras, identidad robusta, comunicaciones en tiempo real y trazabilidad completa del ticket.",
      "solution": "Definí la arquitectura global e integraciones con Firebase Crashlytics, Salesforce ID (flujo passwordless), Salesforce Marketing, AWS S3, backend de ticketing del club en AWS y servicios IBM Blockchain. Participé en implementación de funcionalidades, diseño de APIs y mecanismos de seguridad, colaborando con equipos iOS/Android y diseño, y desplegando servicios en Azure Red Hat OpenShift.",
      "results": "Se lanzó una app pública de referencia para ticketing digital del club, con mayor control operativo, mejor soporte post-lanzamiento y un modelo trazable de transferencia y uso de entradas.",
      "features": [
        "Gestión y visualización de entradas desde la app",
        "Transferencia de tickets por email y cambio de asistente",
        "Integración passwordless con Salesforce ID",
        "Comunicaciones de cliente con Salesforce Marketing",
        "Trazabilidad de tickets con IBM Blockchain",
        "Monitorización de errores con Firebase Crashlytics"
      ],
      "tags": [
        "sports",
        "mobile",
        "ticketing",
        "blockchain",
        "salesforce",
        "aws",
        "openshift"
      ]
    },
    "translations": {
      "ENG": {
        "role": "Solutions Architect",
        "summary": "Ticketing app for FCB with ticket management, transfers, and blockchain.",
        "context": "Ticketing solution for F.C. Barcelona fans.",
        "details": {
          "description": "The app enables club ticket management, transfers, seat viewing, and exclusive pre-match features.",
          "problem": "Fans needed a secure and simple way to manage and share tickets within the club environment.",
          "solution": "We designed the app with Salesforce ID integration, AWS S3, and blockchain to ensure traceability and a smooth experience on iOS and Android.",
          "results": "A system that simplifies ticket control, secure transfers, and fan attendance tracking.",
          "features": [
            "Ticket transfers",
            "Attendance updates",
            "Salesforce integration",
            "Ticket blockchain"
          ],
          "tags": [
            "sports",
            "blockchain",
            "app",
            "ticketing"
          ]
        }
      }
    }
  },
  {
    "id": "disruptions",
    "title": "Disruptions",
    "category": "Profesional",
    "kind": "Architecture",
    "summary": "Arquitectura de operaciones conectadas para IAG con gestión proactiva de disrupciones en aerolíneas basada en datos y decisiones en tiempo real.",
    "role": "Arquitecto de Soluciones",
    "dateRange": "Ago. 2019 – Mar. 2020",
    "image": "/media/projects/iag.png",
    "technologies": [
      "Kafka",
      "Spark",
      "AWS",
      "IBM ODM"
    ],
    "route": "/project/disruptions",
    "context": "Como arquitecto de soluciones en IAG Tech, lideré iniciativas del programa Connected Operations para Iberia, British Airways, Vueling y otras aerolíneas del grupo.",
    "details": {
      "description": "Diseñé una arquitectura distribuida para detectar, predecir y gestionar incidencias de pasajero combinando procesamiento de eventos, reglas de negocio y plataformas de integración enterprise.",
      "problem": "La operación aérea requería pasar de un modelo reactivo a uno proactivo, orquestando múltiples sistemas cloud y legacy con requisitos de tiempo real y alta fiabilidad.",
      "solution": "Definí módulos de procesamiento real-time y near real-time con Kafka + Spark en AWS, detección dinámica de eventos, motor de reglas con IBM ODM en CloudPak for Automation, plataforma de microservicios con piezas DevOps en AWS, editor no-code en Informatica iPaaS, API management en Mashery/Tibco Cloud, integración con Salesforce CRM/Marketing y sistema de catering en Touchpoint Global Cloud. También di soporte técnico continuo a equipos y coordinación arquitectónica transversal.",
      "results": "La organización ganó capacidad para anticiparse a incidencias operativas, mejorar coordinación entre áreas y acelerar la toma de decisiones ante impacto en pasajeros.",
      "features": [
        "Procesamiento de eventos real-time y near real-time",
        "Detección dinámica de disrupciones",
        "Motor de decisiones con IBM ODM",
        "Plataforma de microservicios en AWS",
        "No-code business editor e iPaaS",
        "Integración con CRM, marketing y catering"
      ],
      "tags": [
        "airlines",
        "aws",
        "kafka",
        "spark",
        "ibm-odm",
        "microservices",
        "realtime",
        "connected-operations"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Proactive disruption management solution for airlines with real-time data.",
        "context": "Passenger incident platform for the airline industry.",
        "details": {
          "description": "A complete solution for detecting and managing travel disruptions using real-time data and automated business rules.",
          "problem": "Airlines needed to act not only reactively but proactively when passenger incidents occur.",
          "solution": "We built streaming modules with Kafka and Spark, rules in IBM ODM, a no-code editor, and integrations with Salesforce and catering systems.",
          "results": "Greater ability to anticipate and respond to incidents, with better coordination between operations and marketing.",
          "features": [
            "Real-time streaming",
            "Dynamic incident detection",
            "Business rules",
            "No-code editor and CRM integration"
          ],
          "tags": [
            "airlines",
            "data",
            "real-time",
            "automation"
          ]
        }
      }
    }
  },
  {
    "id": "llocs-de-treball",
    "title": "CTTI - Llocs de Treball",
    "category": "Profesional",
    "kind": "Web",
    "summary": "Modernización sobre BMC Remedy con arquitectura objetivo, migración por fases e integración con OpenShift on-premise.",
    "role": "Arquitecto de Soluciones",
    "dateRange": "Ene. 2022 – Feb. 2023",
    "image": "/media/projects/ctti.jpg",
    "technologies": [
      "Vue.js",
      "Node.js",
      "OpenShift",
      "API"
    ],
    "route": "/project/llocs-de-treball",
    "context": "Solución para CTTI orientada a reducir carga manual de empleados públicos y mejorar tiempos de operación mediante digitalización de procesos.",
    "details": {
      "description": "Actué como arquitecto y líder técnico en una modernización enterprise que combinaba BMC Remedy con microservicios y despliegue en plataformas OpenShift.",
      "problem": "Era necesario evolucionar desde un escenario actual fragmentado a una arquitectura futura escalable, integrada y con plan realista de migración.",
      "solution": "Documenté escenario as-is y arquitectura to-be, elaboré estimación por fases, lideré equipo Front (Vue.js) y Back (Node.js), desarrollé microservicios y desplegué artefactos en OpenShift mediante pipelines del cliente. Además, modelé la integración con BMC Remedy y conecté la plataforma con herramientas CTTI vía ficheros y APIs.",
      "results": "Se definió una hoja de ruta ejecutable de migración, se redujo riesgo técnico del cambio y se estableció una base integrada para automatizar trabajo operativo del área pública.",
      "features": [
        "Documentación as-is y to-be",
        "Plan de migración por fases",
        "Liderazgo técnico Front/Back",
        "Microservicios en Node.js",
        "Despliegue en OpenShift con pipelines",
        "Integración con BMC Remedy y sistemas CTTI"
      ],
      "tags": [
        "ctti",
        "bmc-remedy",
        "openshift",
        "vue",
        "nodejs",
        "arquitectura",
        "migracion"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Architecture and migration for the CTTI Llocs de Treball platform.",
        "role": "Solutions Architect",
        "context": "Digitalization project for CTTI with front-end and back-end teams.",
        "details": {
          "description": "Llocs de Treball modernizes job and process management with a microservices architecture deployed on OpenShift.",
          "problem": "A new design was needed to support migration to a cloud solution and improve work posting tracking.",
          "solution": "We defined the as-is, the to-be, and a phased estimate, leading the technical team and building microservices on IBM OpenShift.",
          "results": "A clear migration plan, integrations with BMC Remedy systems, and a robust deployment environment.",
          "features": [
            "As-is/to-be definition",
            "Microservices",
            "API integration",
            "OpenShift deployment"
          ],
          "tags": [
            "migration",
            "architecture",
            "OpenShift",
            "telecom"
          ]
        }
      }
    }
  },
  {
    "id": "passenger-plus",
    "title": "Passenger+",
    "category": "Profesional",
    "kind": "Mobile",
    "summary": "Aplicación móvil corporativa para tripulación de Iberia (iPad/iPhone) integrada con microservicios en IBM Cloud y sistemas on-premise.",
    "role": "Arquitecto de Soluciones",
    "dateRange": "Nov. 2018 – Sep. 2019",
    "image": "/media/projects/iberia.jpg",
    "technologies": [
      "React",
      "iOS",
      "Node.js",
      "SpringBoot",
      "IBM Cloud"
    ],
    "route": "/project/passenger-plus",
    "context": "Proyecto diseñado junto al equipo Apple+IBM e implementado por IBM iX para sobrecargos y personal de cabina, con operación online/offline durante el vuelo.",
    "details": {
      "description": "Participé en workshops de diseño funcional y definí APIs e integraciones clave para una app crítica de operación aérea con consumo de datos de múltiples sistemas corporativos.",
      "problem": "Se necesitaba una herramienta única para centralizar información de vuelo, pasajeros, incidencias, inventario y cumplimiento operativo, incluso en escenarios sin conectividad.",
      "solution": "Definí la capa API y su integración con sistemas Iberia, apoyé al equipo de desarrollo móvil en Bangalore y al equipo de servicios en Madrid, y desarrollé scripts de testing automatizado para microservicios. Acompañé seguimiento quincenal con cliente para control de avance y decisiones técnicas.",
      "results": "Se mejoró la capacidad operativa de cabina con acceso contextual a información crítica, mayor trazabilidad de incidencias y soporte robusto para trabajo offline.",
      "features": [
        "Vista completa de vuelo y pasajeros",
        "Gestión de incidencias y reportes en vuelo",
        "Inventario de galley y formularios operativos",
        "Alertas meteorológicas y avisos ATC",
        "Control documental personal",
        "Modo offline con sincronización posterior"
      ],
      "tags": [
        "iberia",
        "ios",
        "ibm-cloud",
        "airlines",
        "mobile",
        "apis",
        "offline"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Mobility solution for passengers and fleets with a driver-focused experience.",
        "role": "Solutions Architect",
        "context": "Professional project for urban mobility services.",
        "details": {
          "description": "Passenger+ is a mobility platform designed to deliver efficient routes, fleet management, and a seamless experience for passengers and drivers.",
          "problem": "Existing mobility systems did not properly integrate route management with passenger and driver needs.",
          "solution": "We designed a hybrid mobile and web architecture that syncs fleet data in real time, enables instant bookings, and displays key operational metrics.",
          "results": "Improved platform reliability, reduced booking confirmation time, and better operational visibility.",
          "features": [
            "Route booking",
            "Driver dashboard",
            "Fleet management",
            "Real-time reporting"
          ],
          "tags": [
            "mobility",
            "UX",
            "transport",
            "app"
          ]
        }
      }
    }
  },
  {
    "id": "materials-inspect",
    "title": "Materials Inspect",
    "category": "Profesional",
    "kind": "Mobile",
    "summary": "Plataforma móvil de inspección para Técnicas Reunidas con operación offline, formularios dinámicos y captura avanzada de evidencias en campo.",
    "role": "Arquitecto de Soluciones",
    "dateRange": "Feb. 2023 – Mar. 2024",
    "image": "/media/projects/tecnicas-reunidas.jpg",
    "technologies": [
      "React",
      "Tailwind",
      "API REST",
      "iOS"
    ],
    "route": "/project/materials-inspect",
    "context": "Solución para inspectores de materiales en iPad/iPhone, diseñada junto a Apple+IBM y conectada a servicios on-premise ASP.NET e integración con sistemas corporativos TR.",
    "details": {
      "description": "Lideré equipos de app, web y backend, definiendo APIs, modelo de datos y arquitectura de integración para una solución industrial de alta exigencia operativa.",
      "problem": "Los inspectores necesitaban trabajar en campo con baja conectividad, registrar evidencias ricas (firma, fotos, anotaciones, voz) y sincronizar información fiable con supervisión central.",
      "solution": "Definí APIs para app y web, modelado de base de datos y lógica backend con integración a sistemas TR. Coordiné workshops de diseño con Apple/IBM y key users del cliente, soporte a equipos distribuidos (Bangalore/Madrid), automatización de pruebas de servicios y seguimiento técnico recurrente.",
      "results": "Se habilitó un flujo de inspección más ágil y trazable, con mejor calidad de dato en terreno y mayor productividad de inspectores y supervisores.",
      "features": [
        "Planificación y descarga de visitas para trabajo offline",
        "Motor de formularios dinámicos en app y servidor",
        "Firma digital con Apple Pencil o trazo manual",
        "Captura y anotación de fotografías en inspección",
        "Interacción por voz para completar formularios",
        "Mensajería y notificaciones con supervisor"
      ],
      "tags": [
        "industrial",
        "inspection",
        "ios",
        "offline",
        "aspnet",
        "apis",
        "field-operations"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Materials inspection platform with collaborative dashboards and quality tracking.",
        "role": "Solutions Architect",
        "context": "Solution for industrial processes and materials quality control.",
        "details": {
          "description": "Materials Inspect is a digital tool for inspection teams that need to monitor quality variables and collaborate in real time.",
          "problem": "Industrial inspection suffered delays due to manual processes and lack of immediate access to test results.",
          "solution": "We implemented collaborative dashboards, approval workflows, and automatic alerts for quality owners.",
          "results": "Reduced inspection processing time and improved traceability of results.",
          "features": [
            "Quality dashboard",
            "Team collaboration",
            "Automatic alerts",
            "Inspection history"
          ],
          "tags": [
            "industry",
            "quality",
            "collaboration",
            "web"
          ]
        }
      }
    }
  },
  {
    "id": "bank-of-cyprus",
    "title": "Bank Of Cyprus",
    "category": "Profesional",
    "kind": "Mobile",
    "summary": "Aplicación de banca móvil para retail y negocio en iOS/Android con seguridad avanzada, Open Banking y operaciones internacionales.",
    "role": "Arquitecto de Soluciones",
    "dateRange": "Oct. 2017 – Nov. 2018",
    "image": "/media/projects/bank-of-cyprus-1.webp",
    "technologies": [
      "Android",
      "iOS",
      "Cloud",
      "UX/UI"
    ],
    "liveUrl": "https://play.google.com/store/apps/details?id=cy.com.netinfo.netteller.boc",
    "route": "/project/bank-of-cyprus",
    "context": "Proyecto internacional con equipos en España, Portugal y Chipre (IBM, Softinsa y Bank of Cyprus) para evolucionar la experiencia digital bancaria.",
    "details": {
      "description": "Lideré equipos Android/iOS y definí arquitectura y APIs del canal móvil, impulsando capacidades de seguridad fuerte y funcionalidades de banca avanzada.",
      "problem": "El banco necesitaba una app robusta para clientes particulares y de empresa que unificara operativa compleja con experiencia fluida y cumplimiento de seguridad bancaria.",
      "solution": "Definí arquitectura desde la perspectiva móvil, diseñé APIs, colaboré en mecanismos de infoseguridad y coordine el delivery con diseño y equipos de desarrollo. Se incorporaron transferencias SEPA/SWIFT, agregación Open Banking, Quick Pay, localizador ATM/oficinas, OTP con OneSpan Digipass, biometría (TouchID/FaceID), notificaciones push, pagos y aprobaciones pendientes.",
      "results": "Se entregó una experiencia móvil bancaria más completa y segura, mejorando la autonomía operativa del cliente y la calidad del canal digital.",
      "features": [
        "Cuentas, saldos y alias",
        "Transferencias SEPA, SWIFT y Quick Pay",
        "Open Banking y agregación de cuentas",
        "Seguridad OTP con OneSpan Digipass",
        "Acceso biométrico y aprobación de operaciones",
        "Pagos, notificaciones y localización de oficinas/ATMs"
      ],
      "tags": [
        "banking",
        "mobile",
        "android",
        "ios",
        "open-banking",
        "security",
        "sepa",
        "swift"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Digital banking ecosystem focused on security and customer experience.",
        "role": "Solutions Architect",
        "context": "Financial project for an international banking institution.",
        "details": {
          "description": "Bank Of Cyprus is a banking platform that unifies digital services into a coherent experience for customers and employees.",
          "problem": "The banking environment needed a modern digital product that integrated multiple services into a secure single experience.",
          "solution": "We built a modern UI layer with attention to security, accessibility, and cloud scalability.",
          "results": "Improved customer digital adoption and a clearer user flow for transactions and inquiries.",
          "features": [
            "Customer portal",
            "Secure digital banking",
            "Transaction flows",
            "Admin dashboard"
          ],
          "tags": [
            "banking",
            "cloud",
            "security",
            "UX"
          ]
        }
      }
    }
  },
  {
    "id": "bizkaiup",
    "title": "BizkaiUP",
    "category": "Profesional",
    "kind": "Mobile",
    "summary": "App móvil institucional en Flutter para iOS y Android orientada a información ciudadana durante la pandemia Covid-19.",
    "role": "Arquitecto de Soluciones",
    "dateRange": "Mar. 2020 – Sep. 2020",
    "image": "/media/projects/bizkaiup-1.jpg",
    "technologies": [
      "Android",
      "iOS",
      "Wordpress",
      "API REST"
    ],
    "route": "/project/bizkaiup",
    "context": "Aplicación impulsada por la Diputación de Bizkaia para publicar información en castellano y euskera, con notificaciones en tiempo real desde IBM Cloud.",
    "details": {
      "description": "Definí la arquitectura de la solución móvil y su integración con WordPress e IBM Cloud Push Notifications, orientando el producto a un uso ciudadano masivo y fiable.",
      "problem": "Era crítico ofrecer información oficial actualizada, útil y multicanal en un contexto de emergencia sanitaria, con experiencia simple y distribución inmediata de novedades.",
      "solution": "Configurar servicios IBM Cloud Push integrados con APNS y FCM, desarrollar módulo WordPress en PHP para automatizar envío de notificaciones, liderar equipo móvil, colaborar en diseño y coordinar publicación en stores. La app incorporó noticias, ayudas, transporte, playas, geolocalización de servicios esenciales, módulo infantil y herramienta AR para distancia social.",
      "results": "La aplicación se publicó con adopción ciudadana y cobertura en medios, habilitando comunicación pública ágil y acceso práctico a información crítica durante la pandemia.",
      "features": [
        "Noticias Covid-19 en castellano y euskera",
        "Push notifications en tiempo real",
        "Buscador de servicios esenciales y rutas",
        "Información de ayudas, transporte y playas",
        "Sistema de valoración de noticias",
        "Módulo infantil y herramienta AR de distancia social"
      ],
      "tags": [
        "flutter",
        "ibm-cloud",
        "wordpress",
        "covid19",
        "mobile",
        "apns",
        "fcm"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Digital transformation platform focused on collaborative processes for businesses.",
        "role": "Solutions Architect",
        "context": "Professional digitalization project for business management.",
        "details": {
          "description": "BizkaiUP is a platform that helps organizations manage processes, documentation, and internal communication efficiently.",
          "problem": "Companies needed an adaptable digital solution for collaboration and project tracking.",
          "solution": "We developed a modular architecture with reusable components, integrations, and high-value control panels.",
          "results": "Increased task traceability and reduced bottlenecks in internal collaboration.",
          "features": [
            "Process management",
            "Centralized documentation",
            "Team collaboration",
            "Progress metrics"
          ],
          "tags": [
            "digitalization",
            "collaboration",
            "enterprise",
            "web"
          ]
        }
      }
    }
  },
  {
    "id": "aupromas",
    "title": "Aupromas",
    "category": "Profesional",
    "kind": "Mobile",
    "summary": "Evaluación de madurez móvil y definición de roadmap arquitectónico para evolución de aplicaciones en entorno industrial.",
    "role": "Arquitecto de Soluciones",
    "dateRange": "Ago. 2021 – Dic. 2021",
    "image": "/media/projects/aupromas-1.png",
    "technologies": [
      "SAP",
      "Android"
    ],
    "route": "/project/aupromas",
    "context": "Iniciativa orientada a mejorar seguridad, rendimiento y analítica en apps existentes, estableciendo una estrategia de evolución tecnológica sostenible.",
    "details": {
      "description": "Realicé un diagnóstico técnico-funcional del ecosistema móvil y definí un plan de transformación orientado a resultados operativos y viabilidad de ejecución.",
      "problem": "La organización necesitaba priorizar mejoras en movilidad con criterios de arquitectura, costes y capacidad de equipo, evitando inversiones dispersas.",
      "solution": "Elaboré assessment de madurez, estudio de capacidades, recomendaciones de plataformas/herramientas, arquitectura de referencia y roadmap por fases, presentando el plan a dirección tecnológica del cliente.",
      "results": "Se obtuvo una guía clara de evolución del canal móvil, alineada con prioridades de negocio y con base técnica sólida para iteraciones futuras.",
      "features": [
        "Assessment de madurez móvil",
        "Estudio de capacidades técnicas",
        "Recomendación de herramientas y frameworks",
        "Definición de estrategia móvil",
        "Roadmap de implementación",
        "Presentación ejecutiva a liderazgo IT"
      ],
      "tags": [
        "industrial",
        "mobile-strategy",
        "architecture",
        "consulting",
        "security",
        "performance",
        "analytics"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Industrial management solution focused on operational control and data visibility.",
        "role": "Solutions Architect",
        "context": "Tool for operational excellence in the industrial sector.",
        "details": {
          "description": "Aupromas is a solution that integrates operations analysis, process management, and data visualization for technical teams.",
          "problem": "Teams lacked a unified and up-to-date view of industrial operations.",
          "solution": "We built an interactive dashboard displaying real-time metrics and business-rule based alerts.",
          "results": "Better decision-making and a reduction in incidents during critical operations.",
          "features": [
            "Metrics dashboard",
            "Smart alerts",
            "Process management",
            "Data visualization"
          ],
          "tags": [
            "industrial",
            "data",
            "operations",
            "web"
          ]
        }
      }
    }
  },
  {
    "id": "delivery-notes",
    "title": "Delivery Notes",
    "category": "Profesional",
    "kind": "Mobile",
    "summary": "App híbrida offline para gestión de albaranes en obra (CAROL), construida con SAP UI5, Kapsel y Cordova sobre SAP Mobile Platform.",
    "role": "Arquitecto de Soluciones",
    "dateRange": "May. 2015 – Oct. 2015",
    "image": "/media/projects/ferrovial.jpeg",
    "technologies": [
      "SAP",
      "Android"
    ],
    "route": "/project/delivery-notes",
    "context": "Proyecto premiado con SAP Bronze Award 2015 en innovación, orientado a digitalizar el ciclo de albaranes y registro en campo para Ferrovial.",
    "details": {
      "description": "Definí la arquitectura y participé en el diseño de una solución móvil empresarial para operativa en campo con conectividad limitada, integrada con backend SAP.",
      "problem": "La gestión de albaranes en obra requería trazabilidad digital, captura de evidencia y operación offline confiable para reducir errores y tiempos de proceso.",
      "solution": "Diseñé la arquitectura de la app y backend, desarrollé API OData en SAP NetWeaver Gateway, implementé lógica ABAP y modelo de datos, y acompañé el seguimiento técnico con cliente. La app incorporó navegación por obras, alta de albaranes, escaneo QR/códigos de barras, búsqueda de materiales/proveedores, captura de fotos y modo offline.",
      "results": "Se consiguió una digitalización efectiva del proceso de albaranes en campo, con mayor calidad del dato, mejor productividad y reconocimiento externo en premios SAP.",
      "features": [
        "Operación offline en entornos de obra",
        "Creación y consulta de albaranes desde móvil",
        "Escaneo de códigos de barras y QR",
        "Búsqueda de materiales y proveedores",
        "Captura de evidencias fotográficas",
        "Integración OData con SAP NetWeaver Gateway"
      ],
      "tags": [
        "sap-ui5",
        "kapsel",
        "cordova",
        "sap-mobile-platform",
        "abap",
        "odata",
        "offline",
        "logistics"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Logistics delivery and documentation management tool in real time.",
        "role": "Solutions Architect",
        "context": "Professional solution for shipment control and documentation.",
        "details": {
          "description": "Delivery Notes is a logistics documentation tool that helps coordinate deliveries, proof of receipt, and real-time tracking.",
          "problem": "Delivery and document tracking was manual and unreliable.",
          "solution": "We built a platform where each delivery is digitally recorded with status, signature, and exact timestamp.",
          "results": "Greater logistics transparency and fewer documentation delivery errors.",
          "features": [
            "Shipment tracking",
            "Digital documentation",
            "Delivery statuses",
            "Electronic signatures"
          ],
          "tags": [
            "logistics",
            "documentation",
            "efficiency",
            "tool"
          ]
        }
      }
    }
  },
  {
    "id": "sofia",
    "title": "SO:FIA",
    "category": "Profesional",
    "kind": "Mobile",
    "summary": "App de broker móvil para clientes de Banco Santander con foco en operativa bursátil, notificaciones segmentadas y alto rendimiento.",
    "role": "Arquitecto de Soluciones",
    "dateRange": "Jun. 2016 – Oct. 2017",
    "image": "/media/projects/banco-santander-1.webp",
    "technologies": [
      "Android",
      "iOS"
    ],
    "route": "/project/sofia",
    "context": "Aplicación iOS/Android para operar cuentas broker, consultar mercados y ejecutar compras/ventas con experiencia optimizada.",
    "details": {
      "description": "Como líder de equipos móviles, impulsé la evolución funcional y técnica del producto para soportar operativa financiera crítica con buena usabilidad y performance.",
      "problem": "El reto era ofrecer una experiencia de trading completa en móvil, manteniendo fiabilidad, rapidez y seguridad para operaciones sensibles de cliente.",
      "solution": "Lideré equipos Android e iOS, configuré plataforma Twinpush para notificaciones por segmentos, colaboré en mejoras de rendimiento y capacidad de respuesta de la app, y sostuve seguimiento técnico periódico con cliente.",
      "results": "Se reforzó la calidad operativa del canal broker móvil, mejorando la comunicación proactiva al usuario y la experiencia de consulta/operación en mercados.",
      "features": [
        "Consulta de cuentas broker y saldos",
        "Compra/venta de productos financieros",
        "Seguimiento de mercados nacionales e internacionales",
        "Alertas push segmentadas con Twinpush",
        "Biometría (TouchID/FaceID)",
        "Histórico y trazabilidad de operaciones"
      ],
      "tags": [
        "banking",
        "broker",
        "android",
        "ios",
        "trading",
        "push-notifications",
        "performance"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Service management platform with UX indicators and operational workflows.",
        "role": "Solutions Architect",
        "context": "Digitalization project for enterprise service management.",
        "details": {
          "description": "SO:FIA is a platform that brings together service management, user experiences, and internal processes for organizations.",
          "problem": "A solution was needed to align digital services with the team’s operational workflows.",
          "solution": "We designed a flexible component system and an experience focused on the user’s critical tasks.",
          "results": "Better alignment between digital service and operations with reduced friction for the team.",
          "features": [
            "User experience",
            "Service management",
            "Design system",
            "Operational flows"
          ],
          "tags": [
            "services",
            "UX",
            "platform",
            "web"
          ]
        }
      }
    }
  },
  {
    "id": "enemalta",
    "title": "Enemalta",
    "category": "Profesional",
    "kind": "Mobile",
    "summary": "Assessment de madurez móvil, estrategia y roadmap arquitectónico para compañías energéticas del gobierno de Malta.",
    "role": "Arquitecto de Soluciones",
    "dateRange": "Jun. 2017 – Ago. 2017",
    "image": "/media/projects/enemalta.jpg",
    "technologies": [
      "Android",
      "SAP"
    ],
    "route": "/project/enemalta",
    "context": "Proyecto patrocinado por Enemalta y Water Services Corporation para definir una estrategia móvil y una solución orientada a operarios de campo.",
    "details": {
      "description": "Realicé un trabajo de consultoría estratégica y arquitectónica para evaluar capacidades móviles existentes y proponer un plan de evolución viable con foco en valor operativo.",
      "problem": "Las organizaciones necesitaban orientar inversión móvil con criterio técnico, priorizando casos de uso reales y una arquitectura sostenible con recursos limitados.",
      "solution": "Elaboré assessment de madurez móvil y estudio de capacidades, generé informe de recomendaciones de tecnologías/herramientas, definí estrategia y roadmap de aplicaciones, y presenté la arquitectura de referencia a responsables máximos de IT. Como resultado se diseñó una app Android para operarios de campo centrada en órdenes de trabajo integradas con SAP.",
      "results": "Se obtuvo una hoja de ruta clara de transformación móvil y una base arquitectónica consensuada para ejecutar nuevos desarrollos con menor riesgo y mayor impacto operativo.",
      "features": [
        "Assessment de madurez y capacidades móviles",
        "Recomendación de plataformas y herramientas",
        "Roadmap de evolución por fases",
        "Arquitectura de referencia móvil",
        "Diseño de app Android para field workers",
        "Integración con órdenes de trabajo SAP"
      ],
      "tags": [
        "energy",
        "mobile-strategy",
        "architecture-roadmap",
        "sap",
        "android",
        "consulting"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Project for an energy company with monitoring and internal communication solutions.",
        "role": "Solutions Architect",
        "context": "Digital solution for the electrical and energy sector.",
        "details": {
          "description": "Enemalta is a platform designed to improve internal communication and operations monitoring for an energy company.",
          "problem": "Energy companies needed modern digital tools to manage processes and technical data.",
          "solution": "We developed clean interfaces, control panels, and integrations with operational data.",
          "results": "Faster interpretation of key information and visual support for operational decisions.",
          "features": [
            "Energy monitoring",
            "Internal communication",
            "Control panels",
            "Data integrations"
          ],
          "tags": [
            "energy",
            "operations",
            "dashboard",
            "web"
          ]
        }
      }
    }
  },
  {
    "id": "evo-banco",
    "title": "Evo Banco",
    "category": "Profesional",
    "kind": "Mobile",
    "summary": "SDK móvil para integrar IBM Watson Conversation en la app bancaria de EVO y habilitar capacidades de chatbot para clientes.",
    "role": "Arquitecto de Soluciones",
    "dateRange": "May. 2017 – Jul. 2017",
    "image": "/media/projects/evo.jpg",
    "technologies": [
      "Android",
      "iOS"
    ],
    "route": "/project/evo-banco",
    "context": "Iniciativa de innovación en banca digital para acercar IA conversacional a los canales móviles de EVO Banco sobre IBM Cloud.",
    "details": {
      "description": "Lideré el equipo de desarrollo del SDK para Android e iOS, orientado a simplificar la integración de capacidades conversacionales dentro de la app del banco.",
      "problem": "EVO necesitaba incorporar un módulo de chatbot en su canal móvil con una integración mantenible, segura y reusable para sus equipos técnicos.",
      "solution": "Diseñé y coordiné la construcción del SDK multiplataforma para conectar la app con servicios IBM Watson Conversation en IBM Cloud, estandarizando el patrón de integración para futuras evoluciones.",
      "results": "Se habilitó un canal conversacional en producción que mejoró la capacidad de atención automática y reforzó la propuesta digital del banco.",
      "features": [
        "SDK Android para integración de chatbot",
        "SDK iOS para integración de chatbot",
        "Conexión con IBM Watson Conversation",
        "Arquitectura reusable para equipos internos",
        "Liderazgo técnico móvil del delivery"
      ],
      "tags": [
        "banking",
        "watson",
        "chatbot",
        "sdk",
        "android",
        "ios",
        "ibm-cloud"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Digital banking experience focused on customers with a secure, elegant approach.",
        "role": "Solutions Architect",
        "context": "Professional project for a modern financial institution.",
        "details": {
          "description": "Evo Banco is a customer-centric digital experience for users seeking agile and clear banking services.",
          "problem": "Digital banking needed a visual and functional proposal that matched current user expectations.",
          "solution": "We created user-centered flows, simplified operations, and direct product communication.",
          "results": "Increased service clarity and a more intuitive navigation experience for banking customers.",
          "features": [
            "Simplified flows",
            "Customer-centric design",
            "Integrated security",
            "Product presentation"
          ],
          "tags": [
            "banking",
            "UX",
            "digital",
            "web"
          ]
        }
      }
    }
  },
  {
    "id": "handling-services",
    "title": "Handling Services Web",
    "category": "Profesional",
    "kind": "Web",
    "summary": "Aplicación web SAP UI5 para personal de handling de Iberia con integración OData y lógica backend en SAP S/4 HANA.",
    "role": "Arquitecto de Soluciones",
    "dateRange": "Oct. 2015 – Dic. 2015",
    "image": "/media/projects/ferrovial.jpeg",
    "technologies": [
      "SAP Fiori",
      "OData"
    ],
    "route": "/project/handling-services",
    "context": "Solución enterprise para confirmar servicios de handling por vuelo y registrar servicios adicionales con impacto automático en finanzas.",
    "details": {
      "description": "Diseñé la solución funcional y técnica de una app operativa crítica integrada con el ecosistema SAP, optimizando trazabilidad de servicios y flujo financiero asociado.",
      "problem": "El proceso de validación de servicios de handling requería más digitalización, menor fricción operativa y sincronización fiable con backend financiero.",
      "solution": "Diseñé UX con Axure RP y componentes estándar SAP UI5, definí y expuse API OData en SAP Gateway, implementé lógica backend en SAP S/4 HANA, lideré el equipo de desarrollo y, como extensión del alcance, instalé y activé aproximadamente 30 apps SAP Fiori estándar para equipos financieros.",
      "results": "Se mejoró la calidad de registro operativo y se aceleró la actualización de datos en sistemas SAP, aumentando eficiencia en procesos de handling y reporting financiero.",
      "features": [
        "Confirmación de servicios de handling por vuelo",
        "Registro de servicios adicionales",
        "API OData sobre SAP Gateway",
        "Lógica de negocio en SAP S/4 HANA",
        "Diseño funcional con SAP UI5",
        "Activación de aplicaciones SAP Fiori para finanzas"
      ],
      "tags": [
        "sap-ui5",
        "sap-s4",
        "odata",
        "gateway",
        "fiori",
        "aviation",
        "handling"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Portal for port operations and logistics services management.",
        "role": "Solutions Architect",
        "context": "Professional project for handling and logistics services.",
        "details": {
          "description": "Handling Services Web is a portal for coordinating port activities and services linked to cargo and logistics.",
          "problem": "Port handling coordination required a modern, accessible digital solution.",
          "solution": "We implemented an operational dashboard with tracking, documentation, and real-time task control.",
          "results": "Improved organization of operations and visibility for handling teams and operators.",
          "features": [
            "Service tracking",
            "Task control",
            "Operational documentation",
            "Management dashboard"
          ],
          "tags": [
            "logistics",
            "ports",
            "operations",
            "web"
          ]
        }
      }
    }
  },
  {
    "id": "plataforma-tierra",
    "title": "Plataforma Tierra",
    "category": "Profesional",
    "kind": "Web",
    "summary": "Plataforma cloud integral para el sector agroalimentario, construida sobre IBM Cloud con servicios de datos, identidad, APIs, CMS e IA.",
    "role": "Arquitecto de Soluciones",
    "dateRange": "Jul. 2020 – Dic. 2021",
    "image": "/media/projects/plataforma-tierra.png",
    "technologies": [
      "Vue",
      "Tailwind CSS",
      "Azure",
      "Strapi",
      "API"
    ],
    "liveUrl": "https://www.plataformatierra.es/",
    "route": "/project/plataforma-tierra",
    "context": "Proyecto de Fundación Cajamar para crear la referencia digital del ecosistema agro en España: agricultores, cooperativas, investigadores, banca y medios especializados.",
    "details": {
      "description": "Diseñé la arquitectura de una plataforma cloud de gran alcance funcional que combina portal de conocimiento, área privada de herramientas y capacidades avanzadas de datos e inteligencia artificial.",
      "problem": "El reto era unificar contenidos, servicios y analítica en una única solución escalable, capaz de integrar múltiples tecnologías y terceros con seguridad y buen rendimiento.",
      "solution": "Definí arquitectura y lideré al equipo técnico Front (Vue.js) y Back (Node.js). Configuré IBM App ID, IBM API Connect (manager y developer portal), modelos de datos en PostgreSQL y MongoDB, modelo de contenido en Strapi CMS, despliegues en OpenShift con CI/CD de IBM, integración con Google Analytics y Hubspot CRM, IBM Push Notifications e integración con IBM Watson IA para predicción en base a datos de usuario.",
      "results": "Se lanzó una plataforma digital de referencia para el sector agroalimentario con impacto mediático, alto nivel de integración y una base tecnológica preparada para evolución continua.",
      "features": [
        "Portal de noticias, mercados, innovación y formación",
        "Área privada con herramientas de agroanálisis",
        "Planes de riego y fertilización",
        "Predicción de plagas y variables agronómicas",
        "Integración con CRM, analítica y servicios IA",
        "Notificaciones push segmentadas"
      ],
      "tags": [
        "agro",
        "ibm-cloud",
        "openshift",
        "strapi",
        "postgresql",
        "mongodb",
        "watson",
        "apiconnect"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Geospatial and environmental data tool for sustainable project management.",
        "role": "Solutions Architect",
        "context": "Professional solution for environmental and geospatial data.",
        "details": {
          "description": "Plataforma Tierra combines maps, environmental data, and analytic dashboards to support sustainable projects.",
          "problem": "Sustainability projects needed a digital space to visualize geospatial data and environmental metrics.",
          "solution": "We created a system that integrates interactive maps, data layers, and visual analysis in one application.",
          "results": "Better understanding of environmental impact and support for decision-making in sustainable projects.",
          "features": [
            "Interactive maps",
            "Data layers",
            "Metrics dashboard",
            "Environmental analysis"
          ],
          "tags": [
            "geodata",
            "environment",
            "visualization",
            "data"
          ]
        }
      }
    }
  },
  {
    "id": "insite",
    "title": "InSite",
    "category": "Profesional",
    "kind": "Web",
    "summary": "Desarrollo de ERP corporativo para Ferrovial sobre SAP ECC, Web Dynpro y SAP Portal con cobertura de procesos core de negocio.",
    "role": "Arquitecto de Soluciones",
    "dateRange": "Abr. 2013 – May. 2015",
    "image": "/media/projects/ferrovial.jpeg",
    "technologies": [
      "SAP",
      "WebDynpro"
    ],
    "route": "/project/insite",
    "context": "Programa enterprise galardonado en SAP EMEA Quality Awards (Silver) y SAP Iberia Business Transformation Awards (Gold).",
    "details": {
      "description": "Participé en el desarrollo de una solución ERP integral, asumiendo liderazgo en módulos de seguridad y arquitectura y contribuciones funcionales en áreas clave del sistema.",
      "problem": "El desafío era construir una plataforma ERP unificada para múltiples dominios corporativos con criterios de calidad, seguridad y escalabilidad empresarial.",
      "solution": "Desarrollé y lideré módulos de seguridad y arquitectura, además de funcionalidades en gestor documental, compras, finanzas y ventas. Colaboré en sesiones periódicas con cliente para seguimiento de estado, decisiones técnicas y alineamiento funcional.",
      "results": "Se entregó un ERP robusto para procesos críticos (compras, ventas, planificación, finanzas, presupuestos, RR.HH., seguridad y administración), reconocido con premios de referencia en el ecosistema SAP.",
      "features": [
        "Módulos ERP de compras, ventas, finanzas y planificación",
        "Arquitectura y seguridad corporativa",
        "Gestor documental integrado",
        "Desarrollo sobre SAP ECC, Web Dynpro y SAP Portal",
        "Soporte a transformación de procesos de negocio",
        "Seguimiento técnico continuo con cliente"
      ],
      "tags": [
        "sap-ecc",
        "web-dynpro",
        "sap-portal",
        "erp",
        "security",
        "architecture",
        "enterprise"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Accessibility and analytics platform for corporate environments.",
        "role": "Solutions Architect",
        "context": "Professional project to improve accessibility and analytics in the digital environment.",
        "details": {
          "description": "InSite is a tool that combines accessibility, usage analysis, and content optimization for corporate environments.",
          "problem": "Organizations needed more control over accessibility and the performance of their digital experiences.",
          "solution": "We designed a platform that measures, displays, and reports accessibility and usage metrics in one panel.",
          "results": "Improved accessibility visibility and better management of internal content.",
          "features": [
            "Accessibility",
            "Analytics",
            "Content optimization",
            "Control panel"
          ],
          "tags": [
            "accessibility",
            "analytics",
            "corporate",
            "web"
          ]
        }
      }
    }
  },
  {
    "id": "eg-magazine-radio",
    "title": "EG Magazine Radio",
    "category": "Personal",
    "kind": "Web",
    "summary": "Portal de radio online y contenidos culturales con programación editorial activa.",
    "role": "Arquitecto de Soluciones",
    "image": "/media/projects/eg-magazine.png",
    "technologies": [
      "CMS",
      "Audio Streaming",
      "SEO"
    ],
    "liveUrl": "https://egmagazineradio.es/",
    "route": "/project/eg-magazine-radio",
    "context": "Proyecto personal que combina radio web y magazine cultural.",
    "details": {
      "description": "EG Magazine Radio es un espacio digital para radio y contenidos culturales, con programación en directo y secciones editorializadas.",
      "problem": "No existía un punto digital propio para publicar programación y contenido cultural bajo una misma marca.",
      "solution": "Lanzamos una plataforma editorial y de streaming con CMS, programación en directo y estructura SEO para consolidar el canal digital.",
      "results": "Presencia de marca digital en el sector de entretenimiento y una plataforma de contenido para audiencia hispana.",
      "features": [
        "Programación en directo",
        "Secciones editoriales",
        "Chat de oyentes",
        "Streaming de audio"
      ],
      "tags": [
        "radio",
        "cultura",
        "streaming",
        "web"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Online radio portal and cultural content platform with active editorial programming.",
        "role": "Solutions Architect",
        "context": "Personal project combining web radio and cultural magazine content.",
        "details": {
          "description": "EG Magazine Radio is a digital space for radio and cultural content, with live programming and editorial sections.",
          "problem": "There was no owned digital space to publish programming and cultural content under one brand.",
          "solution": "We launched a portal with programming sections, hosts, chat, and support for real-time streaming.",
          "results": "Digital brand presence in entertainment and a content platform for Spanish-speaking audiences.",
          "features": [
            "Live programming",
            "Editorial sections",
            "Listener chat",
            "Audio streaming"
          ],
          "tags": [
            "radio",
            "culture",
            "streaming",
            "web"
          ]
        }
      }
    }
  },
  {
    "id": "gasoliprecios",
    "title": "Gasoliprecios",
    "category": "Personal",
    "kind": "Web",
    "summary": "Buscador de estaciones de servicio con precios y cálculo de distancias en tiempo real.",
    "role": "Arquitecto de Soluciones",
    "image": "/media/projects/gasoliprecios.webp",
    "technologies": [
      "React",
      "GeoLocation",
      "APIs",
      "Open Data"
    ],
    "liveUrl": "https://www.gasoliprecios.com/",
    "route": "/project/gasoliprecios",
    "context": "Aplicación web que ayuda a encontrar gasolina barata en España.",
    "details": {
      "description": "Gasoliprecios es un buscador de estaciones de servicio que muestra precios reales y distancias usando geolocalización en el navegador.",
      "problem": "Los usuarios no tenían una forma sencilla de comparar precios de combustible en su área inmediata.",
      "solution": "Diseñamos una interfaz con mapas, geolocalización y fuentes Open Data para ofrecer precios actualizados y resultados precisos por zona.",
      "results": "Mejor experiencia para conductores que buscan ahorrar en combustible y un flujo claro para comparar precios.",
      "features": [
        "Búsqueda por ubicación",
        "Filtros de combustible",
        "Mapa interactivo",
        "Open Data de estaciones"
      ],
      "tags": [
        "movilidad",
        "open-data",
        "ubicación",
        "web"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Service station finder with prices and real-time distance calculation.",
        "role": "Solutions Architect",
        "context": "Web application that helps find cheaper gas stations in Spain.",
        "details": {
          "description": "Gasoliprecios is a service station finder that shows real prices and distances using browser geolocation.",
          "problem": "Users lacked an easy way to compare fuel prices in their immediate area.",
          "solution": "We designed a filter interface with maps, station status, and optional location use for accurate results.",
          "results": "Better experience for drivers aiming to save on fuel and a clear flow to compare prices.",
          "features": [
            "Location search",
            "Fuel filters",
            "Interactive map",
            "Local updates"
          ],
          "tags": [
            "mobility",
            "data",
            "location",
            "web"
          ]
        }
      }
    }
  },
  {
    "id": "la-fumadera",
    "title": "La Fumadera",
    "category": "Personal",
    "kind": "Web",
    "summary": "Blog especializado en el mundo de la shisha con contenidos temáticos y buscador de teterías y estancos cercanos.",
    "role": "Arquitecto de Soluciones",
    "image": "/media/projects/lafumadera.jpeg",
    "technologies": [
      "WordPress",
      "SEO",
      "Editorial",
      "Gemini AI"
    ],
    "liveUrl": "https://lafumadera.com/",
    "route": "/project/la-fumadera",
    "context": "Proyecto editorial de nicho orientado a la comunidad shishera, combinando contenidos propios con utilidad local para descubrir puntos cercanos.",
    "details": {
      "description": "La Fumadera es un blog orientado al mundo de la shisha, pensado para reunir contenido especializado, recomendaciones y utilidades prácticas para aficionados y curiosos.",
      "problem": "No existía un espacio propio que combinara contenido útil sobre shisha con una herramienta sencilla para localizar teterías y estancos próximos.",
      "solution": "Construí una plataforma sobre WordPress optimizada para SEO, con estructura editorial temática y un buscador orientado a descubrir teterías y estancos cercanos, apoyándome además en Gemini AI para acelerar ideación y optimización de contenidos.",
      "results": "El proyecto consolidó una identidad clara de nicho, mejoró el descubrimiento de contenidos y aportó una capa de utilidad real para usuarios que buscan puntos cercanos relacionados con la shisha.",
      "features": [
        "Blog especializado en shisha",
        "Buscador de teterías cercanas",
        "Buscador de estancos cercanos",
        "Arquitectura SEO de contenidos"
      ],
      "tags": [
        "shisha",
        "blog",
        "teterías",
        "estancos",
        "web"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Shisha-focused blog with thematic content and a finder for nearby hookah lounges and tobacconists.",
        "role": "Solutions Architect",
        "context": "Niche editorial project for the shisha community, combining original content with local utility to discover nearby places.",
        "details": {
          "description": "La Fumadera is a blog focused on the world of shisha, designed to bring together specialized content, recommendations, and practical tools for enthusiasts and newcomers.",
          "problem": "There was no dedicated space combining useful shisha content with a simple way to find nearby hookah lounges and tobacconists.",
          "solution": "I built an SEO-oriented WordPress platform with a thematic editorial structure and a finder to discover nearby hookah lounges and tobacconists, also using Gemini AI to speed up content ideation and optimization.",
          "results": "The project established a clear niche identity, improved content discovery, and added real utility for users looking for nearby shisha-related places.",
          "features": [
            "Shisha-focused blog",
            "Nearby hookah lounge finder",
            "Nearby tobacconist finder",
            "SEO-oriented content architecture"
          ],
          "tags": [
            "shisha",
            "blog",
            "hookah lounges",
            "tobacconists",
            "web"
          ]
        }
      }
    }
  },
  {
    "id": "blueshift",
    "title": "Blueshift",
    "category": "Personal",
    "kind": "Web",
    "summary": "Aplicación web que interpreta PDFs de horarios laborales para mostrarlos de forma más clara, visual y fácil de consultar.",
    "role": "Arquitecto de Soluciones",
    "image": "/media/projects/blueshift.webp",
    "technologies": [
      "React",
      "Github Actions"
    ],
    "liveUrl": "https://blueshift.wuaze.com/",
    "route": "/project/blueshift",
    "context": "Proyecto personal orientado a resolver una necesidad cotidiana: consultar cuadrantes de trabajo en PDF sin tener que buscar manualmente entre listados densos.",
    "details": {
      "description": "Blueshift es un parser de PDF pensado para facilitar la lectura de horarios laborales de empresa, permitiendo subir el documento, localizar a una persona y visualizar de forma amigable sus días de trabajo y horas de entrada y salida.",
      "problem": "Consultar turnos dentro de PDFs de horarios resulta incómodo, lento y poco legible cuando hay que buscar nombres manualmente entre tablas extensas.",
      "solution": "Desarrollé una aplicación web que interpreta el contenido del PDF de horarios, permite encontrar rápidamente a cada persona en la lista y transforma la información en una vista mucho más clara y usable para consultar jornadas, entradas y salidas.",
      "results": "El proyecto convierte un proceso tedioso en una consulta rápida y visual, mejorando la experiencia de uso frente al PDF original y aportando una utilidad directa en el día a día.",
      "features": [
        "Carga de PDF de horarios",
        "Búsqueda sencilla por nombre",
        "Visualización clara de días y turnos",
        "Lectura amigable de horas de entrada y salida"
      ],
      "tags": [
        "pdf",
        "horarios",
        "parser",
        "web"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Web app that interprets work-schedule PDFs and presents them in a clearer, more visual, and easier-to-read way.",
        "role": "Solutions Architect",
        "context": "Personal project built to solve an everyday problem: checking work schedule PDFs without manually scanning dense lists.",
        "details": {
          "description": "Blueshift is a PDF parser designed to make company work schedules easier to read by letting users upload the file, find a person quickly, and view workdays plus check-in and check-out times in a friendlier format.",
          "problem": "Checking shifts inside schedule PDFs is uncomfortable, slow, and hard to read when names must be searched manually through large tables.",
          "solution": "I built a web application that interprets the schedule PDF, helps users find a person quickly in the list, and turns the raw content into a much clearer and more usable view of shifts, working days, and entry and exit times.",
          "results": "The project turns a tedious task into a fast and visual consultation flow, improving usability compared to the original PDF and providing direct day-to-day value.",
          "features": [
            "Work schedule PDF upload",
            "Simple name search",
            "Clear day and shift visualization",
            "Friendly display of check-in and check-out times"
          ],
          "tags": [
            "pdf",
            "schedules",
            "parser",
            "web"
          ]
        }
      }
    }
  },
  {
    "id": "factum",
    "title": "Factum",
    "category": "Personal",
    "kind": "Web",
    "summary": "Reloj online que muestra la hora junto a datos y factos que cambian cada minuto, pensado como fondo de pantalla web.",
    "role": "Arquitecto de Soluciones",
    "image": "/media/projects/factum.jpg",
    "technologies": [
      "React",
      "Github Pages"
    ],
    "liveUrl": "https://troylin1987.github.io/factum/",
    "route": "/project/factum",
    "context": "Proyecto personal concebido como una experiencia visual continua para tener abierta en pantalla y consultar la hora con información dinámica.",
    "details": {
      "description": "Factum es una web que funciona como reloj online y fondo de pantalla digital, mostrando la hora en una interfaz limpia acompañada de datos y factos que se renuevan cada minuto.",
      "problem": "Quería crear una experiencia útil y estética que fuese más allá de un reloj convencional, aportando información cambiante y valor visual para dejarla abierta de forma permanente en pantalla.",
      "solution": "Desarrollé una aplicación web ligera enfocada en la visualización continua del tiempo, combinando reloj en tiempo real con datos y curiosidades que se actualizan minuto a minuto para ofrecer una experiencia más atractiva y viva.",
      "results": "El proyecto se convierte en una pieza digital pensada para acompañar el escritorio o una pantalla secundaria, mezclando utilidad diaria, ritmo visual e información dinámica en una sola vista.",
      "features": [
        "Reloj online en tiempo real",
        "Datos y factos actualizados cada minuto",
        "Diseño pensado como fondo de pantalla web",
        "Visualización continua y minimalista"
      ],
      "tags": [
        "reloj",
        "factos",
        "wallpaper",
        "web"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Online clock that shows the time alongside data and facts updated every minute, designed as a web wallpaper.",
        "role": "Solutions Architect",
        "context": "Personal project conceived as a continuous visual experience to keep open on screen while checking the time with dynamic information.",
        "details": {
          "description": "Factum is a web experience that works as an online clock and digital wallpaper, showing the time in a clean interface together with data and facts refreshed every minute.",
          "problem": "I wanted to create something more useful and aesthetic than a conventional clock, adding changing information and visual value so it could stay open permanently on screen.",
          "solution": "I built a lightweight web application focused on continuous time display, combining a real-time clock with data and curiosities updated minute by minute to create a livelier and more engaging experience.",
          "results": "The project becomes a digital piece meant to accompany a desktop or secondary screen, mixing daily utility, visual rhythm, and dynamic information in a single view.",
          "features": [
            "Real-time online clock",
            "Data and facts updated every minute",
            "Design conceived as a web wallpaper",
            "Continuous minimalist display"
          ],
          "tags": [
            "clock",
            "facts",
            "wallpaper",
            "web"
          ]
        }
      }
    }
  },
  {
    "id": "polen-madrid",
    "title": "Polen Madrid",
    "category": "Personal",
    "kind": "App",
    "summary": "Aplicación móvil para identificar plantas alergénicas en Madrid y gestionar síntomas estacionales.",
    "role": "Arquitecto de Soluciones",
    "image": "/media/projects/polen.jpg",
    "technologies": [
      "Kotlin",
      "Android",
      "Open Data"
    ],
    "liveUrl": "https://play.google.com/store/apps/details?id=com.mgs.polenmadrid",
    "route": "/project/polen-madrid",
    "context": "App para usuarios con alergias al polen en la Comunidad de Madrid.",
    "details": {
      "description": "Polen Madrid es una aplicación móvil que ayuda a identificar plantas alergénicas y ofrece consejos prácticos para manejar síntomas durante el año.",
      "problem": "Las personas alérgicas necesitaban una guía localizada para saber qué plantas afectan Madrid en cada estación.",
      "solution": "Creamos una app Android en Kotlin que consume Open Data para mostrar niveles de polen y recomendaciones por zona y temporada.",
      "results": "Una herramienta útil para usuarios alérgicos que buscan información local y práctica sobre polen.",
      "features": [
        "Calendario de polinización",
        "Perfil de plantas",
        "Open Data ambiental",
        "Búsqueda geográfica"
      ],
      "tags": [
        "open-data",
        "medio ambiente",
        "app",
        "Madrid"
      ]
    },
    "translations": {
      "ENG": {
        "summary": "Mobile app to identify allergenic plants in Madrid and manage seasonal symptoms.",
        "role": "Solutions Architect",
        "context": "App for users with pollen allergies in the Madrid region.",
        "details": {
          "description": "Polen Madrid is a mobile app that helps identify allergenic plants and offers practical tips for managing symptoms throughout the year.",
          "problem": "Allergic people needed a localized guide to know which plants affect Madrid each season.",
          "solution": "We created an app with a pollen calendar, plant profiles, and protection recommendations.",
          "results": "A useful tool for allergic users seeking local and practical pollen information.",
          "features": [
            "Pollen calendar",
            "Plant profiles",
            "Health tips",
            "Geographic search"
          ],
          "tags": [
            "health",
            "environment",
            "app",
            "Madrid"
          ]
        }
      }
    }
  }
];

const EXCLUDED_PROJECT_IDS = new Set<string>();
const visibleProjects = projects.filter((project) => !EXCLUDED_PROJECT_IDS.has(project.id));

export const professionalProjects = visibleProjects.filter((project) => project.category === 'Profesional');
export const personalProjects = visibleProjects.filter((project) => project.category === 'Personal');
export const getProjectById = (id: string, locale?: string) => {
  const project = visibleProjects.find((project) => project.id === id);
  return locale && project ? localizeProject(project, locale) : project;
};
export const getLocalizedProjects = (locale: string) => visibleProjects.map((project) => localizeProject(project, locale));
