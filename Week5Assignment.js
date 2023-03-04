class Music {
    constructor(name, genre) {
        this.name = name;
        this.genre = genre;
    }

    describe() {
        return `${this.name} plays ${this.genre}.`;
     }
}

class App {
    constructor(name) {
        this.name = name;
        this.music = [];
    }

    addMusic(music) {
        if (music instanceof Music) {
            this.music.push(music);
        } else {
            throw new Error (`You can only add an instance of Music. Argument is not a music: ${music}`);
        }
    }

    describe() {
        return `${this.name} has ${this.music.length} music.`;
    }
}

class Menu {
    constructor() {
        this.app = [];
        this.selectedApp = null;
    }
    
    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch(selection) {
                case '1':
                    this.createApp();
                    break;
                case '2':
                    this.viewApp();
                    break;
                case '3':
                    this.deleteApp();
                    break;
                case '4':
                    this.displayApps();
                    break;  
                default:
                    selection = 0;    
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
        0) exit 
        1) create new app
        2) view app
        3) delete app
        4) display all apps
        `);
    }

    showAppMenuOptions(appInfo){
        return prompt(`
        0) back
        1) create music
        2) delete music
        --------------------
        ${appInfo}
        `);
    }


     displayApps() {
        let appString = '';
        for (let i = 0; i < this.app.length; i++) {
            appString += i + ') ' + this.app[i].name + '\n';
        }
        alert(appString);
    }

    createApp() {
        let name = prompt('Enter name for new app:');
        this.app.push(new App(name));
    }

    viewApp() {
        let index = prompt('Enter the index of the app you wish to view:');
        if (index > -1 && index < this.app.length) {
            this.selectedApp = this.app[index];
            let description = 'App Name: ' + this.selectedApp.name + '\n';

            for (let i = 0; i < this.selectedApp.music.length; i++) {
                description += i + ') ' + this.selectedApp.music[i].name
                + ' - ' + this.selectedApp.music[i].genre + '\n';
            }
            
            let selection = this.showAppMenuOptions(description);
            switch (selection) {
                case'1':
                this.createMusic();
                break;
                case '2':
                    this.deleteMusic();
            }
        } 
    }

    deleteApp() {
        let index = prompt('Enter the index of the team you wish to delete: ');
        if (index > -1 && index < this.app.length); {
            this.app.splice(index, 1);
        }
    }

    createMusic() {
        let name = prompt(' Enter name for new music: ');
        let genre = prompt(' Enter genre for new music: ');
        this.selectedApp.music.push(new Music(name, genre));
    }

    deleteMusic() {
        let index = prompt(' Enter the index of the music you wish to delete: ');
        if (index > -1 && index < this.selectedApp.music.length) {
            this.selectedApp.music.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();