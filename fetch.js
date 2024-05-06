document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('agent-select');

    fetch('valorant-list.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            const agents = xmlDoc.querySelectorAll('agent');

            agents.forEach(agent => {
                const name = agent.getElementsByTagName('name')[0].textContent;
                const option = document.createElement('option');
                option.value = agent.getAttribute('id');
                option.textContent = name;
                selectElement.appendChild(option);
            });

            selectElement.addEventListener('change', function() {
                const agentId = this.value;
                if (!agentId) return;
        
                const agent = xmlDoc.querySelector(`agent[id="${agentId}"]`);
                const name = agent.getElementsByTagName('name')[0].textContent;
                const role = agent.getElementsByTagName('role')[0].textContent;
                const bio = agent.getElementsByTagName('bio')[0].textContent;
                let abilities = '';
        
                agent.querySelectorAll('ability').forEach(ability => {
                    abilities += `<li>${ability.getElementsByTagName('name')[0].textContent}: ${ability.getElementsByTagName('description')[0].textContent}</li>`;
                });
        
                const infoDiv = document.getElementById('agent-info');
                infoDiv.innerHTML = `
                    <h1>${name}</h1>
                    <p><strong>Role:</strong> ${role}</p>
                    <p><strong>Biography:</strong> ${bio}</p>
                    <h2>Abilities</h2>
                    <ul>${abilities}</ul>
                `;
            });
        })
        .catch(error => console.error('Error fetching XML:', error));


});
