import Link from 'next/link'

function getDateFormattedString(dateString) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const date = new Date(dateString);

    return monthNames[date.getMonth()] + " " + date.getUTCDate()
}

const PreArticle = (props) => (
    <article key={props.article._id}>
                       
        <div aria_hidden="true">
            <Link as={`/article/${props.article.slug}`} href={`/article?slug=${props.article.slug}`}>
                    <a>
                        <img src={props.article.img_url} alt={props.article.img_alt} title={props.article.img_title}/>
                    </a>
            </Link>
        </div>

        <div className="text-container">
            <h2>
                <Link as={`/article/${props.article.slug}`} href={`/article?slug=${props.article.slug}`}>
                    <a>{props.article.name}</a>
                </Link>
            </h2>
                        
            <span>{getDateFormattedString(props.article.date)}</span>
                            

            <p>{props.article.introduction}</p>
        </div>

        <style jsx>{`
                    .wrapper {
                        display: flex;
                        flex-wrap: wrap;
                        width: 100%;
                    }

                    .text-container {
                        display: flex;
                        flex-wrap: wrap;
                        padding: 10px;
                    }

                    .text-container h2 {
                        margin-top: 0;
                        margin-bottom: 0;
                        
                    }

                    span {
                        width: 100%;
                        font-size: 0.8em;
                        text-align: left;
                        font-family: 'Open Sans',helvetica,sans-serif;
                        color: #9DA1B3;
                    }

                    article {
                        box-shadow: 0 0 11px 2px #dfdfdf;
                        background: #fff;
                        margin-bottom: 30px;
                        border-radius: 0.3em;
                        width: 48%;
                        margin-left: 1%;
                        margin-right: 1%;
                        border-bottom: 1px solid silver;
                        
                    }

                    article a {
                        font-family: 'Montserrat',sans-serif;
                        font-weight: bold;
                        color: #1D1B1B;
                        line-height: 1.2em;
                        text-decoration: none;
                    }
                    h2 a:hover {
                        transition: 0.5s;
                        color: #6DBCDB;
                        text-decoration: underline;
                      }

                      article p {
                          margin-top: 12px;
                      }


                    /* Large screens ----------- */
                    @media only screen  and (max-width : 1100px) {
                        article {
                            width: 98%;
                        }
                    }
                   
                    img {
                        width: 100%;
                    }

                    img:hover {
                        transition: 0.5s;
                        opacity:0.9;
                    }

            `}</style>

    </article> 
)

export default PreArticle
