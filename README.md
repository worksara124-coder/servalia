# SERVALIA — site vitrine (Astro)

Site statique codé avec [Astro](https://astro.build). Il reprend le style et la structure de lenga.lambdastudio.io : fond gris clair, grands titres Mona Sans (police auto-hébergée), photos en cartes arrondies et nav flottante au scroll. Il utilise les transitions de page d'Astro (`<ClientRouter />`) : la photo de l'atelier choisi se transforme en hero pendant la navigation.

Sections d'une page atelier :
- un hero avec le titre en 3 lignes dans l'encoche de la photo, plus une barre de demande rapide qui pré-remplit le formulaire ;
- les prestations en panneaux verticaux qui s'ouvrent au clic (navigables aussi aux flèches du clavier) ;
- la méthode en frise de 8 étapes ;
- une journée type avec une horloge qui suit le scroll ;
- des repères en grille de cartes ;
- une FAQ ;
- un bloc sombre de contact avec le formulaire ;
- le pied de page.

## Pages

| URL | Contenu |
|---|---|
| `/` | Intro animée du logo, puis le choix entre les deux ateliers |
| `/mecanique` | Site de l'atelier Mécanique (accent rouge) |
| `/metallique` | Site de l'atelier Métallique (accent or) |
| `/?choix` | Choix d'atelier sans rejouer l'intro (lien « Changer d'atelier ») |

L'intro se joue une fois par session de navigation.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère le site statique dans dist/
npm run preview  # sert dist/ en local
```

Le dossier `dist/` peut être déployé tel quel sur Vercel, Netlify, o2switch, un hébergement mutualisé, etc.

## Modifier le contenu

Tous les textes sont dans **`src/data/ateliers.ts`** : ateliers, prestations, tags, cadrage des photos, étapes de la méthode, secteurs et informations sur l'entreprise. Pour afficher le téléphone et l'e-mail, il suffit de remplir `telephone` et `email` dans `entreprise`.

```
src/
  data/ateliers.ts         contenu du site
  layouts/Base.astro       <head>, SEO, Open Graph, JSON-LD, transitions
  pages/index.astro        intro + choix d'atelier
  pages/[atelier].astro    page atelier (générée pour chaque atelier)
  components/              Nav, Hero, Prestations, Methode, Journee,
                           Reperes, Faq, Close, Footer, Icon
  scripts/site.ts          nav, panneaux, horloge, formulaires, apparitions
  styles/global.css        styles
public/img/                logo et photos
```

## Avant la mise en ligne

- Dans `astro.config.mjs`, remplacer `site` par le vrai domaine. Il sert pour les URL canoniques et Open Graph.
- La demande de devis (fenêtre en 5 étapes, `src/components/QuoteModal.astro`) est une démo. Pour la brancher, compléter la fonction `sendQuote` dans `src/scripts/site.ts` (Formspree, endpoint PHP, API…). Les fichiers joints ne sont listés que par leur nom : pour les envoyer, il faut un endpoint qui accepte les fichiers.
- La « journée type » et les réponses de la FAQ sont des exemples à faire valider par le client.
- Les photos des panneaux sont des recadrages des deux photos fournies. De vraies photos par métier rendraient le site bien plus fort.
- Les photos fournies portent le logo TotalEnergies. À valider avec le client ou à remplacer.
- Le contenu de l'atelier Métallique est à valider avec le client.
