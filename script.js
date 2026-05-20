// Send Form Data To Google Sheets
function getUTM(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param) || '';
}
const scriptURL = 'https://script.google.com/macros/s/AKfycbwmmNWR3s8LtRYZh-M6b0c3iyIIfQw6iZubkIpbftBycqfP6mvG9M6abS52eecNGSSv/exec';
const form = document.getElementById('frmrlp-block-41');
const btn = document.getElementById('form-submit-button');
form.addEventListener('submit', e => {
    e.preventDefault();

    // UTM Capture Script 
    const fields = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
        "utm_id"
    ];

    fields.forEach(name => {
        const input = form.querySelector(`[name="${name}"]`);
        if (input) {
            input.value = getUTM(name);
        }
    });

    if (btn) {
        btn.innerHTML = "Processing...";
        btn.disabled = true;
    }
    let submitted = false;
    const finalSubmit = () => {
        if (!submitted) {
            submitted = true;
            form.submit();
        }
    };
    // setTimeout(finalSubmit, 2500);
    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form),
        mode: 'no-cors'
    })
        .then(() => {
            console.log("Sheet updated successfully");
            window.location.href = "https://online.jaipuria.ac.in/thank-you/";
            // finalSubmit();
        })
        .catch(error => {
            console.error("Sheet Error:", error);
            // finalSubmit();
        });
});

const toggleBtn = document.getElementById("toggleBtn");
const extraCards = document.getElementById("extraCards");
toggleBtn.addEventListener("click", () => {
    extraCards.classList.toggle("hidden");
    if (extraCards.classList.contains("hidden")) {
        toggleBtn.innerHTML = `Read More <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="inline-block ml-2 align-middle"><path d="m6 9 6 6 6-6"></path></svg>`;
        document.getElementById("program").scrollIntoView({ behavior: "smooth" });
    } else {
        toggleBtn.innerHTML = `Show Less <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="inline-block ml-2 align-middle"><path d="m18 15-6-6-6 6"></path></svg>`;
    }
});


