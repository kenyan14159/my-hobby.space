/**
 * SEO最適化のための画像alt属性生成ヘルパー
 * 
 * 目的:
 * - 画像の内容を正確に説明することでアクセシビリティ向上
 * - 検索エンジンが画像内容を理解できるようにする
 * - 画像検索での表示機会を増やす
 */

/**
 * 選手プロフィール画像のalt属性を生成
 * @param name 選手名
 * @param year 学年（例: "4年"）
 * @param school 出身高校（オプション）
 * @returns SEO最適化されたalt属性
 * 
 * @example
 * generatePlayerAlt("山田太郎", "4年", "〇〇高校")
 * // => "山田太郎（4年・〇〇高校出身）- 日本体育大学駅伝部"
 */
export function generatePlayerAlt(
  name: string,
  year?: string,
  school?: string
): string {
  const parts = [name];
  
  if (year || school) {
    const details = [];
    if (year) details.push(year);
    if (school) details.push(`${school}出身`);
    parts.push(`（${details.join('・')}）`);
  }
  
  parts.push('- 日本体育大学駅伝部');
  
  return parts.join('');
}

/**
 * 試合・大会画像のalt属性を生成
 * @param eventName 大会名
 * @param year 年度
 * @param description 詳細説明（オプション）
 * @returns SEO最適化されたalt属性
 * 
 * @example
 * generateEventAlt("箱根駅伝", "2025", "往路5区")
 * // => "2025年箱根駅伝 往路5区 - 日本体育大学駅伝部"
 */
export function generateEventAlt(
  eventName: string,
  year?: string,
  description?: string
): string {
  const parts = [];
  
  if (year) {
    parts.push(`${year}年${eventName}`);
  } else {
    parts.push(eventName);
  }
  
  if (description) {
    parts.push(description);
  }
  
  parts.push('- 日本体育大学駅伝部');
  
  return parts.join(' ');
}

/**
 * 練習・合宿画像のalt属性を生成
 * @param type 種類（例: "夏合宿", "練習風景"）
 * @param location 場所（オプション）
 * @param year 年度（オプション）
 * @returns SEO最適化されたalt属性
 * 
 * @example
 * generateTrainingAlt("夏合宿", "野尻湖", "2025")
 * // => "2025年夏合宿（野尻湖）- 日本体育大学駅伝部の練習風景"
 */
export function generateTrainingAlt(
  type: string,
  location?: string,
  year?: string
): string {
  const parts = [];
  
  if (year) {
    parts.push(`${year}年${type}`);
  } else {
    parts.push(type);
  }
  
  if (location) {
    parts.push(`（${location}）`);
  }
  
  parts.push('- 日本体育大学駅伝部の練習風景');
  
  return parts.join('');
}

/**
 * 記録・データ画像のalt属性を生成
 * @param type データの種類（例: "記録", "グラフ"）
 * @param description 詳細説明
 * @returns SEO最適化されたalt属性
 * 
 * @example
 * generateRecordAlt("グラフ", "5000m自己ベストの推移")
 * // => "5000m自己ベストの推移のグラフ - 日本体育大学駅伝部"
 */
export function generateRecordAlt(
  type: string,
  description: string
): string {
  return `${description}の${type} - 日本体育大学駅伝部`;
}

/**
 * ニュース・イベント画像のalt属性を生成
 * @param title ニュースのタイトル
 * @param date 日付（オプション）
 * @returns SEO最適化されたalt属性
 * 
 * @example
 * generateNewsAlt("全日本大学駅伝エントリー決定", "2025-10-18")
 * // => "全日本大学駅伝エントリー決定（2025-10-18）- 日本体育大学駅伝部ニュース"
 */
export function generateNewsAlt(
  title: string,
  date?: string
): string {
  const parts = [title];
  
  if (date) {
    parts.push(`（${date}）`);
  }
  
  parts.push('- 日本体育大学駅伝部ニュース');
  
  return parts.join('');
}

/**
 * 一般的な画像のalt属性を生成
 * @param description 画像の説明
 * @param context 文脈（オプション）
 * @returns SEO最適化されたalt属性
 * 
 * @example
 * generateGenericAlt("チーム集合写真", "2025年度新体制発表")
 * // => "チーム集合写真 - 2025年度新体制発表 | 日本体育大学駅伝部"
 */
