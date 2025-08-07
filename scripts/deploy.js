const FtpDeploy = require('ftp-deploy');
const path = require('path');
const fs = require('fs');

// 設定ファイルを読み込み
const configPath = path.join(__dirname, 'deploy-config.json');
let config;

try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (error) {
  console.error('❌ deploy-config.json が見つかりません');
  console.log('📝 scripts/deploy-config.json.example を参考に設定ファイルを作成してください');
  process.exit(1);
}

const ftpDeploy = new FtpDeploy();

const deployConfig = {
  user: config.ftp.username,
  password: config.ftp.password,
  host: config.ftp.server,
  port: config.ftp.port || 21,
  localRoot: path.join(__dirname, '../out'),
  remoteRoot: config.ftp.remoteDir || '/public_html/',
  include: ['*', '**/*'],
  exclude: [
    'dist/**/.gitignore',
    'dist/**/Thumbs.db',
    'dist/**/.DS_Store',
    '.git/**',
    '.gitignore',
    'node_modules/**',
    '.next/**',
    '.env*'
  ],
  deleteRemote: false,
  forcePasv: true,
  sftp: false
};

console.log('🚀 デプロイを開始します...');
console.log(`📁 ローカル: ${deployConfig.localRoot}`);
console.log(`🌐 リモート: ${config.ftp.server}${deployConfig.remoteRoot}`);

ftpDeploy
  .deploy(deployConfig)
  .then((res) => {
    console.log('✅ デプロイが完了しました！');
    console.log(`🔗 サイトURL: ${config.siteUrl || 'https://your-site.com'}`);
  })
  .catch((err) => {
    console.error('❌ デプロイに失敗しました:', err);
    process.exit(1);
  });

// プログレス表示
ftpDeploy.on('uploading', function(data) {
  console.log(`📤 アップロード中: ${data.filename}`);
});

ftpDeploy.on('uploaded', function(data) {
  console.log(`✅ アップロード完了: ${data.filename}`);
});

ftpDeploy.on('log', function(data) {
  console.log('📋', data);
}); 