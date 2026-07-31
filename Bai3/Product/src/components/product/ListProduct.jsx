import { Component } from "react";
import { getProduct } from "../../services/productServices";
import DeleteProduct from "../moal/DeleteProduct";

class ListProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productList: [],
      deleteProduct: {
        id: "",
        name: "",
      },
      showModal: false,
    };
  }

  openModal = (product) => {
    this.setState({
      showModal: true,
      deleteProduct: product,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  reloading = () => {
    this.setState({
      productList: [...getProduct()],
    });
  };

  componentDidMount() {
    this.setState({
      productList: [...getProduct()],
    });
  }

  render() {
    return (
      <>
        <h2 className="text-center my-3">Danh sách sản phẩm</h2>

        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>STT</th>
              <th>ID</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Xóa</th>
            </tr>
          </thead>

          <tbody>
            {this.state.productList.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString("vi-VN")} VNĐ</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.openModal(product)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <DeleteProduct
          show={this.state.showModal}
          product={this.state.deleteProduct}
          close={this.closeModal}
          reloading={this.reloading}
        />
      </>
    );
  }
}

export default ListProduct;
