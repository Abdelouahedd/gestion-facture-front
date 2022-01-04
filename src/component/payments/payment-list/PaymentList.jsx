import React from 'react';

function PaymentList() {
  return (
    <div id="layoutSidenav_content">
      <main>
        <header className="page-header page-header-dark bg-gray-500">
          <div className="container">
            <div className="page-header-content pt-4">
              <div className="row align-items-center justify-content-between">
                <div className="col-auto mt-4">
                  <h1 className="page-header-title">
                    <div className="page-header-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                           viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                           strokeLinecap="round" strokeLinejoin="round"
                           className="feather feather-life-buoy">
                        <circle cx="12" cy="12" r="10"/>
                        <circle cx="12" cy="12" r="4"/>
                        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/>
                        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/>
                        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/>
                        <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"/>
                        <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/>
                      </svg>
                    </div>
                    List des payments
                  </h1>
                  <div className="page-header-subtitle">Vous pouvez chercher ..
                    ..
                  </div>
                </div>
                <div className="col-auto mt-4">

                  <button className="btn btn-block btn-dark">
                    <i className="fas fa-cash-register px-2" aria-hidden="true"/>
                    Ajouter nouveau payment
                  </button>
                </div>
              </div>
              <div className="page-header-search mt-4">
                <div className="input-group input-group-joined">
                  <input className="form-control"
                         type="text"
                         placeholder="chercher..."
                         aria-label="Search"
                         autoFocus=""
                  />
                  <div className="input-group-append">
                                        <span className="input-group-text"><svg xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24"
                                                                                viewBox="0 0 24 24" fill="none"
                                                                                stroke="currentColor" strokeWidth="2"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                className="feather feather-search"><circle
                                          cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65"
                                                                       y2="16.65"/></svg></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container mt-5">
          <div className="row">
            <div className="col-xxl-12 col-xl-12">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="datatable">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PaymentList;
