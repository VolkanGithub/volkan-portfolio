// next-sanity/studio içinden direkt metadata ve viewport'u alıp dışa aktarıyoruz
export { metadata, viewport } from 'next-sanity/studio';

export default function StudioLayout({ children }) {
  return children;
}