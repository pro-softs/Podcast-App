import variable from "./../variables/platform";

export default (variables = variable) => {
  const cardTheme = {
    ".transparent": {
      shadowColor: null,
      shadowOffset: null,
      shadowOpacity: null,
      shadowRadius: null,
      elevation: null
    },
    marginVertical: 4,
    marginHorizontal: 4,
    flex: 1,
    borderWidth: 0,
    borderRadius: 2,
    // borderColor: "variables.cardBorderColor",
    flexWrap: "nowrap",
    backgroundColor: variables.cardDefaultBg,
    shadowColor: "red",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 1.5,
    elevation: 4
  };

  return cardTheme;
};
