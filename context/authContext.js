import { createContext, useEffect, useState } from "react";
import netlifyIdentity from 'netlify-identity-widget'

export const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    authReady: false
})


const AuthContextProvider = (props) => {

    const [user, setUser] = useState(null)

    useEffect(() =>
    {
        netlifyIdentity.on('login', (user) => 
        {
            setUser(user)
            netlifyIdentity.close()
            console.log('Login event');
        })
        netlifyIdentity.on('logout', () =>
        {
            setUser(null)
            console.log('Logout event');
        })
        
        // Init Netlify Identity Connection
        netlifyIdentity.init()

        return () =>
        {
            netlifyIdentity.off('login')
            netlifyIdentity.off('logout')
        }
    }, [])

    const login = () =>
    {
        netlifyIdentity.open()
    }

    const logout = () =>
    {
        netlifyIdentity.logout()
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            { props.children }
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;


