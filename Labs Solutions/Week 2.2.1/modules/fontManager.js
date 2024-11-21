// fontManager.js
export class FontManager {
  constructor(appState) {
    this.appState = appState;
    this.fontSelect = document.getElementById('font-select');
    this.setupListeners();
  }

  setupListeners() {
    this.fontSelect.addEventListener('change', (e) => {
      this.changeFont(e.target.value);
    });
  }

  changeFont(fontFamily) {
    this.appState.setState({ font: fontFamily });
    document.body.style.setProperty('--font-family', fontFamily);
  }
}

/**
 *  The FontManager class is a simple class that manages the font selection in the application. It takes an instance of the AppState class as a parameter in the constructor and sets up an event listener on the font select element. When the font select element changes, it calls the changeFont method with the selected font family as an argument.
 * 
 *  The setupListeners method adds an event listener to the font select element that listens for the change event. When the event is triggered, it calls the changeFont method with the selected font family as an argument.
 * 
 *  The changeFont method updates the app state with the selected font family and sets the font family property on the body element to the selected font family.
 */