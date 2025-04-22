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
