import React from "react";
import {
  // Home,
  WishList,
  ProtectedRoute,
  AdminProtectedRoute,
  CartProtectedRoute,
  PageNotFound,
  ProductDetails,
  ProductByCategory,
  CheckoutPage,
} from "./shop";
import HomePage  from './shop/home/Hero.js'
import AboutPage  from './shop/about/About.js'
import ContactPage  from './shop/contact/Contact.js'
import AllProductsPage from './shop/allProducts/AllProducts.js'
import PrivacyPolicyPage from './shop/policy/PrivacyPolicy.js'
import TermsOfServicePage from './shop/policy/TermsOfService.js'
import FAQsPage from './shop/policy/FAQs.js'
import ShippingInfoPage from './shop/policy/ShippingInfo.js'
import ReturnsPage from './shop/policy/Returns.js'
import { DashboardAdmin, Categories, Products, Orders } from "./admin";
import { UserProfile, UserOrders, SettingUser } from "./shop/dashboardUser";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* Routing All page will be here */
const Routes = (props) => {
  return (
    <Router>
      <Switch>
        {/* Shop & Public Routes */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/contact-us" component={ContactPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route exact path="/term-condition" component={TermsOfServicePage} />
        <Route exact path="/faq" component={FAQsPage} />
        <Route exact path="/shipping-info" component={ShippingInfoPage} />
        <Route exact path="/returns" component={ReturnsPage} />
        <Route exact path="/wish-list" component={WishList} />
        <Route exact path="/products" component={AllProductsPage} />
        <Route exact path="/products/:id" component={ProductDetails} />
        <Route
          exact
          path="/products/category/:catId"
          component={ProductByCategory}
        />
        <CartProtectedRoute
          exact={true}
          path="/checkout"
          component={CheckoutPage}
        />
        {/* Shop & Public Routes End */}

        {/* Admin Routes */}
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard"
          component={DashboardAdmin}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/categories"
          component={Categories}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/products"
          component={Products}
        />
        <AdminProtectedRoute
          exact={true}
          path="/admin/dashboard/orders"
          component={Orders}
        />
        {/* Admin Routes End */}

        {/* User Dashboard */}
        <ProtectedRoute
          exact={true}
          path="/user/profile"
          component={UserProfile}
        />
        <ProtectedRoute
          exact={true}
          path="/user/orders"
          component={UserOrders}
        />
        <ProtectedRoute
          exact={true}
          path="/user/setting"
          component={SettingUser}
        />

        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
