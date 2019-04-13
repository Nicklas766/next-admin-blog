import Link from 'next/link'

const Header = () => (

<div>
    <Link href={"/"}>
      <a>
        <span>example.com</span>
      </a>  
    </Link>
    
    <nav>
        <Link href={"/"}>
            <a>{"home"}</a>
        </Link>

        <Link href={"/about"}>
            <a>{"about"}</a>
        </Link>
        
        <Link href={"/admin"}>
            <a>{"admin"}</a>
        </Link>
     </nav>

    <style jsx>{`
          div {
            display: flex;
            flex-wrap: wrap;
            text-align: center;
            background: #1F262E;
          }

          nav {
            width: 100%;
            border-top: 1px solid white;
            border-bottom: 1px solid white;
          }

          a {     
            text-decoration:none;
            width: 100%;
          }

          nav a {
            width: 50px;
            margin: 15px;
            color: white;
          }
          a:hover {
            opacity: 0.6;
          }

          span {
            font-family: Lato,sans-serif;
            color: #c60000;
            text-align: center;
            width: 100%;
            font-size: 2.5em;
            letter-spacing: 1.5px;
     
            display: block;
            margin-bottom: 24px;
            margin-top: 24px;
          }

          

        `}</style>
</div>
)

export default Header
