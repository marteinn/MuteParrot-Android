class NavigatorUtils {
    static jumpToOrPush(newRoute, navigator) {
        let routes = navigator.getCurrentRoutes();
        let currentIndex = -1;

        routes.forEach((route, index) => {
            if (newRoute.name === route.name) {
                currentIndex = index;
            }
        });

        if (currentIndex !== -1) {
            navigator.jumpTo(routes[currentIndex]);
        } else {
            navigator.push(newRoute);
        }
    }
}

export default NavigatorUtils;
