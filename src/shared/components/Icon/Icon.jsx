import sprite from "../../../icons/symbol-defs.svg";

export default function Icon({ className, width, height, id }) {
  return (
    <>
      <svg className={className} width={width} height={height}>
        <use href={`${sprite}#${id}`} />
      </svg>
    </>
  );
}
