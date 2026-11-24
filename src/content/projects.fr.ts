import type { Project } from "./types";

// Même ordre que projects.en.ts : le premier projet est la carte « À la une ».
export const projectsFr: Project[] = [
  {
    slug: "revzone-car-rental-app",
    visual: "mobile",
    period: "2025 – 2026",
    title: "RevZone — Location de voitures entre particuliers",
    category: "Application mobile · Sécurité",
    description:
      "Une application React Native pour louer la voiture d'un particulier au Maroc, avec une API Node.js sécurisée dès la conception.",
    stack: ["React Native", "Expo", "Node.js", "Express", "MongoDB", "JWT"],
    link: "https://github.com/adnane-amrs/REVZONE_MOBILE",
    details: {
      type: "Projet de Master · Full-stack",
      context:
        "RevZone fonctionne comme un Airbnb de la voiture. Les propriétaires publient leur voiture avec photos, prix par jour et jours disponibles ; les locataires cherchent par ville et par dates, envoient une demande de réservation, échangent avec le propriétaire puis laissent un avis. Le projet est né dans le module Sécurité des applications web et mobiles avancées de mon Master, sous forme de réseau social pour passionnés d'automobile, avant d'être reconstruit en plateforme de location en conservant et en étendant le travail de sécurité.",
      objectives: [
        "Permettre à chacun de passer du mode locataire au mode propriétaire dans la même application.",
        "Couvrir tout le parcours de location : recherche, demandes, messagerie, trajets et avis.",
        "Intégrer la sécurité dès le départ, avec un modèle de menaces STRIDE et des règles métier côté serveur.",
      ],
      steps: [
        {
          title: "Application mobile",
          text: "React Native 0.79 avec Expo SDK 53, navigation par fichiers avec expo-router, stores Zustand et animations Reanimated 3, en thème clair et sombre, sans bibliothèque d'interface.",
        },
        {
          title: "API REST",
          text: "Node.js et Express 5 avec Mongoose sur MongoDB Atlas. Les photos partent vers Cloudinary par upload signé et l'activité des utilisateurs est journalisée avec Winston.",
        },
        {
          title: "Moteur de réservation",
          text: "Les réservations passent de en attente à acceptée, en cours puis terminée au fil des dates. Les chevauchements avec les réservations acceptées et les jours bloqués sont vérifiés à la demande et à nouveau à l'acceptation.",
        },
        {
          title: "Sécurité",
          text: "Authentification JWT avec bcrypt, contrôle d'accès par rôle, limitation de débit, validation qui bloque l'injection NoSQL, et prix toujours calculés par le serveur, jamais repris du client.",
        },
      ],
      highlights: [
        "Place de marché à deux faces : mode locataire, mode propriétaire et tableau de bord admin.",
        "Modèle de menaces STRIDE avec une parade pour chaque menace.",
        "Vérification du permis de conduire, stocké en privé et ouvert uniquement via des URL signées.",
      ],
    },
  },
  {
    slug: "document-extraction-tms",
    visual: "detection",
    period: "2025 – 2026",
    title: "Extraction & structuration de données administratives (TMS)",
    category: "Vision par ordinateur",
    description:
      "Un système intelligent d'extraction de données à partir de documents administratifs marocains pour un TMS.",
    stack: ["Python", "OpenCV", "YOLOv11", "Tesseract OCR"],
    details: {
      type: "Projet académique",
      context:
        "Les entreprises de transport traitent un flux constant de documents administratifs marocains dont les informations doivent être saisies à la main dans leur système de gestion du transport (TMS). Ce projet remplace cette saisie manuelle par un pipeline de vision par ordinateur qui lit chaque document et renvoie ses données sous forme de champs structurés, prêts à être enregistrés dans le TMS.",
      objectives: [
        "Localiser automatiquement les zones d'information clés sur les documents administratifs scannés.",
        "Lire le texte de chaque zone de manière fiable, malgré la qualité des scans et la variété des mises en page.",
        "Transformer le résultat en enregistrements structurés directement exploitables par le TMS.",
      ],
      steps: [
        {
          title: "Pré-traitement",
          text: "Les scans sont nettoyés avec OpenCV — redimensionnement, débruitage, redressement et seuillage — pour que chaque document arrive au modèle dans un format homogène.",
        },
        {
          title: "Détection des zones",
          text: "Un modèle YOLOv11 fine-tuné sur les documents cibles détecte et découpe chaque champ d'intérêt.",
        },
        {
          title: "Reconnaissance du texte",
          text: "Tesseract OCR lit le texte de chaque zone détectée plutôt que la page entière, ce qui garde un résultat ciblé et propre.",
        },
        {
          title: "Structuration",
          text: "Les valeurs reconnues sont associées à des champs nommés et assemblées en un enregistrement structuré pour le TMS.",
        },
      ],
      highlights: [
        "Flux de bout en bout, de l'image scannée à l'enregistrement structuré.",
        "Associe détection par deep learning (YOLO) et OCR classique (Tesseract).",
        "Conçu autour de vrais documents administratifs marocains.",
      ],
    },
  },
  {
    slug: "document-classification-nlp",
    visual: "classification",
    period: "2025 – 2026",
    title: "Classification intelligente de documents",
    category: "NLP",
    description: "Une solution de bout en bout pour classifier et organiser automatiquement des documents PDF/TXT.",
    stack: ["Python", "CNN 1D", "Scikit-learn", "Gradio", "PyPDF"],
    link: "https://github.com/adnane-amrs/Document-Classification-NLP",
    details: {
      type: "Projet académique · Open source",
      context:
        "Les documents entrants arrivent généralement au même endroit et doivent être ouverts, lus et classés à la main. Ce projet automatise ce tri : il lit les fichiers PDF et TXT, prédit leur catégorie grâce à un réseau de neurones et les organise en conséquence, le tout via une interface web simple.",
      objectives: [
        "Extraire un texte exploitable des fichiers PDF comme des fichiers texte.",
        "Classer chaque document dans la bonne catégorie grâce à un modèle de deep learning.",
        "Rendre le pipeline utilisable par des non-techniciens grâce à une interface web.",
      ],
      steps: [
        {
          title: "Ingestion",
          text: "Les PDF sont analysés avec PyPDF et les fichiers TXT lus directement, ce qui produit le texte brut de chaque document.",
        },
        {
          title: "Pré-traitement",
          text: "Le texte est nettoyé, tokenisé et transformé en séquences exploitables par le modèle, avec Scikit-learn pour la préparation des données et l'évaluation.",
        },
        {
          title: "Classification",
          text: "Un réseau de neurones convolutif 1D apprend les motifs des séquences de texte et prédit la catégorie de chaque document.",
        },
        {
          title: "Interface & classement",
          text: "Une application Gradio permet de déposer des documents, de voir la classe prédite et de les organiser automatiquement.",
        },
      ],
      highlights: [
        "Pipeline complet : des fichiers bruts aux dossiers organisés.",
        "Démo Gradio interactive pour les utilisateurs non techniques.",
        "Code source disponible sur GitHub.",
      ],
    },
  },
  {
    slug: "olist-ecommerce-data-platform",
    visual: "lineage",
    period: "2026",
    title: "Plateforme data e-commerce Olist",
    category: "Ingénierie data",
    description:
      "Une plateforme data de bout en bout qui transforme environ 100 000 vraies commandes en tables analytiques testées et en tableaux de bord.",
    stack: ["Python", "PostgreSQL", "dbt", "Metabase", "Docker"],
    link: "https://github.com/adnane-amrs/olist-ecom-dataplatform",
    details: {
      type: "Projet personnel",
      context:
        "Olist met en relation de petits commerçants brésiliens avec de grandes places de marché en ligne, et son jeu de données public couvre toute la vie d'une commande : client, vendeur, articles, paiement, livraison et avis. Ce projet part des exports CSV bruts pour construire le type de plateforme en couches d'une équipe data moderne, réduite à un ordinateur portable avec Docker, afin de répondre de façon fiable aux questions sur le chiffre d'affaires, les retards de livraison et les avis.",
      objectives: [
        "Charger chaque fichier source de façon reproductible, avec des métadonnées de chargement sur chaque ligne.",
        "Modéliser les données en couches, des copies brutes aux tables de faits et de dimensions métier.",
        "Tester les données et relier chaque indicateur à ses lignes sources.",
      ],
      steps: [
        {
          title: "Ingestion",
          text: "Un script Python charge en masse les 9 fichiers CSV d'Olist, environ 1,5 million de lignes, dans un schéma PostgreSQL brut avec COPY, en ajoutant l'heure d'ingestion et le fichier source.",
        },
        {
          title: "Couche brute",
          text: "Toutes les colonnes sont stockées en texte : la couche brute reste identique aux fichiers et les corrections de types se font ensuite dans dbt, sans rien recharger.",
        },
        {
          title: "Transformation",
          text: "dbt construit des vues de staging nettoyées et des marts en schéma en étoile, avec des tests comme l'unicité, les clés non nulles et les statuts de commande autorisés.",
        },
        {
          title: "Tableaux de bord",
          text: "Metabase, lui aussi sous Docker, s'appuie sur les marts pour explorer les ventes, les délais de livraison et la satisfaction client.",
        },
      ],
      highlights: [
        "Architecture brut → staging → marts sur PostgreSQL 16.",
        "Tests de qualité des données intégrés aux modèles dbt.",
        "Entièrement dockerisé et reproductible, avec uv, ruff, sqlfluff et pre-commit.",
      ],
    },
  },
  {
    slug: "dbt-snowflake-airflow-pipeline",
    visual: "airflow",
    period: "2026",
    title: "Pipeline dbt + Snowflake orchestré avec Airflow",
    category: "Ingénierie data",
    description: "Un pipeline dbt en couches sur Snowflake, construit et testé chaque jour par un DAG Airflow sous Docker.",
    stack: ["Snowflake", "dbt", "Airflow", "Docker", "Python"],
    link: "https://github.com/adnane-amrs/data-engineering-dbt-snowflake-airflow-project",
    details: {
      type: "Projet personnel",
      context:
        "Les données brutes de commandes sont stockées dans Snowflake et doivent devenir des tables fiables et documentées pour l'analyse. Ce projet construit un pipeline dbt en couches, des sources déclarées aux modèles de staging jusqu'à un mart de chiffre d'affaires quotidien, puis le confie à Apache Airflow pour qu'il s'exécute et soit testé automatiquement chaque jour.",
      objectives: [
        "Déclarer les tables brutes de Snowflake comme sources dbt.",
        "Construire des modèles de staging et un premier mart métier, couverts par des tests.",
        "Exécuter tout le pipeline chaque jour, isolé dans Docker.",
      ],
      steps: [
        {
          title: "Sources",
          text: "Les tables brutes des commandes et des lignes de commande sont déclarées dans sources.yml, pour que chaque modèle y remonte dans le graphe de lignage.",
        },
        {
          title: "Modèles",
          text: "Les modèles de staging nettoient les tables brutes et alimentent le mart fct_daily_order_revenue, couvert par des tests dbt et documenté avec dbt docs.",
        },
        {
          title: "Orchestration",
          text: "Un DAG Airflow 2.10 lance dbt run puis dbt test chaque jour ; Airflow et sa base de métadonnées Postgres démarrent avec Docker Compose.",
        },
        {
          title: "Isolation",
          text: "dbt a son propre environnement virtuel dans l'image Airflow, et les identifiants Snowflake viennent de variables d'environnement jamais commitées.",
        },
      ],
      highlights: [
        "DAG quotidien : dbt run → dbt test, tous deux au vert.",
        "Lignage des sources brutes jusqu'au mart de chiffre d'affaires.",
        "Identifiants hors de Git grâce aux fichiers d'environnement et à un profil dbt dédié à Docker.",
      ],
    },
  },
  {
    slug: "moroccan-ecommerce-analysis",
    visual: "chart",
    period: "2026",
    title: "E-commerce marocain : ventes & rentabilité",
    category: "Analyse de données · ML",
    description:
      "Analyse de bout en bout des ventes e-commerce au Maroc, du nettoyage des données à un modèle qui prédit si une commande est rentable.",
    stack: ["Python", "pandas", "Seaborn", "Scikit-learn"],
    link: "https://github.com/adnane-amrs/Moroccan-E-Commerce-Analysis",
    details: {
      type: "Projet personnel",
      context:
        "Deux jeux de données relationnels décrivent des commandes e-commerce marocaines : l'un avec les clients, les villes et les dates, l'autre avec les produits, les montants, le bénéfice et le mode de paiement. Ce projet les fusionne, explore les régions, villes et modes de paiement qui portent les ventes, et entraîne un modèle qui prédit si une commande sera rentable.",
      objectives: [
        "Fusionner et nettoyer commandes et détails en un seul jeu de données de référence.",
        "Identifier les régions, villes et modes de paiement les plus performants.",
        "Prédire la rentabilité des commandes et comprendre ce qui la détermine.",
      ],
      steps: [
        {
          title: "Préparation",
          text: "Les deux fichiers sont joints sur l'Order ID, les dates converties en datetime, puis le mois et l'année extraits pour l'analyse saisonnière.",
        },
        {
          title: "Exploration",
          text: "Les ventes sont analysées par région et par ville, et l'hypothèse selon laquelle le paiement en plusieurs fois accompagne des commandes plus importantes que le paiement en espèces est testée.",
        },
        {
          title: "Modélisation",
          text: "Les commandes sont étiquetées rentables ou non, les variables catégorielles encodées en one-hot et un classifieur Random Forest est entraîné.",
        },
        {
          title: "Évaluation",
          text: "Le modèle est évalué avec un rapport de classification et une matrice de confusion, et l'importance des variables montre ce qui fait la rentabilité.",
        },
      ],
      highlights: [
        "Trois notebooks : préparation, analyse exploratoire et modélisation.",
        "Questions métier liées aux villes marocaines et aux habitudes de paiement.",
        "Importance des variables pour expliquer la rentabilité d'une commande.",
      ],
    },
  },
  {
    slug: "dbt-duckdb-job-postings",
    visual: "sql",
    period: "2026",
    title: "Analyse d'offres d'emploi avec dbt & DuckDB",
    category: "Analytics engineering",
    description:
      "De l'analytics engineering sur environ 843 000 offres d'emploi brutes, modélisées avec dbt directement depuis des fichiers Parquet via DuckDB.",
    stack: ["dbt", "DuckDB", "Parquet", "Python", "uv"],
    link: "https://github.com/adnane-amrs/dbt-duckdb-pipeline",
    details: {
      type: "Projet personnel",
      context:
        "Le jeu de données couvre 12 mois d'offres d'emploi dans la data, environ 843 000 lignes, ainsi que les compétences citées dans chaque offre, environ 3,3 millions de lignes. Plutôt que de tout charger dans un serveur de base de données, dbt lit directement les fichiers Parquet bruts via DuckDB, une base analytique embarquée : tout le projet tourne sur un ordinateur portable, sans infrastructure à gérer.",
      objectives: [
        "Interroger directement des fichiers Parquet bruts, sans serveur de base de données.",
        "Nettoyer les offres et écarter les lignes en erreur de collecte.",
        "Préparer des marts sur les compétences recherchées, le télétravail et l'évolution des offres.",
      ],
      steps: [
        {
          title: "Téléchargement",
          text: "Un script Python télécharge les 12 fichiers Parquet mensuels et le fichier des compétences, environ 85 Mo, en ignorant ceux déjà présents.",
        },
        {
          title: "Environnement",
          text: "uv gère Python 3.13 et les dépendances, et le profil dbt pointe vers une base DuckDB locale.",
        },
        {
          title: "Modélisation",
          text: "La vue job_posting sélectionne les champs principaux de tous les fichiers mensuels et retire les quelque 151 000 lignes en erreur de collecte.",
        },
        {
          title: "Requêtes",
          text: "Les résultats s'interrogent avec le CLI DuckDB, par exemple pour compter les offres par terme de recherche.",
        },
      ],
      highlights: [
        "Stack sans infrastructure : dbt lit le Parquet via DuckDB.",
        "Construit sur le moteur Fusion de dbt (v2).",
        "Feuille de route claire vers le staging, les tests et les marts.",
      ],
    },
  },
  {
    slug: "house-price-prediction",
    visual: "predictor",
    period: "2026",
    title: "Application de prédiction du prix des maisons",
    category: "Machine learning",
    description: "Une application Streamlit qui estime en temps réel le prix de vente d'un bien grâce à un modèle Random Forest entraîné.",
    stack: ["Python", "Scikit-learn", "Streamlit", "Plotly"],
    link: "https://github.com/adnane-amrs/House-Price-Prediction",
    details: {
      type: "Projet personnel",
      context:
        "Estimer le juste prix d'une maison demande généralement un expert. Ce projet entraîne un modèle de régression Random Forest sur des ventes passées et l'intègre dans une application Streamlit interactive : on règle les caractéristiques du bien et l'on obtient aussitôt une estimation, comparée à des biens similaires.",
      objectives: [
        "Entraîner un modèle de régression sur des ventes immobilières passées.",
        "Le servir dans une application web simple et interactive.",
        "Rendre l'estimation facile à lire face aux données du marché.",
      ],
      steps: [
        {
          title: "Données",
          text: "Des ventes passées avec des caractéristiques comme la surface habitable, les chambres, les salles de bain, la qualité globale et l'année de vente.",
        },
        {
          title: "Modèle",
          text: "Un régresseur Random Forest est entraîné sur ces caractéristiques puis sauvegardé avec joblib.",
        },
        {
          title: "Application",
          text: "Streamlit charge le modèle une seule fois grâce au cache ; des curseurs dans la barre latérale règlent le bien et le prix prédit se met à jour en direct.",
        },
        {
          title: "Visualisation",
          text: "Un nuage de points Plotly situe l'estimation parmi des biens comparables selon la surface et la qualité.",
        },
      ],
      highlights: [
        "Prédictions en temps réel à partir d'un modèle sauvegardé.",
        "Interface Streamlit interactive.",
        "Graphique Plotly pour comparer au marché.",
      ],
    },
  },
];
