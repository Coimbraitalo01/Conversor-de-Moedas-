const ghpages = require('gh-pages');

ghpages.publish('dist', {
  branch: 'gh-pages',
  repo: 'https://github.com/Coimbraitalo01/Conversor-de-Moedas-.git',
  dotfiles: true,
  message: 'Deploy automático'
}, (err) => {
  if (err) {
    console.error('Erro no deploy:', err);
    process.exit(1);
  } else {
    console.log('Deploy realizado com sucesso!');
  }
});
