import { useState, useEffect, useRef } from "react";
import "./ContactPage.css";

const ContactPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        if (window.scrollY > 50) {
          navbarRef.current.style.background = "rgba(26, 26, 26, 0.95)";
          navbarRef.current.style.padding = "15px 8%";
        } else {
          navbarRef.current.style.background = "rgba(255, 255, 255, 0.05)";
          navbarRef.current.style.padding = "20px 8%";
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/v1/email/inquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Inquiry sent successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSmoothScroll = (e, targetId) => {
    if (targetId.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="contact-page-container">
      {/* Navbar */}
      <header className="navbar" ref={navbarRef}>
        <div className="logo">
          <img src="./image/logo.png" alt="Riverside Logo" />
        </div>

        <div className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={menuOpen ? "active" : ""} id="nav-menu">
          <ul>
            <li className="dropdown">
              <a href="./index.html">Home</a>
            </li>
            <li className="dropdown">
              <a
                href="#accommodations"
                onClick={(e) => handleSmoothScroll(e, "#accommodations")}
              >
                Accommodations▾
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a href="./studio-suite.html">
                    The Standard and Executive Suite
                  </a>
                </li>
                <li>
                  <a href="./the-cabins.html">
                    The Standalone Cabin and Semi-Detached Suite
                  </a>
                </li>
                <li>
                  <a href="./the-two-level-split-condo.html">
                    The Two-Level Split Condo
                  </a>
                </li>
                <li>
                  <a href="./the-riverhouse.html">The Riverhouse</a>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#">RV Sites/ Camping▾</a>
              <ul className="dropdown-menu">
                <li>
                  <a href="./rv-sites.html">RV sites</a>
                </li>
                <li>
                  <a href="./camp-sites-map.html">RV Sites Map</a>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a
                href="#promotions"
                onClick={(e) => handleSmoothScroll(e, "#promotions")}
              >
                The Resort▾
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a href="./amenities.html">Amenities</a>
                </li>
                <li>
                  <a href="./whats-happen.html">What’s happening</a>
                </li>
                <li>
                  <a href="./rr-convenience-store.html">
                    R&R Convenience Store
                  </a>
                </li>
                <li>
                  <a href="./resort-procedures.html">Resort Procedures</a>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="./extended-stay.html">Extended Stay</a>
            </li>
          </ul>
        </nav>

        <a href="./contact-us.html" className="cta-btn-nav">
          Book Direct
        </a>
      </header>

      {/* Hero Section */}
      <section className="cabin-header-container">
        <div className="text-overlay">
          <div> The Standard</div>
          <div>and</div>
          <div>Executive Suite</div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="classy-section">
        <div className="classy-container">
          <div className="info-sidebar">
            <h2>Contact Us.</h2>
            <p>
              For reservations please call 250-752-9544 or 1-877-450-2211 or
              email mail@myriversideresort.com or fill out the form below.
              Please ensure we have your phone number and email for any digital
              communications.
            </p>
            <p>
              Our opening hours for phone reservations or inquiries are:
              <br />
              September 5th – June 15: 8AM – 9PM Weekdays, 9AM – 9PM Weekends
              <br />
              June 16 – September 4th: 8AM – 10PM
            </p>
            <p>
              Toll free: 1-877-450-2211
              <br />
              Tel: 250-752-9544
            </p>

            <div className="contact-method">
              <i className="fa-solid fa-location-dot"></i>
              <div>
                <strong>Location</strong>
                <br />
                Qualicum Beach, BC V9K 2H4
              </div>
            </div>

            <div className="contact-method">
              <i className="fa-solid fa-phone"></i>
              <div>
                <strong>Phone</strong>
                <br />
                +1 877 450 2211
              </div>
            </div>

            <div className="contact-method">
              <i className="fa-solid fa-envelope"></i>
              <div>
                <strong>Email</strong>
                <br />
                mail@myriversideresort.com
              </div>
            </div>
          </div>

          <div className="form-main">
            <div className="form-header">
              <h3>Send a Message</h3>
              <div className="underline"></div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-row">
                <div className="field-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 (000) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-group">
                <label>How can we help?</label>
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Tell us about your plans..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-wrapper">
        <div className="map-header">
          <p className="address-text">Visit Our Location</p>
          <h2>Find Your Way to Riverside</h2>
        </div>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2605.511874288414!2d-124.4172426233!3d49.34241697140224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5488eb7422f676e1%3A0x60098f98f6d7240a!2sRiverside%20Resort%20%26%20RV%20Park!5e0!3m2!1sen!2sca!4v1710000000000!5m2!1sen!2sca"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "450px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Riverside Resort Location"
          />
        </div>
      </section>

      {/* News Section */}
      <section className="resort-news-section">
        <div className="news-container">
          <h2 className="news-main-title">What's happening</h2>

          <div className="news-grid">
            <div className="news-card">
              <div className="news-image-wrapper">
                <img src="./assets/img/i56.jpg" alt="Vacation Tips" />
                <div className="news-overlay">
                  <div className="news-content">
                    <p>
                      Family trips can be full of smiles and happy memories.
                      Many people think travel must cost a lot of money. That is
                      not always true. A budget-friendly vacation can ...
                    </p>
                  </div>
                </div>
              </div>
              <h3 className="news-card-title">
                Budget-Friendly Family Vacation Tips
              </h3>
            </div>

            <div className="news-card">
              <div className="news-image-wrapper">
                <img src="./assets/img/i57.jpg" alt="Destination Guide" />
                <div className="news-overlay">
                  <div className="news-content">
                    <p>
                      Selecting a place for a trip is an exciting task. The
                      world is full of interesting spots, from quiet forests to
                      busy beaches. Making the right choice helps ensure ...
                    </p>
                  </div>
                </div>
              </div>
              <h3 className="news-card-title">
                How to Choose the Perfect Vacation Destination
              </h3>
            </div>

            <div className="news-card">
              <div className="news-image-wrapper">
                <img src="./assets/img/i58.jpg" alt="Weekend Getaway" />
                <div className="news-overlay">
                  <div className="news-content">
                    <p>
                      Life can feel busy and fast. Work, school, and daily tasks
                      can fill the whole week. A short trip can bring calm and
                      joy. Many people look for a ...
                    </p>
                  </div>
                </div>
              </div>
              <h3 className="news-card-title">
                How to Plan a Relaxing Weekend Getaway
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="custom-footer">
        <div className="footer-wrapper">
          <div className="footer-col">
            <h3>Connect With Us</h3>
            <div className="contact-info">
              <p>
                <i className="fas fa-phone"></i> +1 877-450-2211
                <br />
                <i className="fas fa-phone"></i>+1 250-752-9544
              </p>
              <p>
                <i className="fas fa-map-marker-alt"></i> 3506 West Island
                Highway
                <br />
                Qualicum Beach, BC, V9K 2H4
              </p>
            </div>
            <div className="footer-btns">
              <a
                href="./camp-sites-map.html"
                className="f-btn btn-gold"
                style={{ padding: "20px 0px" }}
              >
                GET DIRECTIONS
              </a>
              <a
                href="./contact-us.html"
                className="f-btn btn-blue"
                style={{ padding: "20px 0px" }}
              >
                BOOK NOW
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#">COVID-19 & Resort Procedures</a>
              </li>
              <li>
                <a href="./contact-us.html">Contact Us</a>
              </li>
            </ul>
            <h3 style={{ marginTop: "30px" }}>The Resort</h3>
            <ul>
              <li>
                <a href="./amenities.html">Amenities</a>
              </li>
              <li>
                <a href="#">What's Happening</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Accommodations</h3>
            <ul>
              <li>
                <a href="./studio-suite.html">The Studios</a>
              </li>
              <li>
                <a href="./the-cabins.html">The Cabins</a>
              </li>
              <li>
                <a href="#">The Townhouse</a>
              </li>
            </ul>
            <h3 style={{ marginTop: "30px" }}>RV / Camping</h3>
            <ul>
              <li>
                <a href="./rv-sites.html">The Camp Sites</a>
              </li>
              <li>
                <a href="./camp-sites-map.html">Camp Sites Map</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://www.facebook.com/riversideresort3506/">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://x.com/bcmyriverside"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p style={{ color: "white" }}>
            &copy; Copyright 2026 Riverside Resort | All Rights Reserved
          </p>
          <p style={{ color: "white" }}>
            Site Maintained By:{" "}
            <a
              style={{ textDecoration: "none", color: "white" }}
              href="https://premiumbusinesswebsites.com/"
            >
              PremiumBusinessWebsites
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
