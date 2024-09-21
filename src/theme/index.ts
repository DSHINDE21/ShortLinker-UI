import { extendTheme } from "@chakra-ui/react";
import { ShortLinker_colors } from "./colors";
import { breakpoints } from "./foundation/breakpoints";
import { ShortLinker_text } from "./text";
const theme = {
  colors: {
    ...ShortLinker_colors,
  },
  breakpoints: breakpoints,
  styles: {
    global: {
      body: {
        overflowX: "hidden",
        bg: ShortLinker_colors.body,
        fontFamily: "Poppins, sans-sarif", // set desired fontFamily
      },
      html: {
        fontFamily: "Poppins, sans-sarif", // set desired fontFamily
      },
    },
  },
  textStyles: ShortLinker_text,
  //   components : {
  //     Button : ButtonTheme,
  //     ...rest components
  //   }
};

export default extendTheme(theme);
