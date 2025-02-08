import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    form: document.querySelector(".form"),
    formDelay: document.querySelector('[name="delay"]'),
    formState: document.querySelector('[name="state"]'),
    formBtn: document.querySelector('button[type="submit"]'),
};

refs.formBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const stateValue = document.querySelector('[name="state"]:checked').value;
    const delayValue = refs.formDelay.value;
    if (!delayValue) {
        return;
    }
    const promises = [];
    const newPromis = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (stateValue === "fulfilled") {
                iziToast.show({
                    message: `✅ Fulfilled promise in ${delayValue}ms`,
                    position: "topRight",
                    backgroundColor: "#338733",
                    timeout: 5000,
                    transitionIn: "fadeInDown",
                });
                resolve();
            } else if (stateValue === "rejected") {
                iziToast.show({
                    message: `❌ Rejected promise in ${delayValue}ms`,
                    position: "topRight",
                    backgroundColor: "#FF4D4D",
                    timeout: 5000,
                    transitionIn: "fadeInDown",
                });
                reject();
            }
        }, refs.formDelay.value);
    });

    promises.push(newPromis);
    refs.formDelay.value = '';  
    const stateRadio = document.querySelector('[name="state"]:checked');
    if (stateRadio) {
      stateRadio.checked = false;  
    }
});
