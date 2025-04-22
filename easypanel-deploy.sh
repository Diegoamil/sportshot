#!/bin/bash

# Script de deploy para EasyPanel
echo "Iniciando deploy para EasyPanel..."

# Construir a aplicação
echo "Construindo a aplicação..."
npm run build

# Criar pasta para o deploy se não existir
mkdir -p deploy

# Copiar arquivos de build para a pasta de deploy
echo "Copiando arquivos para pasta de deploy..."
cp -r dist/* deploy/

# Copiar arquivos de configuração
echo "Copiando arquivos de configuração..."
cp public/.htaccess deploy/
cp Caddyfile deploy/

# Criar arquivo de configuração para o EasyPanel
echo "Criando arquivo de configuração para o EasyPanel..."
cat > deploy/easypanel.config.js << EOL
module.exports = {
  // Configuração para o EasyPanel
  server: {
    type: 'static',
    staticRoot: '/',
    port: 80,
    env: {
      NODE_ENV: 'production'
    }
  },
  // Configurações de MIME type
  mimeTypes: {
    '.js': 'application/javascript',
    '.mjs': 'application/javascript',
    '.jsx': 'application/javascript',
    '.ts': 'application/javascript',
    '.tsx': 'application/javascript',
    '.css': 'text/css',
    '.svg': 'image/svg+xml'
  }
};
EOL

echo "Deploy preparado com sucesso!"
echo "Para fazer o upload para o EasyPanel, use o comando:"
echo "  tar -czf sportshot-deploy.tar.gz -C deploy ."
echo "E depois faça o upload do arquivo sportshot-deploy.tar.gz para o EasyPanel."
