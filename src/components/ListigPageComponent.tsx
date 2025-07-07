import { Link } from "react-router-dom";
import { Product } from "../utils/Interfaces";

interface Props {
  onScroll: () => void;
  listInnerRef: React.MutableRefObject<any>;
  userList: any;
}
function ListingPageComponent({ onScroll, listInnerRef, userList }: Props) {
  return (
    <div>
      <div
        onScroll={onScroll}
        ref={listInnerRef}
        style={{ height: "100vh", overflowY: "auto" }}
      >
        {userList.map((product: Product, index: number) => {
          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <div className="card p-card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        className="card-img-top"
                        src={product?.thumbnail}
                        alt="Card image cap"
                      />
                    </div>
                    <div className="col-md-8">
                      <Link to={product.id.toString()}>
                        <h4 className="card-title text-capitalize">
                          {product?.title}
                        </h4>
                      </Link>
                      <p className="card-text">{product?.description}</p>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <h4>
                            ₹{product?.price}
                            <span className="text-black-50 text-decoration-line-through ms-2 fs-6">
                              {product?.discountPercentage}% off
                            </span>
                          </h4>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ListingPageComponent;
