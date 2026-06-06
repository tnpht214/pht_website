// ======================
// CHUYỂN TAB
// ======================

function showTab(tabId) {
    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
    });

    document.getElementById(tabId).classList.add("active");
}

// ======================
// CHATBOT
// ======================

let chats = JSON.parse(localStorage.getItem("chats")) || [];
let currentChat = -1;

function saveChats() {
    localStorage.setItem("chats", JSON.stringify(chats));
}

function updateChatList() {

    const list = document.getElementById("chatList");

    if (!list) return;

    list.innerHTML = "";

    chats.forEach((chat, index) => {

        let option = document.createElement("option");

        option.value = index;
        option.textContent = "Cuộc trò chuyện " + (index + 1);

        list.appendChild(option);
    });

    list.value = currentChat;
}

function loadChat(index) {

    if (index < 0 || !chats[index]) return;

    currentChat = index;

    document.getElementById("chatBox").innerHTML =
        chats[index];
}

function newChat() {

    const startMessage =
        "<div><b>Bot:</b> Xin chào 👋</div>";

    chats.push(startMessage);

    currentChat = chats.length - 1;

    saveChats();
    updateChatList();

    document.getElementById("chatBox").innerHTML =
        startMessage;
}

function sendMessage() {

    const input =
        document.getElementById("userInput");

    let message =
        input.value.trim();

    if (message === "") return;

    const box =
        document.getElementById("chatBox");

    box.innerHTML +=
        `<div><b>Bạn:</b> ${message}</div>`;

    const reply =
        getBotReply(message);

    box.innerHTML +=
        `<div><b>Bot:</b> ${reply}</div>`;

    chats[currentChat] = box.innerHTML;

    saveChats();

    box.scrollTop = box.scrollHeight;

    input.value = "";
}

function getBotReply(message) {

    let msg =
        message.toLowerCase();

    if (
        msg.includes("chào") ||
        msg.includes("hello") ||
        msg.includes("hi")
    ) {
        return "Xin chào 👋";
    }

    if (
        msg.includes("khỏe") ||
        msg.includes("khỏe không")
    ) {
        return "Mình khỏe 😊";
    }

    if (
        msg.includes("tên bạn") ||
        msg.includes("bạn tên gì")
    ) {
        return "Mình là AI Hoàng Tấn Phát 🤖";
    }

    if (
        msg.includes("ai tạo") ||
        msg.includes("người tạo")
    ) {
        return "Mình được tạo bởi Hoàng Tấn Phát 😎";
    }

    if (msg.includes("html")) {
        return "HTML dùng để tạo cấu trúc website.";
    }

    if (msg.includes("css")) {
        return "CSS dùng để thiết kế giao diện website.";
    }

    if (
        msg.includes("javascript") ||
        msg.includes("js")
    ) {
        return "JavaScript dùng để tạo tính năng website.";
    }

    return "Mình đang học thêm để trả lời tốt hơn 😊";
}

// ======================
// HỌC TOOL
// ======================

function showTool(tool) {

    let content = "";

    if (tool === "html") {

        content = `
        <h3>🌐 HTML</h3>

        <p>HTML là nền tảng của website.</p>

        <p>Dùng để tạo:</p>

        <ul>
            <li>Tiêu đề</li>
            <li>Ảnh</li>
            <li>Nút bấm</li>
            <li>Bảng</li>
            <li>Biểu mẫu</li>
        </ul>
        `;
    }

    if (tool === "css") {

        content = `
        <h3>🎨 CSS</h3>

        <p>CSS giúp website đẹp hơn.</p>

        <ul>
            <li>Đổi màu</li>
            <li>Đổi font chữ</li>
            <li>Tạo hiệu ứng</li>
            <li>Responsive</li>
        </ul>
        `;
    }

    if (tool === "js") {

        content = `
        <h3>⚡ JavaScript</h3>

        <p>JavaScript giúp website thông minh hơn.</p>

        <ul>
            <li>Chatbot</li>
            <li>Game</li>
            <li>Đăng nhập</li>
            <li>Tính toán</li>
        </ul>
        `;
    }

    if (tool === "vscode") {

        content = `
        <h3>💻 VS Code</h3>

        <p>Phần mềm lập trình miễn phí.</p>

        <p>Nên cài:</p>

        <ul>
            <li>Live Server</li>
            <li>Prettier</li>
            <li>HTML CSS Support</li>
        </ul>
        `;
    }

    document.getElementById(
        "toolContent"
    ).innerHTML = content;
}

// ======================
// HỒ SƠ
// ======================

function changeName() {

    const input =
        document.getElementById("nameInput");

    const name =
        input.value.trim();

    if (name === "") return;

    localStorage.setItem(
        "userName",
        name
    );

    document.getElementById(
        "profileName"
    ).innerText = name;
}

function toggleTheme() {

    document.body.classList.toggle(
        "light-mode"
    );
}

// ======================
// KHỞI ĐỘNG
// ======================

window.onload = function () {

    let savedName =
        localStorage.getItem("userName");

    if (savedName) {

        document.getElementById(
            "profileName"
        ).innerText = savedName;
    }

    if (chats.length === 0) {
        newChat();
    } else {

        currentChat = 0;

        updateChatList();

        document.getElementById(
            "chatBox"
        ).innerHTML = chats[0];
    }

    const list =
        document.getElementById(
            "chatList"
        );

    if (list) {

        list.addEventListener(
            "change",
            function () {
                loadChat(
                    Number(this.value)
                );
            }
        );
    }
};