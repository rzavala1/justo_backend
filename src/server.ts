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

async function main() {
  
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver,AuthResolver, ManagerResolver, HitsResolver,HitmanResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
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
