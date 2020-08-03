class Arme {
    constructor(nom, bonusAttaque, bonusDefense){
    this.nom = nom;
    this.bonusAttaque = bonusAttaque;
    this.bonusDefense = bonusDefense;

}
}



  class AnneauEpique extends Arme {
    constructor(nom, bonusAttaque, bonusDefense) {
      super(nom,bonusAttaque, bonusDefense);
  
      // specifique a AnneauEpique
      this.nom = "AnneauEpique";
      this.bonusAttaque = 25;
      this.bonusDefense = 20;

    }
  }

  class AnneauSimple extends Arme {
    constructor(nom, bonusAttaque, bonusDefense) {
      super(nom,bonusAttaque, bonusDefense);
  
      // specifique a AnneauSimple
      this.nom = "AnneauSimple";
      this.bonusAttaque = 5;
      this.bonusDefense = 10;

    }
  }

  class BouclierSimple extends Arme {
    constructor(nom, bonusAttaque, bonusDefense) {
      super(nom,bonusAttaque, bonusDefense);
  
      // specifique a BouclierSimple
      this.nom = "BouclierSimple";
      this.bonusAttaque = 0;
      this.bonusDefense = 20;

    }
  }

  class BouclierEpique extends Arme {
    constructor(nom, bonusAttaque, bonusDefense) {
      super(nom,bonusAttaque, bonusDefense);
  
      // specifique a BouclierEpique
      this.nom = "BouclierEpique";
      this.bonusAttaque = 10;
      this.bonusDefense = 20;

    }
  }

  class EpeeSimple extends Arme {
    constructor(nom, bonusAttaque, bonusDefense) {
      super(nom,bonusAttaque, bonusDefense);
  
      // specifique a EpeeSimple
      this.nom = "EpeeSimple";
      this.bonusAttaque = 10;
      this.bonusDefense = 0;

  }
  }

  class EpeeEpique extends Arme {
    constructor(nom, bonusAttaque, bonusDefense) {
      super(nom,bonusAttaque, bonusDefense);
  
      // specifique a EpeeEpique
      this.nom = "EpeeEpique";
      this.bonusAttaque = 30;
      this.bonusDefense = 15;

    }
  }

  class CasqueSimple extends Arme {
    constructor(nom, bonusAttaque, bonusDefense) {
      super(nom,bonusAttaque, bonusDefense);
  
      // specifique a CasqueSimple
      this.nom = "CasqueSimple";
      this.bonusAttaque = 0;
      this.bonusDefense = 20;

    }
  }

  class CasqueEpique extends Arme {
    constructor(nom, bonusAttaque, bonusDefense) {
      super(nom,bonusAttaque, bonusDefense);
  
      // specifique a CasqueEpique
      this.nom = "CasqueEpique";
      this.bonusAttaque = 30;
      this.bonusDefense = 15;

    }
  }

