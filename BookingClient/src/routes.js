const routes = {
  home: "/",
  listings: "products",
  detail: (id) => {
    if (id) {
      return `products/${id}`;
    }
    return "products/:propertyId";
  },
  landlordSignUp: "partners/sign-up",
  properties: "/properties",
  checkout: "/checkout",
  stafflistings: "/properties/:propertyId/staffs/",
};

export default routes;
