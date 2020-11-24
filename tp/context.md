Etude d'une implementation de BrowserRouter
Coder withRouter
Utiliser Material UI withXXX


Contexte dynamique

Un exemple plus complexe avec des valeurs dynamiques pour le thème :

theme-context.js

export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext = React.createContext(  themes.dark // valeur par défaut);

themed-button.js

import {ThemeContext} from './theme-context';

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;    return (
      <button
        {...props}
ibackground}}
      />
    );
  }
}
ThemedButton.contextType = ThemeContext;
export default ThemedButton;

app.js

import {ThemeContext, themes} from './theme-context';

import ThemedButton from './themed-button';

// Un composant intermédiaire qui utilise ThemedButton
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Changer le thème
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // Le bouton ThemedButton à l'intérieur du ThemeProvider    // utilise le thème de l'état local tandis que celui à l'extérieur    // utilise le thème dark par défaut    return (
      <Page>
        <ThemeContext.Provider value={this.state.theme}>          <Toolbar changeTheme={this.toggleTheme} />        </ThemeContext.Provider>        <Section>
          <ThemedButton />        </Section>
      </Page>
    );
  }
}

ReactDOM.render(<App />, document.root);


