/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllProducts} from './all-products'
export {default as SingleProductFullView} from './SingleProductFullView'
export {default as ProductCategory} from './productCategory'
export {default as Cart} from './Cart'
export {default as AddProductForm} from './addProductForm'
export {default as UpdateProductForm} from './UpdateProductForm'
export {default as DisplayWithProducts} from './productCategory'
export {default as SearchView} from './searchView'
export {default as SingleCartProduct} from './SingleCartProduct'
export {default as ErrorNoProduct} from './Error_NoProduct'
export {default as AddReviewForm} from './AddReviewForm'
export {default as UserProfile} from './UserProfile'
export {default as EditProfile} from './EditProfile'
export {default as CheckoutNLI} from './CheckoutNLI'
export {default as Orders} from './Orders'
