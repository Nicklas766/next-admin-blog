const ContentWrapper = (props) => (
  <div className="content-wrapper">
      <div className="text-wrapper">
          {props.children}
      </div>
      <style jsx>{`

      .content-wrapper {
          width: 90%;
          margin-left: auto;
          margin-right: auto;
          margin-top: 5%;
          min-height: 300px;
          border-radius: 2em;
      }

      .text-wrapper {
          text-align: center;
          width: 90%;
          height: 100%;
          margin: 0 auto;
          padding: 10px;
      }

  `}</style>
  </div>




)

export default ContentWrapper
