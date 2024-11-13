// battleSimulator.js
export class BattleSimulator {
    constructor(hero, villain, logElement) {
        this.hero = hero;
        this.villain = villain;
        this.logElement = logElement;
        this.turnCount = 0;
    }

    log(message) {
        const p = document.createElement('p');
        p.textContent = message;
        this.logElement.appendChild(p);
        this.logElement.scrollTop = this.logElement.scrollHeight;
    }

    async startBattle() {
        this.log(`Battle begins between ${this.hero.name} and ${this.villain.name}!`);
        
        while (this.hero.health > 0 && this.villain.health > 0) {
            this.turnCount++;
            await this.executeTurn();
        }

        this.declareBattleWinner();
    }

    async executeTurn() {
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Hero's turn
        const heroDamage = this.hero.attack();
        this.villain.takeDamage(heroDamage);
        this.log(`${this.hero.name} attacks for ${heroDamage} damage! ${this.villain.name} has ${this.villain.health} health remaining.`);

        if (this.villain.health <= 0) return;

        await new Promise(resolve => setTimeout(resolve, 1000));

        // Villain's turn
        const villainDamage = this.villain.attack();
        this.hero.takeDamage(villainDamage);
        this.log(`${this.villain.name} attacks for ${villainDamage} damage! ${this.hero.name} has ${this.hero.health} health remaining.`);
    }

    declareBattleWinner() {
        const winner = this.hero.health > 0 ? this.hero : this.villain;
        const p = document.createElement('p');
        p.className = 'winner';
        p.textContent = `${winner.name} wins the battle after ${this.turnCount} turns!`;
        this.logElement.appendChild(p);
    }
}