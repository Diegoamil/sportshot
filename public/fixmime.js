// Script para corrigir problemas de MIME type
// Este script será carregado antes do script principal
(function() {
  // Verifica se estamos em ambiente de produção
  if (window.location.hostname.includes('easypanel.host')) {
    console.log('Aplicando correção de MIME type para EasyPanel...');
    
    // Substitui a importação padrão por uma importação via fetch
    window.loadAppManually = function() {
      console.log('Carregando aplicação manualmente...');
      
      // Cria elemento para exibir mensagem de carregamento
      const loadingMsg = document.createElement('div');
      loadingMsg.innerHTML = 'Carregando SportShot...';
      loadingMsg.style.position = 'fixed';
      loadingMsg.style.top = '50%';
      loadingMsg.style.left = '50%';
      loadingMsg.style.transform = 'translate(-50%, -50%)';
      loadingMsg.style.fontFamily = 'Arial, sans-serif';
      loadingMsg.style.fontSize = '24px';
      loadingMsg.style.color = '#333';
      document.body.appendChild(loadingMsg);
      
      // Carrega o script principal via fetch
      fetch('/assets/index.js')
        .then(response => response.text())
        .then(scriptText => {
          // Cria um script e executa o código
          const script = document.createElement('script');
          script.type = 'module';
          script.textContent = scriptText;
          document.head.appendChild(script);
          
          // Carrega o CSS manualmente
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/assets/index.css';
          document.head.appendChild(link);
          
          // Remove a mensagem de carregamento após 2 segundos
          setTimeout(() => {
            loadingMsg.remove();
          }, 2000);
        })
        .catch(error => {
          console.error('Erro ao carregar a aplicação:', error);
          loadingMsg.innerHTML = 'Erro ao carregar a aplicação. Por favor, tente novamente.';
          loadingMsg.style.color = 'red';
        });
    };

    // Remover o script original
    document.addEventListener('DOMContentLoaded', function() {
      const originalScript = document.querySelector('script[src="/src/main.tsx"]');
      if (originalScript) {
        originalScript.remove();
      }
      
      // Carregar a aplicação manualmente
      window.loadAppManually();
    });
  }
})();
