// battleSimulator.js
export function createBattleSimulator(hero, villain, logElement, errorElement) {
    const state = {
        hero,
        villain,
        logElement,
        errorElement,
        turnCount: 0,
        isRunning: false
    };

    function log(message, type = 'info') {
        try {
            const p = document.createElement('p');
            p.textContent = message;
            p.className = `battle-log-${type}`;
            state.logElement.appendChild(p);
            state.logElement.scrollTop = state.logElement.scrollHeight;
        } catch (error) {
            handleError('Failed to log message', error);
        }
    }

    function handleError(message, error) {
        console.error(message, error);
        if (state.errorElement) {
            state.errorElement.textContent = `Error: ${message}`;
            state.errorElement.classList.remove('hidden');
            setTimeout(() => {
                state.errorElement.classList.add('hidden');
            }, 5000);
        }
    }

    async function startBattle() {
        try {
            if (state.isRunning) return;
            state.isRunning = true;
            log(`Battle begins between ${state.hero.name} and ${state.villain.name}!`, 'start');
            
            while (state.hero.health > 0 && state.villain.health > 0) {
                state.turnCount++;
                log(`Turn ${state.turnCount} begins.`, 'turn');
                await executeTurn();
            }

            declareBattleWinner();
        } catch (error) {
            handleError('Battle simulation failed', error);
        } finally {
            state.isRunning = false;
        }
    }

    async function executeTurn() {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const { damage: heroDamage, remainingHealth: villainHealth } = executeAttack(
                state.hero,
                state.villain
            );

            if (villainHealth <= 0) return;

            await new Promise(resolve => setTimeout(resolve, 1000));

            const { damage: villainDamage } = executeAttack(
                state.villain,
                state.hero
            );
        } catch (error) {
            handleError('Turn execution failed', error);
        }
    }

    function executeAttack(attacker, defender) {
        const damage = attacker.attack();
        const remainingHealth = defender.takeDamage(damage);
        log(
            `${attacker.name} attacks for ${damage} damage! ${defender.name} has ${remainingHealth} health remaining.`,
            'attack'
        );
        return { damage, remainingHealth };
    }

    function declareBattleWinner() {
        try {
            const winner = state.hero.health > 0 ? state.hero : state.villain;
            log(
                `${winner.name} wins the battle after ${state.turnCount} turns!`,
                'winner'
            );
        } catch (error) {
            handleError('Failed to declare winner', error);
        }
    }

    return {
        startBattle,
        log,
        handleError,
        executeTurn,
        executeAttack,
        declareBattleWinner
    };
}