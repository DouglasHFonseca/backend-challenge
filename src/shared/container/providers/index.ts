import { container } from 'tsyringe';
import { IApiProvider } from './ApiProvider/IApiProvider';
import { CountriesNowProvider } from './ApiProvider/implementations/CountriesNowProvider';
import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/Implementations/DayjsDateProvider';

container.registerSingleton<IApiProvider>(
  "CountriesNowProvider",
  CountriesNowProvider
);

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);