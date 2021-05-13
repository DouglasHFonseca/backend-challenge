interface IApiProvider {
  findLocation(country: string, local: string): Promise<string | undefined>;
  findFlag(country: string): Promise<string>;
}

export { IApiProvider };