# API de Gestion de Budget

## 📌 Structure de l'API

## ⚠️Mettrez a jour et en anglais

### 1️⃣ Gestion des Années
- `GET /years` → Récupérer toutes les années
- `POST /years` → Ajouter une nouvelle année
- `GET /years/:year` → Récupérer une année spécifique
- `DELETE /years/:year` → Supprimer une année

### 2️⃣ Gestion des Mois
- `GET /years/:year/months` → Récupérer tous les mois d’une année
- `POST /years/:year/months` → Ajouter un mois dans une année
- `GET /years/:year/months/:month` → Récupérer un mois spécifique
- `DELETE /years/:year/months/:month` → Supprimer un mois

### 3️⃣ Gestion des Revenus
- `GET /years/:year/months/:month/income` → Récupérer tous les revenus d’un mois
- `POST /years/:year/months/:month/income` → Ajouter une catégorie de revenu
- `GET /years/:year/months/:month/income/:incomeId` → Récupérer une catégorie de revenu
- `DELETE /years/:year/months/:month/income/:incomeId` → Supprimer une catégorie de revenu

#### Gestion des Flux de Revenus
- `POST /years/:year/months/:month/income/:incomeId/flux` → Ajouter un flux à un revenu
- `GET /years/:year/months/:month/income/:incomeId/flux/:fluxId` → Récupérer un flux spécifique
- `DELETE /years/:year/months/:month/income/:incomeId/flux/:fluxId` → Supprimer un flux

### 4️⃣ Gestion des Dépenses
- `GET /years/:year/months/:month/expense` → Récupérer toutes les dépenses d’un mois
- `POST /years/:year/months/:month/expense` → Ajouter une catégorie de dépense
- `GET /years/:year/months/:month/expense/:expenseId` → Récupérer une catégorie de dépense
- `DELETE /years/:year/months/:month/expense/:expenseId` → Supprimer une catégorie de dépense

#### Gestion des Flux de Dépenses
- `POST /years/:year/months/:month/expense/:expenseId/flux` → Ajouter un flux à une dépense
- `GET /years/:year/months/:month/expense/:expenseId/flux/:fluxId` → Récupérer un flux spécifique
- `DELETE /years/:year/months/:month/expense/:expenseId/flux/:fluxId` → Supprimer un flux

### 5️⃣ Statistiques & Résumé
- `GET /years/:year/summary` → Obtenir un résumé financier de l’année
- `GET /years/:year/months/:month/summary` → Obtenir un résumé du mois

---

## 📂 Structure des Dossiers

```
/my-budget-app
│── /app
│   ├── /api
│   │   ├── /years
│   │   │   ├── route.ts
│   │   │   ├── /[year]
│   │   │   │   ├── route.ts
│   │   │   │   ├── /months
│   │   │   │   │   ├── route.ts
│   │   │   │   │   ├── /[month]
│   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   ├── /income
│   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   │   ├── /[incomeId]
│   │   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   │   │   ├── /flux
│   │   │   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   │   │   │   ├── /[fluxId]
│   │   │   │   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   ├── /expense
│   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   │   ├── /[expenseId]
│   │   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   │   │   ├── /flux
│   │   │   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   │   │   │   ├── /[fluxId]
│   │   │   │   │   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   ├── /summary
│   │   │   │   │   │   │   ├── route.ts
```

