import { useState, useEffect, useRef } from "react";
import "./HomePage.css";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [guests, setGuests] = useState({ adults: 1, kids: 0 });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navbarRef = useRef(null);
  const dropdownRef = useRef(null);
  const gridRef = useRef(null);
  const isTransitioning = useRef(false);

  // Navbar background change logic
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

  // Close guest dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const updateGuest = (type, change, e) => {
    e.stopPropagation();
    setGuests((prev) => {
      const newVal = prev[type] + change;
      const min = type === "adults" ? 1 : 0;
      if (newVal >= min && newVal <= 10) {
        return { ...prev, [type]: newVal };
      }
      return prev;
    });
  };

  const formatDate = (input) => {
    let v = input.value.replace(/\D/g, "").slice(0, 8);
    if (v.length >= 5) {
      input.value = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
    } else if (v.length >= 3) {
      input.value = `${v.slice(0, 2)}/${v.slice(2)}`;
    } else {
      input.value = v;
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

  const manualScroll = (direction) => {
    if (isTransitioning.current || !gridRef.current) return;
    isTransitioning.current = true;

    const style = window.getComputedStyle(gridRef.current);
    const matrix = new DOMMatrixReadOnly(style.transform);
    let currentLeft = matrix.m41;

    const cardWidth = 340; // fallback width
    const scrollAmount = cardWidth + 20;

    let targetLeft =
      direction === "left"
        ? currentLeft + scrollAmount
        : currentLeft - scrollAmount;

    gridRef.current.style.animation = "none";
    gridRef.current.style.transition = "transform 0.5s ease-out";
    gridRef.current.style.transform = `translateX(${targetLeft}px)`;

    setTimeout(() => {
      if (gridRef.current) {
        gridRef.current.style.transition = "none";
        gridRef.current.style.animation = "scroll 60s linear infinite";
      }
      isTransitioning.current = false;
    }, 600);
  };

  const guestText = `${guests.adults} Adult${guests.adults > 1 ? "s" : ""}, ${guests.kids} Kid${guests.kids > 1 ? "s" : ""}`;

  return (
    <div className="homepage-container">
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
      <section className="hero">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="./image/Untitled design.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-content">{/* <h1>Experience Luxury</h1> */}</div>

        <div className="booking-bar">
          <div className="input-group">
            <label>Arrival</label>
            <input
              type="text"
              placeholder="MM/DD/YYYY"
              maxLength="10"
              onKeyUp={(e) => formatDate(e.target)}
            />
          </div>
          <div className="input-group">
            <label>Departure</label>
            <input
              type="text"
              placeholder="MM/DD/YYYY"
              maxLength="10"
              onKeyUp={(e) => formatDate(e.target)}
            />
          </div>

          <div className="input-group" ref={dropdownRef}>
            <label>Guests</label>
            <div className="guest-select-display" onClick={toggleDropdown}>
              <span>{guestText}</span>
            </div>

            <div className={`guest-dropdown ${dropdownOpen ? "active" : ""}`}>
              <div className="counter-row">
                <span className="counter-label">Adults</span>
                <div className="counter-controls">
                  <button
                    className="cnt-btn"
                    onClick={(e) => updateGuest("adults", -1, e)}
                  >
                    -
                  </button>
                  <span>{guests.adults}</span>
                  <button
                    className="cnt-btn"
                    onClick={(e) => updateGuest("adults", 1, e)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="counter-row">
                <span className="counter-label">Kids</span>
                <div className="counter-controls">
                  <button
                    className="cnt-btn"
                    onClick={(e) => updateGuest("kids", -1, e)}
                  >
                    -
                  </button>
                  <span>{guests.kids}</span>
                  <button
                    className="cnt-btn"
                    onClick={(e) => updateGuest("kids", 1, e)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button className="search-btn">Check Availability</button>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-container">
          <div className="video-side">
            <div className="video-experience-card">
              <div className="video-wrapper">
                <video autoPlay muted loop playsInline className="resort-video">
                  <source src="./image/video2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="video-overlay-accent"></div>
              </div>
              <div className="floating-badge">
                <span className="badge-year">Seasonal</span>
                <span className="badge-number">Resort</span>
              </div>
            </div>
          </div>

          <div className="welcome-text-content">
            <div className="text-header">
              <span className="sub-title">Sanctuary for the Soul</span>
              <h2 className="welcome-heading">
                Where the River <br />
                <span>Meets Luxury</span>
              </h2>
            </div>

            <div className="welcome-description">
              <p className="highlight-text">
                Our seasonal, outdoor pool and waterslide will reopen on{" "}
                <strong>June 15th, 2026</strong>.
              </p>
              <p>
                Riverside Resort offers a unique 7-acre sanctuary. From a
                peaceful, forest-like winter retreat to a bustling summer
                playground in Parksville/Qualicum Beach, we provide the perfect
                balance of nature and comfort.
              </p>
              <p>
                Whether you choose our 50-amp full hook-up sites, stand-alone
                cabins, or 2-story condos, every stay includes fully stocked
                kitchens, cozy fireplaces, and private outdoor seating.
              </p>
            </div>

            <div className="feature-grid">
              <div className="feature-item">
                <i className="gold-dot"></i>
                <p>Private Riverfront Access</p>
              </div>
              <div className="feature-item">
                <i className="gold-dot"></i>
                <p>Eco-Friendly Architecture</p>
              </div>
              <div className="feature-item">
                <i className="gold-dot"></i>
                <p>5-Minute Ocean Walk</p>
              </div>
              <div className="feature-item">
                <i className="gold-dot"></i>
                <p>On-site Convenience & Laundry</p>
              </div>
            </div>

            <div className="welcome-cta">
              <a href="./contact-us.html" className="btn-primary-animated">
                CONTACT US
                <span className="btn-shimmer"></span>
              </a>
              <a href="./rv-sites.html" className="btn-secondary-outline">
                RV Sites
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodations Bento Grid */}
      <section id="accommodations" className="section-container">
        <h2 className="section-title">Accommodations</h2>
        <div className="bento-grid">
          <div
            className="bento-item large"
            style={{ backgroundImage: "url('./image/img10.jpg')" }}
          >
            <div className="overlay">
              <h2>The Standard and Executive Suite</h2>
              <p>
                Our standard and executive suites are the perfect room for
                business-class travellers and for those who plan to be out and
                about for most of their stay. Our studios are nicely appointed
                and priced right for couples and young families on the go.
              </p>
              <a
                href="#amenities"
                className="btnn-secondary-outline"
                onClick={(e) => handleSmoothScroll(e, "#amenities")}
              >
                View More
              </a>
            </div>
          </div>

          <div
            className="bento-item medium"
            style={{ backgroundImage: "url('./image/img6.jpg')" }}
          >
            <div className="overlay">
              <h2>The Standalone Cabin and Semi-Detached Suite</h2>
              <p>
                Our stand-alone cabins and semi-detached suites are fully
                equipped with everything you need for a family getaway or
                long-term stay.
              </p>
              <a
                href="#amenities"
                className="btnn-secondary-outline"
                onClick={(e) => handleSmoothScroll(e, "#amenities")}
              >
                View More
              </a>
            </div>
          </div>

          <div
            className="bento-item small"
            style={{ backgroundImage: "url('./image/img7.jpg')" }}
          >
            <div className="overlay">
              <h2>
                The Two-Level <br /> Split Condo
              </h2>
              <p>All the comforts of home in vacation getaway setting.</p>
              <a
                href="#amenities"
                className="btnn-secondary-outline"
                onClick={(e) => handleSmoothScroll(e, "#amenities")}
              >
                View More
              </a>
            </div>
          </div>

          <div
            className="bento-item small"
            style={{ backgroundImage: "url('./image/img9.jpg')" }}
          >
            <div className="overlay">
              <h2>The Riverhouse</h2>
              <p>ur beautiful Riverhouse along Little Qualicum River.</p>
              <a
                href="#amenities"
                className="btnn-secondary-outline"
                onClick={(e) => handleSmoothScroll(e, "#amenities")}
              >
                View More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RV Cinematic Section */}
      <section className="rv-cinematic-section" id="rv-sites">
        <div className="rv-cinematic-container">
          <div className="rv-flex-row">
            <div className="rv-image-wrapper">
              <img
                src="./image/IMG_5626.jpg"
                className="rv-main-img"
                alt="Premium RV Site"
              />
            </div>
            <div className="rv-text-wrapper">
              <span className="rv-number">ULTIMATE SPACE</span>
              <h3 className="rv-cinematic-h3">RV Sites</h3>
              <p className="rv-cinematic-p">
                "Park your home-away-from-home in the heart of nature without
                sacrificing a single luxury. Our spacious, meticulously
                maintained RV sites offer breathtaking water views and the
                perfect peaceful escape you’ve been searching for."
              </p>

              <ul className="rv-features-list">
                <li>30 Amp Full Hook-Up</li>
                <li>50 Amp Full Hook Up</li>
              </ul>

              <a href="./rv-sites.html" className="rv-btn-animated">
                View Details
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RV Cards / What's Happening Section */}
      <section className="rv-section-light">
        <div className="rv-header-light">
          <span>Prime Locations</span>
          <h2>What’s happening</h2>
        </div>

        <div className="rv-container">
          <div className="rv-card-light">
            <div className="rv-img-container">
              <img src="./image/img1.jpg" alt="Premium Pull-Thru" />
            </div>
            <div className="rv-content-light">
              <h3>Best Beaches near Riverside Resort: A Seasonal Guide</h3>
              <p>
                A visit to Vancouver Island is not complete without spending
                time where the forest meets the ocean. Exploring the various
                beaches near Qualicum Beach allows travellers to experience the
                ...
              </p>
            </div>
          </div>

          <div className="rv-card-light">
            <div className="rv-img-container">
              <img src="./image/img2.jpg" alt="Riverside Back-In" />
            </div>
            <div className="rv-content-light">
              <h3>
                RV Living on Vancouver Island: Long-Stay Tips from Riverside
                Resort Guests
              </h3>
              <p>
                Many people dream of trading a traditional house for a life on
                the road. Choosing RV living on Vancouver Island allows for a
                unique connection with nature that few ...
              </p>
            </div>
          </div>

          <div className="rv-card-light">
            <div className="rv-img-container">
              <img src="./image/img3.jpg" alt="Standard Back-In" />
            </div>
            <div className="rv-content-light">
              <h3>
                The Complete Riverside Resort RV Guide: Hookups, Sites & What to
                Bring
              </h3>
              <p>
                A trip to Vancouver Island in a recreational vehicle is a
                wonderful way to see the tall trees and the big blue ocean. To
                make sure everything goes perfectly, ...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <div className="reviews-container">
        <h2 className="header-title">Reviews</h2>

        <div className="rating-summary-bar">
          <div className="brand-info">
            <img src="./image/logo1.jpg" alt="Google" className="google-icon" />
            <div className="rating-text">
              <span className="platform-name">Google Rating</span>
              <div className="score-row">
                <span className="score-num">4.5</span>
                <div className="stars">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
              </div>
              <span className="review-count">388 reviews</span>
            </div>
          </div>
          <a href="#" className="btn-write">
            Write a review
          </a>
        </div>

        <div className="reviews-viewport" id="viewport">
          <div className="reviews-grid" id="grid" ref={gridRef}>
            {/* Review Cards */}
            <div className="review-card">
              <div className="user-meta">
                <img src="./image/r2.png" alt="User" className="user-img" />
                <div className="user-details">
                  <h4>Anupama</h4>
                  <span>3 months ago</span>
                </div>
              </div>
              <div className="card-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star grey"></i>
              </div>
              <p className="review-body">
                Loved their property location and infrastructure. Service was
                also good. Swimming pool was maintained good.
              </p>
              <div className="posted-on">
                <img src="./image/logo1.jpg" width="15" alt="Google" />
                <span>
                  Posted on <strong>Google</strong>
                </span>
              </div>
            </div>

            <div className="review-card">
              <div className="user-meta">
                <img src="./image/r3.png" alt="User" className="user-img" />
                <div className="user-details">
                  <h4>Zakir Husain Swadeshi</h4>
                  <span>3 months ago</span>
                </div>
              </div>
              <div className="card-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="review-body">This user only left a rating.</p>
              <div className="posted-on">
                <img src="./image/logo1.jpg" width="15" alt="Google" />
                <span>
                  Posted on <strong>Google</strong>
                </span>
              </div>
            </div>

            <div className="review-card">
              <div className="user-meta">
                <img src="./image/r4.png" alt="User" className="user-img" />
                <div className="user-details">
                  <h4>Aleena</h4>
                  <span>3 months ago</span>
                </div>
              </div>
              <div className="card-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="review-body">This user only left a rating.</p>
              <div className="posted-on">
                <img src="./image/logo1.jpg" width="15" alt="Google" />
                <span>
                  Posted on <strong>Google</strong>
                </span>
              </div>
            </div>

            <div className="review-card">
              <div className="user-meta">
                <img src="./image/r1.png" alt="User" className="user-img" />
                <div className="user-details">
                  <h4>Dilok Sherlekar S.</h4>
                  <span>3 months ago</span>
                </div>
              </div>
              <div className="card-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="review-body">This user only left a rating.</p>
              <div className="posted-on">
                <img src="./image/logo1.jpg" width="15" alt="Google" />
                <span>
                  Posted on <strong>Google</strong>
                </span>
              </div>
            </div>

            <div className="review-card">
              <div className="user-meta">
                <img src="./image/r6.png" alt="User" className="user-img" />
                <div className="user-details">
                  <h4>Preetha Thiyagarajan</h4>
                  <span>3 months ago</span>
                </div>
              </div>
              <div className="card-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="review-body">This user only left a rating.</p>
              <div className="posted-on">
                <img src="./image/logo1.jpg" width="15" alt="Google" />
                <span>
                  Posted on <strong>Google</strong>
                </span>
              </div>
            </div>

            <div className="review-card">
              <div className="user-meta">
                <img src="./image/r5.png" alt="User" className="user-img" />
                <div className="user-details">
                  <h4>Anas</h4>
                  <span>3 months ago</span>
                </div>
              </div>
              <div className="card-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star grey"></i>
              </div>
              <p className="review-body">This user only left a rating.</p>
              <div className="posted-on">
                <img src="./image/logo1.jpg" width="15" alt="Google" />
                <span>
                  Posted on <strong>Google</strong>
                </span>
              </div>
            </div>

            <div className="review-card">
              <div className="user-meta">
                <img src="./image/r7.png" alt="User" className="user-img" />
                <div className="user-details">
                  <h4>Kumaranayagam Ponn</h4>
                  <span>3 months ago</span>
                </div>
              </div>
              <div className="card-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p className="review-body">This user only left a rating.</p>
              <div className="posted-on">
                <img src="./image/logo1.jpg" width="15" alt="Google" />
                <span>
                  Posted on <strong>Google</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          className="nav-btn prev-btn"
          onClick={() => manualScroll("left")}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="nav-btn next-btn"
          onClick={() => manualScroll("right")}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

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

export default HomePage;
