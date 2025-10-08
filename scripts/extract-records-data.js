/**
 * 陸上競技記録データ抽出スクリプト
 * 各種目のpage.tsxファイルからrecordsDataを抽出してJSON形式で保存
 */

const fs = require('fs');
const path = require('path');

// 抽出対象のディレクトリ
const MEN_DIR = path.join(__dirname, '../app/track-and-field/records/data/men');
const WOMEN_DIR = path.join(__dirname, '../app/track-and-field/records/data/women');

// 出力先ディレクトリ
const OUTPUT_MEN_DIR = path.join(__dirname, '../public/data/track-field-records/men');
const OUTPUT_WOMEN_DIR = path.join(__dirname, '../public/data/track-field-records/women');

// ディレクトリ作成
if (!fs.existsSync(OUTPUT_MEN_DIR)) {
  fs.mkdirSync(OUTPUT_MEN_DIR, { recursive: true });
}
if (!fs.existsSync(OUTPUT_WOMEN_DIR)) {
  fs.mkdirSync(OUTPUT_WOMEN_DIR, { recursive: true });
}

/**
 * page.tsxファイルからrecordsData配列を抽出
 */
function extractRecordsData(filePath, eventName) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // recordsData配列を抽出（const recordsData: Record[] = [...] の部分）
  const regex = /const\s+recordsData:\s*Record\[\]\s*=\s*(\[[\s\S]*?\]);/;
  const match = content.match(regex);
  
  if (!match) {
    console.warn(`⚠️  recordsData not found in ${filePath}`);
    return null;
  }
  
  const dataString = match[1];
  
  // TypeScriptオブジェクトリテラルをパース
  try {
    // evalを使用してJavaScriptとして評価（安全な環境でのみ使用）
    const records = eval(dataString);
    
    // フィールド名を統一
    const normalizedRecords = records.map(record => ({
      name: record.name || '',
      school: record.highSchool || record.school || record.affiliation || '',
      time: record.record || record.time || '',
      year: record.year === null ? null : record.year,
      recordYear: record.recordYear || ''
    }));
    
    return {
      [eventName]: normalizedRecords
    };
  } catch (error) {
    console.error(`❌ Error parsing data from ${filePath}:`, error.message);
    return null;
  }
}

/**
 * ディレクトリ内の全種目を処理
 */
function processDirectory(dirPath, outputDir, gender) {
  console.log(`\n📂 Processing ${gender} events from ${dirPath}...`);
  
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  let successCount = 0;
  let failCount = 0;
  
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    
    const eventDir = entry.name;
    const pageFile = path.join(dirPath, eventDir, 'page.tsx');
    
    if (!fs.existsSync(pageFile)) {
      console.log(`⏭️  Skipping ${eventDir} (no page.tsx)`);
      continue;
    }
    
    console.log(`\n🔍 Extracting ${eventDir}...`);
    
    const data = extractRecordsData(pageFile, eventDir);
    
    if (data) {
      const outputFile = path.join(outputDir, `${eventDir}.json`);
      fs.writeFileSync(outputFile, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`✅ Saved to ${outputFile}`);
      successCount++;
    } else {
      failCount++;
    }
  }
  
  console.log(`\n${gender} Summary: ✅ ${successCount} success, ❌ ${failCount} failed`);
}

// メイン処理
console.log('🚀 Starting record data extraction...\n');

console.log('=' .repeat(60));
processDirectory(MEN_DIR, OUTPUT_MEN_DIR, '👨 Men');

console.log('\n' + '='.repeat(60));
processDirectory(WOMEN_DIR, OUTPUT_WOMEN_DIR, '👩 Women');

console.log('\n' + '='.repeat(60));
console.log('\n✨ Extraction complete!\n');
console.log(`📁 Men's data: ${OUTPUT_MEN_DIR}`);
console.log(`📁 Women's data: ${OUTPUT_WOMEN_DIR}`);
