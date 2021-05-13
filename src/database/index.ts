import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = "travel_goals_api"): Promise<Connection> =>{
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host
    })
  );
};
