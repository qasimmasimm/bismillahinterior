import products from "../data/productsdata";
import { Link } from "react-router-dom";

export default function WPCandimported(){
  const product = products.filter((p) => p.category === "WPC & Imported Panels");

  return (
    <section className="py-5" style={{ backgroundColor: "#fcfaf6" }}>
      <div className="container py-4">
        <div className="mb-5">
          <small
            className="text-uppercase fw-semibold"
            style={{
              color: "#ad8144",
              letterSpacing: "2px",
            }}
          >
            Wall Panels
          </small>

          <h1
            className="display-5 fw-semibold mt-2"
            style={{ color: "#292621" }}
          >
            WPC & Imported Panels
          </h1>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {product.map((item) => (
            <div className="col" key={item.id}>
              <div
                className="card h-100 bg-white rounded-4 overflow-hidden shadow-sm"
                style={{
                  border: "1px solid #e5ddd2",
                }}
              >
                <Link
                  to={`/products/${item.id}`}
                  className="text-decoration-none"
                >
                  <div
                    className="position-relative overflow-hidden"
                    style={{ aspectRatio: "1 / 1" }}
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                </Link>

                <div className="card-body p-4">
                  <small
                    className="text-uppercase fw-semibold"
                    style={{
                      color: "#ad8144",
                      letterSpacing: "1px",
                    }}
                  >
                    {item.category}
                  </small>

                  <h4
                    className="h5 fw-semibold mt-2 mb-0"
                    style={{ color: "#292621" }}
                  >
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
