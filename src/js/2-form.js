const STORAGE_KEY = "feedback-form-state";

const refs = {
    form: document.querySelector(".feedback-form"),
};
const formData = {
    email: "",
    message: "",
};

refs.form.addEventListener("input", (e) => {
    const email = e.currentTarget.elements.email.value;
    const message = e.currentTarget.elements.message.value;
    const data = { email, message };
    saveToLS(STORAGE_KEY, data);
});

function initPage() {
    const saveData = loadFromLS(STORAGE_KEY);
    refs.form.elements.email.value = saveData?.email || formData.email;
    refs.form.elements.message.value = saveData?.message || formData.message;
}

initPage();

refs.form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = e.currentTarget.elements.email.value.trim();
    const message = e.currentTarget.elements.message.value.trim();
    if (!email || !message) {
        alert("Fill please all fields");
        return;
    }
    const data = { email, message };
    console.log(data);
    localStorage.removeItem(STORAGE_KEY);
    e.target.reset();
});

function saveToLS(key, value) {
    const jsonData = JSON.stringify(value);
    localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
    const body = localStorage.getItem(key);
    try {
        const data = JSON.parse(body);
        return data;
    } catch {
        return body;
    }
}
