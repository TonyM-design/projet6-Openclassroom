
// POO JOUEURS
// modele joueurs 
class Personnage {
  constructor() {
    this.nom = prompt("entrez le nom de votre personnage:");
    this.sante = 100;
    this.attaque = 20;
    this.defense = 15;
    this.equipements = [new EpeeSimple];

  }
}

class Joueur extends Personnage {
  constructor(numeroJoueur, positionX, positionY) {
    super();
    this.numeroJoueur = numeroJoueur;
    this.positionX = positionX;
    this.positionY = positionY;
    this.presenceValide = false;
    this.compteurDeplacement = 3;
    this.directionDeplacement = null;
    this.postureDefensive = false;

  }

  recupererArme(caseAdjacenteChoixJoueurActif) {
    this.equipements.unshift(caseAdjacenteChoixJoueurActif.contenu);
  }

  deposerArme() {
    
    return this.equipements.pop()

  }

  changerPosture() {

    if (this.postureDefensive === false) {
      this.postureDefensive = true;
    }
    else if (this.postureDefensive === true) {
      this.postureDefensive = false;
    }
  }

  attaquer(cible) {
    if (this.postureDefensive === false) {
      if (cible.sante > 0) {
        const degats = this.attaque + this.equipements[0].bonusAttaque;
        console.log(`${this.nom} attaque ${cible.nom} et lui inflige ${degats} points de dégâts`
        );
        if (cible.postureDefensive === true) {
          cible.sante = cible.sante - degats / 2;
          if (cible.sante <= 0) {
            cible.sante = 0;
            console.log("vous avez vaincu un ennemi")
            // FIN PARTIE DEMANDER SI RELANCER JEU
          }
        }
        else {
          if (degats - cible.equipements[0].bonusDefense > 0) {
            cible.sante = cible.sante - (degats - cible.equipements[0].bonusDefense); // redonne de la vie lorsque bonus de defense superieur au degats
            if (cible.sante <= 0) {
              cible.sante = 0;
              console.log("vous avez vaincu un ennemi")
              // FIN PARTIE DEMANDER SI RELANCER JEU
            }
          }

          else { console.log("les degats ont été prévenus par le bonus de defense de la cible")
        }

        }

      }

    }
    else {
      console.log("vous ne pouvez pas attaquer en posture defensive")
    }
    console.log(`${cible.nom} a encore ${cible.sante} points de vie`)
  }

}




