export class BattleSimulator {
    constructor(hero, villain, logElement, errorElement) {
        this.hero = hero;
        this.villain = villain;
        this.logElement = logElement;
        this.errorElement = errorElement;
        this.turnCount = 0;
        this.isRunning = false;
    }

    log(message, type = 'info') {
        try {
            const p = document.createElement('p');
            p.textContent = message;
            p.className = `battle-log-${type}`;
            this.logElement.appendChild(p);
            this.logElement.scrollTop = this.logElement.scrollHeight;
        } catch (error) {
            this.handleError('Failed to log message', error);
        }
    }

    handleError(message, error) {
        console.error(message, error);
        if (this.errorElement) {
            this.errorElement.textContent = `Error: ${message}`;
            this.errorElement.classList.remove('hidden');
            setTimeout(() => {
                this.errorElement.classList.add('hidden');
            }, 5000);
        }
    }

    async startBattle() {
        try {
            if (this.isRunning) return;
            this.isRunning = true;
            this.log(`Battle begins between ${this.hero.name} and ${this.villain.name}!`, 'start');
            
            while (this.hero.health > 0 && this.villain.health > 0) {
                this.turnCount++;
                await this.executeTurn();
            }

            this.declareBattleWinner();
        } catch (error) {
            this.handleError('Battle simulation failed', error);
        } finally {
            this.isRunning = false;
        }
    }

    async executeTurn() {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const { damage: heroDamage, remainingHealth: villainHealth } = this.executeAttack(
                this.hero,
                this.villain
            );

            if (villainHealth <= 0) return;

            await new Promise(resolve => setTimeout(resolve, 1000));

            const { damage: villainDamage } = this.executeAttack(
                this.villain,
                this.hero
            );
        } catch (error) {
            this.handleError('Turn execution failed', error);
        }
    }

    executeAttack(attacker, defender) {
        const damage = attacker.attack();
        const remainingHealth = defender.takeDamage(damage);
        this.log(
            `${attacker.name} attacks for ${damage} damage! ${defender.name} has ${remainingHealth} health remaining.`,
            'attack'
        );
        return { damage, remainingHealth };
    }

    declareBattleWinner() {
        try {
            const winner = this.hero.health > 0 ? this.hero : this.villain;
            this.log(
                `${winner.name} wins the battle after ${this.turnCount} turns!`,
                'winner'
            );
        } catch (error) {
            this.handleError('Failed to declare winner', error);
        }
    }
}