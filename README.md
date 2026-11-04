# Planning de soirée

Site en lecture seule : tout le contenu vient d'un seul fichier,
`config/planning.js`. Tu le modifies sur ton ordinateur, tu le publies sur
GitHub, et tout le monde voit la nouvelle version. Depuis le site, personne
ne peut rien modifier.

Pensé pour une soirée : une date, un BDE, quelques postes (au départ Bar et
Entrée, de 23 h à 5 h). Les shifts après minuit restent dans la soirée.

## Ce qu'il y a dans le dossier

```
index.html         choix du nom (première visite)
moi.html           « Mes shifts » : en cours, prochain, ma soirée
planning.html      tous les shifts : liste ou emploi du temps
poste.html         fiche d'un poste (mission, tâches, équipe)
sos.html           numéros d'urgence
plan.html          plan de la salle (onglet visible seulement si un plan est renseigné)
assets/            style.css, commun.js (et ton plan, si tu en ajoutes un)
config/
  planning.js      ← LE fichier que tu modifies
admin.html         outil d'édition — sert sur ton PC, n'est pas mis en ligne
_config.yml        dit à GitHub Pages de ne pas publier admin.html
```

## Préparer une soirée

1. **Sur ton ordinateur**, ouvre `admin.html` en double-cliquant dessus
   (Chrome ou Edge de préférence).
2. *Membres, date et réglages* :
   - le nom de la soirée et le lieu ;
   - **la date** : c'est elle qui fait marcher « Ce soir », « En cours » et le
     compte à rebours ;
   - les membres : ajoute (Prénom NOM puis Entrée) ou retire (✕). **RESP.**
     marque ceux qui peuvent être responsables de shift ; **AUTO** barré
     exclut quelqu'un de la répartition automatique ;
   - les numéros d'urgence (remplace « À remplir »).
3. Retour aux shifts : *+ Nouveau shift*, ou *Modifier / affecter* sur un
   shift existant (horaires, nombre de personnes, responsable, fiche de
   poste). La fiche de poste est commune à tous les shifts du même nom.
4. Pour placer les gens :
   - à la main : *Tableau des affectations*, une case par personne et par
     shift ;
   - ou d'un coup : *Répartir automatiquement* (dans les réglages) remplit
     les places vides sans chevauchement ni deux fois de suite le même poste.
     *Effacer toutes les affectations* avant, si tu veux repartir de zéro.
5. **« Voir le site »** ouvre le site en aperçu avec tes changements. Le vrai
   site, lui, ne change pas.
6. **« Enregistrer le fichier »** : choisis `config/planning.js` dans ton
   dossier et remplace-le (sur Firefox/Safari il est téléchargé : mets-le dans
   `config/` à la place de l'ancien). Le badge passe à
   **ENREGISTRÉ · À PUBLIER**.
7. **Publie** : sur github.com, ouvre ton dépôt › dossier `config` ›
   *Add file* › *Upload files* › dépose `planning.js` › *Commit changes*.
   Le site est à jour en 1 à 2 minutes ; les pages déjà ouvertes affichent
   « Le planning vient d'être mis à jour ».

Ton brouillon reste dans l'admin même si tu fermes la page. Si le fichier a
changé entre-temps, l'admin te demande quelle version garder.

Pour la soirée suivante : change la date et le nom, efface les affectations,
répartis, enregistre, publie. Les membres et les fiches restent.

## Mise en ligne

- **Nouveau dépôt** (conseillé) : crée un dépôt sur GitHub, dépose tout le
  contenu de ce dossier à la racine, puis *Settings › Pages* : *Deploy from a
  branch*, branche `main`, dossier `/ (root)`. Le site a sa propre adresse.
- **Ou dans le dépôt du WEI** : supprime les anciens fichiers, dépose ceux-ci.
  Le lien reste le même.

Chacun choisit son nom à la première visite ; le site s'en souvient sur son
téléphone.

## Modifier `config/planning.js` à la main

C'est un fichier texte lisible : `window.WEI_PLANNING = { ... };`.

- `event` : nom et lieu ; `jours` : la date de la soirée.
- `people` : les membres (`id`, `nom`) ; `respPool` : ceux qui peuvent être
  responsables.
- `shifts` : `nom` (le poste), `debut`, `fin`, `quotas` (nombre de
  personnes), `equipe` (les personnes), `resps` (le responsable).
- `fiches` : fiche de chaque poste ; `urgences` : numéros SOS ;
  `plan` : image du plan (facultatif).
- `coupure` : 12 → un shift qui commence avant midi est dans la nuit de la
  soirée (02:00 = 2 h du matin, pas l'après-midi du jour même).

Garde les guillemets, les virgules et les crochets. En cas d'erreur, le site
affiche le numéro de ligne au lieu d'une page blanche. Pour revenir en
arrière : sur GitHub, ouvre le fichier › *History* › choisis une version.

## Ce qui reste public

Le site est en lecture pour quiconque a le lien : noms, shifts et numéros
de la page SOS. N'y mets pas de numéros personnels qui n'ont pas besoin d'y
être.
