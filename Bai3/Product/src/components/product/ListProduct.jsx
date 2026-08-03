import { Component } from "react";
import { getProduct } from "../../services/productServices";
import DeleteProduct from "../modal/DeleteProduct";

class ListProduct extends Component {
  //Constructor
  constructor(props) {
    console.log("-------init---constructor run-----------------");
    super(props);
    // Khởi tạo state
    this.state = {
      productList: [],
      deleteProduct: {
        id: "",
        name: "",
      },
      showModal: false,
    };
  }
  // mở modal
  openModal = (product) => {
    this.setState({
      showModal: true,
      deleteProduct: product,
    });
  };
  // dong modal
  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };
  // tải lại danh sách sản phẩm
  reloading = () => {
    this.setState({
      productList: [...getProduct()],
    });
  };
  // Lấy dữ liệu sau khi component render
  componentDidMount() {
    console.log("------------after render-----------");
    this.setState({
      productList: [...getProduct()],
    });
  }
  // render
  render() {
    return (
      <>
        {console.log("-----------list render-------------")}
        <h2 className="text-center my-3">Danh sách sản phẩm</h2>
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {this.state.productList.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
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
