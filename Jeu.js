class Jeu {
  constructor() {
    this.nombreJoueurAttendu = 2;
    this.listeJoueurs = [];
    this.joueurActif = null;
    this.nombreArmes = 4;
    this.nombreCellulesGrises = 15;
    this.initialiserParametreJeu();
    this.ajouterJoueur(this.nombreJoueurAttendu);
    this.fileAttentes = [];
    this.creerFileAttente();
    this.carte = new Carte(this.nombreColonne, this.nombreCellule, this.nombreArmes, this.nombreCellulesGrises);
    this.initialiserJeu();
    this.creerBoucleJeu();
  }

  //PARAMETRAGE DU JEU

  creerFileAttente() {
    for (let k = 0; k < this.listeJoueurs.length; k++) {
      this.fileAttentes.push(this.listeJoueurs[k]);
    }

  }

  ajouterJoueur(nombreJoueur) {
    this.nombreJoueurAttendu = nombreJoueur;
    for (let k = 0; k < nombreJoueur; k++) {
      const ajoutJoueur = new Joueur;
      this.listeJoueurs.push(ajoutJoueur);
      this.initialiserBarreVie();
      ajoutJoueur.numeroJoueur = k;
    }
  }

  parametrerNombreColonnes() {
    do {
      this.nombreColonne = prompt("entrez le nombre de colonne du plateau de jeu (entrez un chiffre) :");
      this.nombreColonneTraduit = Number.parseInt(this.nombreColonne, 10);
      if (this.nombreColonneTraduit <= 0 || isNaN(this.nombreColonneTraduit)) {
        alert("entrez un chiffre ;) ");
      }
    } while (this.nombreColonneTraduit <= 0 || isNaN(this.nombreColonneTraduit));
    return this.nombreColonneTraduit;
  }

  parametrerNombreCellules() {
    do {
      this.nombreCellule = prompt("entrez le nombre de cellule par colonne du plateau de jeu (entrez un chiffre) :");
      this.nombreCelluleTraduit = Number.parseInt(this.nombreCellule, 10);
      if (this.nombreCelluleTraduit <= 0 || isNaN(this.nombreCelluleTraduit)) {
        alert("entrez un chiffre ;) ");
      }
    } while (this.nombreCelluleTraduit <= 0 || isNaN(this.nombreCelluleTraduit));
    return this.nombreCelluleTraduit;
  }

  initialiserParametreJeu() {
    do {
      this.nombreColonne = this.parametrerNombreColonnes();
      this.nombreCellule = this.parametrerNombreCellules();
      if (this.nombreJoueurAttendu + this.nombreArmes + this.nombreCellulesGrises > this.nombreColonne * this.nombreCellule) {
        alert("Pas assez de cases disponible sur le plateau de jeu, veuillez entrez de nouveaux paramètres");
      }
    } while (this.nombreJoueurAttendu + this.nombreArmes + this.nombreCellulesGrises > this.nombreColonne * this.nombreCellule);
  }
  placerCasesSpeciales() {
    this.carte.ajouterJoueurCarte(this.listeJoueurs);
    console.log(this.carte.tableauColonnes);
    this.carte.ajouterArmeCarte();
    this.carte.ajouterBlocGrisCarte();
    this.carte.placerTableHTML()
  }

  // BARRE DE VIE

  creerBarreVie() {
    for (let i = 0; i < this.listeJoueurs.length; i++) {
      // div bootstrap col-md-6
      var dimensionnerAcBootstrap = document.createElement("div");
      dimensionnerAcBootstrap.setAttribute("class", `col-md-6`)
      dimensionnerAcBootstrap.setAttribute("id", `dimmensionnementBootstrap${i}`)
      //espace sante
      var espaceSante = document.createElement("div");
      espaceSante.setAttribute("id", `espace-vie-joueur${i}`);
      espaceSante.setAttribute("class", "espace-sante")
      //barreRougeDegat
      var barreRougeDegat = document.createElement("div");
      barreRougeDegat.setAttribute("id", `barre-degat-joueur${i}`);
      barreRougeDegat.setAttribute("class", "barre-vie-degat");
      //barreVerteVie
      var barreVerteVie = document.createElement("div");
      barreVerteVie.setAttribute("id", `barre-vie-joueur${i}`);
      barreVerteVie.setAttribute("class", "barre-vie-sante");
      //txtBarreVie
      var txtBarreVie = document.createElement("div");
      txtBarreVie.setAttribute("id", `barre-vie-txt-joueur${i}`);
      txtBarreVie.setAttribute("class", "barre-vie-txt")

      document.getElementById(`affichagesante`).appendChild(dimensionnerAcBootstrap);
      document.getElementById(`dimmensionnementBootstrap${i}`).appendChild(espaceSante);
      document.getElementById(`espace-vie-joueur${i}`).appendChild(barreRougeDegat);
      document.getElementById(`barre-degat-joueur${i}`).appendChild(barreVerteVie);
      document.getElementById(`barre-vie-joueur${i}`).appendChild(txtBarreVie);
    }
  }
  initialiserBarreVie() {
    for (let i = 0; i < this.listeJoueurs.length; i++) {
      const maxSante = this.listeJoueurs[i].sante;
      $('.total').html(maxSante + "/" + 100);
      $(`#barre-vie-txt-joueur${i}`).html("100%");
      $(`#barre-vie-joueur${i}`).css({
        "width": "100%"
      });
    }
  }
  majBarreVie(joueurCible) {
    var a = joueurCible.sante * (100 / 100); // diviser par la santé max ici 100
    $(`#barre-vie-txt-joueur${this.fileAttentes.indexOf(joueurCible)}`).html(Math.round(a) + "%");
    $(`#barre-degat-joueur${this.fileAttentes.indexOf(joueurCible)}`).animate({
      'width': a + "%"
    }, 1000);
    $(`#barre-vie-joueur${this.fileAttentes.indexOf(joueurCible)}`).animate({
      'width': a + "%"
    }, 700);
    $('.total').html(joueurCible.sante + "/" + 100);
  }

  // GESTION JOUEURS

  determinerJoueurActif() {
    this.joueurActif = this.fileAttentes[0]; // le joueur actif est le premier element du tableau this.fileAttente
    return this.joueurActif;
  }
  changerJoueurActif() {
    const joueurActifSuivant = this.fileAttentes[1]; // on choisit le joueur ayant l'indice suivant du joueurActif donc 1
    this.fileAttentes.unshift(joueurActifSuivant); // on instance le joueur suivant et place en indice 0
    // on supprime instance initiale
    const cloneSupprimer = this.fileAttentes.indexOf(joueurActifSuivant, 1);
    this.fileAttentes.splice(this.fileAttentes.indexOf(cloneSupprimer, 2), 1);
  }
  actualiserOrdreFileAttente() {
    // on supprime instance initiale
    const cloneSupprimer = this.fileAttentes.indexOf(this.fileAttentes[0], 1);
    this.fileAttentes.splice(cloneSupprimer, 1);
    console.log(this.fileAttentes);
    return this.fileAttentes;
  }
  choisirJoueurActifDepartAleatoire() {
    const joueurActifDepartAleatoire = this.fileAttentes[genererAleatoire(0, this.fileAttentes.length)]; // on choisit un joueur aleatoire dans la liste
    const cloneJoueur = joueurActifDepartAleatoire; // on instance le joueur
    console.log(this.fileAttentes);
    this.fileAttentes.unshift(cloneJoueur);//  on place une instance du joueur suivant en haut du tableau 
    console.log(this.fileAttentes);
    return this.fileAttentes;
  }


  // GESTION DEPLACEMENT ET EXCEPTIONS DEPLACEMENT
  validerDeplacement() {

  }
  gererExceptionDeplacement(carteCaseDirection, valeurDirectionDeplacementJoueur) {
    // EXCEPTION PREMIER TOUR
    if (this.joueurActif.compteurDeplacement === 3) {
      if (this.carte.verifierCaseDeplacement(carteCaseDirection) === false) {
        console.log("cette case n'existe pas");
        this.joueurActif.directionDeplacement = null;
        this.carte.ajouterVisuelDeplacementDisponibleOrigine(this.joueurActif)
        this.carte.ajouterVisuelJoueurActif(this.joueurActif);
      }
      else if (carteCaseDirection.typeCase === "cellulegrise") {
        console.log("cette case n'est pas traversable");
        this.joueurActif.directionDeplacement = null;
        this.carte.ajouterVisuelDeplacementDisponibleOrigine(this.joueurActif)
        this.carte.ajouterVisuelJoueurActif(this.joueurActif);
      }
    }
    // FIN EXCEPTION PREMIER TOUR
    // OCCURENCE CHANGEMENT DE DIRECTION DURANT DEPLACEMENT
    else if (this.joueurActif.directionDeplacement !== null && this.joueurActif.directionDeplacement !== valeurDirectionDeplacementJoueur) {
      console.log("deplacement autorisé uniquement sur le même axe");
      this.carte.ajouterVisuelJoueurActif(this.joueurActif);
      this.carte.ajouterVisuelDeplacementDirection(this.joueurActif, this.joueurActif.directionDeplacement);
      return false;
    }
    // OCCURENCE PRESENCE D'UN JOUEUR SUR LA CASE DE DESTINATION
    else if (this.carte.verifierCaseDeplacement(carteCaseDirection) === true && this.carte.verifierCaseTraversable(carteCaseDirection) === false && carteCaseDirection.typeCase !== "cellulegrise") {
      console.log("Un joueur est present sur la case, debut phase de combat");
      this.joueurActif.directionDeplacement = null;
      this.joueurActif.compteurDeplacement = 0;
      this.carte.enleverVisuelJoueurActif(this.joueurActif);
      this.declencherCombat(carteCaseDirection);
    }
    // OCCURENCE OBSTACLE OU CASE INEXISTANTE 
    else if ((this.carte.verifierCaseDeplacement(carteCaseDirection) === false || this.carte.verifierCaseTraversable(carteCaseDirection) === false) && this.joueurActif.compteurDeplacement < 3) {
      this.joueurActif.compteurDeplacement = 0;
      this.carte.enleverVisuelJoueurActif(this.joueurActif);
      console.log("aucune case disponible au deplacement sur le même axe, fin du deplacement")
    }
  }
  majProprietesJoueurActif() {
    if (event.which == 37) {
      this.joueurActif.positionY--;
      this.joueurActif.compteurDeplacement--;
      this.joueurActif.directionDeplacement = "gauche";
    }
    else if (event.which == 38) {
      this.joueurActif.positionX--
      this.joueurActif.compteurDeplacement--;
      this.joueurActif.directionDeplacement = "haut";
    }
    else if (event.which == 39) {
      this.joueurActif.positionY++
      this.joueurActif.compteurDeplacement--;
      this.joueurActif.directionDeplacement = "droite";
    }
    else if (event.which == 40) {
      this.joueurActif.positionX++
      this.joueurActif.compteurDeplacement--;
      this.joueurActif.directionDeplacement = "bas";
    }
  }
  effectuerDeplacementJoueur(carteCaseDirection, valeurDirectionDeplacementJoueur) {
    if (this.gererExceptionDeplacement(carteCaseDirection, valeurDirectionDeplacementJoueur) !== false) {
      if ((this.carte.verifierCaseDeplacement(carteCaseDirection) === true) && (this.joueurActif.directionDeplacement === null || this.joueurActif.directionDeplacement === valeurDirectionDeplacementJoueur) && (this.joueurActif.compteurDeplacement !== 0) && this.carte.verifierCaseTraversable(carteCaseDirection) === true) {
        // SI AU DEPLACEMENT PRECEDENT LE JOUEUR A RECUPERE UNE ARME
        if (this.joueurActif.equipements.length !== 1) {
          this.carte.creerStockageEmplacementOrigine(this.joueurActif);
          this.carte.remplacerParCaseArme(this.joueurActif); // la case arme est créer a l'adresse du contenu de stockageCaseJoueur
          this.joueurActif.deposerArme(); // on supprime l'arme de l'equipements[]

        }

        // OCCURENCE CASE ARME
        else if (carteCaseDirection.typeCase !== "celluleVide") {
          this.carte.creerStockageEmplacementOrigine(this.joueurActif);
          this.joueurActif.recupererArme(carteCaseDirection);
          this.carte.remplacerParCelluleVide();
        }
        // OCCURENCE CELLULE VIDE
        else if (carteCaseDirection.typeCase === "celluleVide") {
          this.carte.creerStockageEmplacementOrigine(this.joueurActif);
          this.carte.remplacerParCelluleVide();
        }

        this.carte.remplacerParCaseJoueur(carteCaseDirection);
        this.majProprietesJoueurActif();
        this.carte.rafraichirTableHTML();
        this.carte.ajouterVisuelJoueurActif(this.joueurActif);

      }
      // OCCURENCE DEPLACEMENT VERS CASE INEXISTANTE OU OCCUPEE T0
      else if (this.carte.verifierCaseDeplacement(carteCaseDirection) !== true && this.joueurActif.compteurDeplacement === 3) {
        console.log("cette case n'existe pas 27/07 1200")
        this.carte.ajouterVisuelDeplacementDisponibleOrigine(this.joueurActif);
      }
    }
    else {
      console.log("test bug visuel changement direction meme axe");
    }
  }

  changerAutomatiquementJoueurActif() {
    if (this.joueurActif.compteurDeplacement === 0) {
      this.carte.enleverVisuelJoueurActif(this.joueurActif);
      this.changerJoueurActif();
      this.determinerJoueurActif();
      this.joueurActif.compteurDeplacement = 3;
      this.joueurActif.directionDeplacement = null;
      this.carte.rafraichirTableHTML();
      this.carte.ajouterVisuelJoueurActif(this.joueurActif);
      this.carte.ajouterVisuelDeplacementDisponibleOrigine(this.joueurActif);
    }
  }

  // SYSTEME DE JEU 

  creerBoucleJeu() {
    // initialisation effet visuel premier tour
    this.carte.ajouterVisuelJoueurActif(this.joueurActif)
    this.carte.ajouterVisuelDeplacementDisponibleOrigine(this.joueurActif)
    // reaction aux touches
    $(document).keydown((event) => {
      this.carte.ajouterVisuelJoueurActif(this.joueurActif);
      this.carte.rafraichirTableHTML();
      if (event.which == 37) {// fleche gauche code ascii 37
        event.preventDefault();
        this.effectuerDeplacementJoueur(this.carte.caseGauche(this.joueurActif), "gauche")

        if (this.gererExceptionDeplacement(this.carte.caseGauche(this.joueurActif), "gauche") !== false) {
          ////////////////////////////////////////////////////////////////////////////////////////////// 
          this.carte.ajouterVisuelDeplacementDirection(this.joueurActif, this.carte.caseGauche(this.joueurActif))
          this.changerAutomatiquementJoueurActif();
        }
      }
      if (event.which == 38) {      // fleche haut  code ascii 38
        event.preventDefault();
        this.effectuerDeplacementJoueur(this.carte.caseHaut(this.joueurActif), "haut")
        if (this.gererExceptionDeplacement(this.carte.caseHaut(this.joueurActif), "haut") !== false) {
          this.carte.ajouterVisuelDeplacementDirection(this.joueurActif, this.carte.caseHaut(this.joueurActif))
          this.changerAutomatiquementJoueurActif();
        }
      }
      if (event.which == 39) { // fleche droite  code ascii 39
        event.preventDefault();
        this.effectuerDeplacementJoueur(this.carte.caseDroite(this.joueurActif), "droite");
        if (this.gererExceptionDeplacement(this.carte.caseDroite(this.joueurActif), "droite") !== false) {
          this.carte.ajouterVisuelDeplacementDirection(this.joueurActif, this.carte.caseDroite(this.joueurActif))
          this.changerAutomatiquementJoueurActif();
        }
      }
      if (event.which == 40) { // fleche bas  code ascii 40
        event.preventDefault();
        this.effectuerDeplacementJoueur(this.carte.caseBas(this.joueurActif), "bas");
        if (this.gererExceptionDeplacement(this.carte.caseBas(this.joueurActif), "bas") !== false) {
          this.carte.ajouterVisuelDeplacementDirection(this.joueurActif, this.carte.caseBas(this.joueurActif))
          this.changerAutomatiquementJoueurActif();
        }
      }
      if (event.which == 32) { // espace fin de deplacement, declenchement phase de combat si possible
        event.preventDefault();
        this.joueurActif.compteurDeplacement = 0;
        console.log("vous avez choisi de terminer vos deplacement")
        this.declencherCombatCasesAdjacentes();
        this.changerAutomatiquementJoueurActif();
      }
      if (event.which == 96) { // pav num 0 permet au joueur de changer de posture // compteurdeplacement = 0 car le changement de posture est une partie du combat
        event.preventDefault();
        this.joueurActif.compteurDeplacement = 0;
        this.joueurActif.changerPosture();
        console.log('le joueur change de posture');
        this.changerAutomatiquementJoueurActif();
      }
      this.verifierSanteJoueurs();

    }
    );

  }

  // COMBATS

  declencherCombat(carteCaseDirection) {
    this.joueurActif.attaquer(carteCaseDirection.contenu);
    this.majBarreVie(carteCaseDirection.contenu)
    this.joueurActif.compteurDeplacement = 0;

  }
  declencherCombatCasesAdjacentes() {
    if (this.carte.determinerPositionAdversaireCasesAdjacentes(this.joueurActif) !== false) {
      this.joueurActif.attaquer(this.carte.determinerPositionAdversaireCasesAdjacentes(this.joueurActif).contenu);
      this.majBarreVie(this.carte.determinerPositionAdversaireCasesAdjacentes(this.joueurActif).contenu);
    }
  }
  verifierSanteJoueurs() {
    for (let i = 0; i < this.listeJoueurs.length; i++) {
      if (this.listeJoueurs[i].sante === 0) {
        this.carte.tableauColonnes[this.listeJoueurs[i].positionX][this.listeJoueurs[i].positionY].typeCase = "celluleVide";
        this.listeJoueurs.splice(this.listeJoueurs.indexOf(this.listeJoueurs[i]), 1);
        this.carte.rafraichirTableHTML();
        alert("FIN DE LA PARTIE, POUR RELANCER LE JEU, RAFRAICHISSEZ LA PAGE")
      }
    }
  }
  supprimerJoueur() {
    listeJoueurs.forEach(listeJoueur => {
      if (listeJoueur.sante === 0) {
        this.listeJoueurs.splice(this.listeJoueurs.indexOf(listeJoueur), 1); // supprime 1 élément à la position pos
      }

    });
    console.log("test de supprimerJoueur()");
    return this.listeJoueurs;
  }


  // COMPILATION INITIALISATION
  initialiserJeu() {


    this.placerCasesSpeciales();
    this.creerBarreVie()
    this.choisirJoueurActifDepartAleatoire();
    this.actualiserOrdreFileAttente();
    this.determinerJoueurActif();
  }
}

// EXECUTION
const nouvellePartie = new Jeu;

















