import { useParams } from "next/navigation";

const SingleProduct = () => {
    const {id}=useParams()
  return <h1>This is a {id} product</h1>;
};

export default SingleProduct;
