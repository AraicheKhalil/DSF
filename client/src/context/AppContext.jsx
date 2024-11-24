import React, { createContext, useState } from 'react';
const AppContext = createContext();

const AppProvider = ({ children }) => { 
  const [open, setOpen] = useState(true);
  const [documentType , setDocumentType]  = useState("process-document")
  const [fileContext , setfileContext]  = useState(null)
  const [auth, setAuth] = useState({
    token: localStorage.getItem('jwt') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
  });
  
  const login = (token,user) => {
    localStorage.setItem('jwt', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({ token, user });
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isAuthenticated = !!auth.token;

  console.log(isAuthenticated)
  console.log(auth)

  
  return (
    <AppContext.Provider
      value={{
        open,
        setOpen,
        login,
        isAuthenticated,
        logout,
        auth,
        documentType,
        setDocumentType,
        fileContext,
        setfileContext
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
export default AppProvider;

// import React, { createContext, useState , useR} from 'react';
// const AppContext = createContext();
// import jwt_decode from 'jwt-decode';


// const AppProvider = ({ children }) => { 
//   const [open, setOpen] = useState(true);
//   const [documentType , setDocumentType]  = useState("process-document")
//   const [fileContext , setfileContext]  = useState(null)
//   const [auth, setAuth] = useState({
//     token: localStorage.getItem('jwt') || null,
//     user: JSON.parse(localStorage.getItem('user')) || null,
//   });

//   const isTokenExpired = (token) => {
//     if (!token) return true;
//     const decoded = jwt_decode(token);
//     const now = Date.now() / 1000;
//     return decoded.exp < now;
//   };
  
//   const login = (token,user) => {
//     localStorage.setItem('jwt', token);
//     localStorage.setItem('user', JSON.stringify(user));
//     setAuth({ token, user });
//   };

//   const logout = () => {
//     localStorage.removeItem('jwt');
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   const isAuthenticated = !!auth.token;

//   console.log(isAuthenticated)
//   console.log(auth)

//     // useEffect to check token expiration on app load
//     useEffect(() => {
//       const token = auth.token;
//       if (isTokenExpired(token)) {
//         console.log(isTokenExpired(token))
//         logout();
//       }
//     }, [auth.token]);
  
//     // Automatically logout when token expires (if using intervals)
//     useEffect(() => {
//       if (!auth.token) return;
  
//       const interval = setInterval(() => {
//         if (isTokenExpired(auth.token)) {
//           logout();
//         }
//       }, 60000); // Check every 60 seconds
  
//       return () => clearInterval(interval);
//     }, [auth.token]);

  
//   return (
//     <AppContext.Provider
//       value={{
//         open,
//         setOpen,
//         login,
//         isAuthenticated,
//         logout,
//         auth,
//         documentType,
//         setDocumentType,
//         fileContext,
//         setfileContext
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export { AppContext };
// export default AppProvider;
