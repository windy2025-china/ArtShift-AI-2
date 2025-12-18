
export enum ArtisticStyle {
  WATERCOLOR = '水彩画',
  CYBERPUNK = '赛博朋克',
  ANIME = '动漫',
  CHINESE_STYLE = '中国风',
  ANIME_2D = '二次元',
  THREE_D = '3D',
  INK_WASH = '水墨',
  US_COMIC = '美漫',
  REAL_PHOTO = '真实摄影',
  CUSTOM = '自定义'
}

export interface StyleOption {
  id: ArtisticStyle;
  label: string;
  description: string;
  icon: string;
  prompt: string;
}

export interface ModificationState {
  targetText: string;
  newText: string;
  objectTarget: string;
  objectChange: string;
  customStylePrompt: string;
}
