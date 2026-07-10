        document.addEventListener("DOMContentLoaded", () => {
            const waxSeal = document.getElementById("waxSeal");
            const tapHint = document.getElementById("tapHint");
            const envelopeFlap = document.getElementById("envelopeFlap");
            const envelopeWrapper = document.getElementById("envelopeWrapper");
            const cardContainer = document.getElementById("cardContainer");
            const goToRsvpBtn = document.getElementById("goToRsvpBtn");
            const backToCoverBtn = document.getElementById("backToCoverBtn");
            const cardInner = document.getElementById("cardInner");
            const weddingForm = document.getElementById("weddingForm");
            const successMessage = document.getElementById("successMessage");

            // --- GUEST DETECTOR & HIDER LOGIC ---
            let name = null;

            // 1. First, check the standard query string (?n=name)
            const queryParams = new URLSearchParams(window.location.search);
            if (queryParams.has("n")) {
                name = queryParams.get("n");
            }

            // 2. If no name was found, check the hash (#n=name)
            if (!name && window.location.hash) {
                // Remove the '#' symbol so URLSearchParams can read it properly
                const hashData = window.location.hash.substring(1); 
                const hashParams = new URLSearchParams(hashData);
                
                if (hashParams.has("n")) {
                    name = hashParams.get("n");
                }
            }

            const guestLine = document.getElementById("guestLine");
            const guestNameEl = document.getElementById("guest-name");

            // 3. Conditional injection and hider logic
            if (name) {
                const formattedName = name.replace(/[_-]/g, " ");
                if (guestNameEl) {
                    guestNameEl.textContent = formattedName;
                }
                if (guestLine) {
                    guestLine.style.display = "block"; // Safely reveal the line
                }
            } else {
                if (guestLine) {
                    guestLine.style.display = "none"; // Hide the entire "Dear Guest" line if empty
                }
            }

            // 1. Unseal and Slide Out Invitation Card
            waxSeal.addEventListener("click", () => {
                waxSeal.style.opacity = "0";
                waxSeal.style.pointerEvents = "none";
                tapHint.style.opacity = "0";
                envelopeWrapper.classList.add("open");

                setTimeout(() => {
                    cardContainer.classList.remove("id-hidden");
                    cardContainer.classList.add("active");
                    
                    setTimeout(() => {
                        envelopeWrapper.classList.add("exit");
                    }, 500);
                }, 500);
            });

            // 2. 3D Card Flipping Navigation (Front & Back Links)
            goToRsvpBtn.addEventListener("click", () => {
                cardInner.classList.add("flipped");
            });

            backToCoverBtn.addEventListener("click", () => {
                cardInner.classList.remove("flipped");
            });

            // 3. Dual-Tab Swapper Engine (RSVP / FAQ)
            const tabLinks = document.querySelectorAll(".tab-link");
            const tabPanels = document.querySelectorAll(".tab-panel");

            tabLinks.forEach(link => {
                link.addEventListener("click", () => {
                    const targetId = link.getAttribute("data-target");

                    tabLinks.forEach(btn => btn.classList.remove("active"));
                    tabPanels.forEach(panel => panel.classList.remove("active"));

                    link.classList.add("active");
                    document.getElementById(targetId).classList.add("active");
                });
            });

            // 4. Smooth Accordion Event for FAQ scroller panels
            const faqQuestions = document.querySelectorAll(".faq-question");
            
            faqQuestions.forEach(question => {
                question.addEventListener("click", () => {
                    const currentItem = question.parentElement;
                    const isOpen = currentItem.classList.contains("open");
                    
                    // Close other items running concurrently
                    document.querySelectorAll(".faq-item").forEach(item => item.classList.remove("open"));
                    
                    if (!isOpen) {
                        currentItem.classList.add("open");
                    }
                });
            });

            // 5. Native Quiet Form Submission Handling
            weddingForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const formData = new FormData(weddingForm);
                successMessage.style.display = "flex";

                try {
                    await fetch(weddingForm.action, {
                        method: "POST",
                        body: formData,
                        headers: { 'Accept': 'application/json' }
                    });
                } catch (error) {
                    console.error("Submission error", error);
                }
            });
        });



// WAVE SCRIPT
        // 1. Move everything into a reusable function
        function handleWaveTransition() {
            let scrollPos = window.scrollY;
            let windowHeight = window.innerHeight;
            let progress = Math.min(scrollPos / windowHeight, 1);

            // Use the IDs from your actual HTML
            const waveLayer = document.getElementById('wave-layer') || document.getElementById('first-page');
            const dewOverlay = document.getElementById('dew-overlay');

            let y = (1 - progress) * 100;

            // Wave movement logic
            let w1 = Math.sin(progress * 8) * 3;
            let w2 = Math.cos(progress * 8) * 3;

            // Organic Wave Path
            let wavePath = `polygon(
        0% 0%, 
        100% 0%, 
        100% ${y + w1}%, 
        85% ${y + w2 + 2}%, 
        65% ${y - w1 + 4}%, 
        50% ${y + w2 + 5}%, 
        35% ${y + w1 + 3}%, 
        15% ${y - w2 + 2}%, 
        0% ${y + w1}%
    )`;

            // Apply clipPath to the navy background
            if (waveLayer) waveLayer.style.clipPath = wavePath;

            // Apply clipPath to the dew-overlay (The Ribbon)
            if (dewOverlay) {
                let dewPath = `polygon(
            0% ${y + w1 - 2}%, 
            100% ${y + w1 - 2}%, 
            100% ${y + w1 + 5}%, 
            85% ${y + w2 + 7}%, 
            65% ${y - w1 + 9}%, 
            50% ${y + w2 + 10}%, 
            35% ${y + w1 + 8}%, 
            15% ${y - w2 + 7}%, 
            0% ${y + w1 + 5}%
        )`;
                dewOverlay.style.clipPath = dewPath;
            }

            // Fade the content
            const content = document.querySelector('#first-page .content');
            if (content) content.style.opacity = 1 - (progress * 2);
        }

        // 2. RUN ON SCROLL
        window.onscroll = handleWaveTransition;

        // 3. RUN ON LOAD (This removes the initial blur glitch)
        window.addEventListener('DOMContentLoaded', handleWaveTransition);

        // 4. Guest Name Logic (Keep this separate)
        window.addEventListener('load', function () {
            const params = new URLSearchParams(window.location.search);
            const name = params.get('n');
            if (name) {
                const formattedName = decodeURIComponent(name).replace(/[_-]/g, ' ');
                const nameElement = document.getElementById('guest-name');
                if (nameElement) nameElement.innerText = formattedName;
            }
        });
