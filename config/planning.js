/* ==================================================================
   PLANNING DU SITE — fichier de configuration
   ------------------------------------------------------------------
   Tout le contenu du site vient d'ici : personnes, shifts, fiches de
   poste, urgences. Les pages ne font que le lire : personne ne peut
   le modifier depuis le site.

   Pour le modifier :
     - le plus simple : ouvre admin.html sur ton ordinateur, fais tes
       changements, puis « Enregistrer le fichier » par-dessus
       celui-ci (config/planning.js) ;
     - ou à la main : c'est du JavaScript, garde les guillemets et
       les virgules intacts.

   Pour publier : remplace ce fichier dans le dépôt GitHub et valide
   (commit). Le site affiche la nouvelle version en une à deux
   minutes ; les pages déjà ouvertes proposent de se mettre à jour.
   ================================================================== */
window.WEI_PLANNING = {
 "version": 3,
 "publie": "2026-11-03T15:30:00",
 "event": {
  "nom": "Soirée BDE Atmosph'Air",
  "lieu": ""
 },
 "bdes": [
  {
   "id": "bde",
   "nom": "BDE Atmosph'Air",
   "court": "BDE",
   "couleur": "#FFB000"
  }
 ],
 "jours": [
  {
   "id": "j1",
   "nom": "Jeudi",
   "date": "2026-11-12"
  }
 ],
 "coupure": 12,
 "urgences": {
  "numeros": [
   {
    "quoi": "Secours — SAMU, pompiers, police",
    "tel": "112"
   },
   {
    "quoi": "Responsable de la soirée",
    "tel": "À remplir"
   }
  ],
  "canaux": [],
  "consigne": "En cas de malaise ou de bagarre, préviens tout de suite un responsable. Ne reste jamais seul face à une situation à risque."
 },
 "plan": {
  "src": "",
  "w": 0,
  "legende": ""
 },
 "people": [
  {
   "id": "phu66go",
   "nom": "Alicia POLVE",
   "bde": "bde"
  },
  {
   "id": "p90952p",
   "nom": "Ambre DONNER",
   "bde": "bde"
  },
  {
   "id": "pafhsg2",
   "nom": "Anjali VIAL",
   "bde": "bde"
  },
  {
   "id": "pa5unzq",
   "nom": "Arthur VALERY--BATAN",
   "bde": "bde"
  },
  {
   "id": "pwwy6ev",
   "nom": "Baptiste BORDENAVE",
   "bde": "bde"
  },
  {
   "id": "pf98ss3",
   "nom": "Chayma BELKOUANE",
   "bde": "bde"
  },
  {
   "id": "pjtbxx3",
   "nom": "Cyriaque DU BOISHAMON",
   "bde": "bde"
  },
  {
   "id": "p1fz95h",
   "nom": "Emma RENAULT",
   "bde": "bde"
  },
  {
   "id": "p165z7q",
   "nom": "Enora GUERINEAU",
   "bde": "bde"
  },
  {
   "id": "p0467bo",
   "nom": "Eric COCCOLI",
   "bde": "bde"
  },
  {
   "id": "pid7g14",
   "nom": "Etienne GEMPP",
   "bde": "bde"
  },
  {
   "id": "pj4oh34",
   "nom": "Faustine MATHIEU",
   "bde": "bde"
  },
  {
   "id": "p8q9zt9",
   "nom": "Gabriel SUSSET",
   "bde": "bde"
  },
  {
   "id": "p64z1ms",
   "nom": "Hadrien KIAS",
   "bde": "bde"
  },
  {
   "id": "pracj37",
   "nom": "Hugo DELEMOTTE",
   "bde": "bde"
  },
  {
   "id": "p5xmq53",
   "nom": "Jeanne DREVON",
   "bde": "bde"
  },
  {
   "id": "p6519cs",
   "nom": "Lilou DURET-GUILLARD",
   "bde": "bde"
  },
  {
   "id": "pu3g26q",
   "nom": "Lou DELATTRE",
   "bde": "bde"
  },
  {
   "id": "p2l14er",
   "nom": "Lucas DUPLANT",
   "bde": "bde"
  },
  {
   "id": "p5xgm0j",
   "nom": "Lucas RENARD",
   "bde": "bde"
  },
  {
   "id": "p2afa28",
   "nom": "Marc POULET",
   "bde": "bde"
  },
  {
   "id": "pfmphc8",
   "nom": "Mehdi CHABBA",
   "bde": "bde"
  },
  {
   "id": "prwjau5",
   "nom": "Nathan KRUCH",
   "bde": "bde"
  },
  {
   "id": "pi8o4i6",
   "nom": "Noemi BILLY-VALENCIA",
   "bde": "bde"
  },
  {
   "id": "psf0kit",
   "nom": "Nolan BLATEAU",
   "bde": "bde"
  },
  {
   "id": "p60yj7m",
   "nom": "Oscar MAUDET",
   "bde": "bde"
  },
  {
   "id": "pyagyed",
   "nom": "Pierre CHARTON--LENNE",
   "bde": "bde"
  },
  {
   "id": "pwwbb64",
   "nom": "Selene BOURSET",
   "bde": "bde"
  }
 ],
 "respPool": [
  "pracj37",
  "pid7g14"
 ],
 "shifts": [
  {
   "id": "sut2uh5",
   "jour": "j1",
   "nom": "Bar",
   "debut": "23:00",
   "fin": "00:30",
   "lieu": "",
   "quotas": {
    "bde": 3
   },
   "equipe": [
    "pu3g26q",
    "p1fz95h",
    "prwjau5"
   ],
   "resps": [
    "pracj37"
   ]
  },
  {
   "id": "s3kj7n1",
   "jour": "j1",
   "nom": "Bar",
   "debut": "00:30",
   "fin": "02:00",
   "lieu": "",
   "quotas": {
    "bde": 3
   },
   "equipe": [
    "phu66go",
    "pa5unzq",
    "p5xmq53"
   ],
   "resps": [
    "pid7g14"
   ]
  },
  {
   "id": "sv3oe9z",
   "jour": "j1",
   "nom": "Bar",
   "debut": "02:00",
   "fin": "03:30",
   "lieu": "",
   "quotas": {
    "bde": 3
   },
   "equipe": [
    "p5xgm0j",
    "pwwbb64",
    "p60yj7m"
   ],
   "resps": [
    "pracj37"
   ]
  },
  {
   "id": "scmlc8d",
   "jour": "j1",
   "nom": "Bar",
   "debut": "03:30",
   "fin": "05:00",
   "lieu": "",
   "quotas": {
    "bde": 3
   },
   "equipe": [
    "p8q9zt9",
    "p64z1ms",
    "p6519cs"
   ],
   "resps": [
    "pid7g14"
   ]
  },
  {
   "id": "s2m4bi7",
   "jour": "j1",
   "nom": "Entrée",
   "debut": "23:00",
   "fin": "00:00",
   "lieu": "",
   "quotas": {
    "bde": 2
   },
   "equipe": [
    "pfmphc8",
    "pi8o4i6"
   ]
  },
  {
   "id": "sn7ikly",
   "jour": "j1",
   "nom": "Entrée",
   "debut": "00:00",
   "fin": "01:00",
   "lieu": "",
   "quotas": {
    "bde": 2
   },
   "equipe": [
    "pjtbxx3",
    "pafhsg2"
   ]
  },
  {
   "id": "sr180fy",
   "jour": "j1",
   "nom": "Entrée",
   "debut": "01:00",
   "fin": "02:00",
   "lieu": "",
   "quotas": {
    "bde": 2
   },
   "equipe": [
    "pwwy6ev",
    "p2l14er"
   ]
  }
 ],
 "fiches": {
  "bar": {
   "mission": "Tu sers au bar en gardant la main sur la consommation : un bar qui tourne bien, c'est une soirée où personne ne finit mal.",
   "taches": [
    "Suis les consignes de ton responsable de bar : c'est lui qui répartit service et réassort",
    "Refuse poliment de servir une personne manifestement ivre et préviens ton responsable",
    "Propose de l'eau à chaque commande",
    "Ne bois pas pendant ton shift",
    "Ramasse tout de suite gobelets, flaques et verre cassé",
    "Signale tout comportement inquiétant (harcèlement, malaise, bagarre) à ton responsable, n'interviens jamais seul",
    "À la relève, transmets l'état des stocks et les incidents"
   ],
   "materiel": [
    "Gobelets",
    "Eau",
    "Sacs poubelle et essuie-tout"
   ],
   "referent": "Ton responsable de bar (badge RESPONSABLE sur le planning). Numéros dans SOS."
  },
  "entree": {
   "mission": "Tu accueilles les arrivants et tu contrôles l'entrée : c'est le premier contact avec la soirée.",
   "taches": [
    "Vérifie le billet ou le nom sur la liste de chaque arrivant",
    "Refuse poliment l'entrée à une personne manifestement ivre et préviens un responsable",
    "Ne laisse jamais l'entrée vide : attends ton relais avant de partir",
    "Signale tout problème à un responsable, n'interviens jamais seul"
   ],
   "materiel": [
    "Liste des inscrits ou application de billetterie",
    "Téléphone chargé"
   ],
   "referent": "Les responsables de la soirée. Numéros dans SOS."
  }
 }
};
