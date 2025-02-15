let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

// ফাংশন যা ভয়েস লোড করে এবং ড্রপডাউন আপডেট করে
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    
    // ভয়েস না থাকলে ফাংশন পুনরায় কল করো
    if (voices.length === 0) {
        setTimeout(loadVoices, 100);
        return;
    }

    voiceSelect.innerHTML = ""; // আগের অপশনগুলো মুছে ফেলো

    voices.forEach((voice, i) => {
        let option = new Option(voice.name, i);
        voiceSelect.add(option);
    });

    // ডিফল্ট প্রথম ভয়েস সেট করা
    speech.voice = voices[0];
}

// যখন ব্রাউজার ভয়েস লোড করবে
window.speechSynthesis.onvoiceschanged = loadVoices;

// ইউজার ড্রপডাউন থেকে ভয়েস চেঞ্জ করলে
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[parseInt(voiceSelect.value)];
});

// টেক্সট স্পিক করা
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});

// ইনিশিয়াল ভয়েস লোড করা
loadVoices();