export function generateGenericAlt(
  description: string,
  context?: string
): string {
  const parts = [description];
  
  if (context) {
    parts.push(`- ${context}`);
  }
  
  parts.push('| 日本体育大学駅伝部');
  
  return parts.join(' ');
}

/**
 * ロゴ・アイコン画像のalt属性を生成
 * @param type 種類（例: "ロゴ", "アイコン"）
 * @param description 詳細説明（オプション）
 * @returns SEO最適化されたalt属性
 * 
 * @example
 * generateLogoAlt("ロゴ")
 * // => "日本体育大学駅伝部 ロゴ"
 */
export function generateLogoAlt(
  type: string = 'ロゴ',
  description?: string
): string {
  const parts = ['日本体育大学駅伝部', type];
  
  if (description) {
    parts.push(`- ${description}`);
  }
  
  return parts.join(' ');
}

/**
 * キーワードを含むalt属性を生成（SEO強化版）
 * @param baseDescription 基本的な説明
 * @param keywords SEOキーワード配列
 * @param maxLength 最大文字数（デフォルト: 125文字）
 * @returns キーワードを自然に含むalt属性
 * 
 * @example
 * generateSEOAlt("選手走行中", ["箱根駅伝", "予選会", "日体大"])
 * // => "選手走行中 - 箱根駅伝予選会に挑む日体大駅伝部"
 */
export function generateSEOAlt(
  baseDescription: string,
  keywords: string[] = [],
  maxLength: number = 125
): string {
  let alt = baseDescription;
  
  // キーワードを自然に組み込む
  if (keywords.length > 0) {
    const keywordPhrase = keywords.slice(0, 3).join('');
    alt = `${alt} - ${keywordPhrase}`;
  }
  
  // 最大文字数を超える場合は切り詰める
  if (alt.length > maxLength) {
    alt = alt.substring(0, maxLength - 3) + '...';
  }
  
  return alt;
}

/**
 * alt属性のバリデーション
 * @param alt チェックするalt属性
 * @returns バリデーション結果とメッセージ
 */
export function validateAlt(alt: string): {
  isValid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];
  
  // 空文字チェック
  if (!alt || alt.trim().length === 0) {
    return { isValid: false, warnings: ['alt属性が空です'] };
  }
  
  // 長さチェック（推奨: 125文字以内）
  if (alt.length > 125) {
    warnings.push('alt属性が125文字を超えています（SEO的に推奨範囲外）');
  }
  
  // 短すぎるチェック
  if (alt.length < 10) {
    warnings.push('alt属性が短すぎます（より詳細な説明を推奨）');
  }
  
  // "画像", "写真" のみの場合
  if (alt === '画像' || alt === '写真' || alt === 'image' || alt === 'photo') {
    warnings.push('汎用的すぎる説明です（より具体的な内容を記載してください）');
  }
  
  // ファイル名が含まれている場合
  if (alt.match(/\.(jpg|jpeg|png|gif|webp)/i)) {
    warnings.push('ファイル名がalt属性に含まれています（説明文に変更してください）');
  }
  
  return {
    isValid: warnings.length === 0,
    warnings
  };
}

/**
 * 既存のalt属性を改善（SEO最適化）
 * @param currentAlt 現在のalt属性
 * @param context 追加の文脈情報
 * @returns 改善されたalt属性
 */
export function improveAlt(
  currentAlt: string,
  context?: {
    category?: 'player' | 'event' | 'training' | 'news';
    keywords?: string[];
  }
): string {
  let improved = currentAlt;
  
  // 既に十分な説明がある場合はそのまま返す
  const validation = validateAlt(currentAlt);
  if (validation.isValid && currentAlt.length > 30) {
    return currentAlt;
  }
  
  // カテゴリに応じて接尾辞を追加
  if (!improved.includes('日本体育大学') && !improved.includes('日体大')) {
    improved = `${improved} - 日本体育大学駅伝部`;
  }
  
  // キーワードを自然に追加
  if (context?.keywords && context.keywords.length > 0) {
    const hasKeywords = context.keywords.some(kw => improved.includes(kw));
    if (!hasKeywords) {
      improved = `${context.keywords[0]} ${improved}`;
    }
  }
  
  return improved;
}
