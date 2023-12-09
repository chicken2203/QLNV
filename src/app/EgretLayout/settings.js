import layout1Settings from './Layout1/Layout1Settings';
import { themeColors } from './EgretTheme/themeColors';
import { createMuiTheme } from '@material-ui/core';
import { forEach, merge } from 'lodash';
import themeOptions from './EgretTheme/themeOptions';
import ConstantList from '../appConfig';
function createEgretThemes() {
    let themes = {};

    forEach(themeColors, (value, key) => {
        themes[key] = createMuiTheme(merge({}, themeOptions, value));
    });
    return themes;
}
const themes = createEgretThemes();

export const EgretLayoutSettings = {
    activeLayout: ConstantList.ACTIVE_LAYOUT,
    activeTheme: 'purple1',
    perfectScrollbar: true,

    themes: themes,
    layout1Settings,

    secondarySidebar: {
        show: true,
        theme: 'slateDark1',
    },
    footer: {
        show: true,
        fixed: false,
        theme: 'slateDark1',
    },
};
