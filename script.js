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
            console.error("Transmission error", error);
        }
    });
});
