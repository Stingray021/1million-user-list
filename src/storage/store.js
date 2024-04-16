import {createStore} from "redux";
import {userReducer} from "./userReducer";

const storage = createStore(userReducer)