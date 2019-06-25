
import { addParameters,configure } from '@storybook/react-native';


// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);

/*setOptions({
  name: 'React-Native-Contact-Input',
  // url: 'https://necolas.github.io/react-native-web',
  goFullScreen: false,
  addonPanelInRight: false,
  showSearchBox: false,
  showAddonPanel: false,
  showStoriesPanel: true
});*/
addParameters({
  options: {
    name: 'React-Native-Contact-Input',
    url: '#',
    goFullScreen: false,
    showStoriesPanel: true,
    showAddonPanel: false,
    showSearchBox: false,
    addonPanelInRight: false,
    isToolshown: false, // true by default
  },
});
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
