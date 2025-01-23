import type { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        { name: 'dark', value: '#10111E' },
        { name: 'light', value: '#10111E' },
      ],
    },
    options: {
      storySort: {
      order: ['Components', ['Phase II', 'Phase I'], 'Screens'], 
      },
    },
    viewport: {
        viewports: INITIAL_VIEWPORTS
    }
  },
};

export default preview;