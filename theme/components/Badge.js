import variable from "./../variables/platform";

export default (variables = variable) => {
  const badgeTheme = {
    ".primary": {
      backgroundColor: variables.btnPrimaryBg
    },
    ".warning": {
      backgroundColor: variables.btnWarningBg
    },
    ".info": {
      backgroundColor: variables.btnInfoBg
    },
    ".success": {
      backgroundColor: variables.btnSuccessBg
    },
    ".danger": {
      backgroundColor: variables.btnDangerBg
    },
    "NativeBase.Text": {
      color: variables.badgeColor,
      fontSize: variables.fontSizeBase - 3,
      lineHeight: variables.lineHeight - 1,
      textAlign: "center",
      paddingHorizontal: 3
    },
    backgroundColor: variables.badgeBg,
    padding: variables.badgePadding,
    paddingHorizontal: 6,
    alignSelf: "flex-start",
    justifyContent: variables.platform === "ios" ? "center" : undefined,
    borderRadius: 13.5,
    height: 27
  };
  return badgeTheme;
};
