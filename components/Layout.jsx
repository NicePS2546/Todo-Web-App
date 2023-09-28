import Navbar from "./Navbar";


export default function Layout({ children }) {
  return (
      <main>
        <Navbar/>
        <div className="main-children">{children}</div>
        </main>
  )
    
}
