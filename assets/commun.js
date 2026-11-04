/* ==================================================================
   commun.js — socle partagé par toutes les pages du site
   ------------------------------------------------------------------
   Le site est en LECTURE SEULE : le planning vient de
   config/planning.js et rien ici ne peut l'écrire.
   Dans l'édition WEI, seules les clés des bungalows et les
   résultats des olympiades s'écrivent, et uniquement dans un
   document séparé (voir config/direct.js).

   JavaScript volontairement « à l'ancienne » (var, function) pour
   rester lisible par les vieux téléphones.
   ================================================================== */
(function(){
  "use strict";

  var W = window.WEI = window.WEI || {};
  var JOURS_FR = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];
  var MOIS_FR = ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."];
  /* les clés de stockage portent le dossier du site : deux plannings publiés
     sur le même compte GitHub (ou ouverts depuis le même ordinateur) ne se
     mélangent pas — sinon « Mehdi » sur l'un deviendrait quelqu'un d'autre sur l'autre */
  var DOSSIER = location.pathname.replace(/[^\/]*$/, "");
  var CLE_MOI = "wei:moi:" + DOSSIER;
  var CLE_BROUILLON = "wei-admin:brouillon:" + DOSSIER;
  /* modules propres à certaines éditions (clés, olympiades) : déclarés par la page */
  var MODULES = (document.documentElement.getAttribute("data-modules") || "").split(/\s+/);
  function module(n){ return MODULES.indexOf(n) > -1; }
  var APERCU = /[?&]apercu=1(&|$)/.test(location.search);
  var D = null, EMPREINTE = 0, PAGE = "", OPTS = {};

  /* ---------- stockage tolérant (certaines webviews le bloquent) ---------- */
  function lire(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function ecrire(k, v){
    try{ if(v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); }catch(e){}
  }

  /* ---------- petits outils ---------- */
  function pad(n){ return (n < 10 ? "0" : "") + n; }
  function cap(s){ return s.charAt(0).toUpperCase() + s.slice(1); }
  function iso(d){ return d.getFullYear() + "-" + pad(d.getMonth()+1) + "-" + pad(d.getDate()); }
  function esc(s){
    return String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;")
      .replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }
  function el(html){ var d = document.createElement("div"); d.innerHTML = html; return d.firstElementChild; }
  function empreinte(s){
    var v = 5381;
    for(var i=0;i<s.length;i++){ v = ((v<<5) + v + s.charCodeAt(i)) >>> 0; }
    return v;
  }
  function cle(nom){
    return String(nom).normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase()
      .replace(/\s+/g," ").trim();
  }
  function court(nom){             // « Hugo DELEMOTTE » -> « Hugo D. »
    var t = String(nom).split(" ");
    return t.length > 1 ? t[0] + " " + t[1].charAt(0) + "." : nom;
  }
  function param(n){
    var m = new RegExp("[?&]" + n + "=([^&]*)").exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g," ")) : null;
  }
  /* lien interne : garde le mode aperçu d'une page à l'autre */
  function lien(page, p){
    var q = [];
    if(p) for(var k in p) if(p.hasOwnProperty(k) && p[k] != null) q.push(k + "=" + encodeURIComponent(p[k]));
    if(APERCU) q.push("apercu=1");
    return page + (q.length ? "?" + q.join("&") : "");
  }

  /* ---------- accès aux données ---------- */
  function jourDe(id){
    for(var i=0;i<D.jours.length;i++) if(D.jours[i].id === id) return D.jours[i];
    return null;
  }
  function bdeDe(id){
    for(var i=0;i<D.bdes.length;i++) if(D.bdes[i].id === id) return D.bdes[i];
    return {id:id, nom:id, court:"?", couleur:"#8098A8"};
  }
  function pers(id){
    for(var i=0;i<D.people.length;i++) if(D.people[i].id === id) return D.people[i];
    return null;
  }
  function shift(id){
    for(var i=0;i<D.shifts.length;i++) if(D.shifts[i].id === id) return D.shifts[i];
    return null;
  }
  function joursActifs(){
    return D.jours.filter(function(j){ return D.shifts.some(function(s){ return s.jour === j.id; }); });
  }
  function unSeulJour(){ return joursActifs().length <= 1; }
  function unSeulBde(){ return D.bdes.length <= 1; }
  function tousLabel(){ return unSeulBde() ? "Tout le monde" : "Tous les BDE"; }
  function dateLabel(j){ var p = j.date.split("-"); return +p[2] + " " + MOIS_FR[+p[1]-1]; }
  function coupure(){ return D.coupure == null ? 6 : D.coupure; }
  /* 02h00 le vendredi = la nuit de vendredi à samedi */
  function debutDe(s){
    var j = jourDe(s.jour); if(!j) return null;
    var p = j.date.split("-"), h = s.debut.split(":");
    var d = new Date(+p[0], +p[1]-1, +p[2], +h[0], +h[1], 0, 0);
    if(+h[0] < coupure()) d.setDate(d.getDate() + 1);
    return d;
  }
  function finDe(s){
    var d = debutDe(s); if(!d) return null;
    var h = s.fin.split(":"), f = new Date(d.getTime());
    f.setHours(+h[0], +h[1], 0, 0);
    if(f <= d) f.setDate(f.getDate() + 1);
    return f;
  }
  /* date « festival » : jusqu'à 6 h du matin, on est encore la veille */
  function dateFestival(){ return iso(new Date(Date.now() - coupure()*3600000)); }
  function jourAujourdhui(){
    var t = dateFestival();
    for(var i=0;i<D.jours.length;i++) if(D.jours[i].date === t) return D.jours[i].id;
    return null;
  }
  function jourParDefaut(){
    var j = param("jour");
    if(j && jourDe(j)) return j;
    return jourAujourdhui() || (D.jours[0] && D.jours[0].id);
  }
  function statut(s){
    var d = debutDe(s), f = finDe(s), now = new Date();
    if(!d) return {c:"", l:""};
    if(now >= d && now < f) return {c:"live", l:"EN COURS"};
    if(now >= f) return {c:"done", l:"TERMINÉ"};
    var min = Math.round((d - now)/60000);
    if(min <= 90) return {c:"soon", l:"DANS " + (min < 60 ? min + " MIN" : Math.round(min/60) + " H")};
    return {c:"", l:"À VENIR"};
  }
  function triShifts(a, b){
    var da = debutDe(a), db = debutDe(b);
    return (da && db) ? (da - db) || String(a.nom).localeCompare(b.nom, "fr") : 0;
  }
  function shiftsDuJour(jid){ return D.shifts.filter(function(s){ return s.jour === jid; }).sort(triShifts); }
  function respsDe(s){ return s.resps || []; }
  function estResp(s, pid){ return respsDe(s).indexOf(pid) > -1; }
  function estSur(s, pid){ return s.equipe.indexOf(pid) > -1 || estResp(s, pid); }
  function mesShifts(pid){ return D.shifts.filter(function(s){ return s.tous || estSur(s, pid); }).sort(triShifts); }
  function mesAffectations(pid){ return D.shifts.filter(function(s){ return !s.tous && estSur(s, pid); }); }
  function ficheDe(s){ return D.fiches[cle(s.nom)] || s.fiche || {}; }
  function ficheVide(f){
    return !(f.mission || (f.taches && f.taches.length) || (f.materiel && f.materiel.length) || f.referent);
  }
  function telLien(t){ return "tel:" + String(t).replace(/[^+0-9]/g,""); }
  function telAff(t){
    var v = String(t).replace(/\s/g,"");
    return /^0[0-9]{9}$/.test(v) ? v.replace(/(..)(?=.)/g,"$1 ").trim() : t;
  }
  function telValide(t){ return /[0-9]{2,}/.test(String(t)); }

  /* postes qui ouvrent un onglet particulier */
  function estPosteCles(s){ return /cl[eé]s/i.test(s.nom); }
  function estPosteOlymp(s){
    var n = cle(s.nom);
    return n.indexOf("olympiade") > -1 || n.indexOf("maquillage") > -1 ||
           n.indexOf("ventrigliss") > -1 || n.indexOf("faucheuse") > -1 ||
           n.indexOf("shootbasket") > -1 || n.indexOf("course scotch") > -1;
  }
  function gereCles(pid){ return module("cles") && !!pid && mesAffectations(pid).some(estPosteCles); }
  function gereOlymp(pid){ return module("olympiades") && !!pid && mesAffectations(pid).some(estPosteOlymp); }
  function epreuveDuShift(s){
    var n = cle(s.nom);
    if(n.indexOf("ventrigliss") > -1) return "vent";
    if(n.indexOf("faucheuse") > -1) return "fauch";
    if(n.indexOf("shootbasket") > -1) return "shoot";
    if(n.indexOf("course scotch") > -1) return "course";
    if(n.indexOf("8e") > -1 || n.indexOf("relais") > -1) return "eau";
    if(n.indexOf("1/4") > -1 || n.indexOf("bubble") > -1) return "bubble";
    if(n.indexOf("1/2") > -1) return "corde";
    if(n.indexOf("finale") > -1) return "parcours";
    return null;
  }

  /* familles de postes, pour colorer l'emploi du temps */
  var FAMILLES = [
    ["bar soiree","BAR","#FF6B5E"], ["bar before","BEFORE","#FF9A5C"],
    ["ronde camping","RONDE CAMPING","#6FA8FF"], ["ronde salle","RONDE SALLE","#94BDF2"],
    ["qg","QG","#A9BCC8"],
    ["remise de cles","CLÉS","#B48CF2"], ["retour des cles","RETOUR CLÉS","#B48CF2"],
    ["goodies","GOODIES","#B48CF2"], ["fouille","FOUILLE","#B48CF2"],
    ["petit dej","PETIT DÉJ","#57E08A"], ["brunch","BRUNCH","#57E08A"], ["reveil","RÉVEIL","#57E08A"],
    ["service repas","REPAS","#8FD97A"], ["installation repas","INST. REPAS","#8FD97A"],
    ["rangement repas","RANG. REPAS","#8FD97A"],
    ["discours","DISCOURS","#E8C547"], ["gestion flux","FILE","#E8C547"],
    ["olympiade","OLYMPIADES","#FFB000"], ["maquillage","MAQUILLAGE","#FFB000"], ["zumba","ZUMBA","#FFB000"],
    ["piscine","PISCINE","#5FD8EE"], ["tobo","TOBOGGAN","#5FD8EE"], ["pool party","INST. POOL","#5FD8EE"],
    ["color run","COLOR RUN","#FF7AC6"], ["perimetre","COLOR RUN","#FF7AC6"],
    ["village assos","VILLAGE ASSOS","#E8C547"], ["battle","BATTLE ASSOS","#E8C547"],
    ["auto-tamponneuse","AUTO-TAMP.","#E8C547"],
    ["soiree","INST. SOIRÉE","#FF8A7E"], ["rangement salle","RANG. SALLE","#FF8A7E"],
    // postes courants d'une soirée
    ["bar","BAR","#FFB000"], ["entree","ENTRÉE","#5FD8EE"], ["vestiaire","VESTIAIRE","#B48CF2"],
    ["accueil","ACCUEIL","#5FD8EE"], ["securite","SÉCURITÉ","#6FA8FF"], ["prevention","PRÉVENTION","#57E08A"],
    ["installation","INSTALLATION","#FF8A7E"], ["rangement","RANGEMENT","#FF8A7E"]
  ];
  var PALETTE = ["#FFB000","#5FD8EE","#FF7AC6","#57E08A","#B48CF2","#6FA8FF","#FF8A7E","#E8C547"];
  /* couleur d'un poste : celle choisie dans l'admin (config/planning.js › couleurs), sinon celle par défaut */
  function famille(nom){
    var f = familleDefaut(nom), perso = D && D.couleurs && D.couleurs[cle(nom)];
    if(perso && /^#[0-9a-f]{6}$/i.test(perso)) f.c = perso;
    return f;
  }
  function familleDefaut(nom){
    var n = cle(nom);
    for(var i=0;i<FAMILLES.length;i++){
      var f = FAMILLES[i];
      if(n.indexOf(f[0]) === -1) continue;
      var ab = f[1];
      if(f[0] === "olympiade" && nom.indexOf(" - ") > -1) ab = nom.split(" - ").slice(1).join(" - ").toUpperCase();
      if(f[0] === "service repas" && nom.indexOf("(") > -1) ab = "REPAS " + nom.split("(")[1].replace(")","").toUpperCase();
      return {ab:ab, c:f[2], fam:f[1]};
    }
    // poste inconnu : une couleur stable tirée de son nom
    var ab0 = String(nom).toUpperCase();
    return {ab:ab0, c:PALETTE[empreinte(n) % PALETTE.length], fam:ab0};
  }
  function teinte(hex, a){
    var h = hex.replace("#",""), r = parseInt(h.substr(0,2),16), g = parseInt(h.substr(2,2),16), b = parseInt(h.substr(4,2),16);
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
  }

  /* ---------- identité : qui regarde la page ---------- */
  function moiId(){
    var id = lire(CLE_MOI);
    return id && pers(id) ? id : null;
  }
  function choisir(id){ ecrire(CLE_MOI, id); }
  function oublier(){ ecrire(CLE_MOI, null); }
  function signature(){ var p = pers(moiId()); return p ? court(p.nom) : "?"; }
  function heureCourte(t){
    var d = new Date(t);
    return ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."][d.getDay()] + " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
  }

  /* ---------- habillage commun : en-tête, onglets, pied ---------- */
  var ICONES = {
    moi:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    planning:'<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/>',
    plan:'<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"/>',
    sos:'<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17h.01"/>',
    cles:'<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l3 3M15 8l2 2"/>',
    olympiades:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>'
  };
  function habiller(){
    document.title = document.title.replace(/ — .*$/, "") + " — " + D.event.nom;
    var wrap = document.querySelector(".wrap");
    var top = document.getElementById("top");
    top.innerHTML = '<div class="lead-t"><h1><a href="' + lien(moiId() ? "moi.html" : "index.html") + '">' +
      esc(D.event.nom) + '</a></h1><div class="sub">' + esc(D.event.lieu || "") + '</div></div>' +
      '<span id="sync" class="sync" hidden><span class="sdot"></span><span id="syncT"></span></span>';

    if(APERCU){
      wrap.insertBefore(el('<div class="bandeau">APERÇU DU BROUILLON DE L\'ADMIN — ' +
        'ce n\'est pas la version publiée</div>'), wrap.firstChild);
    }

    var m = moiId(), items = [];
    items.push(["moi", m ? "moi.html" : "index.html", m ? "Mes shifts" : "Mon nom"]);
    items.push(["planning", "planning.html", "Planning"]);
    if(PAGE === "cles" || gereCles(m)) items.push(["cles", "cles.html", "Clés"]);
    if(PAGE === "olympiades" || gereOlymp(m)) items.push(["olympiades", "olympiades.html", "Olymp."]);
    if(PAGE === "plan" || D.plan.src) items.push(["plan", "plan.html", "Plan"]);
    items.push(["sos", "sos.html", "SOS"]);
    var nav = document.getElementById("tabbar");
    nav.className = "tabbar";
    nav.setAttribute("aria-label", "Navigation");
    var h = '<div class="tabin">';
    items.forEach(function(it){
      var actif = PAGE === it[0] || (it[0] === "moi" && (PAGE === "index" || PAGE === "poste"));
      h += '<a class="tab' + (actif ? ' on' : '') + (it[0] === "sos" ? ' sos' : '') + '" href="' + lien(it[1]) + '"' +
           (actif ? ' aria-current="page"' : '') + '><svg viewBox="0 0 24 24" aria-hidden="true">' +
           ICONES[it[0]] + '</svg>' + it[2] + '</a>';
    });
    nav.innerHTML = h + '</div>';

    var pied = document.getElementById("pied");
    if(pied && D.publie){
      var t = new Date(D.publie);
      if(!isNaN(t)) pied.textContent = "Planning publié le " + t.getDate() + " " + MOIS_FR[t.getMonth()] +
        " à " + pad(t.getHours()) + "h" + pad(t.getMinutes());
    }
  }

  function badge(cls, txt){
    var b = document.getElementById("sync");
    if(!b) return;
    b.hidden = false;
    b.className = "sync" + (cls ? " " + cls : "");
    document.getElementById("syncT").textContent = txt;
  }

  /* ---------- briques d'affichage réutilisées par les pages ---------- */
  function sosGrand(){
    var u = D.urgences;
    if(!u.numeros.length && !u.canaux.length) return null;
    var d = el('<div class="sos-big"><h3>EN CAS D\'URGENCE</h3></div>');
    u.numeros.forEach(function(n, i){
      var ok = telValide(n.tel);
      d.appendChild(el((ok ? '<a class="tel' + (i === 0 ? ' first' : '') + '" href="' + telLien(n.tel) + '">'
                           : '<div class="tel">') +
        '<span>' + esc(n.quoi) + '</span><b' + (ok ? '' : ' style="color:var(--dim2);font-size:1rem"') + '>' +
        esc(ok ? telAff(n.tel) : "pas encore renseigné") + '</b>' + (ok ? '</a>' : '</div>')));
    });
    if(u.canaux.length){
      var c = el('<div class="canaux"></div>');
      u.canaux.forEach(function(k){
        c.appendChild(el('<div class="can"><b>' + esc(k.quoi) + '</b><span>' + esc(k.role) + '</span></div>'));
      });
      d.appendChild(c);
    }
    if(u.consigne) d.appendChild(el('<p class="csg">' + esc(u.consigne) + '</p>'));
    return d;
  }
  function sosPetit(){
    var nums = D.urgences.numeros.filter(function(n){ return telValide(n.tel); });
    if(!nums.length) return null;
    var d = el('<div class="sos-mini"></div>');
    nums.slice(0,2).forEach(function(n){
      d.appendChild(el('<a href="' + telLien(n.tel) + '">' + esc(n.quoi.split(" —")[0]) +
        ' <b>' + esc(telAff(n.tel)) + '</b></a>'));
    });
    d.appendChild(el('<a href="' + lien("sos.html") + '">Tous les numéros</a>'));
    return d;
  }
  function onglets(jid, page, extra){
    var today = dateFestival();
    if(unSeulJour()){
      var j1 = jourDe(jid) || D.jours[0], l = j1 ? shiftsDuJour(j1.id) : [];
      if(!j1) return el('<span></span>');
      var fin = l.length ? l.reduce(function(a, s){ return finDe(s) > finDe(a) ? s : a; }).fin : "";
      return el('<p class="jour1">' + (j1.date === today ? "Ce soir" : esc(cap(j1.nom)) + ' ' + dateLabel(j1)) +
        (l.length ? ' · <b>' + l[0].debut + ' → ' + fin + '</b>' : '') + '</p>');
    }
    var d = el('<nav class="days" aria-label="Jours"></nav>');
    D.jours.forEach(function(j){
      if(!D.shifts.some(function(s){ return s.jour === j.id; })) return;
      var p = {jour:j.id};
      if(extra) for(var k in extra) if(extra.hasOwnProperty(k)) p[k] = extra[k];
      d.appendChild(el('<a class="day' + (j.id === jid ? ' on' : '') + '" href="' + lien(page, p) + '"' +
        (j.id === jid ? ' aria-current="true"' : '') + ' style="text-decoration:none">' +
        '<span class="tag">' + (j.date === today ? "AUJOURD'HUI" : dateLabel(j)) + '</span>' + esc(j.nom) + '</a>'));
    });
    return d;
  }
  function carte(s, opts){
    opts = opts || {};
    var st = statut(s), m = moiId(), b = m && pers(m) ? bdeDe(pers(m).bde) : null;
    var c = el('<a class="card" href="' + lien("poste.html", {id:s.id}) + '"></a>');
    // un seul BDE : la bande de gauche prend la couleur du poste ; sinon celle de ton BDE
    c.style.borderLeftColor = st.c === "live" ? "var(--live)" : unSeulBde() ? famille(s.nom).c :
      (opts.equipe ? "var(--line)" : (b ? b.couleur : "var(--line)"));
    var jeResp = m && estResp(s, m);
    var h = '<div class="hd"><span class="pill ' + st.c + '">' + st.l + '</span>' +
      (jeResp ? '<span class="pill resp">RESPONSABLE</span>' : '') +
      (s.lieu ? '<span class="meta">' + esc(s.lieu) + '</span>' : '') + '</div>' +
      '<h3>' + esc(s.nom) + '</h3>' +
      '<div class="hours">' + s.debut + ' <span class="ar">→</span> ' + s.fin + '</div>';
    if(opts.equipe){
      var nr = respsDe(s).length;
      var noms = respsDe(s).concat(s.equipe).map(function(pid, i){
        var p = pers(pid); if(!p) return "";
        return '<span class="tm' + (i < nr ? ' rsp' : '') + '"><span class="pip" style="background:' +
          bdeDe(p.bde).couleur + '"></span>' + esc(p.nom) + (pid === m ? ' (toi)' : '') +
          (i < nr ? ' <em>resp.</em>' : '') + '</span>';
      }).join("");
      h += '<div class="team" style="margin-top:8px">' + (s.tous ? '<span class="meta">' + tousLabel() + '</span>' :
        (noms || '<span class="meta">Personne</span>')) + '</div>';
    } else {
      var autres = s.equipe.length + respsDe(s).length - (m && estSur(s, m) ? 1 : 0);
      h += '<div class="meta">' + (s.tous ? tousLabel() :
        (autres > 0 ? 'Avec ' + autres + ' autre' + (autres > 1 ? 's' : '') : 'Seul sur ce poste')) + '</div>';
    }
    if(s.note) h += '<div class="snote">' + esc(s.note) + '</div>';
    h += '<div class="more">Voir la fiche de poste →</div>';
    c.innerHTML = h;
    return c;
  }
  /* bandeau du haut : ce qui se passe maintenant, ou le prochain shift — les siens seulement,
     pas les moments collectifs */
  function resume(pid){
    var now = new Date(), enc = null, nxt = null;
    mesAffectations(pid).forEach(function(s){
      var d = debutDe(s), f = finDe(s);
      if(!d) return;
      if(now >= d && now < f){ if(!enc) enc = s; }
      else if(d > now && (!nxt || d < debutDe(nxt))) nxt = s;
    });
    if(enc) return el('<a class="hero on" href="' + lien("poste.html", {id:enc.id}) + '"><span class="k">EN CE MOMENT</span>' +
      '<div class="v">' + esc(enc.nom) + '</div><div class="w">jusqu\'à ' + enc.fin +
      (enc.lieu ? ' · ' + esc(enc.lieu) : '') + '</div></a>');
    if(nxt){
      var d0 = debutDe(nxt), min = Math.round((d0 - now)/60000), q;
      if(min < 60) q = "dans " + min + " min";
      else if(min < 600) q = "dans " + Math.floor(min/60) + " h " + (min%60 ? (min%60) + " min" : "");
      else { var j = jourDe(nxt.jour); q = j ? j.nom.toLowerCase() + " " + dateLabel(j) : "plus tard"; }
      return el('<a class="hero" href="' + lien("poste.html", {id:nxt.id}) + '"><span class="k">PROCHAIN SHIFT</span>' +
        '<div class="v">' + esc(nxt.nom) + '</div><div class="w">' + q + ' · ' + nxt.debut + ' → ' + nxt.fin +
        (nxt.lieu ? ' · ' + esc(nxt.lieu) : '') + '</div></a>');
    }
    return null;
  }
  function avant(){
    if(jourAujourdhui() || !D.jours.length) return null;
    var j = D.jours[0], p = j.date.split("-");
    var d0 = new Date(+p[0], +p[1]-1, +p[2]), now = new Date();
    now.setHours(0,0,0,0);
    var n = Math.round((d0 - now)/86400000);
    var dern = D.jours[D.jours.length-1].date.split("-");
    if(new Date(+dern[0], +dern[1]-1, +dern[2]) < now) return el('<p class="meta">' +
      (unSeulJour() ? 'C\'est terminé : merci à tous !' : 'L\'événement est terminé.') + '</p>');
    if(n < 0) return null;
    var phrase = 'Ça commence ' + (n === 0 ? "aujourd'hui" : n === 1 ? "demain" : 'dans ' + n + ' jours') +
      ', le ' + j.nom.toLowerCase() + ' ' + dateLabel(j);
    return el('<p class="meta">' + esc(phrase) + (/\.$/.test(phrase) ? '' : '.') + '</p>');
  }

  /* ---------- message temporaire avec annulation ---------- */
  var toastTimer = null;
  function toast(txt, undo){
    var t = document.getElementById("toast");
    if(!t){
      t = el('<div class="toast" id="toast" role="status"><span></span><button>Annuler</button></div>');
      document.body.appendChild(t);
    }
    t.hidden = false;
    t.querySelector("span").textContent = txt;
    var b = t.querySelector("button");
    b.hidden = !undo;
    b.onclick = function(){ t.hidden = true; if(undo) undo(); };
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ t.hidden = true; }, 6000);
  }

  /* ---------- direct : clés et olympiades, rien d'autre ---------- */
  var LIVE = {cles:{}, olymp:{}}, liveEtat = "off", liveApi = null, liveAbos = [];
  function cleLocale(){ return "wei:direct:" + ((window.WEI_DIRECT || {}).evenement || "local"); }
  function notifier(){ liveAbos.forEach(function(f){ try{ f(); }catch(e){} }); }
  function demarrerDirect(){
    var C = window.WEI_DIRECT || {}, fb = C.firebase || {};
    if(!fb.apiKey){
      liveEtat = "local";
      try{
        var s = JSON.parse(lire(cleLocale()) || "null");
        if(s){ LIVE.cles = s.cles || {}; LIVE.olymp = s.olymp || {}; }
      }catch(e){}
      badge("warn", "LOCAL");
      return;
    }
    liveEtat = "connexion";
    badge("", "CONNEXION…");
    var imp;
    try{ imp = new Function("u", "return import(u)"); }   // import dynamique sans casser les vieux navigateurs
    catch(e){ liveEtat = "ko"; badge("ko", "NAVIGATEUR TROP ANCIEN"); return; }
    var base = "https://www.gstatic.com/firebasejs/12.19.0/";
    Promise.all([imp(base + "firebase-app.js"), imp(base + "firebase-firestore.js")]).then(function(m){
      var A = m[0], F = m[1];
      var db = F.getFirestore(A.initializeApp(fb));
      var ref = F.doc(db, "direct", C.evenement || "wei");
      liveApi = {
        // une écriture = une seule entrée : deux personnes peuvent saisir en même temps
        ecrire: function(champ, k, val){
          var o = {}; o[champ] = {}; o[champ][k] = val ? val : F.deleteField();
          F.setDoc(ref, o, {merge:true}).catch(function(){ badge("ko", "ÉCRITURE REFUSÉE"); });
        }
      };
      F.onSnapshot(ref, function(snap){
        var d = snap.exists() ? snap.data() : {};
        LIVE.cles = d.cles || {}; LIVE.olymp = d.olymp || {};
        liveEtat = "ok"; badge("ok", "EN DIRECT"); notifier();
      }, function(){ liveEtat = "ko"; badge("ko", "HORS LIGNE"); });
    }).catch(function(){ liveEtat = "ko"; badge("ko", "HORS LIGNE"); });
  }
  W.live = {
    etat: function(){ return liveEtat; },
    champ: function(c){ return LIVE[c] || {}; },
    get: function(c, k){ return (LIVE[c] || {})[String(k)] || null; },
    maj: function(c, k, val){
      if(liveEtat === "connexion"){ alert("Connexion au serveur en cours, réessaie dans quelques secondes."); return false; }
      if(liveEtat === "ko" && !liveApi){ alert("Pas de connexion au serveur : ta saisie ne serait pas partagée. Réessaie quand le réseau revient."); return false; }
      LIVE[c] = LIVE[c] || {};
      k = String(k);
      if(val) LIVE[c][k] = val; else delete LIVE[c][k];
      if(liveApi) liveApi.ecrire(c, k, val);
      else ecrire(cleLocale(), JSON.stringify(LIVE));
      notifier();
      return true;
    },
    abonner: function(f){ liveAbos.push(f); }
  };
  /* la saisie (remettre une clé, désigner un vainqueur) est proposée à ceux qui sont en poste ;
     les autres peuvent la déverrouiller pour la séance, en connaissance de cause */
  function peutSaisir(type){
    var m = moiId();
    if(type === "cles" && gereCles(m)) return true;
    if(type === "olymp" && gereOlymp(m)) return true;
    try{ return sessionStorage.getItem("wei:saisie:" + type) === "1"; }catch(e){ return false; }
  }
  function verrou(type, quoi, cb){
    var d = el('<div class="lecture">Consultation seule : ' + esc(quoi) + ' est réservée aux personnes ' +
      'en poste. <br><button>Je suis en poste, activer la saisie</button></div>');
    d.querySelector("button").addEventListener("click", function(){
      try{ sessionStorage.setItem("wei:saisie:" + type, "1"); }catch(e){}
      cb();
    });
    return d;
  }

  /* ---------- chargement du fichier de configuration ---------- */
  var erreurFichier = null;
  window.addEventListener("error", function(e){
    if(e && e.filename && /config\/planning\.js/.test(e.filename))
      erreurFichier = {msg:e.message, ligne:e.lineno};
  }, true);

  function chargerScript(src, ok, ko){
    var s = document.createElement("script");
    s.src = src;
    s.onload = function(){ s.parentNode && s.parentNode.removeChild(s); ok(); };
    s.onerror = function(){ s.parentNode && s.parentNode.removeChild(s); ko(); };
    document.head.appendChild(s);
  }
  function normaliser(d){
    d.event = d.event || {nom:"Planning", lieu:""};
    d.bdes = d.bdes || []; d.jours = d.jours || []; d.people = d.people || []; d.shifts = d.shifts || [];
    d.urgences = d.urgences || {};
    d.urgences.numeros = d.urgences.numeros || []; d.urgences.canaux = d.urgences.canaux || [];
    d.plan = d.plan || {src:"", legende:""};
    d.bungalows = d.bungalows || []; d.fiches = d.fiches || {};
    d.shifts.forEach(function(s){ s.equipe = s.equipe || []; s.quotas = s.quotas || {}; });
    return d;
  }
  function panne(titre, detail){
    var app = document.getElementById("app");
    app.innerHTML = "";
    app.appendChild(el('<div class="erreur"><b>' + esc(titre) + '</b>' + esc(detail) + '</div>'));
  }
  function brouillon(){
    try{ var b = JSON.parse(lire(CLE_BROUILLON) || "null"); return b && b.etat && b.etat.shifts ? b.etat : null; }
    catch(e){ return null; }
  }

  /* une nouvelle version publiée ? on le signale sans recharger d'office */
  function surveiller(){
    if(APERCU || !/^https?:$/.test(location.protocol)) return;
    var derniere = 0, signale = false;
    function verifier(){
      if(signale || Date.now() - derniere < 20000) return;
      derniere = Date.now();
      chargerScript("config/planning.js?t=" + Date.now(), function(){
        var n = window.WEI_PLANNING;
        if(!n || !n.shifts) return;
        if(empreinte(JSON.stringify(n)) === EMPREINTE) return;
        signale = true;
        var b = el('<div class="bandeau maj">Le planning vient d\'être mis à jour.<button>Afficher</button></div>');
        b.querySelector("button").addEventListener("click", function(){ location.reload(); });
        var wrap = document.querySelector(".wrap");
        wrap.insertBefore(b, wrap.firstChild);
      }, function(){});
    }
    setInterval(verifier, 120000);
    document.addEventListener("visibilitychange", function(){ if(!document.hidden) verifier(); });
  }

  /* point d'entrée de chaque page */
  W.demarrer = function(opts, cb){
    OPTS = opts || {}; PAGE = OPTS.page || "";
    document.body.setAttribute("data-mode", "user");
    function pret(brut){
      EMPREINTE = empreinte(JSON.stringify(brut));
      D = normaliser(JSON.parse(JSON.stringify(brut)));
      W.D = D;
      habiller();
      if(OPTS.direct) demarrerDirect();
      document.getElementById("app").innerHTML = "";
      cb(D);
      surveiller();
    }
    if(APERCU){
      var b = brouillon();
      if(b){ pret(b); return; }
    }
    if(window.WEI_PLANNING && window.WEI_PLANNING.shifts){ pret(window.WEI_PLANNING); return; }
    chargerScript("config/planning.js?t=" + Date.now(), function(){
      var d = window.WEI_PLANNING;
      if(d && d.shifts && d.people) pret(d);
      else if(erreurFichier) panne("Le fichier config/planning.js contient une erreur",
        " Ligne " + erreurFichier.ligne + " : " + erreurFichier.msg +
        ". Corrige-le (souvent une virgule ou un guillemet) ou republie la version enregistrée par l'admin.");
      else panne("Le planning est illisible", " Le fichier config/planning.js ne contient pas de planning valide.");
    }, function(){
      panne("Le planning n'a pas pu être chargé",
        " Vérifie ta connexion, puis recharge la page. Si le problème continue, le fichier config/planning.js manque dans le dépôt.");
    });
  };

  /* boîte à outils exposée aux pages */
  var outils = {esc:esc, el:el, pad:pad, cap:cap, cle:cle, court:court, param:param, lien:lien,
    jourDe:jourDe, bdeDe:bdeDe, pers:pers, shift:shift, dateLabel:dateLabel, debutDe:debutDe, finDe:finDe,
    statut:statut, triShifts:triShifts, shiftsDuJour:shiftsDuJour, respsDe:respsDe, estResp:estResp,
    estSur:estSur, mesShifts:mesShifts, mesAffectations:mesAffectations, ficheDe:ficheDe, ficheVide:ficheVide,
    jourAujourdhui:jourAujourdhui, jourParDefaut:jourParDefaut, dateFestival:dateFestival,
    estPosteCles:estPosteCles, estPosteOlymp:estPosteOlymp, gereCles:gereCles, gereOlymp:gereOlymp, module:module,
    unSeulJour:unSeulJour, unSeulBde:unSeulBde, tousLabel:tousLabel,
    epreuveDuShift:epreuveDuShift, famille:famille, teinte:teinte,
    moiId:moiId, choisir:choisir, oublier:oublier, signature:signature, heureCourte:heureCourte,
    sosGrand:sosGrand, sosPetit:sosPetit, onglets:onglets, carte:carte, resume:resume, avant:avant,
    toast:toast, peutSaisir:peutSaisir, verrou:verrou, lire:lire, ecrire:ecrire, apercu:APERCU};
  for(var k in outils) if(outils.hasOwnProperty(k)) W[k] = outils[k];
})();
