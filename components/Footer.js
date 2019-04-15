import Link from 'next/link'
   
const Footer = () => (
    <footer>
      <p>© ProgrammingSoup 2019</p>
      <Link href="/sitemap"><a>sitemap</a></Link>
    <style jsx>{`
        footer {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          justify-content: center;
          background: #273747;
        }

        p {
          color: white;
          margin-bottom: 0;
        }

        a {
          width: 100%;
          color: white;
          text-align: center;
        }
      `}</style>
      </footer>
    
)

export default Footer
