export default function CustomImage({
  imageUrl,
  customHeight = 500,
  customWidth = 500,
  customClassName = "",
}) {
  return (
    <img
      src={imageUrl}
      alt="Alt Pic"
      className={` !h-full !w-full !object-cover !object-center ${customClassName}`}
      style={{ height: customHeight, width: customWidth, objectFit: 'cover', objectPosition: 'center' }}
    />
  );
}
