const Spinner = () => {
    return (
        <div id="layoutAuthentication">
            <main id="layoutAuthentication_content">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="mt-5">
                                <button className="btn btn-primary" style={{ width: '340px', margin: 'auto', display: 'block' }}>
                                    <span className="spinner-border spinner-border-lg"></span> Loading..
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Spinner;