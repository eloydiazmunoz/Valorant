document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('agent-select');

    fetch('valorant-list.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            const agents = xmlDoc.querySelectorAll('agent');

            // Añadir opciones al selector basadas en los agentes disponibles
            agents.forEach(agent => {
                const name = agent.getElementsByTagName('name')[0].textContent;
                const option = document.createElement('option');
                option.value = agent.getAttribute('id');
                option.textContent = name;
                selectElement.appendChild(option);
            });

            // Manejador de eventos cuando cambia la selección
            selectElement.addEventListener('change', function() {
                const agentId = this.value;
                if (!agentId) return;

                // Obtener los detalles del agente seleccionado
                const agent = xmlDoc.querySelector(`agent[id="${agentId}"]`);
                const name = agent.getElementsByTagName('name')[0].textContent;
                const role = agent.getElementsByTagName('role')[0].textContent;
                const bio = agent.getElementsByTagName('bio')[0].textContent;
                const imageUrl = agent.getElementsByTagName('image')[0].textContent;
                let abilities = '';

                // Construir una lista de habilidades
                agent.querySelectorAll('ability').forEach(ability => {
                    abilities += `<li>${ability.getElementsByTagName('name')[0].textContent}: ${ability.getElementsByTagName('description')[0].textContent}</li>`;
                });

                // Actualizar el contenido de la división de información con los detalles del agente
                const infoDiv = document.getElementById('agent-info');
                infoDiv.innerHTML = `
                    <h1>${name}</h1>
                    <img src="${imageUrl}" alt="Image of ${name}" style="width: 700px; height: auto;">
                    <p><strong>Role:</strong> ${role}</p>
                    <p><strong>Biography:</strong> ${bio}</p>
                    <h2>Abilities</h2>
                    <ul>${abilities}</ul>
                `;
            });
        })
        .catch(error => console.error('Error fetching XML:', error));
});
