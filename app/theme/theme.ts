import { createTheme } from "@rneui/themed";

export const globalTheme = createTheme({
  components: {
    Button: {
      buttonStyle: {
        backgroundColor: "#FFD700", // Yellow color
      },
      titleStyle: {
        color: "#000000", // Black text for better contrast on yellow
      },
    },
  },
  // You can add more global styles here
});
