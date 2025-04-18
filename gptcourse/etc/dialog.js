document.addEventListener('DOMContentLoaded', () => {

    const typingSpeed = { user: 50, ai: 30 };

    document.querySelectorAll('.dialog-trigger').forEach(button => {
        button.addEventListener('click', async () => {
            const dialogId = button.dataset.dialog;
            const container = document.getElementById(`${dialogId}Dialog`);
            if (!container.classList.contains('running')) {
                container.classList.add('running');
                container.innerHTML = '';
                await runDialog(JSON.parse(document.getElementById(dialogId).textContent), container);
                container.classList.remove('running');
            }
        });
    });

    async function runDialog(conversation, container) {
        for (const message of conversation.messages) {
            const messageDiv = createMessageElement(message.sender);
            container.appendChild(messageDiv);

            const typing = createTypingIndicator();
            messageDiv.appendChild(typing);
            await wait(1000);
            typing.remove();

            await renderContent(message.content, messageDiv, typingSpeed[message.sender]);
            await wait(1000);
        }
    }

    function createMessageElement(sender) {
        const div = document.createElement('div');
        div.className = `chat-message ${sender}-message`;
        return div;
    }

    function createTypingIndicator() {
        const div = document.createElement('div');
        div.className = 'typing-indicator';
        div.innerHTML = `<div class="typing-dot"></div>`.repeat(3);
        return div;
    }

    async function renderContent(text, container, speed) {
        const segments = parseContent(text);
        for (const segment of segments) {
            if (segment.type === 'text') {
                await typeText(segment.content, container, speed);
            } else if (segment.type === 'code') {
                await typeCode(segment.content, container, speed);
            } else if (segment.type === 'table') {
                await typeTable(segment.content, container, speed);
            }
        }
    }

    function parseContent(text) {
        const segments = [];
        const regex = /(```[\s\S]*?```)|(\|.*\|)/g;
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            const [full, code, table] = match;
            if (lastIndex < match.index) {
                segments.push({ type: 'text', content: text.slice(lastIndex, match.index) });
            }

            if (code) {
                segments.push({
                    type: 'code',
                    content: code.replace(/```(\w+)?\n?|```/g, '')
                });
            } else if (table) {
                const tableData = text.slice(match.index)
                    .split('\n')
                    .filter(line => line.trim().startsWith('|'))
                    .join('\n');
                segments.push({ type: 'table', content: tableData });
                regex.lastIndex = match.index + tableData.length;
            }

            lastIndex = regex.lastIndex;
        }

        if (lastIndex < text.length) {
            segments.push({ type: 'text', content: text.slice(lastIndex) });
        }

        return segments;
    }

    async function typeText(text, container, speed) {
        const div = document.createElement('div');
        container.appendChild(div);
        for (const char of text) {
            div.textContent += char;
            await wait(speed);
        }
    }

    async function typeCode(code, container, speed) {
        const pre = document.createElement('pre');
        pre.className = 'code-block';
        const codeElem = document.createElement('code');
        pre.appendChild(codeElem);
        container.appendChild(pre);

        const lines = code.split('\n');
        for (const line of lines) {
            const lineDiv = document.createElement('div');
            codeElem.appendChild(lineDiv);
            for (const char of line) {
                lineDiv.textContent += char;
                await wait(speed);
            }
        }
    }

async function typeTable(tableData, container, speed) {
    const table = document.createElement('table');
    table.className = 'chat-table';
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    container.appendChild(table);

    // Split rows and filter out separator line
    const allRows = tableData.split('\n').filter(line => line.trim());
    const filteredRows = allRows.filter((row, index) => {
        // Skip the second row if it's a separator (markdown table syntax)
        if (index === 1 && isSeparatorRow(row)) {
            return false;
        }
        return true;
    });

    for (const row of filteredRows) {
        const tr = document.createElement('tr');
        const cells = row.split('|').slice(1, -1);
        for (const cell of cells) {
            const td = document.createElement(allRows.indexOf(row) === 0 ? 'th' : 'td');
            td.className = allRows.indexOf(row) === 0 ? 'chat-table-header' : 'chat-table-cell';
            tr.appendChild(td);
            await typeText(cell.trim(), td, speed);
        }
        tbody.appendChild(tr);
    }
}

// Helper function to detect separator rows
function isSeparatorRow(row) {
    return /^[\|\-\s]+$/.test(row.replace(/[^\|\-]/g, ''));
}
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});