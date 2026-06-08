// ======================
// CHUYỂN TAB
// ======================

function showTab(tabId) {
    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
    });

    const target = document.getElementById(tabId);

    if (target) {
        target.classList.add("active");
    }
}

// ======================
// KIẾN THỨC CHATBOT
// ======================

let knowledge =
JSON.parse(localStorage.getItem("knowledge")) || {

    "xin chào": "Xin chào 👋",
    "hello": "Xin chào 👋",
    "hi": "Xin chào 👋",

    "bạn là ai":
    "Mình là AI Hoàng Tấn Phát 🤖",

    "ai tạo ra bạn":
    "Mình được Hoàng Tấn Phát tạo ra 😎",

    "bạn khỏe không":
    "Mình khỏe, cảm ơn bạn 😊"

};

// ======================
// LỊCH SỬ CHAT
// ======================

let chats =
JSON.parse(localStorage.getItem("chats")) || [];

let currentChat = -1;

// ======================
// LƯU DỮ LIỆU
// ======================

function saveData() {

    localStorage.setItem(
        "knowledge",
        JSON.stringify(knowledge)
    );

    localStorage.setItem(
        "chats",
        JSON.stringify(chats)
    );

}

// ======================
// NEW CHAT
// ======================

function newChat() {

    const chat = {

        name:
        "Chat " +
        (chats.length + 1),

        messages: [
            "Bot: Xin chào 👋"
        ]

    };

    chats.push(chat);

    currentChat =
    chats.length - 1;

    saveData();

    updateChatList();

    renderMessages();

}

// ======================
// DANH SÁCH CHAT
// ======================

function updateChatList() {

    const select =
    document.getElementById(
        "chatList"
    );

    if (!select) return;

    select.innerHTML = "";

    chats.forEach(
        (chat, index) => {

            let option =
            document.createElement(
                "option"
            );

            option.value =
            index;

            option.textContent =
            chat.name;

            select.appendChild(
                option
            );

        }
    );

    select.value =
    currentChat;

}

// ======================
// CHỌN CHAT
// ======================

function loadChat() {

    const select =
    document.getElementById(
        "chatList"
    );

    currentChat =
    Number(select.value);

    renderMessages();

}

// ======================
// HIỂN THỊ TIN NHẮN
// ======================

function renderMessages() {

    const box =
    document.getElementById(
        "chatBox"
    );

    if (!box) return;

    box.innerHTML = "";

    if (
        currentChat < 0 ||
        !chats[currentChat]
    ) return;

    chats[currentChat]
        .messages
        .forEach(msg => {

            box.innerHTML +=
                msg + "<br>";

        });

    box.scrollTop =
    box.scrollHeight;

}

// ======================
// GỬI TIN NHẮN
// ======================

function sendMessage() {

    const input =
    document.getElementById(
        "userInput"
    );

    if (!input) return;

    let text =
    input.value.trim();

    if (
        text === ""
    ) return;

    if (
        currentChat === -1
    ) {

        newChat();

    }

    chats[currentChat]
        .messages
        .push(
            "Bạn: " + text
        );

    let botReply =
    "Mình chưa biết. Hãy dạy mình bằng: dạy câu hỏi : câu trả lời";

    // ==================
    // DẠY CHATBOT
    // ==================

    if (
        text.toLowerCase()
            .startsWith("dạy ")
    ) {

        let data =
        text.substring(4);

        let parts =
        data.split(":");

        if (
            parts.length >= 2
        ) {

            let question =
            parts[0]
                .trim()
                .toLowerCase();

            let answer =
            parts.slice(1)
                .join(":")
                .trim();

            knowledge[
                question
            ] = answer;

            botReply =
            "Mình đã học: " +
            question;

        }

    } else {

        let userText =
        text.toLowerCase();

        for (
            let question
            in knowledge
        ) {

            let q =
            question.toLowerCase();

            if (

                userText === q ||

                userText.includes(q) ||

                q.includes(userText)

            ) {

                botReply =
                knowledge[
                    question
                ];

                break;

            }

        }

    }

    chats[currentChat]
        .messages
        .push(
            "Bot: " + botReply
        );

    saveData();

    renderMessages();

    updateChatList();

    input.value = "";

}

// ======================
// ENTER ĐỂ GỬI
// ======================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const input =
        document.getElementById(
            "userInput"
        );

        if (input) {

            input.addEventListener(
                "keypress",
                function (e) {

                    if (
                        e.key ===
                        "Enter"
                    ) {

                        sendMessage();

                    }

                }
            );

        }

        if (
            chats.length === 0
        ) {

            newChat();

        } else {

            currentChat = 0;

            updateChatList();

            renderMessages();

        }

    }
);
