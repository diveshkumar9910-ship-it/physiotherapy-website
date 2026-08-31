/* =========================================================
   DR. SANJEEV PAL
   AXIOM-INSPIRED PHYSIOTHERAPY WEBSITE
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. MOBILE MENU
       ===================================================== */

    const menuBtn = document.querySelector(".menu-btn");
    const mobilePanel = document.querySelector(".mobile-panel");
    const mobileClose = document.querySelector(".mobile-panel button");
    const mobileLinks = document.querySelectorAll(".mobile-panel a");

    function openMenu() {
        if (!mobilePanel) return;

        mobilePanel.classList.add("open");
        document.body.classList.add("menu-open");
    }

    function closeMenu() {
        if (!mobilePanel) return;

        mobilePanel.classList.remove("open");
        document.body.classList.remove("menu-open");
    }

    if (menuBtn) {
        menuBtn.addEventListener("click", openMenu);
    }

    if (mobileClose) {
        mobileClose.addEventListener("click", closeMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });


    /* =====================================================
       2. ESC KEY CLOSE MOBILE MENU
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =====================================================
       3. SCROLL PROGRESS
       ===================================================== */

    const scrollLine = document.querySelector(".scroll-line");

    function updateScrollProgress() {

        if (!scrollLine) return;

        const scrollTop =
            window.scrollY ||
            document.documentElement.scrollTop;

        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        if (documentHeight <= 0) {
            scrollLine.style.width = "0%";
            return;
        }

        const progress =
            (scrollTop / documentHeight) * 100;

        scrollLine.style.width =
            `${Math.min(progress, 100)}%`;
    }

    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    updateScrollProgress();


    /* =====================================================
       4. SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       5. IMAGE LOADING
       ===================================================== */

    const lazyImages =
        document.querySelectorAll("[data-src]");

    function loadImage(imageElement) {

        const source =
            imageElement.getAttribute("data-src");

        if (!source) return;

        const image =
            new Image();

        image.onload = () => {

            imageElement.style.backgroundImage =
                `url("${source}")`;

            imageElement.classList.add(
                "image-loaded"
            );

            imageElement.removeAttribute(
                "data-src"
            );

        };

        image.onerror = () => {

            console.warn(
                "Image could not be loaded:",
                source
            );

            imageElement.classList.add(
                "image-error"
            );

        };

        image.src = source;
    }


    if ("IntersectionObserver" in window) {

        const imageObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            loadImage(
                                entry.target
                            );

                            imageObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    rootMargin: "200px"
                }
            );

        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });

    } else {

        lazyImages.forEach(loadImage);

    }


    /* =====================================================
       6. IMAGE FALLBACK
       ===================================================== */

    const normalImages =
        document.querySelectorAll("img");

    normalImages.forEach(img => {

        img.addEventListener("error", () => {

            img.style.display = "none";

            const parent =
                img.closest(".photo");

            if (parent) {

                parent.classList.remove(
                    "has-image"
                );

            }

        });

    });


    /* =====================================================
       7. SMOOTH ANCHOR NAVIGATION
       ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const header =
                document.querySelector(".header");

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       8. ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navItems =
        document.querySelectorAll(
            ".desktop-nav a[href^='#']"
        );

    if (
        sections.length &&
        navItems.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        const id =
                            entry.target.id;

                        navItems.forEach(item => {

                            item.classList.remove(
                                "active"
                            );

                            if (
                                item.getAttribute(
                                    "href"
                                ) === `#${id}`
                            ) {

                                item.classList.add(
                                    "active"
                                );

                            }

                        });

                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    /* =====================================================
       9. APPOINTMENT FORM
       ===================================================== */

    const bookingForm =
        document.querySelector(
            ".booking-card form"
        );

    if (bookingForm) {

        bookingForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const nameInput =
                    bookingForm.querySelector(
                        'input[name="name"]'
                    );

                const phoneInput =
                    bookingForm.querySelector(
                        'input[name="phone"]'
                    );

                const dateInput =
                    bookingForm.querySelector(
                        'input[name="date"]'
                    );

                const serviceInput =
                    bookingForm.querySelector(
                        'select[name="service"]'
                    );

                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";

                const phone =
                    phoneInput
                        ? phoneInput.value.trim()
                        : "";

                const date =
                    dateInput
                        ? dateInput.value
                        : "";

                const service =
                    serviceInput
                        ? serviceInput.value
                        : "";


                /* -----------------------------
                   BASIC VALIDATION
                   ----------------------------- */

                if (!name) {

                    showFormMessage(
                        bookingForm,
                        "Please enter your name."
                    );

                    if (nameInput) {
                        nameInput.focus();
                    }

                    return;
                }


                if (!phone) {

                    showFormMessage(
                        bookingForm,
                        "Please enter your phone number."
                    );

                    if (phoneInput) {
                        phoneInput.focus();
                    }

                    return;
                }


                if (
                    phone.replace(/\D/g, "").length < 10
                ) {

                    showFormMessage(
                        bookingForm,
                        "Please enter a valid phone number."
                    );

                    if (phoneInput) {
                        phoneInput.focus();
                    }

                    return;
                }


                if (!date) {

                    showFormMessage(
                        bookingForm,
                        "Please select an appointment date."
                    );

                    if (dateInput) {
                        dateInput.focus();
                    }

                    return;
                }


                /* -----------------------------
                   SUCCESS
                   ----------------------------- */

                showFormMessage(
                    bookingForm,
                    `Thank you ${name}. Your appointment request has been received.`,
                    true
                );


                /*
                 * IMPORTANT:
                 *
                 * Yahan future me backend,
                 * WhatsApp API,
                 * Formspree,
                 * EmailJS,
                 * PHP/MySQL
                 * ya kisi booking system ko connect
                 * kiya ja sakta hai.
                 */

                console.log(
                    "Appointment Request:",
                    {
                        name,
                        phone,
                        date,
                        service
                    }
                );

            }
        );

    }


    /* =====================================================
       10. FORM MESSAGE FUNCTION
       ===================================================== */

    function showFormMessage(
        form,
        message,
        success = false
    ) {

        let messageBox =
            form.querySelector(
                ".form-message"
            );

        if (!messageBox) {

            messageBox =
                document.createElement("div");

            messageBox.className =
                "form-message";

            form.appendChild(
                messageBox
            );

        }

        messageBox.textContent =
            message;

        messageBox.style.display =
            "block";

        messageBox.style.marginTop =
            "15px";

        messageBox.style.padding =
            "12px";

        messageBox.style.fontFamily =
            '"DM Mono", monospace';

        messageBox.style.fontSize =
            "9px";

        messageBox.style.lineHeight =
            "1.5";

        messageBox.style.border =
            "1px solid #555";

        messageBox.style.color =
            success
                ? "#111"
                : "#fff";

        messageBox.style.background =
            success
                ? "#d7ff35"
                : "#222";

    }


    /* =====================================================
       11. PHONE NUMBER INPUT
       ===================================================== */

    const phoneFields =
        document.querySelectorAll(
            'input[type="tel"], input[name="phone"]'
        );

    phoneFields.forEach(input => {

        input.addEventListener(
            "input",
            () => {

                input.value =
                    input.value.replace(
                        /[^\d+\-\s()]/g,
                        ""
                    );

            }
        );

    });


    /* =====================================================
       12. DATE INPUT — PREVENT OLD DATES
       ===================================================== */

    const dateInputs =
        document.querySelectorAll(
            'input[type="date"]'
        );

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");

    const todayString =
        `${year}-${month}-${day}`;

    dateInputs.forEach(input => {

        input.min =
            todayString;

    });


    /* =====================================================
       13. HEADER SHADOW ON SCROLL
       ===================================================== */

    const header =
        document.querySelector(".header");

    function headerScrollEffect() {

        if (!header) return;

        if (window.scrollY > 30) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }

    window.addEventListener(
        "scroll",
        headerScrollEffect,
        { passive: true }
    );

    headerScrollEffect();


    /* =====================================================
       14. DYNAMIC HEADER STYLE
       ===================================================== */

    const dynamicHeaderStyle =
        document.createElement("style");

    dynamicHeaderStyle.textContent = `
        .header.scrolled {
            box-shadow:
                0 8px 30px rgba(0,0,0,.06);
        }

        .desktop-nav a.active {
            font-weight: 700;
        }

        .desktop-nav a.active::after {
            width: 100%;
        }

        .form-message {
            animation:
                formMessageIn .35s ease forwards;
        }

        @keyframes formMessageIn {
            from {
                opacity: 0;
                transform: translateY(8px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    document.head.appendChild(
        dynamicHeaderStyle
    );


    /* =====================================================
       15. BUTTON MICRO INTERACTION
       ===================================================== */

    const interactiveButtons =
        document.querySelectorAll(
            ".pill, .form-submit, .menu-btn"
        );

    interactiveButtons.forEach(button => {

        button.addEventListener(
            "mousedown",
            () => {

                button.style.transform =
                    "scale(.97)";

            }
        );

        button.addEventListener(
            "mouseup",
            () => {

                button.style.transform =
                    "";

            }
        );

        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       16. PHONE / WHATSAPP LINKS
       ===================================================== */

    const phoneLinks =
        document.querySelectorAll(
            'a[href^="tel:"]'
        );

    phoneLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                console.log(
                    "Calling:",
                    link.getAttribute("href")
                );

            }
        );

    });


    const whatsappLinks =
        document.querySelectorAll(
            'a[href*="wa.me"]'
        );

    whatsappLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                console.log(
                    "Opening WhatsApp"
                );

            }
        );

    });


    /* =====================================================
       17. CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       18. PAGE LOADED
       ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


    /* =====================================================
       19. CONSOLE MESSAGE
       ===================================================== */

    console.log(
        "%c Dr. Sanjeev Pal Physiotherapy ",
        "background:#111;color:#d7ff35;font-size:14px;padding:8px;"
    );

    console.log(
        "Website interface initialized successfully."
    );

});



/* ==================================================
   HEADER JAVASCRIPT
   ================================================== */

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const mainNav =
    document.getElementById("mainNav");


/* MOBILE MENU */

mobileMenuBtn.addEventListener("click", () => {

    mainNav.classList.toggle("mobile-open");

});


/* CLOSE MOBILE MENU AFTER CLICK */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("mobile-open");

    });

});


/* SCROLL HEADER */

window.addEventListener("scroll", () => {

    const header =
        document.querySelector(".site-header");

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* ACTIVE NAV */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", function () {

        document
            .querySelectorAll(".nav-link")
            .forEach(item => {

                item.classList.remove("active");

            });

        this.classList.add("active");

    });

});


/* ==========================================
   BOOK APPOINTMENT POPUP
   Works with ALL booking buttons
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const bookingModal = document.querySelector(".booking-modal");
    const closeBooking = document.getElementById("closeBooking");
    const appointmentForm = document.getElementById("appointmentForm");

    /*
    ------------------------------------------
    FIND ALL BOOK APPOINTMENT BUTTONS
    ------------------------------------------
    */

    const bookingButtons = document.querySelectorAll(
        ".book-appointment-btn"
    );


    /*
    ------------------------------------------
    OPEN BOOKING POPUP
    ------------------------------------------
    */

    function openBookingModal(event) {

        if (event) {
            event.preventDefault();
        }

        if (!bookingModal) return;

        bookingModal.classList.add("active");

        document.body.classList.add("booking-open");

        /*
        Prevent background page scrolling
        */
        document.body.style.overflow = "hidden";
    }


    /*
    ------------------------------------------
    CLOSE BOOKING POPUP
    ------------------------------------------
    */

    function closeBookingModal() {

        if (!bookingModal) return;

        bookingModal.classList.remove("active");

        document.body.classList.remove("booking-open");

        /*
        Restore page scrolling
        */
        document.body.style.overflow = "";
    }


    /*
    ------------------------------------------
    CONNECT ALL BOOKING BUTTONS
    ------------------------------------------
    */

    bookingButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            openBookingModal(event);

        });

    });


    /*
    ------------------------------------------
    CLOSE BUTTON
    ------------------------------------------
    */

    if (closeBooking) {

        closeBooking.addEventListener("click", function () {

            closeBookingModal();

        });

    }


    /*
    ------------------------------------------
    CLICK OUTSIDE POPUP TO CLOSE
    ------------------------------------------
    */

    if (bookingModal) {

        bookingModal.addEventListener("click", function (event) {

            if (event.target === bookingModal) {

                closeBookingModal();

            }

        });

    }


    /*
    ------------------------------------------
    ESC KEY TO CLOSE
    ------------------------------------------
    */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeBookingModal();

        }

    });


    /*
    ------------------------------------------
    APPOINTMENT FORM
    ------------------------------------------
    */

    if (appointmentForm) {

        appointmentForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const name =
                appointmentForm.querySelector(
                    '[name="name"]'
                )?.value.trim();


            const phone =
                appointmentForm.querySelector(
                    '[name="phone"]'
                )?.value.trim();


            const clinic =
                appointmentForm.querySelector(
                    '[name="clinic"]'
                )?.value;


            const date =
                appointmentForm.querySelector(
                    '[name="date"]'
                )?.value;


            /*
            Basic validation
            */

            if (!name || !phone || !clinic) {

                alert(
                    "Please fill all required fields."
                );

                return;

            }


            /*
            ----------------------------------
            WHATSAPP MESSAGE
            ----------------------------------
            */

            const message =
                `Hello Dr. Sanjeev,%0A%0A` +
                `I would like to book a physiotherapy appointment.%0A%0A` +
                `Name: ${encodeURIComponent(name)}%0A` +
                `Phone: ${encodeURIComponent(phone)}%0A` +
                `Clinic: ${encodeURIComponent(clinic)}%0A` +
                `Preferred Date: ${encodeURIComponent(date || "Not specified")}`;


            /*
            ----------------------------------
            WHATSAPP NUMBER
            ----------------------------------

            IMPORTANT:
            Replace this number with your
            actual WhatsApp number.

            Country code included.
            Example: 919876543210
            */

            const whatsappNumber = "919XXXXXXXXX";


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${message}`;


            /*
            Open WhatsApp
            */

            window.open(
                whatsappURL,
                "_blank"
            );


            /*
            Close popup
            */

            closeBookingModal();


            /*
            Reset form
            */

            appointmentForm.reset();

        });

    }

});
