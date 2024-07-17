(function() {
    let menu = document.querySelector('#menu-icon');
    let navlist = document.querySelector('.navlist');

    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navlist.classList.toggle('open');
    };

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    };

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }
    /**
     * Toggle .active class to .back-to-top button on scroll
     */
    let backtotop = select('.back-to-top');
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active');
            } else {
                backtotop.classList.remove('active');
            }
        };
        window.addEventListener('load', toggleBacktotop);
        onscroll(document, toggleBacktotop);
    }

    /**
     * Smooth scroll to the top of the page when .back-to-top button is clicked
     */
    backtotop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)



    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove()
        }, 3000);
    }

    /**
     * informations slider
     */
    new Swiper('.informations-slider', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });


    /**
     * Initiate Pure Counter 
     */
    new PureCounter();

    /*header */
    document.addEventListener("DOMContentLoaded", () => {
        const header = document.querySelector("header");
        const mainSection = document.querySelector(".main");

        document.addEventListener("mousemove", (event) => {
            const y = event.clientY;
            if (y < 100) {
                header.classList.add("header-moved");
                mainSection.style.paddingTop = "100px";
            } else {
                header.classList.remove("header-moved");
                mainSection.style.paddingTop = "0";
            }
        });
    });

    /**
      get-started-btn Scrolling to the "Theatre" section
     **/
    const scrollToTheatre = () => {
        const getStartedBtn = document.querySelector('.get-started-btn.scrollto');
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const theatreSection = document.querySelector('#Theatre');
                if (theatreSection) {
                    const headerOffset = 100;
                    const elementPosition = theatreSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollBy({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    };

    // Call the new function to enable smooth scrolling to the "Theatre" section
    scrollToTheatre();

    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    });

    /* Back to top button animation */
    document.addEventListener("DOMContentLoaded", function() {
        const backToTopButton = document.querySelector(".back-to-top");

        // Function to scroll to the top smoothly
        function scrollToTop() {
            const scrollOptions = {
                top: 0,
                behavior: "smooth" // Add smooth behavior for scrolling
            };
            window.scrollTo(scrollOptions);
        }

        // Show/hide the button based on scroll position
        function handleScroll() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add("active");
            } else {
                backToTopButton.classList.remove("active");
            }
        }

        // Add click event to the button
        backToTopButton.addEventListener("click", function(event) {
            event.preventDefault();
            // Remove the animation class to reset the animation
            backToTopButton.classList.remove("active");
            // Add the class to trigger the animation
            backToTopButton.classList.add("sparkling");
            // Scroll to top
            scrollToTop();
            // Remove the animation class after a delay
            setTimeout(() => {
                backToTopButton.classList.remove("sparkling");
            }, 2000); // Delay in milliseconds (2 seconds)
        });

        // Add scroll event listener to show/hide the button
        window.addEventListener("scroll", handleScroll);
    });

    //Contact section
    function initMap() {
        var map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 25.118088845299353, lng: 55.39293754384516 },
            zoom: 15,
        });

        var marker = new google.maps.Marker({
            position: { lat: 25.118088845299353, lng: 55.39293754384516 },
            map: map,
            title: "Dubai Silicon Oasis Authority HQ Building",
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                scaledSize: new google.maps.Size(32, 32),
            },
        });

        var infowindow = new google.maps.InfoWindow({
            content: `
                <strong>Dubai Silicon Oasis Authority HQ Building</strong><br>
                Office I-705, Dubai Silicon Oasis<br>
                Dubai, United Arab Emirates
            `,
        });

        marker.addListener("click", function() {
            infowindow.open(map, marker);
        });
    }


})();