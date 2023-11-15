import React from "react";

const Thanks = (props) => {
  const { fromName, fromEmail, toEmail, title } = props;

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const dateCompleted = mm + "/" + dd + "/" + yyyy;

  const icMailRegex = /@ithaca.edu/;

  if (fromEmail.match(icMailRegex) || toEmail.match(icMailRegex)) {
    return (
      <div className="thanks">
        <h1>Thanks for playing!</h1>
        <p>
          We’ve sent emails to you ({fromName}, {fromEmail}) and your instructor
          ({toEmail}) confirming that you have completed the {title} tutorial on{" "}
          {dateCompleted}. (But feel free to take a screen shot if you want
          extra proof.)
        </p>
        <p>
          For news and information about{" "}
          <a href="//library.ithaca.edu">Ithaca College Library</a>, follow us
          on social media!
        </p>
        <ul className="social-media">
          <li>
            <a
              href="//facebook.com/iclibrary"
              aria-hidden="true"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="svg-icon-facebook"
                width="40"
                height="40"
                viewBox="0 0 32 32"
                fill="#fff"
              >
                <path d="M17.996 32h-5.996v-16h-4v-5.514l4-0.002-0.007-3.248c0-4.498 1.22-7.236 6.519-7.236h4.412v5.515h-2.757c-2.064 0-2.163 0.771-2.163 2.209l-0.008 2.76h4.959l-0.584 5.514-4.37 0.002-0.004 16z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </a>
          </li>
          <li>
            <a
              href="//instagram.com/ithacalibrary/"
              aria-hidden="true"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="svg-icon-instagram"
                width="40"
                height="40"
                viewBox="0 0 32 32"
                fill="#fff"
              >
                <path d="M26.688 0h-21.375c-2.922 0-5.313 2.391-5.313 5.313v21.375c0 2.922 2.391 5.313 5.313 5.313h21.375c2.922 0 5.313-2.391 5.313-5.313v-21.375c0-2.922-2.391-5.313-5.313-5.313zM10.244 14h11.513c0.218 0.627 0.337 1.3 0.337 2 0 3.36-2.734 6.094-6.094 6.094s-6.094-2.734-6.094-6.094c0-0.7 0.119-1.373 0.338-2zM28 14.002v11.998c0 1.1-0.9 2-2 2h-20c-1.1 0-2-0.9-2-2v-12h3.128c-0.145 0.644-0.222 1.313-0.222 2 0 5.014 4.079 9.094 9.094 9.094s9.094-4.079 9.094-9.094c0-0.687-0.077-1.356-0.222-2l3.128 0.002zM28 7c0 0.55-0.45 1-1 1h-2c-0.55 0-1-0.45-1-1v-2c0-0.55 0.45-1 1-1h2c0.55 0 1 0.45 1 1v2z" />
              </svg>
              <span className="sr-only">Instagram</span>
            </a>
          </li>
          <li>
            <a
              href="//www.youtube.com/user/ithacalibrary"
              aria-hidden="true"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="svg-icon-youtube"
                width="40"
                height="40"
                viewBox="0 0 32 32"
                fill="#fff"
              >
                <path d="M26 4H6c-3.3 0-6 2.7-6 6v12c0 3.3 2.7 6 6 6h20c3.3 0 6-2.7 6-6V10c0-3.3-2.7-6-6-6zM12 24V8l10 8-10 8z"></path>
              </svg>
              <span className="sr-only">YouTube</span>
            </a>
          </li>
        </ul>
        <button onClick={(e) => props.resetForm()} className="reset">
          Return to form
        </button>
      </div>
    );
  } else {
    return (
      <div className="thanks">
        <h1>Thanks for playing!</h1>
        <p>
          We weren’t able to sent emails to you or your instructor, but you can
          screenshot this page to show that {fromName} ({fromEmail}) completed
          the {title} tutorial on {dateCompleted}.
        </p>
        <p>
          For news and information about{" "}
          <a href="//library.ithaca.edu">Ithaca College Library</a>, follow us
          on social media!
        </p>
        <ul className="social-media">
          <li>
            <a
              href="//facebook.com/iclibrary"
              aria-hidden="true"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="svg-icon-facebook"
                width="40"
                height="40"
                viewBox="0 0 32 32"
                fill="#fff"
              >
                <path d="M17.996 32h-5.996v-16h-4v-5.514l4-0.002-0.007-3.248c0-4.498 1.22-7.236 6.519-7.236h4.412v5.515h-2.757c-2.064 0-2.163 0.771-2.163 2.209l-0.008 2.76h4.959l-0.584 5.514-4.37 0.002-0.004 16z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </a>
          </li>
          <li>
            <a
              href="//twitter.com/ithacalibrary"
              aria-hidden="true"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="svg-icon-twitter"
                width="40"
                height="40"
                viewBox="0 0 32 32"
                fill="#fff"
              >
                <path d="M32 6.076c-1.177 0.522-2.443 0.875-3.771 1.034 1.355-0.813 2.396-2.099 2.887-3.632-1.269 0.752-2.674 1.299-4.169 1.593-1.198-1.276-2.904-2.073-4.792-2.073-3.626 0-6.565 2.939-6.565 6.565 0 0.515 0.058 1.016 0.17 1.496-5.456-0.274-10.294-2.888-13.532-6.86-0.565 0.97-0.889 2.097-0.889 3.301 0 2.278 1.159 4.287 2.921 5.465-1.076-0.034-2.088-0.329-2.974-0.821-0.001 0.027-0.001 0.055-0.001 0.083 0 3.181 2.263 5.834 5.266 6.437-0.551 0.15-1.131 0.23-1.73 0.23-0.423 0-0.834-0.041-1.235-0.118 0.835 2.608 3.26 4.506 6.133 4.559-2.247 1.761-5.078 2.81-8.154 2.81-0.53 0-1.052-0.031-1.566-0.092 2.905 1.863 6.356 2.95 10.064 2.95 12.076 0 18.679-10.004 18.679-18.68 0-0.285-0.006-0.568-0.019-0.849 1.283-0.926 2.396-2.082 3.276-3.398z"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </a>
          </li>
          <li>
            <a
              href="//instagram.com/ithacalibrary/"
              aria-hidden="true"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="svg-icon-instagram"
                width="40"
                height="40"
                viewBox="0 0 32 32"
                fill="#fff"
              >
                <path d="M26.688 0h-21.375c-2.922 0-5.313 2.391-5.313 5.313v21.375c0 2.922 2.391 5.313 5.313 5.313h21.375c2.922 0 5.313-2.391 5.313-5.313v-21.375c0-2.922-2.391-5.313-5.313-5.313zM10.244 14h11.513c0.218 0.627 0.337 1.3 0.337 2 0 3.36-2.734 6.094-6.094 6.094s-6.094-2.734-6.094-6.094c0-0.7 0.119-1.373 0.338-2zM28 14.002v11.998c0 1.1-0.9 2-2 2h-20c-1.1 0-2-0.9-2-2v-12h3.128c-0.145 0.644-0.222 1.313-0.222 2 0 5.014 4.079 9.094 9.094 9.094s9.094-4.079 9.094-9.094c0-0.687-0.077-1.356-0.222-2l3.128 0.002zM28 7c0 0.55-0.45 1-1 1h-2c-0.55 0-1-0.45-1-1v-2c0-0.55 0.45-1 1-1h2c0.55 0 1 0.45 1 1v2z" />
              </svg>
              <span className="sr-only">Instagram</span>
            </a>
          </li>
          <li>
            <a
              href="//www.youtube.com/user/ithacalibrary"
              aria-hidden="true"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="svg-icon-youtube"
                width="40"
                height="40"
                viewBox="0 0 32 32"
                fill="#fff"
              >
                <path d="M26 4H6c-3.3 0-6 2.7-6 6v12c0 3.3 2.7 6 6 6h20c3.3 0 6-2.7 6-6V10c0-3.3-2.7-6-6-6zM12 24V8l10 8-10 8z"></path>
              </svg>
              <span className="sr-only">YouTube</span>
            </a>
          </li>
        </ul>
        <button onClick={(e) => props.resetForm()} className="reset">
          Return to form
        </button>
      </div>
    );
  }
};

export default Thanks;
