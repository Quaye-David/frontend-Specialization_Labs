// Update script.js
import { DOMService } from "./modules/dom.service.js";
import { EventsService } from "./modules/events.service.js";
import { ThemeService } from "./modules/theme.service.js";
import { FontService } from "./modules/font.service.js";
import { state } from "./modules/state.js";

class DictionaryApp {
  constructor() {
    this.domService = new DOMService();
    this.eventsService = new EventsService(this.domService);
    this.themeService = new ThemeService();
    this.fontService = new FontService();

    state.subscribe((wordData) => {
      this.domService.renderWord(wordData);
    });
  }
}

const app = new DictionaryApp();
