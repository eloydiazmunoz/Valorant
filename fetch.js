document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('agent-select');

    fetch('valorant-list.xml')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            const agents = xmlDoc.querySelectorAll('agent');

            // Afegir opcions al selector basades en els agents disponibles
            agents.forEach(agent => {
                const name = agent.getElementsByTagName('name')[0].textContent;
                const option = document.createElement('option');
                option.value = agent.getAttribute('id');
                option.textContent = name;
                selectElement.appendChild(option);
            });

            // Gestor d'esdeveniments quan canvia la selecció
            selectElement.addEventListener('change', function() {
                const agentId = this.value;
                if (!agentId) return;

                // Obtenir els detalls de l'agent seleccionat
                const agent = xmlDoc.querySelector(`agent[id="${agentId}"]`);
                const name = agent.getElementsByTagName('name')[0].textContent;
                const role = agent.getElementsByTagName('role')[0].textContent;
                const bio = agent.getElementsByTagName('bio')[0].textContent;
                const imageUrl = agent.getElementsByTagName('image')[0].textContent;
                let abilities = '';

                // Construir una llista d'habilitats
                agent.querySelectorAll('ability').forEach(ability => {
                    abilities += `<li>${ability.getElementsByTagName('name')[0].textContent}: ${ability.getElementsByTagName('description')[0].textContent}</li>`;
                });

                // Actualitzar el contingut de la divisió d'informació amb els detalls de l'agent
                const infoDiv = document.getElementById('agent-info');
                infoDiv.innerHTML = `
                    <h1>${name}</h1>
                    <img src="${imageUrl}" alt="Imatge de ${name}" style="width: 700px; height: auto;">
                    <p><strong>Rol:</strong> ${role}</p>
                    <p><strong>Biografia:</strong> ${bio}</p>
                    <h2>Habilitats</h2>
                    <ul>${abilities}</ul>
                `;
            });
        })
        .catch(error => console.error('Error en la càrrega del XML:', error));
});
