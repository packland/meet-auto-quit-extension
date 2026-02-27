(function() {
    console.log('Starting Script. Versão 1.1 com UI melhorada.');
    
    // Variáveis de configuração com valores padrão
    var min_reuniao = 2; // O quórum mínimo antes que o "auto-quit" comece a monitorar.
    var max_reuniao = 0;
    var min_quorum = 0.5; // Se o quórum da reunião ficar abaixo desta porcentagem, você sairá automaticamente.
    var ativar = true;

    // Função principal que verifica o quórum e decide se deve sair
    const membersfunction = (item) => {
        if (ativar && item) {
            console.log('atual = ' + item.textContent + ', max = ' + max_reuniao + ', min_reuniao = ' + min_reuniao + ', min_quorum = ' + min_quorum);
            let quorumAtual = parseFloat(item.textContent);
            
            if(quorumAtual > max_reuniao) { 
                max_reuniao = quorumAtual; 
            }
            
            // Ignora se a reunião nunca atingiu o mínimo para ativação
            if(max_reuniao < min_reuniao) {
                console.log('Reunião ainda não atingiu o quórum mínimo de ativação de ' + min_reuniao + ' pessoas.');
                return;
            }
            
            // Condição para sair da chamada
            if (quorumAtual < max_reuniao * min_quorum) {
                console.log('Quórum (' + quorumAtual + ') menor que o mínimo definido (' + (max_reuniao * min_quorum).toFixed(1) + '). Saindo...');
                const leaveButton = window.document.querySelector('button[aria-label="Sair da chamada"]');
                if (leaveButton) {
                    leaveButton.click();
                }
            }
        }
    };

    // Loop principal que executa a verificação a cada 1 segundo
    setInterval(() => {
        membersfunction(document.querySelector('.egzc7c'));
    }, 1000);

    // --- Início da criação da Interface de Usuário Flutuante ---

    // 1. Cria o container principal
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.bottom = "90px";
    container.style.right = "15px";
    container.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
    container.style.border = "1px solid #ccc";
    container.style.borderRadius = "8px";
    container.style.padding = "10px";
    container.style.zIndex = "9999";
    container.style.fontFamily = "Arial, sans-serif";
    container.style.fontSize = "12px";
    container.style.boxShadow = "0px 2px 10px rgba(0,0,0,0.2)";

    // 2. Cria o botão de Ativar/Desativar
    const toggleBtn = document.createElement("button");
    const textOn = document.createTextNode("Auto-sair Ativado");
    const textOff = document.createTextNode("Auto-sair Desativado");
    
    const updateToggleButton = () => {
        if(ativar) {
            toggleBtn.textContent = '';
            toggleBtn.appendChild(textOn);
            toggleBtn.style.backgroundColor = "green";
            toggleBtn.style.color = "white";
        } else {
            toggleBtn.textContent = '';
            toggleBtn.appendChild(textOff);
            toggleBtn.style.backgroundColor = "#ddd";
            toggleBtn.style.color = "black";
            // Reseta o pico da reunião ao desativar para recalcular quando reativar
            max_reuniao = 0; 
        }
    };
    
    toggleBtn.style.width = "100%";
    toggleBtn.style.border = "none";
    toggleBtn.style.padding = "8px";
    toggleBtn.style.borderRadius = "4px";
    toggleBtn.style.marginBottom = "10px";
    toggleBtn.style.cursor = "pointer";
    
    toggleBtn.addEventListener("click", function() {
        ativar = !ativar;
        updateToggleButton();
    });

    // 3. Cria o campo para "Quórum Mínimo de Ativação"
    const minReuniaoDiv = document.createElement('div');
    minReuniaoDiv.style.marginBottom = '5px';
    const minReuniaoLabel = document.createElement("label");
    minReuniaoLabel.textContent = "Ativar com (pessoas): ";
    const minReuniaoInput = document.createElement("input");
    minReuniaoInput.type = "number";
    minReuniaoInput.value = min_reuniao;
    minReuniaoInput.style.width = "40px";
    minReuniaoInput.addEventListener('change', (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value > 1) {
            min_reuniao = value;
            console.log(`Mínimo para ativação alterado para: ${min_reuniao}`);
            max_reuniao = 0; // Reseta o pico para reavaliar com a nova regra
        } else {
            e.target.value = min_reuniao; // Restaura valor antigo se inválido
        }
    });
    minReuniaoDiv.appendChild(minReuniaoLabel);
    minReuniaoDiv.appendChild(minReuniaoInput);

    // 4. Cria o campo para "Porcentagem para Sair"
    const minQuorumDiv = document.createElement('div');
    const minQuorumLabel = document.createElement("label");
    minQuorumLabel.textContent = "Sair se abaixo de (%): ";
    const minQuorumInput = document.createElement("input");
    minQuorumInput.type = "number";
    minQuorumInput.value = min_quorum * 100; // Mostra como porcentagem (ex: 50)
    minQuorumInput.style.width = "40px";
    minQuorumInput.addEventListener('change', (e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && value > 0 && value <= 100) {
            min_quorum = value / 100; // Converte para decimal (ex: 0.5)
            console.log(`Porcentagem para sair alterada para: ${min_quorum}`);
        } else {
            e.target.value = min_quorum * 100; // Restaura valor antigo se inválido
        }
    });
    minQuorumDiv.appendChild(minQuorumLabel);
    minQuorumDiv.appendChild(minQuorumInput);

    // 5. Adiciona todos os elementos ao container e o container à página
    container.appendChild(toggleBtn);
    container.appendChild(minReuniaoDiv);
    container.appendChild(minQuorumDiv);
    document.body.appendChild(container);
    
    // Inicializa o estado visual do botão
    updateToggleButton();

})();
