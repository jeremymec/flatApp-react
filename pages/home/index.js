import React, { Component } from "react";
import {HomePage} from "./home.js";

import { createDrawerNavigator } from "react-navigation-drawer";
import SideBar from "../../components/sidebar";

const HomeScreenRouter = createDrawerNavigator(
    {
        Home: { screen: HomePage },
    },
    {
        contentComponent: props => <SideBar {...props} />
    }
);
export default HomeScreenRouter;
