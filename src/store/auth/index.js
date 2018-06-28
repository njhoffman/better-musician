import authentication from "./authenticate";
// import configure from "./configure";
// import user from "./user";
// import ui from "./ui";
// import emailSignIn from "./emailSignIn";
import emailSignUp from "./emailSignUp";
import oAuthSignIn from "./oAuthSignIn";
import requestPasswordReset from "./requestPasswordReset";
import updatePassword from "./updatePassword";
import updatePasswordModal from "./updatePasswordModal";
import server from "./server";
import signOut from "./signOut";
import destroyAccount from "./destroyAccount";
import {combineReducers} from "redux-immutablejs";

/* reducers */
export const authStateReducer = combineReducers({
  // configure,
  // emailSignIn,
  emailSignUp,
  signOut,
  authentication,
  requestPasswordReset,
  oAuthSignIn,
  updatePassword,
  updatePasswordModal,
  destroyAccount,
  server,
  // ui,
  // user
});

