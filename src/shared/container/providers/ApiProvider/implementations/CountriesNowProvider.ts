import { IApiProvider } from '../IApiProvider';

import { AppError } from '@shared/errors/AppError';
import { api } from '@services/countriesApi';

class CountriesNowProvider implements IApiProvider {
  async findLocation(country: string, local: string): Promise<string | undefined> {
    const params = new URLSearchParams();
    params.append("country", country);

    const response = await api.post("/cities", params)
      .then((response) => response)
      .catch((err) => err);

    if (response.data === undefined) {
      throw new AppError(response.response.data.msg);
    } else {
      return response.data.data.find((city: string) => city.toLowerCase() === local.toLowerCase());
    }
  }

  async findFlag(country: string): Promise<string> {
    const params = new URLSearchParams();
    params.append("country", country);

    const response = await api.post("/flag/images", params)
      .then((response) => response)
      .catch((err) => err);

    if (response.data === undefined) {
      throw new AppError(response.response.data.msg);
    } else {
      return response.data.data.flag;
    }
  }
}


export { CountriesNowProvider }