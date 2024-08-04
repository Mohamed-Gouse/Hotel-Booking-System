import React from "react";

function Faq() {
  return (
    <div className="col-md-6">
      <div className="faq-card p-4 mb-4 bg-white shadow rounded">
        <h5>FAQ's</h5>
        <div id="faqAccordion">
          <div className="card">
            <div className="card-header" id="headingOne">
              <h5 className="mb-0">
                <button
                  className="btn btn-link"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  (1) Question number 1?
                </button>
              </h5>
            </div>
            <div
              id="collapseOne"
              className="collapse show"
              aria-labelledby="headingOne"
              data-parent="#faqAccordion"
            >
              <div className="card-body">Answer to question number 1.</div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingTwo">
              <h5 className="mb-0">
                <button
                  className="btn btn-link collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  (2) Question number 2?
                </button>
              </h5>
            </div>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#faqAccordion"
            >
              <div className="card-body">Answer to question number 2.</div>
            </div>
          </div>
        </div>
        <button type="button" className="btn btn-primary btn-block mt-2">
          Show More
        </button>
      </div>
    </div>
  );
}

export default Faq;
