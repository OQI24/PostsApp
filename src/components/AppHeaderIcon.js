import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { THEME } from "../theme";
import {Ionicons} from '@expo/vector-icons';

export const AppHeaderIcon = (props) => {
    return (
        <HeaderButton
           iconSize={24}
           color={Platform.OS === 'ios'? THEME.MAIN_COLOR : '#fff'}
           IconComponent={Ionicons}
           {...props}
        />
    );
}