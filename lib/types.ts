export interface Paragraph {
  paragraph_id: number;
  text: string;
  order: number;
}

export interface Image {
  image_id: number;
  URL_text: string;
  order: number;
}

export interface Article {
  article_id: number;
  title: string;
  author: string;
  date: string;
  thumbnail: string;
  paragraphs: Paragraph[];
  images: Image[];
  images_author: string;
  description_paragraph: string;
}