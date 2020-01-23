import React from 'react';

const ErrorPage = err => {
  return (
    <section>
      <h1>Oops! {err.err}</h1>
      <img
        src="https://www.ionos.com/digitalguide/fileadmin/DigitalGuide/Teaser/404-not-found-t.jpg"
        alt="A giant baby who has just eaten the page"
        width="100%"
      />
    </section>
  );
};

export default ErrorPage;
