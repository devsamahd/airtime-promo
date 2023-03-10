const Scroll = () => {
  return (
    <>
    <div className="theone">

    <div className="m-scroll">
        
        <div className="m-scroll__title">
            <div>
            <h1>
                <img src="mplogo.svg" alt="ok" height="60px"  /> &nbsp;
            </h1>
            <h1>
                <img src="mplogo.svg" alt="ok" height="60px"  /> &nbsp;
            </h1>
            <h1>
                <img src="mplogo.svg" alt="ok" height="60px"  />&nbsp;
            </h1>
            <h1>
                <img src="mplogo.svg" alt="ok" height="60px"  />&nbsp;
            </h1>
            <h1>
                <img src="mplogo.svg" alt="ok" height="60px"  />&nbsp;
            </h1>
            <h1>
                <img src="mplogo.svg" alt="ok" height="60px"  /> &nbsp;
            </h1>
            <h1>
                <img src="mplogo.svg" alt="ok" height="60px"  /> &nbsp;
            </h1>
            </div>
            
        </div>
    </div>
    </div>
        <style jsx>
            {`
            .m-scroll::before, .m-scroll::after {
                background: linear-gradient(90deg, #FFF7EB   29.04%, rgba(255, 255, 255, 0) 94.26%);
                content: "";
                height: 100%;
                position: absolute;
                width: 10%;
                z-index: 2;
                }
            `}
        </style>

    </>
  )
}

export default Scroll