import { createSwitchNavigator, createAppContainer } from "react-navigation";
import SplashScreen from "../screens/SplashScreen";
import TagsChooseScreen from "../screens/TagsChooseScreen";
import ResaultScreen from "../screens/ResaultScreen";

//TODO do the fade out and fade in animation when switching screens

const switchNavi = createSwitchNavigator({
    Splash:{
        screen:SplashScreen
    },
    TagChoose:{
        screen:TagsChooseScreen
    },
    Resault:{
        screen:ResaultScreen
    }
})

export default createAppContainer(switchNavi)