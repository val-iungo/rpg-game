class Character {
    health;
    attack;

    constructor(health, attack) {
        this.health = health;
        this.attack = attack;
    }

    fight(enemy) {
        enemy.health -= this.attack;
    }
}

class Monster extends Character {}

// Builder Design Pattern
class Hero extends Character {
    sword;
    shield;
    helmet;
    boots;

    addSword(sword) {
        this.sword = sword;
        return this;
    }

    addShield(shield) {
        this.shield = shield;
        return this;
    }

    addHelmet(helmet) {
        this.helmet = helmet;
        return this;
    }

    addBoots(boots) {
        this.boots = boots;
        return this;
    }
}

class SeaMonster extends Monster {}
class EarthMonster extends Monster {}

// Factory Design Pattern
class MonsterFactory {
    createMonster(type, health, attack) {
        switch (type) {
            case "sea":
                return new SeaMonster(health, attack);
            case "earth":
                return new EarthMonster(health, attack);
            default:
                throw new Error("Unknown monster type");
        }
    }
}

// Singleton Design Pattern
class Boss extends Monster {
    constructor(health, attack) {
        if (Boss.instance) {
            return Boss.instance;
        }
        super(health, attack);
        Boss.instance = this;
    }
}

function fight(hero, monster) {
    while (hero.health > 0) {
        hero.fight(monster);
        if (monster.health > 0) {
            monster.fight(hero);
        } else {
            console.log("The hero won");
            return;
        }
    }
    console.log("The monster won");
    return;
}

const hero = new Hero(100, 10)
    .addSword(10)
    .addShield(5)
    .addHelmet(5)
    .addBoots(10);

const monsterFactory = new MonsterFactory();
const seaMonster = monsterFactory.createMonster("sea", 30, 7);
const earthMonster = monsterFactory.createMonster("earth", 25, 8);

fight(hero, seaMonster);
fight(hero, earthMonster);

const boss = new Boss(200, 15);

fight(hero, boss);
