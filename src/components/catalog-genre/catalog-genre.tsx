type CatalogGenreProps = {
  title: string;
  className: string;
}

function CatalogGenre(props: CatalogGenreProps) {
  return (
    <li className={props.className}>
      <a href="#" className="catalog__genres-link">{props.title}</a>
    </li>
  );
}

export default CatalogGenre;
