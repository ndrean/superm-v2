import { runInAction } from "mobx";

const routes = [
  {
    path: "",
    action: async ({ next, mystore }) => {
      const content = await next();

      if (content.redirect) {
        return content;
      }

      if (content) {
        return await import("./Navbar").then(({ default: Navbar }) => (
          <Navbar store={mystore}>{content}</Navbar>
        ));
      }
    },
    children: [
      {
        path: "/",
        action: async () => {
          return await import("./Home").then(({ default: Home }) => <Home />);
        },
      },
      {
        path: "/about",
        action: async () => {
          return await import("./About").then(({ default: About }) => (
            <About />
          ));
        },
      },

      {
        path: "/cart",
        action: async ({ mystore }) => {
          return await import("./Cart").then(({ default: Cart }) => (
            <Cart store={mystore} />
          ));
        },
      },
      {
        path: "/products",
        children: [
          {
            path: "",
            action: async ({ mystore }) => {
              return await import("./Loader")
                .then(({ default: Loader }) => <Loader />)
                .then(() => runInAction(() => mystore.getProducts()))
                .then(() => import("./Products"))
                .then(({ default: Products }) => <Products store={mystore} />);
            },
          },
          {
            path: "/:id",
            action: async ({ next, mystore, params: { id } }) => {
              const content = await next();

              if (content) {
                return await import("./ProductDetails")
                  .then((module) => {
                    const { Details } = module.default;
                    return Details;
                  })
                  .then((Details) => (
                    <Details id={id} store={mystore}>
                      {content}
                    </Details>
                  ));
              }
            },
            children: [
              {
                path: "",
                action: async (context) => {
                  console.log("path /:id");
                  const {
                    mystore,
                    params: { id },
                  } = context;
                  return await import("./ProductDetails")
                    .then((module) => {
                      const { Info } = module.default;
                      return Info;
                    })
                    .then((Info) => <Info id={id} store={mystore} />);
                },
              },
              {
                path: "/details",
                action: async (context) => {
                  console.log("path /:id/details");
                  const {
                    mystore,
                    params: { id },
                  } = context;
                  return await import("./ProductDetails")
                    .then((module) => {
                      const { Info } = module.default;
                      return Info;
                    })
                    .then((Info) => <Info id={id} store={mystore} />);
                },
              },
              {
                path: "/storage",
                action: async (context) => {
                  const {
                    params: { id },
                  } = context;

                  const module = await import("./ProductDetails");
                  const { getDetail, Storage } = module.default;
                  const { storage } = await getDetail(id);
                  return <Storage storage={storage} />;
                },
              },
              {
                path: "/nutrition",
                action: async (context) => {
                  const {
                    params: { id },
                  } = context;

                  const module = await import("./ProductDetails");
                  const { getDetail, Nutrition } = module.default;
                  const { nutrition } = await getDetail(id);
                  return <Nutrition nutrition={nutrition} />;
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "(.*)",
    action: () => <h1>Nothing there</h1>,
  },
];

export default routes;
