import React from "react"

export const AuthContext = React.createContext({
    isSignedIn: false,
    setIsSignedIn: () => {},
    // user: null,
    // setUser: () => {}
})