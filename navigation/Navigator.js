import { createAppContainer, createSwitchNavigator } from "react-navigation";
import CreditsScreen from "../screens/CreditsScreen";
import ResaultScreen from "../screens/ResaultScreen";
import SplashScreen from "../screens/SplashScreen";
import TagsChooseScreen from "../screens/TagsChooseScreen";

const forFade = ({ current, closing }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

const switchNavi = createSwitchNavigator({
    Splash:{
        screen:SplashScreen
    },
    TagChoose:{
        screen:TagsChooseScreen
    },
    Resault:{
        screen:ResaultScreen
    },
    Credits:{
        screen:CreditsScreen
    }
},{
    defaultNavigationOptions: {
        cardStyleInterpolator: forFade
    }
})

export default createAppContainer(switchNavi)