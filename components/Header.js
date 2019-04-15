import Link from 'next/link'

const Header = () => (

<div>
    
    <div className="logo-text">
    <Link href={"/"}>
      <a>
        <span className="site-name">ProgrammingSoup</span>
        <span className="site-slogan">A soup of coding articles</span>
      </a>  
      </Link>
      </div>
   
    
    <nav>
        
        <Link href={"/"}>
            <a>{"Articles"}</a>
        </Link>

        <Link href={"/about"}>
            <a>{"About"}</a>
        </Link>
     </nav>

    <style jsx>{`
          div {
            display: flex;
            flex-wrap: wrap;
            background: #273747;
            border-bottom-left-radius: 0.1em;
            border-bottom-right-radius: 0.1em;
          }

          nav {
            width: 100%;
            text-align: center;
          }

          nav a {
            width: 50px;
            margin: 15px;
            color: white;
            text-decoration: none;
          }

          nav a:hover {
            transition: 0.5s;
            color: #6DBCDB;
            text-decoration: underline;
          }

          .logo-text {
            text-align: center;
            width: 100%;
            margin-bottom: 12px;
          }
          .logo-text a {
            margin: auto;
            text-align: center;
          }
          .logo-text a:hover {
            transition: 0.5s;
            opacity:0.8;
          }
          .logo-text .site-name {
            font-family: 'Montserrat',sans-serif;
            color: white;
            font-size: 2em;
            width: 100%;
            
            letter-spacing: 1.5px;
     
            display: block;
            margin-bottom: 5px;
            margin-top: 24px;
          }

          .logo-text .site-slogan {
            font-size: 0.9em;
            margin-top: 0;
            font-weight: bold;
            color: #9DA1B3;
            text-align: center;
            
          }


          

        `}</style>
</div>
)

export default Header
