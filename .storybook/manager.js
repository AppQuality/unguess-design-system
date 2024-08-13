import {addons} from '@storybook/manager-api';
import unguessTheme from './unguessTheme';

addons.setConfig({
    theme: unguessTheme,
});