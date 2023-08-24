import { useCallback } from "react";
import {
    useFonts,
    OpenSans_400Regular,
    OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";
import * as SplashScreen from "expo-splash-screen";
import { AppNavigation } from "./src/navigation/AppNavigation";
import { Provider } from "react-redux";
import { store } from "./src/store";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = useFonts({
        OpenRegular: OpenSans_400Regular,
        OpenBold: OpenSans_700Bold,
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <AppNavigation onLayoutRootView={onLayoutRootView} />
        </Provider>
    );
}
