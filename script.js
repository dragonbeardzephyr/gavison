
function setupTypeWriter(elementID, text, speed) {
    const element = document.getElementById(elementID);

    function startTyping() {
        let i = 0;
        element.innerHTML = ''; // Clear previous text

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    startTyping();

    element.onclick = startTyping;
}


setupTypeWriter("name", "Gavison", 50);