import { Goals } from '../infra/typeorm/entities/Goals';

export type ICreateGoalsDTO =
  Pick<
    Goals,
    "id" |
    "country" |
    "local" |
    "meta" |
    "flag"
  >