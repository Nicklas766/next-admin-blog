import Link from 'next/link'

const Header = () => (

<div>
    <Link href={"/"}>
      <a>
        <span>OutdoorCamping.com</span>
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
          }

          nav {
            width: 100%;
            border-top: 1px solid black;
            border-bottom: 1px solid black;
          }

          a {     
            text-decoration:none;
            width: 100%;
          }

          nav a {
            width: 50px;
            margin: 15px;
            color: #4c7af1;
          }
          a:hover {
            opacity: 0.6;
          }

          span {
            color: #15c39a;
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
