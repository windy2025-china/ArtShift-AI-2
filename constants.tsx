
import React from 'react';
import { ArtisticStyle, StyleOption } from './types';

export const STYLE_OPTIONS: StyleOption[] = [
  {
    id: ArtisticStyle.WATERCOLOR,
    label: '水彩画',
    description: '柔和、流动的色彩艺术',
    icon: '🎨',
    prompt: 'Transform this image into a beautiful, delicate watercolor painting with soft bleeding edges and vibrant washes of color.'
  },
  {
    id: ArtisticStyle.CYBERPUNK,
    label: '赛博朋克',
    description: '霓虹灯光与未来主义',
    icon: '🌃',
    prompt: 'Redraw this image in a high-tech cyberpunk style with neon cyan and magenta lighting, futuristic urban elements, and high contrast cinematic look.'
  },
  {
    id: ArtisticStyle.ANIME,
    label: '动漫',
    description: '日系赛璐珞风格',
    icon: '🎎',
    prompt: 'Convert this image into a professional Japanese anime style, clean lines, vibrant colors, and classic shonen/shojo aesthetic.'
  },
  {
    id: ArtisticStyle.CHINESE_STYLE,
    label: '中国风',
    description: '古典传统韵味',
    icon: '🏮',
    prompt: 'Reimagine this image with traditional Chinese artistic elements, including classical patterns, auspicious clouds, and a refined oriental color palette.'
  },
  {
    id: ArtisticStyle.ANIME_2D,
    label: '二次元',
    description: '萌系插画艺术',
    icon: '✨',
    prompt: 'Stylize this image as a modern 2D anime illustration, focusing on cute characters and stylized lighting common in popular moe art.'
  },
  {
    id: ArtisticStyle.THREE_D,
    label: '3D',
    description: '立体写实渲染',
    icon: '🧊',
    prompt: 'Render this scene in a high-quality 3D digital art style, resembling Pixar or Unreal Engine 5 output with realistic materials and depth of field.'
  },
  {
    id: ArtisticStyle.INK_WASH,
    label: '水墨',
    description: '写意挥毫泼墨',
    icon: '🖌️',
    prompt: 'Convert this into a traditional Chinese ink wash painting (Shuimo), emphasizing expressive brushwork, monochrome gradients, and minimalist composition.'
  },
  {
    id: ArtisticStyle.US_COMIC,
    label: '美漫',
    description: '美式英雄漫画',
    icon: '🦸',
    prompt: 'Redraw this in a gritty American comic book style with thick outlines, halftone dots (Ben-Day dots), and dynamic superhero aesthetics.'
  },
  {
    id: ArtisticStyle.REAL_PHOTO,
    label: '真实摄影',
    description: '超高清写实效果',
    icon: '📷',
    prompt: 'Enhance this image to look like a hyper-realistic professional photograph taken with a high-end DSLR, realistic lighting, and natural textures.'
  },
  {
    id: ArtisticStyle.CUSTOM,
    label: '自定义',
    description: '输入你的专属风格',
    icon: '⚙️',
    prompt: ''
  }
];

export const MUSHROOM_SVG = (
  <svg viewBox="0 0 24 24" className="w-10 h-10 glow-mushroom" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3C7.58172 3 4 6.58172 4 11C4 12.1046 4.89543 13 6 13H18C19.1046 13 20 12.1046 20 11C20 6.58172 16.4183 3 12 3Z" fill="#3B82F6"/>
    <path d="M10 13V19C10 20.1046 10.8954 21 12 21V21C13.1046 21 14 20.1046 14 19V13" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="8" cy="7" r="1.5" fill="white" fillOpacity="0.6"/>
    <circle cx="15" cy="8" r="1.2" fill="white" fillOpacity="0.6"/>
    <circle cx="12" cy="5.5" r="1" fill="white" fillOpacity="0.6"/>
  </svg>
);
