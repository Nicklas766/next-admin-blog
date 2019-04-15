import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'




const Layout = (props) => (
  <div className="wrap-all">
    
    
    <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <link href="https://fonts.googleapis.com/css?family=Cabin|Lora" rel="stylesheet" /> 
        <link href="https://fonts.googleapis.com/css?family=Montserrat:700|Open+Sans" rel="stylesheet"/> 
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

       pre {
        background: #272822;
        color: #f8f8f2;
        border-radius: 0.3em;
        padding: 20px;
        white-space: pre-wrap;
        overflow: auto;
        font-family: 'Open Sans', helvetica, sans-serif;
        text-align: left;
       }
       p code {
          background: rgba(0,0,0,.05);
          padding: 3px 4px;
          margin: 0 2px;
       }


        h1, h2, h3 {
          color: #1D1B1B;
          line-height: 1.2em;
          text-align: left;

          margin: 24px auto;
          letter-spacing: 2px;
          width: 100%;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
        }

        h1 {
          font-size: 2.25em;
        }

        b {
          font-weight:bold;
          color: #e2534f;
        }

        p, a, li {
          font-family: 'Lora', serif;
          font-family: 'Open Sans', helvetica, sans-serif;
          font-weight: 400;
          letter-spacing: 1.4px;
          line-height: 1.8em;
          color: #333;
          text-align: left;
        }

       

    

        li {
          margin-bottom: 1%;
        }
        p {
          margin: 0 0 25px 0;
        }

        


        

      `}</style>





      </div>
)

export default Layout
