import "./Footer.css";

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-wrap">
        {/* LEFT */}
        <div className="ft-col ft-app">
          <h3 className="ft-title">Get Our App</h3>
          <p className="ft-sub">Download the app and book your property</p>

          <div className="ft-stores">
            {/* Google Play */}
            <a className="ft-store" href="#" aria-label="Google Play">
              <span className="ft-store-ic">
                {/* Play icon */}
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M3.7 2.5a1.2 1.2 0 0 0-.7 1.1v16.8a1.2 1.2 0 0 0 .7 1.1l10.1-9.5L3.7 2.5Zm11 10.2 2.2-2.1-1.8-1.7-2.1 2 1.7 1.8Zm2.8-2.7 3.2-2.9c.6-.5.2-1.5-.6-1.5h-.1l-3.7 2.1 1.2 2.3Zm0 4.7-1.2 2.3 3.7 2.1h.1c.8 0 1.2-1 .6-1.5l-3.2-2.9Z"
                  />
                </svg>
              </span>
              <span className="ft-store-txt">
                <small>Get it on</small>
                <b>Google Play</b>
              </span>
            </a>

            {/* App Store */}
            <a className="ft-store" href="#" aria-label="App Store">
              <span className="ft-store-ic">
                {/* Apple icon */}
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M16.3 2.2c-.9.1-2 .7-2.6 1.5-.6.7-1 1.7-.9 2.7 1 0 2-.6 2.7-1.4.6-.7 1-1.7.8-2.8ZM20.2 17.1c-.6 1.4-1.4 2.7-2.4 3.9-.9 1.1-1.6 1.8-2.8 1.8-1.1 0-1.5-.7-2.9-.7s-1.8.7-3 .7c-1.2 0-2- .8-3-2-1.3-1.6-2.3-4.1-2.3-6.6 0-4 2.6-6.1 5.1-6.1 1.3 0 2.4.8 3.2.8.8 0 2.1-.9 3.6-.9.6 0 2.3.1 3.4 1.7-2.9 1.6-2.4 5.8 1.1 7.4Z"
                  />
                </svg>
              </span>
              <span className="ft-store-txt">
                <small>Get it on</small>
                <b>App Store</b>
              </span>
            </a>
          </div>

          <div className="ft-connect">
            <h4>Connect with us</h4>
            <div className="ft-social">
              <a className="ft-soc" href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    fill="currentColor"
                    d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.3-1.6 1.7-1.6h1.5V4.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2V11H7.6v3h2.5v8h3.4Z"
                  />
                </svg>
              </a>

              <a className="ft-soc" href="#" aria-label="X">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    fill="currentColor"
                    d="M18.7 3H21l-5.8 6.6L22 21h-5.6l-4.4-5.4L7.3 21H5l6.2-7.1L2 3h5.7l4 4.9L18.7 3Zm-1 16.2h1.3L7.2 4.7H5.8l11.9 14.5Z"
                  />
                </svg>
              </a>

              <a className="ft-soc" href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    fill="currentColor"
                    d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm9 2h-9A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4Zm-4.5 3.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6ZM17.8 6.7a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"
                  />
                </svg>
              </a>

              <a className="ft-soc" href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    fill="currentColor"
                    d="M6.9 6.6a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4ZM4.7 21V8.3h4.4V21H4.7Zm7.1 0V8.3h4.2v1.7h.1c.6-1 2-2 4-2 4.3 0 5.1 2.8 5.1 6.4V21h-4.4v-5.7c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21h-4.7Z"
                  />
                </svg>
              </a>

              <a className="ft-soc" href="#" aria-label="Pinterest">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    fill="currentColor"
                    d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.5-6.2s-.4-.9-.4-2.1c0-2 1.2-3.5 2.7-3.5 1.3 0 1.9 1 1.9 2.1 0 1.3-.8 3.2-1.2 5-.4 1.5.8 2.7 2.3 2.7 2.8 0 4.7-3.6 4.7-7.9 0-3.3-2.2-5.8-6.2-5.8-4.5 0-7.3 3.4-7.3 7.2 0 1.3.4 2.2 1 2.9.3.3.3.4.2.8l-.3 1.1c-.1.4-.3.5-.7.3-2-.9-2.9-3.3-2.9-6 0-4.5 3.8-9.8 11.2-9.8 6 0 9.9 4.3 9.9 9 0 6.2-3.5 10.7-8.7 10.7-1.7 0-3.3-.9-3.8-2 0 0-.9 3.5-1.1 4.2-.3.9-.8 1.9-1.2 2.7.9.3 1.8.4 2.8.4A10 10 0 0 0 12 2Z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* PAGES */}
        <div className="ft-col">
          <h3 className="ft-title">
            Pages <span className="ft-bar"></span>
          </h3>
          <ul className="ft-links">
            <li><a href="#">Our Team</a></li>
            <li><a href="#">Pricing Plans</a></li>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Listings</a></li>
          </ul>
        </div>

        {/* COMPANY */}
        <div className="ft-col">
          <h3 className="ft-title">
            Company <span className="ft-bar"></span>
          </h3>
          <ul className="ft-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Affiliate Program</a></li>
            <li><a href="#">Add Your Listing</a></li>
            <li><a href="#">Our Partners</a></li>
          </ul>
        </div>

        {/* DESTINATIONS */}
        <div className="ft-col">
          <h3 className="ft-title">
            Destinations <span className="ft-bar"></span>
          </h3>
          <ul className="ft-links">
            <li><a href="#">Hawai</a></li>
            <li><a href="#">Istanbul</a></li>
            <li><a href="#">San Diego</a></li>
            <li><a href="#">Belgium</a></li>
            <li><a href="#">Newyork</a></li>
            <li><a href="#">Los Angeles</a></li>
          </ul>
        </div>

        {/* USEFUL LINKS */}
        <div className="ft-col">
          <h3 className="ft-title">
            Useful Links <span className="ft-bar"></span>
          </h3>
          <ul className="ft-links">
            <li><a href="#">Legal Notice</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms &amp; Conditions</a></li>
            <li><a href="#">Support</a></li>
            <li><a href="#">Refund Policy</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="ft-bottom">
        <div className="ft-bottom-wrap">
          <p>Copyright © 2026. All Rights Reserved, Dreams Estate</p>
          <p>
            Product of <a className="ft-brand" href="#">Dreams Technologies</a>
          </p>
        </div>
      </div>
    </footer>
  );
}