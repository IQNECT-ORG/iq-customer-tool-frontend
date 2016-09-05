import { configure, setAddon } from '@kadira/storybook';
import IntlAddon from 'react-storybook-addon-intl';
import '../public/assets/css/main.css';
import { setStubbingMode } from 'react-stubber';

setStubbingMode(true);
setAddon(IntlAddon);

function loadStories() {
  const stories = [
    // Atoms
    'common/components/atoms/stories/brandThumbnail',
    // Molecules
    'common/components/molecules/stories/brandSelectorOption',
    'common/components/molecules/stories/brandSelectorList',
    // Organisms
    // Templates
    // Pages
  ];

  stories.forEach(story => {
    require('../src/assets/js/' + story);
  });
  // require as many stories as you need.
}

configure(loadStories, module);