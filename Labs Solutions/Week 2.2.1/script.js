// Update script.js
import { DOMService } from "./modules/dom.service.js";
import { EventsService } from "./modules/events.service.js";
import { ThemeService } from "./modules/theme.service.js";
import { FontService } from "./modules/font.service.js";
import { WordOfDayService } from "./modules/wordOfDay.service.js";
import { state } from "./modules/state.js";

class DictionaryApp {
    constructor() {
        this.domService = new DOMService();
        this.eventsService = new EventsService(this.domService);
        this.themeService = new ThemeService();
        this.fontService = new FontService();
        this.wordOfDayService = new WordOfDayService();

        state.subscribe((wordData) => {
            this.domService.renderWord(wordData);
        });

        this.initializeWordOfDay();
    }

    async initializeWordOfDay() {
        try {
            const wordOfDay = await this.wordOfDayService.getWordOfDay();
            state.setState(wordOfDay);
        } catch (error) {
            console.error('Failed to load word of the day:', error);
        }
    }
}

const app = new DictionaryApp();