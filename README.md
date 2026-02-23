# 🚀 JobFinder - Application de Recherche d'Emplois

JobFinder est une Single Page Application (SPA) moderne développée avec **Angular 19**, permettant aux chercheurs d'emploi de trouver des offres internationales, de gérer leurs favoris et de suivre leurs candidatures via un tableau de bord interactif.

---

## 🌟 Fonctionnalités Clés

### 🔍 Recherche & Filtrage
- **Filtrage multicritères :** Recherche par mots-clés (titre) et localisation.
- **Tri intelligent :** Affichage des offres de la plus récente à la plus ancienne.
- **Pagination :** Navigation fluide avec 10 résultats par page.

### ❤️ Gestion des Favoris (State Management)
- **NgRx Store :** Utilisation de Redux pour une gestion d'état globale et réactive.
- **Persistance :** Synchronisation en temps réel avec JSON Server.
- **Validation :** Empêche les doublons et indicateur visuel (❤️/🤍).

### 📋 Suivi des Candidatures (Kanban)
- **Drag & Drop :** Interface interactive utilisant **Angular CDK** pour changer le statut des candidatures (En attente, Accepté, Refusé).
- **CRUD Complet :** Ajouter, consulter et mettre à jour le statut des offres suivies.

### 👤 Authentification & Profil
- **Sécurité :** Protection des routes via `AuthGuard`.
- **Profil Utilisateur :** Modification des informations personnelles et suppression de compte.
- **Fake Auth :** Simulation d'authentification basée sur le `localStorage` et JSON Server.

---

## 🛠️ Stack Technique

- **Frontend :** Angular 19 (Standalone Components)
- **Gestion d'état :** NgRx (Store, Actions, Selectors, Effects)
- **UI & Design :** Tailwind CSS (Responsive Design)
- **Drag & Drop :** Angular CDK
- **Backend (Simulé) :** JSON Server (API RESTful)
- **HTTP :** RxJS & HttpClient

---

## 🏗️ Architecture du Projet

Le projet suit une structure modulaire et organisée :
```text
src/app/
├── core/            # Services, Guards, Interceptors, Models
├── features/        # Composants par module (Home, Auth, Profile, etc.)
├── shared/          # Composants réutilisables (JobCard, UI elements)
└── store/           # NgRx Store (States, Reducers, Actions, Effects)
 
``` 
## 🚀 Installation et Démarrage

**1. Cloner le projet**

``
git clone [https://github.com/votre-username/job-finder-angular.git](https://github.com/votre-username/job-finder-angular.git)
cd job-finder-angular
``

**2. Installer les dépendances**

``
npm install --legacy-peer-deps
``

**3. Lancer JSON Server**
     Ouvrez un terminal et lancez l'API simulée :

``
npx json-server --watch db.json --port 3000
``

**4. Lancer l'application Angular**
Dans un autre terminal :

``
ng serve
``

---

## 📝 Justification Technique : LocalStorage vs SessionStorage

Pour ce projet, nous avons opté pour le LocalStorage afin de garantir une expérience utilisateur persistante. Contrairement au SessionStorage qui se vide à la fermeture de l'onglet, le LocalStorage permet à l'utilisateur de rester connecté d'une session à l'autre, ce qui correspond aux standards des plateformes de recrutement modernes.

## 👨‍💻 Développé par
Oumaima Ait Said - Développeuse Frontend Angular
