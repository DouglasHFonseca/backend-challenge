import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = "travel_goals_api"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database:
        process.env.NODE_ENV === "test"
          ? "goals_test"
          : defaultOptions.database,
    })
  );
};
