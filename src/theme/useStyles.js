import { ThemeProvider, createMuiTheme, makeStyles, useTheme } from "@material-ui/core";

const theme = createMuiTheme();

const useStyles = makeStyles({ 

    solid: {
        color: theme.palette.primary.main,
    },

    containermt: {
        marginTop: "40px"
    },
    cardbody :{
        alignItems: "center",
    }

})

export default useStyles;