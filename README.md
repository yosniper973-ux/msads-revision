# MSADS Révision

Application de bureau pour la révision du Titre Professionnel **Médiateur Social Accès aux Droits et Services** (MSADS - RNCP36241, Niveau 4).

Conçue pour les apprenants en préparation de leur passage devant le jury.

## Fonctionnalités

- **150 questions** fidèles au REAC 2022, réparties en 6 modules thématiques
- **6 types de questions** : QCM simple, QCM multi-réponses, Vrai/Faux, question ouverte, glisser-déposer, texte à trous
- **Mode Examen** : 20 questions, navigation libre, note sur 20 avec corrections détaillées
- **Mode Quiz Chronométré** : 15 secondes par question, système de points et combos
- **Multi-profils** avec avatars personnalisés
- **Tableau de bord** avec graphiques de progression (radar, historique)
- **Badges et niveaux** (gamification)
- **Classement local** entre profils
- **100% offline** après installation

## Prérequis pour le développement

- [Node.js](https://nodejs.org/) >= 18
- [Rust](https://rustup.rs/) (via rustup)
- Tauri CLI (inclus dans les devDependencies)

## Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd msads-revision

# Installer les dépendances
npm install
```

## Développement

```bash
# Lancer en mode développement (navigateur)
npm run dev

# Lancer en mode développement (fenêtre Tauri)
npm run tauri:dev
```

## Build de l'exécutable Windows

```bash
# Générer l'installateur .exe NSIS
npm run tauri:build
```

L'installateur se trouve dans `src-tauri/target/release/bundle/nsis/`.

## Ajouter ou modifier des questions

Éditez le fichier `src/data/questions.json`. Chaque question suit ce schéma :

```json
{
  "id": "M1-Q001",
  "module": 1,
  "type": "qcm_single | qcm_multi | true_false | open_text | drag_drop | fill_blank",
  "difficulty": 1,
  "question": "Texte de la question",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct": [0],
  "keywords": [],
  "explanation": "Explication pédagogique affichée après réponse"
}
```

Après modification, relancez `npm run tauri:build` pour générer un nouvel exécutable.

## Modules thématiques

| # | Module | Contenu |
|---|--------|---------|
| 1 | Fondamentaux & Déontologie | Charte 2001, norme AFNOR, cadre déontologique |
| 2 | Posture du médiateur | Tiers neutre, écoute active, juste distance |
| 3 | Processus & Techniques | Navette, table ronde, gestion de conflits |
| 4 | Accès aux droits & Numérique | Dématérialisation, non-recours, fracture numérique |
| 5 | Veille sociale & Territoire | Diagnostic territorial, réseaux, partenariats |
| 6 | Inclusion & Handicap | Loi 2005, CIDPH, MDPH, FALC, accessibilité |

## Stack technique

- **Tauri 2** (backend Rust minimal)
- **React 19** + **TypeScript** + **Vite**
- **TailwindCSS 4** + **Framer Motion** + **Lucide React** + **Recharts**
- Stockage local via `localStorage`

## Prérequis côté apprenant

- Windows 10 ou 11
- WebView2 (installé automatiquement si absent)
