import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { AuthResolver } from "./resolvers/AuthResolver";
import { ManagerResolver } from "./resolvers/ManagerResolver";
import { HitsResolver } from "./resolvers/HitsResolver";
import { HitmanResolver } from "./resolvers/HitmanResolver";
import { verifyToken } from "./controllers/AuthController";

async function main() {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        AuthResolver,
        ManagerResolver,
        HitsResolver,
        HitmanResolver,
      ],
    }),
    context: ({ req, res }) => {
      const token = req.headers.authorization || "";
      if (token!=="" && token!=="__public") {
        const user = verifyToken(token);
        if (!user) {
          throw new Error("Invalid Token");
        }
        return { req, res, user };
      } else {
        const isPublicOperation =
          req.body.operationName === "loginUser" ||
          req.body.operationName === "createUser";

        if (isPublicOperation) {
          return { req , res};
        }
        throw new Error("Invalid");
      }
    },
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/graphql`);
  });
}

main().catch((error) => {
  console.error(error);
});
