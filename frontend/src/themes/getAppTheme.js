import { getDesignTokens } from './themePrimitives';
import {
  inputsCustomizations,
} from './customizations/inputs';

export default function getBlogTheme(mode) {
  return {
    ...getDesignTokens(mode),
    components: {
      ...inputsCustomizations,
    },
  };
}