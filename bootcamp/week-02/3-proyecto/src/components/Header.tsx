/**
 * COMPONENTE: Header
 *
 * Muestra el título y descripción de la aplicación.
 * Adaptado a la tienda deportiva.
 */

const Header: React.FC = () => {
  return (
    <header className="header" style={{ marginBottom: "20px", textAlign: "center" }}>
      <h1>🏋️ Tienda Deportiva Sportyk Retail</h1>
      <p>Gestiona productos, stock y categorías con React + TypeScript</p>
    </header>
  );
};

export default Header;
