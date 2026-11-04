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
 "publie": "2026-11-04T14:25:42",
 "event": {
  "nom": "Soirée Halloween",
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
   "id": "py48qfu",
   "nom": "Rafael Jamet",
   "bde": "bde"
  },
  {
   "id": "pp71bny",
   "nom": "Cyriaque Du Bois Hamon",
   "bde": "bde"
  },
  {
   "id": "p3ql3o4",
   "nom": "Enora Guerineau",
   "bde": "bde"
  },
  {
   "id": "pjzosw0",
   "nom": "Faustine Mathieu",
   "bde": "bde"
  },
  {
   "id": "p5wnlr1",
   "nom": "Lylian Serre-Leonor",
   "bde": "bde"
  },
  {
   "id": "p415bsn",
   "nom": "Mehdi Chabba",
   "bde": "bde"
  },
  {
   "id": "pfs7qcq",
   "nom": "Anjali Vial",
   "bde": "bde"
  },
  {
   "id": "pfj2pfc",
   "nom": "Oscar Maudet",
   "bde": "bde"
  },
  {
   "id": "pvs9bnm",
   "nom": "Sélène Bourset",
   "bde": "bde"
  },
  {
   "id": "pnfsyvt",
   "nom": "Lucas Cureaux",
   "bde": "bde"
  },
  {
   "id": "pq5ga82",
   "nom": "Jeanne Drevon",
   "bde": "bde"
  },
  {
   "id": "pxbr5f0",
   "nom": "Gabriel Susset",
   "bde": "bde"
  },
  {
   "id": "pkdc423",
   "nom": "Pierre Charton Lenne",
   "bde": "bde"
  },
  {
   "id": "p4v66yf",
   "nom": "Arthur Valery Batan",
   "bde": "bde"
  },
  {
   "id": "pqif869",
   "nom": "Baptiste Bordenave",
   "bde": "bde"
  },
  {
   "id": "paj6g1e",
   "nom": "Emma Renault",
   "bde": "bde"
  },
  {
   "id": "pgfqd55",
   "nom": "Marc Poulet",
   "bde": "bde"
  },
  {
   "id": "p4tqtsy",
   "nom": "Quentin Lassagne",
   "bde": "bde"
  },
  {
   "id": "pr9mdu4",
   "nom": "Alicia Polve",
   "bde": "bde"
  },
  {
   "id": "pgbjnng",
   "nom": "Tristan Potier",
   "bde": "bde"
  },
  {
   "id": "peg481m",
   "nom": "Hadrien Kias",
   "bde": "bde"
  },
  {
   "id": "p1m3uri",
   "nom": "Lucas Duplant",
   "bde": "bde"
  },
  {
   "id": "prlpswh",
   "nom": "Ambre Donner",
   "bde": "bde"
  },
  {
   "id": "pm0yz8a",
   "nom": "Chayma Belkouane",
   "bde": "bde"
  },
  {
   "id": "prgp8el",
   "nom": "Lou Delattre",
   "bde": "bde"
  },
  {
   "id": "puhpksb",
   "nom": "Tom Ferrus",
   "bde": "bde"
  },
  {
   "id": "pkl4ews",
   "nom": "Lucas Renard",
   "bde": "bde"
  },
  {
   "id": "pneqfzi",
   "nom": "Etienne Gempp",
   "bde": "bde"
  }
 ],
 "respPool": [
  "pneqfzi"
 ],
 "shifts": [
  {
   "id": "sut2uh5",
   "jour": "j1",
   "nom": "Bar",
   "debut": "23:00",
   "fin": "00:00",
   "lieu": "",
   "quotas": {
    "bde": 4
   },
   "equipe": [
    "prgp8el",
    "pm0yz8a",
    "pp71bny",
    "pfs7qcq"
   ],
   "resps": [
    "pneqfzi"
   ]
  },
  {
   "id": "s3kj7n1",
   "jour": "j1",
   "nom": "Bar",
   "debut": "01:00",
   "fin": "02:00",
   "lieu": "",
   "quotas": {
    "bde": 4
   },
   "equipe": [
    "py48qfu",
    "pjzosw0",
    "pnfsyvt",
    "p1m3uri"
   ],
   "resps": [
    "pneqfzi"
   ]
  },
  {
   "id": "sv3oe9z",
   "jour": "j1",
   "nom": "Bar",
   "debut": "02:00",
   "fin": "03:00",
   "lieu": "",
   "quotas": {
    "bde": 4
   },
   "equipe": [
    "pvs9bnm",
    "p4v66yf",
    "pfj2pfc",
    "pkl4ews"
   ],
   "resps": [
    "pneqfzi"
   ]
  },
  {
   "id": "scmlc8d",
   "jour": "j1",
   "nom": "Bar",
   "debut": "03:00",
   "fin": "05:00",
   "lieu": "",
   "quotas": {
    "bde": 4
   },
   "equipe": [
    "pqif869",
    "pgbjnng",
    "pq5ga82",
    "p415bsn"
   ],
   "resps": [
    "pneqfzi"
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
    "prlpswh",
    "paj6g1e"
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
    "p3ql3o4",
    "pgfqd55"
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
    "pxbr5f0",
    "peg481m"
   ]
  },
  {
   "id": "sij9iie",
   "jour": "j1",
   "nom": "Bar",
   "debut": "00:00",
   "fin": "01:00",
   "lieu": "",
   "quotas": {
    "bde": 4
   },
   "equipe": [
    "puhpksb",
    "p4tqtsy",
    "p5wnlr1",
    "pr9mdu4"
   ],
   "fiche": {
    "mission": "",
    "taches": [],
    "materiel": [],
    "referent": ""
   },
   "resps": [
    "pneqfzi"
   ]
  },
  {
   "id": "sy2umdp",
   "jour": "j1",
   "nom": "Arrivée + déco BDE",
   "debut": "22:00",
   "fin": "22:30",
   "lieu": "",
   "quotas": {
    "bde": 1
   },
   "equipe": [],
   "fiche": {
    "mission": "",
    "taches": [],
    "materiel": [],
    "referent": ""
   },
   "tous": true
  },
  {
   "id": "sf73pcg",
   "jour": "j1",
   "nom": "Briefing",
   "debut": "22:30",
   "fin": "23:00",
   "lieu": "",
   "quotas": {
    "bde": 1
   },
   "equipe": [],
   "fiche": {
    "mission": "",
    "taches": [],
    "materiel": [],
    "referent": ""
   },
   "tous": true
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
   "materiel": [],
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
  },
  "nouveau shift": {
   "mission": "",
   "taches": [],
   "materiel": [],
   "referent": ""
  },
  "arrivee bde": {
   "mission": "",
   "taches": [],
   "materiel": [],
   "referent": ""
  },
  "briefing": {
   "mission": "",
   "taches": [],
   "materiel": [],
   "referent": ""
  }
 }
};
