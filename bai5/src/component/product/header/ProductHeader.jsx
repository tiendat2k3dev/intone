import { useNavigate } from 'react-router-dom'

const ProductHeader = ({ name, add, onAddClick }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (onAddClick) {
      onAddClick()
    } else {
      navigate('/product/add')
    }
  }

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h2>{name}</h2>

      <button className="btn btn-primary" onClick={handleClick}>
        {add}
      </button>
    </div>
  )
}

export default ProductHeader
