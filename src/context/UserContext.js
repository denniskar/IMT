import React from "react";
import AuthService from "../services/auth.service";
import { toast } from "react-toastify";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    const data = AuthService.login(login, password)
      .then((response) => {
        if (response.data.headerValue) {
          localStorage.setItem("user", JSON.stringify(response.data));
          setError(null);
          setIsLoading(false);
          dispatch({ type: "LOGIN_SUCCESS" });

          history.push("/app/dashboard");
        }
        // return response.data;
      })
      .catch((error) => {
        console.log(error.response);
        dispatch({ type: "LOGIN_FAILURE" });
        setError(true);
        setIsLoading(false);
        if(error.response.status == 403)
        {
          if (error.response.data.status === 1) {          
            toast.error("Invalid login credentials", {
              position: toast.POSITION.TOP_CENTER,
            });
          }else{
            toast.error(error.response.data.message, {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        }else{
          toast.error("Error occured contact admin", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
    
      });
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("user");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
