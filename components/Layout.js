import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'




const Layout = (props) => (
  <div className="wrap-all">
    
    
    <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
    </Head>
   
    <Header/>

    <div className="wrap-content">
      {props.children}
    </div>

    <Footer/>
 

    <style jsx global>{`
        html, body {
          padding: 0;
          margin: 0;
          background: #F9F9F9;
          background-size: 50% 50%;
          background-attachment: fixed;
          background-repeat: no-repeat;*/
        }

        .wrap-all, .wrap-content {
          width: 100%;
          margin: auto;
        }


        /** androids Desktops and laptops ----------- */
         @media only screen and (min-width : 701px) {
          .wrap-all {
            width: 90%;
          }

           .wrap-content {
             width: 100%;
           }
         }

         /* Large screens ----------- */
         @media only screen  and (min-width : 1424px) {
          .wrap-all {
            width: 70%;
          }

           .wrap-content {
             width: 90%;
           }
         }

         /* Large screens ----------- */
         @media only screen  and (min-width : 1824px) {

          .wrap-all {
            width: 60%;
          }
           .wrap-content {
             width: 100%;
           }
         }

       


        h1, h2, h3 {
          font-weight: 500;
          color: black;
          margin: 24px auto;
          letter-spacing: 2px;
          width: 100%;
        }

        h1 {
          font-size: 2.25em;
        }

        h2, h3 {
          text-align: left;
        }

        b {
          font-weight:bold;
          color: #e2534f;
        }

        p, a, li {
          font-weight: 300;
          letter-spacing: 1.4px;
          line-height: 1.78em;
          color: black;
          text-align: left;
        }

        a {
          color: #4c7af1;
        }

        li {
          margin-bottom: 1%;
        }
        p {
          margin-top: 24px;
          margin-bottom: 24px;
        }

        


        

      `}</style>





      </div>
)

export default Layout
