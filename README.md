# Activity Feed

Une application React + TypeScript pour afficher et filtrer un flux d'activités.

## 🚀 Technologies

- **React 19.1.1** - Bibliothèque UI
- **TypeScript 5.9.3** - Typage statique
- **Vite 7.1.7** - Build tool et dev server
- **Lucide React** - Bibliothèque d'icônes
- **ESLint 9** - Linting

## 📋 Prérequis

- Node.js (version 18 ou supérieure recommandée)
- npm

## 🛠️ Installation

```bash
npm install
```

## Développement

Lance le serveur de développement avec hot-reload :

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173` (par défaut).

## Build de production

Compile TypeScript et build l'application pour la production :

```bash
npm run build
```

Les fichiers générés seront dans le dossier `dist/`.

## Linting

Vérifie la qualité du code avec ESLint :

```bash
npm run lint
```

## 📁 Structure du projet

```
src/
├── components/          # Composants React
│   ├── ActiveFilters/   # Affichage des filtres actifs
│   ├── ActivityCard/    # Carte d'activité individuelle
│   ├── ActivityFeed/    # Feed principal
│   ├── DateFilter/      # Filtre par date
│   ├── Pagination/      # Navigation entre les pages
│   ├── SearchInput/     # Barre de recherche
│   ├── StatusFilter/    # Filtre par statut
│   └── TypeFilter/      # Filtre par type
├── context/             # Contextes React (gestion d'état)
├── hooks/               # Custom hooks
├── styles/              # Styles CSS
├── types/               # Types TypeScript
├── assets/              # Images et ressources
├── App.tsx              # Composant principal
├── main.tsx             # Point d'entrée
└── data.json            # Données mockées

public/                  # Fichiers statiques
```

## 🔧 Configuration

### TypeScript

- `tsconfig.json` - Configuration de base
- `tsconfig.app.json` - Configuration pour l'application
- `tsconfig.node.json` - Configuration pour les scripts Node.js

### Vite

Configuration dans `vite.config.ts` avec le plugin React.

### ESLint

Configuration dans `eslint.config.js` avec :

- Règles React Hooks
- React Refresh
- TypeScript ESLint
