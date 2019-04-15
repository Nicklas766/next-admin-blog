import Link from 'next/link'

const Header = () => (

<div>
    <Link href={"/"}>
      <a>
        <span>ProgrammingSoup</span>
        <p>A soup of coding articles</p>
      </a>  
    </Link>
    
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
            text-align: center;
            background: #273747;
            border-bottom-left-radius: 0.1em;
            border-bottom-right-radius: 0.1em;
          }

          nav {
            width: 100%;
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


          span {
            font-family: 'Montserrat',sans-serif;
            color: white;
            text-align: center;
            width: 100%;
            font-size: 2em;
            letter-spacing: 1.5px;
     
            display: block;
            margin-bottom: 5px;
            margin-top: 24px;
          }

          p {
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
